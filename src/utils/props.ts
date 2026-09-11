import type { RegistryProp } from "@/registry";

/** Prop type for display; `typeName` overrides when `type` is only `none`. */
export function typeOf(prop: RegistryProp): string {
  if (prop.typeName) return prop.typeName;
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

/** Enums, booleans, numbers and icon slots. Strings are documented, not
 * driven, and a controlled prop needs its handler named to be either. */
export function isControllable(prop: RegistryProp): boolean {
  if (prop.controlled && !prop.handler) return false;
  if (prop.exampleIcon) return true;
  return (
    prop.type === "enum" || prop.type === "boolean" || prop.type === "number"
  );
}

/**
 * Why a prop is inert under the values on screen, or null if it is not.
 *
 * An absent value counts as the component's own default, so `separated` reads
 * as inert on `variant: "ghost"` whether or not the default was seeded.
 */
export function isInert(
  prop: RegistryProp,
  values: Record<string, unknown>,
  props: RegistryProp[],
): string | null {
  for (const rule of prop.conflictsWith ?? []) {
    const other = props.find((entry) => entry.name === rule.prop);
    const actual = values[rule.prop] ?? other?.default;

    // An icon slot holds an element, not `true`, so presence is its own form.
    if ("set" in rule && Boolean(actual) === rule.set) {
      return `${rule.prop} is ${rule.set ? "set" : "not set"}`;
    }
    if ("is" in rule && actual === rule.is) {
      return `${rule.prop} is ${String(rule.is)}`;
    }
    if ("not" in rule && actual !== rule.not) {
      return `${rule.prop} is not ${String(rule.not)}`;
    }
  }
  return null;
}
