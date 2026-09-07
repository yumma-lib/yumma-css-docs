import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contentPages, rootDir } from "./helpers";

/**
 * The link between a Yumma UI doc page and the component it previews is a
 * string id, checked by nobody. A typo in `registryId` makes
 * `<ComponentPreview>` render an empty box - `getRegistryImport` returns null
 * and the Suspense boundary falls through to nothing - so the page still
 * builds and still deploys, just without the component on it.
 */

const indexPath = join(rootDir, "src/registry/index.ts");

const registryIds = new Set(
  [
    ...readFileSync(indexPath, "utf-8").matchAll(
      /^\s*"([^"]+)":\s*\(\)\s*=>\s*import\(/gm,
    ),
  ].map((match) => match[1]),
);

/**
 * The playground takes no id. Its component is the page's own slug, decided by
 * the route so that the stage and the controls in the rail cannot end up on two
 * different components. That makes the page's slug the reference.
 */
const PLAYGROUND = /<ComponentPlayground\b/;

const uiPages = contentPages("ui");

/**
 * In the registry but previewed on no page. Not necessarily wrong - a variant
 * can exist before it is documented - but the set should move deliberately.
 * Wire one up or delete it, then update this list.
 *
 * Empty since the `feat/yumma-ui` merge. All eleven entries it used to hold
 * were deleted outright by the curation pass, not wired up: each was a single
 * enumerable prop the API reference table already states (`select-icon-leading`
 * is `iconPosition`, `collapsible-square` is `shape`), and `select-bordered` was
 * byte-identical to its base. An orphan appearing here again is a real signal
 * now that the baseline is zero.
 */
const KNOWN_UNLISTED: string[] = [
  // Every non-base entry in the registry. A component page is one
  // playground now, so nothing else is previewed anywhere.
  //
  // They stay in the registry rather than being deleted: a `block` here has
  // its own `yummaui add` entry point, and removing the file would break it
  // for anyone already using one. What is gone is only their documentation,
  // which is a deliberate trade for a page that is the component & nothing
  // else. This list is the record of what is undocumented.
  "autocomplete-grouped",
  "autocomplete-helper",
  "autocomplete-icon-leading",
  "autocomplete-icon-trailing",
  "autocomplete-loading",
  "avatar-icon-fallback",
  "avatar-initial-fallback",
  "avatar-stack-compact",
  "combobox-grouped",
  "combobox-helper",
  "field-button",
  "field-password",
  "field-prefix",
  "field-suffix",
  "select-grouped",
  "skeleton-activity",
  "skeleton-filters",
  "skeleton-list",
  "skeleton-stats",
];

function referencedIds(): Set<string> {
  const ids = new Set<string>();

  for (const { slug, source } of uiPages) {
    if (PLAYGROUND.test(source)) ids.add(slug);
  }

  return ids;
}

describe("Yumma UI content", () => {
  // The slug is the only link between a playground page and its component, and
  // nothing checks it at build time: a page whose slug names no registry entry
  // renders an empty stage, and its `.md` loses both the source and the API.
  it("previews only components that exist", () => {
    const broken = uiPages
      .filter(
        ({ slug, source }) => PLAYGROUND.test(source) && !registryIds.has(slug),
      )
      .map(({ slug }) => `${slug}.mdx -> ${slug}`);

    expect(broken).toEqual([]);
  });

  it("has a title and description on every page", () => {
    const incomplete = uiPages
      .filter(({ source }) => {
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatter) return true;
        return (
          !/^title:\s*\S/m.test(frontmatter[1]) ||
          !/^description:\s*\S/m.test(frontmatter[1])
        );
      })
      .map(({ slug }) => slug);

    expect(incomplete).toEqual([]);
  });

  it("tracks which components are not previewed anywhere", () => {
    const referenced = referencedIds();
    const unlisted = [...registryIds]
      .filter((id) => !referenced.has(id))
      .sort();

    expect(
      unlisted,
      "a component became orphaned or was wired up - update KNOWN_UNLISTED",
    ).toEqual(KNOWN_UNLISTED);
  });

  it("finds at least one preview", () => {
    expect(referencedIds().size).toBeGreaterThan(0);
  });

  it("flags a playground page in its own frontmatter", () => {
    // The rail is rendered from the route, the stage from the MDX. The flag is
    // what keeps them in step: without it a page that still shows a static
    // preview would get a rail full of controls that move nothing.
    const mismatched = uiPages
      .filter(({ source }) => {
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
        const flagged = /^playground:\s*true\s*$/m.test(frontmatter?.[1] ?? "");
        return flagged !== PLAYGROUND.test(source);
      })
      .map(({ slug }) => slug);

    expect(mismatched).toEqual([]);
  });

  it("puts a playground only where a schema backs it", () => {
    // A playground on a page the registry has no schema for renders nothing
    // at all, the same silent failure a mistyped `registryId` used to cause.
    const unbacked = uiPages
      .filter(({ source }) => PLAYGROUND.test(source))
      .filter(({ slug }) => !registryIds.has(slug))
      .map(({ slug }) => slug);

    expect(unbacked).toEqual([]);
  });
});
