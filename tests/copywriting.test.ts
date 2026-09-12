import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contentPages, rootDir } from "./helpers";

/** Mechanical COPYWRITING.md rules enforced by regex. */
const collections = ["docs", "ui", "blog"] as const;

/** `{ page, source }` for every page, with the collection folded into `page`. */
const allPages = collections.flatMap((collection) =>
  contentPages(collection).map(({ slug, source }) => ({
    page: `${collection}/${slug}.mdx`,
    source,
  })),
);

/** Pages excluding the blog, which speaks in the first person by design. */
const sitePages = allPages.filter(({ page }) => !page.startsWith("blog/"));

/** Prose lines only; skips frontmatter, fences, and JSX. */
function prose(source: string): string[] {
  const withoutFrontmatter = source.replace(/^---\n[\s\S]*?\n---/, (block) =>
    block.replace(/[^\n]/g, ""),
  );

  let inFence = false;

  return withoutFrontmatter.split("\n").map((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return "";
    }

    if (inFence) return "";
    // Table rows carry `-` separators and `|` alignment, neither of which is
    // punctuation the prose rules have an opinion about.
    if (/^\s*\|/.test(line)) return "";

    return line.replace(/<[^>]*>/g, " ");
  });
}

/** `page:line` for every prose line matching `pattern`. */
function findAll(
  pages: { page: string; source: string }[],
  pattern: RegExp,
): string[] {
  const hits: string[] = [];

  for (const { page, source } of pages) {
    prose(source).forEach((line, index) => {
      const match = line.match(pattern);
      if (match) hits.push(`${page}:${index + 1}  ${match[0].trim()}`);
    });
  }

  return hits;
}

