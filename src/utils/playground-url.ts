import { parseAsBoolean, parseAsInteger, parseAsStringLiteral } from "nuqs";
import type { RegistryMeta, RegistryProp } from "@/registry";
import { isControllable } from "@/utils/props";

/**
 * The playground's configuration as nuqs parsers, one per controllable prop.
 *
 * Each parser carries the schema's own seed as its default, and nuqs drops a
 * parameter that matches its default, so a page nobody has touched keeps a
 * clean address and a link carries only what someone changed. An icon slot
 * holds an element, which a URL cannot, so it travels as the only thing its
 * control offers: whether there is one.
 */

type Values = Record<string, unknown>;

/** The parser for one prop, or null when its value cannot travel in a URL. */
function parserFor(prop: RegistryProp, seeded: unknown) {
  if (prop.exampleIcon || prop.optional) {
    return parseAsBoolean.withDefault(Boolean(seeded));
  }
  if (prop.type === "boolean") {
    return parseAsBoolean.withDefault(Boolean(seeded));
  }
  // A default is whatever the page opens on, which is the seed and not the
  // documented default: a prop the seed leaves out has nothing to rest on, and
  // nuqs then keeps it out of the URL rather than inventing a value for it.
  if (prop.type === "number") {
    return typeof seeded === "number"
      ? parseAsInteger.withDefault(seeded)
      : parseAsInteger;
  }
  if (prop.type === "enum" && prop.values?.length) {
    const values = prop.values as [string, ...string[]];
    const parser = parseAsStringLiteral(values);
    return values.includes(seeded as string)
      ? parser.withDefault(seeded as string)
      : parser;
  }
  return null;
}

export type PlaygroundParser = NonNullable<ReturnType<typeof parserFor>>;

export type PlaygroundKeyMap = Record<string, PlaygroundParser>;

/** Every controllable prop of a schema, as parsers keyed by prop name. */
export function keyMapFor(
  meta: RegistryMeta,
  seeded: Values,
): PlaygroundKeyMap {
  const map: PlaygroundKeyMap = {};

  for (const prop of meta.props) {
    if (!isControllable(prop)) continue;
    const parser = parserFor(prop, seeded[prop.name]);
    if (parser) map[prop.name] = parser;
  }

  return map;
}

/**
 * The seeded values with the parsed query applied over them.
 *
 * nuqs has already rejected anything the parsers do not take, so what arrives
 * here is a value the schema names or the seed it fell back to.
 */
export function applyQuery(
  meta: RegistryMeta,
  query: Values,
  seeded: Values,
  icon: (name: string) => unknown,
): Values {
  const values = { ...seeded };

  for (const prop of meta.props) {
    if (!(prop.name in query)) continue;
    const value = query[prop.name];

    if (prop.exampleIcon) {
      if (value) values[prop.name] = icon(prop.exampleIcon);
      else delete values[prop.name];
      continue;
    }

    if (prop.optional) {
      values[prop.name] = value ? prop.example : "";
      continue;
    }

    // A parser with no default reports null when the URL says nothing.
    if (value !== null) values[prop.name] = value;
  }

  return values;
}

/**
 * What the query has to say for a value bag, with icons back down to a flag.
 *
 * A prop the bag has nothing for is left out rather than sent as `undefined`,
 * so its parser keeps the default it was built with.
 */
export function queryFor(
  meta: RegistryMeta,
  values: Values,
): Record<string, string | number | boolean> {
  const query: Record<string, string | number | boolean> = {};

  for (const prop of meta.props) {
    if (!isControllable(prop)) continue;

    if (prop.exampleIcon || prop.optional || prop.type === "boolean") {
      query[prop.name] = Boolean(values[prop.name]);
      continue;
    }

    const value = values[prop.name];
    if (typeof value === "string" || typeof value === "number") {
      query[prop.name] = value;
    }
  }

  return query;
}
