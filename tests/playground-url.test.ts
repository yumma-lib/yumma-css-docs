import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RegistryMeta } from "@/registry";
import { fromQuery, toQuery } from "@/utils/playground-url";
import { isControllable } from "@/utils/props";
import { rootDir } from "./helpers";

/**
 * The query is a link someone pastes, so both directions are checked against
 * every real schema: what it writes has to come back as the same values, and
 * what it reads has to survive an address bar that says anything at all.
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
      const next = (base as number) + (prop.step ?? 1);
      values[prop.name] =
        prop.max !== undefined && next > prop.max ? base : next;
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

  it("writes nothing for the configuration a page opens on", () => {
    const noisy = schemas
      .map(({ id, meta }) => ({
        id,
        query: toQuery(meta, seed(meta), seed(meta)),
      }))
      .filter(({ query }) => query !== "")
      .map(({ id, query }) => `${id}  ->  "${query}"`);

    expect(noisy).toEqual([]);
  });

  it("round-trips every changed value", () => {
    const lost: string[] = [];

    for (const { id, meta } of schemas) {
      const wanted = changed(meta);
      const back = fromQuery(
        meta,
        toQuery(meta, wanted, seed(meta)),
        seed(meta),
        icon,
      );

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

  it("ignores a query that says anything it likes", () => {
    for (const { meta } of schemas) {
      const junk =
        "size=../../etc&disabled=maybe&__proto__=polluted&unknown=1&shape=%00&max=NaN";

      expect(fromQuery(meta, junk, seed(meta), icon)).toEqual(seed(meta));
    }

    expect(Object.hasOwn({}, "polluted")).toBe(false);
  });

  it("takes an out-of-range number back to the seed", () => {
    const bounded = schemas.find(({ meta }) =>
      meta.props.some(
        (prop) =>
          isControllable(prop) &&
          prop.type === "number" &&
          prop.max !== undefined,
      ),
    );
    expect(bounded).toBeDefined();
    if (!bounded) return;

    const prop = bounded.meta.props.find(
      (entry) =>
        isControllable(entry) &&
        entry.type === "number" &&
        entry.max !== undefined,
    );
    if (!prop?.max) return;

    const values = fromQuery(
      bounded.meta,
      `${prop.name}=${prop.max + 1000}`,
      seed(bounded.meta),
      icon,
    );

    expect(values[prop.name]).toEqual(seed(bounded.meta)[prop.name]);
  });
});
