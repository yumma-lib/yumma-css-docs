/**
 * Files under `src/registry/ui/` that are **utilities**, not components: no
 * default export to render, no props to document, no page of their own.
 *
 * They are still published, because a component that imports one needs it to
 * arrive with it - `registryDependencies` already handles that. They are kept
 * out of `index.json` so `yummaui add ym` is not a thing you do; you get it
 * because something you added needs it.
 *
 * A list rather than a heuristic, for the same reason `BLOCKS` is one.
 */
export const UTILS = new Set(["merge-map", "ym"]);

export function isUtil(id) {
  return UTILS.has(id);
}
