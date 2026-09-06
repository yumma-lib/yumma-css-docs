/**
 * Which registry files are **blocks** - compositions worth installing - as
 * opposed to **examples**, which only demonstrate a prop.
 *
 * The distinction is the whole point of the registry's consumer surface, and
 * it is editorial rather than mechanical, which is why it is a list and not a
 * heuristic. `autocomplete-lg` is `<Autocomplete size="lg" />`: copying a file
 * for that is exactly the complaint that shadcn's props model answers, so it
 * is an example and the docs point you at `add autocomplete` instead. But
 * `field-password` adds a visibility toggle over Field, and scaffolding that in
 * one command is a real convenience.
 *
 * A block is addressed by its own id (`yummaui add field-password`), never as
 * a flavour of a component. `registryDependencies` already pulls in whatever
 * it is built from.
 *
 * Deriving this from "does the file have state or import more than one
 * component" very nearly works, and was how the initial list was drawn up -
 * but a heuristic silently reclassifies a demo the moment someone refactors
 * it, and whether a composition earns a slot in the CLI is a judgement about
 * usefulness, not about how the file happens to be written.
 */
export const BLOCKS = new Set([
  // Compositions: more than one component, assembled.
  "avatar-edit",
  "avatar-stacked",
  "button-group",
  "button-group-icon",
  "button-group-pill",
  "button-group-pill-label",
  "checkbox-group-label",
  "field-button",

  // Recipes carrying real logic, not just assembly.
  "autocomplete-loading",
  "checkbox-group-nested-parent",
  "checkbox-parent",
  "field-password",
  "toggle-group",
]);

export function isBlock(id) {
  return BLOCKS.has(id);
}
