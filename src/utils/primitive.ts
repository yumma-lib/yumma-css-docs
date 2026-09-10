import { allUis } from "content-collections";
import { getRegistryTarget } from "@/registry";

/**
 * The Base UI primitive a component page is built on, or null.
 *
 * `primitive: true` in the page's frontmatter means "same name as the
 * component"; a string names a different one. Shared so the tab bar and the
 * code block cannot disagree about whether a page has one.
 */
export function pageSlug(pathname: string) {
  return pathname
    .replace(/^\/ui\/components\//, "")
    .replace(/^\/ui\//, "")
    .replace(/\/$/, "");
}

export function primitiveSlug(slug: string, installId?: string) {
  const primitive = allUis.find((ui) => ui._meta.path === slug)?.primitive;
  if (!primitive) return null;

  return typeof primitive === "string"
    ? primitive
    : getRegistryTarget(installId ?? slug).component;
}
