import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RegistryMeta } from "@/registry";
import { applyQuery, keyMapFor, queryFor } from "@/utils/playground-url";
import { isControllable } from "@/utils/props";
import { rootDir } from "./helpers";

/**
 * nuqs owns the address bar; what is checked here is the schema half. Every
 * controllable prop has to get a parser, that parser has to default to the
 * value the page opens on, and a value has to survive the trip out to the
 * query and back.
 *
 * The seed is passed in rather than computed, the way the provider passes it,
 * so these stay pure functions with nothing rendered.
 */

type Values = Record<string, unknown>;

const GLYPH = { glyph: true };
const icon = () => GLYPH;

const metaDir = join(rootDir, "src/registry/meta");

const schemas = readdirSync(metaDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => ({
    id: file.replace(/\.json$/, ""),
    meta: JSON.parse(readFileSync(join(metaDir, file), "utf8")) as RegistryMeta,
  }));

/** What a page opens on: every documented default, and a glyph in every slot. */
function seed(meta: RegistryMeta): Values {
  const values: Values = {};

  for (const prop of meta.props) {
    if (prop.example === null) continue;
    if (prop.controlled && !prop.handler) continue;
    if (prop.exampleIcon) {
      values[prop.name] = GLYPH;
      continue;
    }
    if (prop.default !== undefined) values[prop.name] = prop.default;
  }

  return values;
}

/** A value each controllable prop can take that is not the one it starts on. */
function changed(meta: RegistryMeta): Values {
  const values = { ...seed(meta) };

  for (const prop of meta.props) {
    if (!isControllable(prop)) continue;

    if (prop.exampleIcon) {
      if (values[prop.name]) delete values[prop.name];
      else values[prop.name] = GLYPH;
    } else if (prop.type === "boolean") {
      values[prop.name] = !values[prop.name];
    } else if (prop.type === "number") {
      const base =
        typeof values[prop.name] === "number" ? values[prop.name] : 0;
      values[prop.name] = (base as number) + (prop.step ?? 1);
    } else if (prop.type === "enum" && prop.values) {
      const other = prop.values.find((value) => value !== values[prop.name]);
      if (other) values[prop.name] = other;
    }
  }

  return values;
}

describe("playground url", () => {
  it("covers every component", () => {
    expect(schemas.length).toBeGreaterThan(35);
  });

  it("gives every controllable prop a parser", () => {
    const missing: string[] = [];

    for (const { id, meta } of schemas) {
      const keyMap = keyMapFor(meta, seed(meta));
      for (const prop of meta.props) {
        if (!isControllable(prop)) continue;
        if (!(prop.name in keyMap)) missing.push(`${id}:${prop.name}`);
      }
    }

    expect(missing).toEqual([]);
  });

  /** nuqs drops a parameter that equals its default, so this is the clean URL. */
  it("defaults every parser to the value the page opens on", () => {
    const wrong: string[] = [];

    for (const { id, meta } of schemas) {
      const seeded = seed(meta);
      const keyMap = keyMapFor(meta, seeded);
      const wanted = queryFor(meta, seeded);

      for (const [name, parser] of Object.entries(keyMap)) {
        const fallback =
          "defaultValue" in parser ? parser.defaultValue : undefined;

        if (fallback !== wanted[name]) {
          wrong.push(
            `${id}:${name}  ${String(fallback)} != ${String(wanted[name])}`,
          );
        }
      }
    }

    expect(wrong).toEqual([]);
  });

  it("round-trips every changed value", () => {
    const lost: string[] = [];

    for (const { id, meta } of schemas) {
      const wanted = changed(meta);
      const back = applyQuery(meta, queryFor(meta, wanted), seed(meta), icon);

      for (const prop of meta.props) {
        if (!isControllable(prop)) continue;
        // An icon is an element either side; only its presence travels.
        const before = prop.exampleIcon
          ? Boolean(wanted[prop.name])
          : wanted[prop.name];
        const after = prop.exampleIcon
          ? Boolean(back[prop.name])
          : back[prop.name];

        if (before !== after) {
          lost.push(
            `${id}:${prop.name}  ${String(before)} -> ${String(after)}`,
          );
        }
      }
    }

    expect(lost).toEqual([]);
  });

  it("takes only what a parser accepts", () => {
    for (const { meta } of schemas) {
      const keyMap = keyMapFor(meta, seed(meta));

      for (const [name, parser] of Object.entries(keyMap)) {
        const prop = meta.props.find((entry) => entry.name === name);
        if (prop?.type !== "enum" || !prop.values) continue;

        expect(parser.parse("nothing-a-schema-names")).toBeNull();
        expect(parser.parse(prop.values[0])).toEqual(prop.values[0]);
      }
    }
  });

  it("leaves a prop the values say nothing about to its default", () => {
    for (const { meta } of schemas) {
      const query = queryFor(meta, {});

      for (const prop of meta.props) {
        if (!isControllable(prop)) continue;
        if (prop.exampleIcon || prop.type === "boolean") {
          expect(query[prop.name]).toBe(false);
        } else {
          expect(prop.name in query).toBe(false);
        }
      }
    }
  });
});