describe("copywriting", () => {
  it("uses no em dashes", () => {
    expect(findAll(allPages, /.{0,30}—.{0,30}/)).toEqual([]);
  });

  /** Spaced hyphen dash; excludes list markers and `->`. */
  it("uses no spaced hyphen as a dash", () => {
    expect(findAll(allPages, /\w\s+-\s+(?!>)\w.{0,20}/)).toEqual([]);
  });

  /** Blog exempt; these contractions are banned in docs and UI prose. */
  it("uses no contractions outside the blog", () => {
    expect(
      findAll(sitePages, /\b\w+(?:n't|'re|'ll|'ve|'d)\b|\bit's\b/i),
    ).toEqual([]);
  });

  it("spells `cannot` as one word", () => {
    expect(findAll(allPages, /\bcan not\b/)).toEqual([]);
  });

  it("uses US spelling", () => {
    expect(
      findAll(
        allPages,
        /\b\w*(?:behaviour|colour|recognis|normalis|centre)\w*/i,
      ),
    ).toEqual([]);
  });

  /** Yumma CSS is explained against CSS, never named against another framework. */
  it("never mentions Tailwind", () => {
    expect(findAll(allPages, /\btailwind\b/i)).toEqual([]);
  });

  /** Blog exempt; elsewhere the reader is `you`, not `we`. */
  it("uses no first person outside the blog", () => {
    expect(findAll(sitePages, /\b(?:we|we're|our|ours)\b/i)).toEqual([]);
  });

  it("leaves no trailing whitespace", () => {
    const dirty: string[] = [];

    for (const { page, source } of allPages) {
      source.split("\n").forEach((line, index) => {
        if (/[ \t]+$/.test(line)) dirty.push(`${page}:${index + 1}`);
      });
    }

    expect(dirty).toEqual([]);
  });

  /** Title Case headings; code identifiers keep their own casing. */
  it("writes headings in Title Case", () => {
    const small = new Set([
      "a",
      "an",
      "and",
      "as",
      "at",
      "by",
      "for",
      "from",
      "in",
      "into",
      "of",
      "on",
      "or",
      "per",
      "the",
      "to",
      "vs",
      "with",
    ]);

    const wrong: string[] = [];

    for (const { page, source } of allPages) {
      prose(source).forEach((line, index) => {
        const heading = line.match(/^#{1,6}\s+(.*)$/);
        if (!heading?.[1]) return;

        const text = heading[1].trim();
        // Single-token headings are names (`yummacss`, `@yummacss/vite`).
        if (!/\s/.test(text)) return;

        const words = text.split(/\s+/);

        words.forEach((word, position) => {
          if (!/^[a-z]/.test(word)) return;
          if (!/^[a-zA-Z]+[.,:?!]?$/.test(word)) return;

          const bare = word.replace(/[.,:?!]$/, "").toLowerCase();
          const isEdge = position === 0 || position === words.length - 1;

          if (small.has(bare) && !isEdge) return;

          wrong.push(`${page}:${index + 1}  ${text}  ->  "${word}"`);
        });
      });
    }

    expect(wrong).toEqual([]);
  });

  /** One sentence, imperative, terminated. It is also the meta description. */
  it("gives every page a one-sentence description", () => {
    const bad: string[] = [];

    for (const { page, source } of allPages) {
      const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1];
      const raw = frontmatter?.match(/^description:\s*(.+)$/m)?.[1];

      if (!raw) {
        bad.push(`${page}  missing description`);
        continue;
      }

      const text = raw.trim().replace(/^["']|["']$/g, "");

      if (!/[.!?]$/.test(text)) bad.push(`${page}  unpunctuated: ${text}`);
      if (text.length > 120) bad.push(`${page}  ${text.length} chars: ${text}`);
    }

    expect(bad).toEqual([]);
  });
});

/**
 * The copy the library actually ships: a component's default string props, and
 * the schema descriptions that render in every props table. The rules above
 * only ever saw `.mdx`, so 554 strings a reader meets on the component pages
 * were going unchecked, and had drifted.
 *
 * Inline code is stripped first. A range written `20 - 80` is a format, not a
 * sentence with a dash in it.
 */
describe("shipped copy", () => {
  const registryDir = join(rootDir, "src/registry/ui");
  const metaDir = join(rootDir, "src/registry/meta");

  const strings: { where: string; text: string }[] = [];

  for (const file of readdirSync(registryDir).filter((f) =>
    f.endsWith(".tsx"),
  )) {
    const source = readFileSync(join(registryDir, file), "utf8");
    for (const [, prop, text] of source.matchAll(
      /^\s+([a-zA-Z]+) = "([^"]{3,})",?$/gm,
    )) {
      strings.push({ where: `${file}:${prop}`, text });
    }
  }

  for (const file of readdirSync(metaDir).filter((f) => f.endsWith(".json"))) {
    const meta = JSON.parse(readFileSync(join(metaDir, file), "utf8"));
    if (meta.summary)
      strings.push({ where: `${file}:summary`, text: meta.summary });
    for (const prop of meta.props ?? []) {
      if (prop.description) {
        strings.push({ where: `${file}:${prop.name}`, text: prop.description });
      }
      // A documented default is copy the component ships and the props table
      // prints, and it drifted from the component once already.
      if (typeof prop.default === "string" && prop.default.length > 2) {
        strings.push({
          where: `${file}:${prop.name} default`,
          text: prop.default,
        });
      }
    }
  }

  /** `where  ->  match` for every shipped string matching `pattern`. */
  function offenders(pattern: RegExp): string[] {
    return strings.flatMap(({ where, text }) => {
      const match = text.replace(/`[^`]*`/g, "~").match(pattern);
      return match ? [`${where}  ->  "${match[0]}"`] : [];
    });
  }

  it("has copy to check", () => {
    expect(strings.length).toBeGreaterThan(400);
  });

  it("uses no em dashes", () => {
    expect(offenders(/.{0,30}—.{0,30}/)).toEqual([]);
  });

  it("uses no spaced hyphen as a dash", () => {
    expect(offenders(/\w\s+-\s+(?!>)\w.{0,20}/)).toEqual([]);
  });

  it("uses no contractions", () => {
    expect(offenders(/\b\w+(?:n't|'re|'ll|'ve|'d)\b|\bit's\b/i)).toEqual([]);
  });

  it("spells `cannot` as one word", () => {
    expect(offenders(/\bcan not\b/)).toEqual([]);
  });

  it("uses US spelling", () => {
    expect(
      offenders(/\b\w*(?:behaviour|colour|recognis|normalis|centre)\w*/i),
    ).toEqual([]);
  });

  it("never mentions Tailwind", () => {
    expect(offenders(/\btailwind\b/i)).toEqual([]);
  });

  /** One ellipsis character, the way the site's own placeholders spell it. */
  it("spells an ellipsis as one character", () => {
    expect(offenders(/\.{3}/)).toEqual([]);
  });
});
