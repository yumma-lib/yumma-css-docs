import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { rootDir } from "./helpers";

/**
 * The mechanical half of the content model in AGENTS.md. The examples are one
 * world, a person looking after their own files and settings, and the words
 * below are the ones that give away the world it used to be.
 *
 * This reads the examples, not the prose: a schema is free to *describe* a
 * prop with any word it needs.
 */

const ORG =
  /\b(?:teams?|members?|invitations?|invites?|invited|sprints?|invoices?|subscriptions?|billing|collaborat\w*|assignees?|reassign\w*|workspaces?|onboard(?:ing)? your team)\b/i;

/** Components whose whole subject is a person, so a person belongs in them. */
const PEOPLE = new Set(["avatar", "avatar-stack", "preview-card"]);

const metaDir = join(rootDir, "src/registry/meta");
const uiDir = join(rootDir, "src/registry/ui");

const schemas = readdirSync(metaDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => ({
    id: file.replace(/\.json$/, ""),
    meta: JSON.parse(readFileSync(join(metaDir, file), "utf8")),
  }));

/** Every string inside a value, however deeply it is nested. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (typeof value === "object" && value !== null) {
    return Object.values(value).flatMap(strings);
  }
  return [];
}

/** The example content of one schema: prop examples, children, the summary. */
function examples(meta: {
  props?: { name: string; example?: unknown }[];
  children?: unknown;
  childrenExample?: unknown;
}): { where: string; text: string }[] {
  const out: { where: string; text: string }[] = [];

  for (const prop of meta.props ?? []) {
    for (const text of strings(prop.example)) {
      out.push({ where: prop.name, text });
    }
  }
  for (const text of strings(meta.children))
    out.push({ where: "children", text });
  for (const text of strings(meta.childrenExample)) {
    out.push({ where: "childrenExample", text });
  }

  return out;
}

describe("content model", () => {
  it("has examples to read", () => {
    const total = schemas.reduce(
      (count, { meta }) => count + examples(meta).length,
      0,
    );
    expect(total).toBeGreaterThan(150);
  });

  it("keeps the examples out of an organisation", () => {
    const found: string[] = [];

    for (const { id, meta } of schemas) {
      for (const { where, text } of examples(meta)) {
        const match = text.match(ORG);
        if (match) found.push(`${id}:${where}  ->  "${match[0]}"`);
      }
    }

    expect(found).toEqual([]);
  });

  it("keeps people to the components that are about people", () => {
    const found: string[] = [];

    for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
      const id = file.replace(/\.tsx$/, "");
      if (
        PEOPLE.has(id) ||
        [...PEOPLE].some((one) => id.startsWith(`${one}-`))
      ) {
        continue;
      }

      const source = readFileSync(join(uiDir, file), "utf8");
      if (source.includes("dicebear")) found.push(file);
    }

    for (const { id, meta } of schemas) {
      if (PEOPLE.has(id)) continue;
      for (const { where, text } of examples(meta)) {
        if (text.includes("dicebear")) found.push(`${id}:${where}`);
      }
    }

    expect(found).toEqual([]);
  });

  /** Every glyph an example names has to be one the preview can resolve. */
  it("names icons the demo can render", () => {
    const known = new Set(
      readFileSync(join(rootDir, "src/utils/demo.tsx"), "utf8")
        .split("EXAMPLE_ICONS")[1]
        ?.split("};")[0]
        ?.match(/^\s{2}([A-Z][A-Za-z0-9]*),$/gm)
        ?.map((line) => line.trim().replace(",", "")) ?? [],
    );

    expect(known.size).toBeGreaterThan(15);

    const missing: string[] = [];
    for (const { id, meta } of schemas) {
      const named = JSON.stringify(meta).matchAll(/"\$icon":\s*"([^"]+)"/g);
      for (const [, name] of named) {
        if (!known.has(name)) missing.push(`${id}  ->  ${name}`);
      }
    }

    expect(missing).toEqual([]);
  });
});
