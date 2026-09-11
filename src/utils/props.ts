import type { RegistryProp } from "@/registry";

/** Prop type for display; `typeName` overrides when `type` is only `none`. */
export function typeOf(prop: RegistryProp): string {
  if (prop.typeName) return prop.typeName;
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

/** Enums, booleans, and icon slots only - not strings/numbers, and never a
 * prop the component expects a handler alongside. */
export function isControllable(prop: RegistryProp): boolean {
  if (prop.controlled) return false;
  if (prop.exampleIcon) return true;
  return prop.type === "enum" || prop.type === "boolean";
}
