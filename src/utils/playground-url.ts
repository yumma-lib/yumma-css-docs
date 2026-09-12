import type { RegistryMeta, RegistryProp } from "@/registry";
import { isControllable } from "@/utils/props";

/**
 * The playground's configuration as a query string, and back.
 *
 * Only what differs from the schema's own seed is written, so the default
 * configuration has a clean URL and a link only ever carries what someone
 * actually changed. An icon slot holds an element, which a URL cannot, so it
 * travels as the only thing its control offers: whether there is one, and the
 * caller hands over the factory that turns that back into a glyph.
 */

type Values = Record<string, unknown>;

function isIcon(prop: RegistryProp): boolean {
  return Boolean(prop.exampleIcon);
}

/** One prop's value as text, or null when it cannot travel. */
function encode(prop: RegistryProp, value: unknown): string | null {
  if (isIcon(prop) || prop.type === "boolean") {
    return value ? "true" : "false";
  }
  if (prop.type === "number") {
    return typeof value === "number" && Number.isFinite(value)
      ? String(value)
      : null;
  }
  if (prop.type === "enum") {
    return typeof value === "string" && prop.values?.includes(value)
      ? value
      : null;
  }
  return null;
}

/** The changed props as `size=lg&disabled=true`, or "" when nothing differs. */
export function toQuery(
  meta: RegistryMeta,
  values: Values,
  seeded: Values,
): string {
  const params = new URLSearchParams();

  for (const prop of meta.props) {
    if (!isControllable(prop)) continue;

    const now = encode(prop, values[prop.name]);
    if (now === null) continue;
    if (now === encode(prop, seeded[prop.name])) continue;

    params.set(prop.name, now);
  }

  return params.toString();
}

/**
 * The seeded values with a query string applied over them.
 *
 * Anything the schema does not name, or names with a value it does not take,
 * is dropped rather than trusted: the query comes off someone's address bar.
 */
export function fromQuery(
  meta: RegistryMeta,
  query: string,
  seeded: Values,
  icon: (name: string) => unknown,
): Values {
  const values = { ...seeded };
  const params = new URLSearchParams(query);

  for (const prop of meta.props) {
    if (!isControllable(prop)) continue;

    const text = params.get(prop.name);
    if (text === null) continue;

    if (isIcon(prop)) {
      if (text === "true" && prop.exampleIcon) {
        values[prop.name] = icon(prop.exampleIcon);
      } else if (text === "false") {
        delete values[prop.name];
      }
      continue;
    }

    if (prop.type === "boolean") {
      if (text === "true" || text === "false")
        values[prop.name] = text === "true";
      continue;
    }

    if (prop.type === "number") {
      const value = Number(text);
      if (!Number.isFinite(value)) continue;
      if (prop.min !== undefined && value < prop.min) continue;
      if (prop.max !== undefined && value > prop.max) continue;
      values[prop.name] = value;
      continue;
    }

    if (prop.type === "enum" && prop.values?.includes(text)) {
      values[prop.name] = text;
    }
  }

  return values;
}
