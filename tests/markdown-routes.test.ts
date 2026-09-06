import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { mdxToMarkdown } from "../src/utils/mdx-markdown";
import { contentPages, rootDir } from "./helpers";

/**
 * The `.md` twin of every page is what a model reads, and it is rendered by
 * unwrapping MDX components. A component with no case in `mdx-markdown.ts` has
 * no children to unwrap, so it vanishes and takes the page's content with it -
 * silently, because the route still returns 200 with the title and description
 * the layout adds.
 *
 * That has now happened twice. First at 965 bytes, fixed; then again at **65**
 * when every UI page moved to `<ComponentPlayground />`, which neither of the
 * two cases then present matched. Nothing failed either time, because nothing
 * asserted a `.md` had a body.
 */

/** What the `ui-md` route injects. Kept in step with that route by hand. */
const resolveRegistry = (id: string) => {
  for (const root of ["ui", "docs"]) {
    try {
      return readFileSync(
        join(rootDir, "src/registry", root, `${id}.tsx`),
        "utf-8",
      );
    } catch {}
  }
  return null;
};

const resolveMeta = (id: string) => {
  try {
    return JSON.parse(
      readFileSync(join(rootDir, "src/registry/meta", `${id}.json`), "utf-8"),
    );
  } catch {
    return null;
  }
};

describe("Markdown routes", () => {
  // Frontmatter-only prose renders to very little; a real page renders to a
  // lot. The gap between them is wide enough that one number separates a
  // rendered page from an empty one without being brittle.
  const FLOOR = 400;

  it("renders a body for every docs page", () => {
    const thin = contentPages("docs")
      .map(({ slug, source }) => ({
        slug,
        size: mdxToMarkdown(source).length,
      }))
      .filter(({ size }) => size < FLOOR);

    expect(thin).toEqual([]);
  });

  // The failure that motivated this file: these render through
  // `<ComponentPlayground />`, whose id is the page's own slug.
  // The floor is a whole-page measure, so a long page can still serve nothing
  // where it matters: `normalize.mdx` cleared 400 with 18 empty fences.
  it("leaves no empty code fence in any page", () => {
    const empty = ["docs", "ui"].flatMap((collection) =>
      contentPages(collection)
        .map(({ slug, source }) => ({
          slug: `${collection}/${slug}`,
          fences: (
            mdxToMarkdown(source, {
              resolveRegistry,
              resolveMeta,
              registryId: slug,
            }).match(/```[^\n]*\n```/g) ?? []
          ).length,
        }))
        .filter(({ fences }) => fences > 0),
    );

    expect(empty).toEqual([]);
  });

  // `<Baseline />` is self-closing, so it fell through the same hole
  // `<ComponentPlayground />` did: 130 pages served no browser support at all.
  it("renders browser support wherever the page shows it", () => {
    const missing = contentPages("docs")
      .filter(({ source }) => source.includes("<Baseline"))
      .map(({ slug, source }) => ({ slug, body: mdxToMarkdown(source) }))
      .filter(
        ({ body }) =>
          !/(Widely|Newly) available|Limited availability/.test(body),
      )
      .map(({ slug }) => slug);

    expect(missing).toEqual([]);
  });

  // MDX machinery, and expressions the page interpolates, are not content.
  it("leaves no unrendered MDX in any page", () => {
    const leaking = ["docs", "ui"].flatMap((collection) =>
      contentPages(collection)
        .map(({ slug, source }) => ({
          slug: `${collection}/${slug}`,
          body: mdxToMarkdown(source, {
            resolveRegistry,
            resolveMeta,
            registryId: slug,
          }),
        }))
        // Fenced lines are the code being documented; only the rest is markup.
        .map(({ slug, body }) => ({
          slug,
          bad: body
            .split(/```[\s\S]*?```/)
            .join("")
            .match(/^import\s.*\sfrom\s|\{[A-Z_][A-Za-z_.]*\}/m),
        }))
        .filter(({ bad }) => bad)
        .map(({ slug, bad }) => `${slug}: ${bad?.[0]}`),
    );

    expect(leaking).toEqual([]);
  });

  it("renders source and an API table for every UI component page", () => {
    const broken = contentPages("ui")
      .filter(({ source }) => source.includes("<ComponentPlayground"))
      .map(({ slug, source }) => {
        const body = mdxToMarkdown(source, {
          resolveRegistry,
          resolveMeta,
          registryId: slug,
        });
        return {
          slug,
          fenced: body.includes("```"),
          api: body.includes("| Prop | Type | Default | Description |"),
        };
      })
      .filter(({ fenced, api }) => !fenced || !api);

    expect(broken).toEqual([]);
  });
});
