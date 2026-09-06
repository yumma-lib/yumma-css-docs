# Working notes

Operational backlog, standing conventions, and the traps that have cost real
time. **Not a session log.** Design decisions go in
`src/content/blog/yummacss-4.0.0.mdx`; shipped work goes in the monorepo
`CHANGELOG.md`; live API bugs go in `TODO.md`.

**`TODO.md` is Cursor's lane, not this one.** It holds small per-component API
fixes that Renildo is having Cursor work through. Do not pick items out of it
and do not fix them in passing; if something in this file overlaps, say so and
leave it.

Pruned 2026-08-28 from 2987 lines to this. **The rule that produced the cut:
an entry earns its place if it changes what someone does next.** A narrative
of work that is finished does not. If you close something in here, delete the
entry rather than striking it through, and do not add a "what shipped today"
section.

One meta-note worth keeping: clearing chats is not what costs tokens. A fresh
session re-derives from this file cheaply **if the reading is surgical**. Keep
clearing; keep this file short.

---

## Where things stand

| repo | branch | state |
| --- | --- | --- |
| `docs` | `main` | still on `3.30.0` |
| `docs` | `normalize-source` | **13 unmerged commits**, and the base for Phase 5 |
| `play` | `main` | `45f1584`. Dependabot merged, and on `3.30.0` |
| `yummacss` | `main` | `3.31.0` released and published, with `yummacss/merge` |
| `yummacss` | `merge-perf` | **1 unmerged commit**: the 14x merge speedup, `3.31.1` |
| `yummacss` | `v4` | 4 ahead of `main`: colon-syntax parsing, fixtures migrated |
| `ui` | `main` | **published, `yummaui@0.2.1`**, with `prune` |

Published: `@yummacss/*` at `3.31.0`, `yummaui` at `0.2.1`. There are eight
packages, not nine; `language-server` was deleted with the extensions.

**`docs#150` merged at the branch's third commit** and the other 13 were pushed
after, with no open PR left to carry them. That is the merge-timing trap below,
for the third time. The `3.31.0` bump, the phase renumbering and
`tests/merge-safety.test.ts` are all in those 13, so anything reading this file
has to branch off `normalize-source`, not `main`, until they land.

**`3.31.1` is prepared but not published.** `packages/cli/package.json` says
`3.31.1`; npm's latest is `3.31.0`, which is the merge that scans all 217
prefixes per class. `docs` runs on the slow one until `merge-perf` merges and
ships.

`ui` is a **separate repo** (`github.com/yummacss/ui`). The folder and repo are
`ui`; the **published npm package is `yummaui`**, because `ui` is taken. Do not
"fix" that mismatch.

---

## How to work this file

**One phase per chat session.** Phases are ordered so that finishing one makes
the next cheaper or safer; do not start two at once. Within a phase the items
are already in the order to do them.

**Starting a session.** Paste this:

> Working on yummacss/docs. Read NOTES.md first, then start Phase N.

Replace N with the first phase that is not marked done. That is the whole
message; everything else is in this file on purpose.

**Ending a session.** Say "Time to clear session. Wrap up everything in
NOTES.md." The wrap-up rewrites the phase's entry with what actually happened,
deletes what is finished, and hands back the one-line starter for the next
session. Clear only after that lands.

**How work lands. Pull requests, never a direct commit.** Renildo previews and
approves. Branch names are short and made of real words - `fix-scanner`,
`notes`, `fix-layout` - with no generated suffixes.

**Write short everywhere except this file.** CHANGELOG entries, PR bodies and
code comments are one to three lines; one sentence on what changed and why is
the target, and eighty lines is not. **This file is the exception** - it is the
only place detail is meant to accumulate, because it is what survives a cleared
chat. A PR or a comment restating it duplicates something that will drift.
Twelve-line block comments explaining a file's history are this rule being
broken; the history goes here. **Cut every clause that explains rather than
states.** "Yumma utilities are single-class selectors. Stylesheet order wins
over `className`. Merge drops the losing class." replaces three sentences of
reasoning and loses nothing. **Never name another framework** to explain a
Yumma decision. **No em dashes.** **No "Generated with Claude Code" footer** in a
PR body, commit or comment - the `Co-Authored-By` trailer already says it, and
saying it twice reads like a signature on someone else's work.

**NOTES.md is the source of truth, and it is only worth credits if it is
never wrong.** Every change to any of the four repos updates it in the same
commit - not just the interesting ones. A stale entry has now cost real time
three times: `ui/customization.mdx` described sections that no longer existed,
the `.md` entry named three `.tsx` files that never existed, and the `className`
entry sent someone hunting a string that was not there. **Before acting on an
entry, check the file it describes**; if it is wrong, fix the entry as part of
the work rather than working around it.

**TODO.md is now yours, not Cursor's.** The old "leave it alone" rule is
dead - Renildo moved it over. It is a bug and API-wish list in his words, not a
plan: verify each item against the code before acting, because several are
symptoms rather than causes (see the separator entry below).

**Document the change in the same commit that makes it.** A new command, flag,
script or convention gets its entry here as it lands, not later - a cleared
chat takes the reasoning with it, and the code alone never says why. `pnpm
release` and `yummaui prune` are the shape: what it does, what it refuses, and
the one thing that would break it if someone reimplemented it.

**The rule for what goes in here** has not changed: an entry earns its place if
it changes what someone does next. Delete finished entries rather than striking
them through.

---

## The plan, in phases

Status: **Phases 1, 2, 3, most of 4 and most of 5 are done.** `3.31.0` is
published and the `docs` bump to it is on `normalize-source`. `yummaui` is
published at `0.2.1` with `prune`. Phase 4 has three items left. **Phase 5 has
one**: the shorthand table misses physical longhands, and that fix lives in
`yummacss` and needs a release.

| # | Phase | Repos | Why it sits here |
| --- | --- | --- | --- |
| 1 | Fix the class scanner | `yummacss`, `docs` | Done. |
| 2 | Fix negative values | `yummacss` | Done. 72 utilities emitted CSS the parser threw away. |
| 3 | Yumma UI: `prune` | `ui` | Done. The one thing a real user said she would use. |
| 4 | Docs debt | `docs` | Nearly done. The corpus the 4.0 codemod runs against first. |
| **5** | **Class merge (`yummacss/merge`)** | `yummacss`, `ui`, `docs` | **The documented limitation, and the deal-breaker. Shipped and in use.** |
| 6 | Yumma UI API | `docs`, `ui` | Collapse blocks into components, then work `TODO.md`. Gated on 5: half the fixes are override bugs. |
| 7 | One breaking registry release | `docs`, `ui` | `/ui/registry`, `registryDeps`, no `blocks` key, OTP field. Ship together or churn twice. |
| 8 | Retire `@yummacss/intellisense` | `yummacss`, `play` | Frees `play` and closes most of the `any` item. Independent of everything. |
| 9 | v4 decisions | none, design only | These gate the codemod and the canon list. Decide before building. |
| 9b | Pre-v4 audit | all | Split: the API half gates the build, the cleanup half is genuinely last. |
| 10 | v4 build | all | The codemod, the canon list, the migration. Gated on 9. |

**`TODO.md` is a phase now** - Phase 6 - and it is yours, not Cursor's. It is a
bug and API-wish list in Renildo's words, not a plan: verify each item against
the code first. Several are symptoms, not causes.

---

### Phase 1 - Fix the class scanner

**Done except the last step, which is now unblocked.**

The tokenizer is rewritten as a lexer in `yummacss` on `fix-scanner`
(PR #11, `d32bc57`), with 16 regression tests in
`tests/tokenizer.test.ts`; five of them fail against the old tokenizer. Root
cause and the measurements are in the Traps section.

Against the real 331-file docs source: 1579 tokens before of which 971
generated nothing, 1262 after of which 588 do. Nine classes are no longer
found and **all nine are in comments and JSDoc discussing classes**, none in
any className on the site. 75 previously-dropped classes are now found.

- [x] **`3.30.0` is published**, after a new `NPM_TOKEN`; see the trap.
      **Publishing is automated - never run `pnpm publish-packages` by hand.**
      `.github/workflows/publish.yml` fires on a **published GitHub Release**,
      then installs, builds, tests and runs `pnpm -r publish --no-git-checks`
      with npm provenance. So the whole release is: merge to `main`,
      `pnpm release`, press Publish.
- [x] **Minor, not a patch:** `tokenizer()` gained an optional `filename`
      parameter, and the fix removes CSS that used to be generated - a patch
      must not change how a page renders, and this can. (A third reason applied
      until `migrate` was unwired: `main` was carrying it as an unreleased
      feature.)
- [x] **`yummacss migrate` is unwired from the CLI, not merely undocumented.**
      It rewrites classes into the v4 colon syntax and **v3 cannot compile what
      it writes** - verified: `d-f` generates, `d:f` generates nothing, same for
      `bg:red-1` and `m:4`. Shipping it reachable would hand users a command
      that silently unstyles their project. The import, the `case "migrate"`
      and the help line are removed from `packages/cli/src/cli.ts`, with a
      comment saying why; `commands/migrate.ts`, the services and all 152 lines
      of `tests/migrate.test.ts` stay, because the tests import the services
      directly. **Re-wire it when v4 lands** - that is the whole change.
      Confirmed against the built binary: `yummacss migrate` falls through to
      the help text.
- [x] **Done.** `docs/yumma.config.mjs` now has one glob and no `safelist`.
      **Verified by building the site three times and diffing the emitted
      selectors**: 3.29.2, then 3.30.0, then 3.30.0 with the config collapsed -
      516 selectors and 25,776 bytes every time, zero lost, zero gained. The
      pipeline was proved live first by narrowing `source` to a single file,
      which dropped the CSS to 5,312 bytes. The original instruction, for the
      record: replace the five
      enumerated `source` entries with the single glob
      `"./src/**/*.{ts,tsx,mdx,mjs}"`, and delete `safelist` entirely.
      **Measured:** the enumerated list reaches 330 files and 1167 classes, the
      broad glob 363 and 1262, and **it loses nothing** - every class the list
      finds, the glob finds. It also picks up `mx--4`, `d-i` and
      `bc-accent-dim/50` from `src/lib`, which is precisely why they were
      safelisted. The 91 extra tokens it collects are registry ids, page slugs
      and package names, none of which match a utility prefix, so they generate
      no CSS. **Enumerating directories is what created this bug**: `src/lib`
      was left out by accident and nothing said so. One glob cannot be
      accidentally narrow. The config carries this as a comment so it is not
      lost.
- [ ] `ro-90` is already gone: zero occurrences anywhere in `src` under either
      tokenizer, so it was only ever generating dead CSS.

### Phase 2 - Fix negative values

**Done.** On `fix-scanner` (`e93c8bb`), shipping in `3.30.0` alongside Phase 1,
so both land in one release. 31 regression tests in `tests/negative.test.ts`,
150 in the suite, build green.

It was two defects sharing one line of code. A leading `-` was applied to any
utility whose value started with a digit with no notion of whether the property
accepts one, so **72 utilities emitted CSS the parser discards** (`w--1` was
`width: -.25rem`). And `negateValue` returned the value unchanged when there was
no number in it, so the `-` was simply **ignored**: `m--auto` resolved to
`margin: auto` and `bg--red-1` to the same declaration as `bg-red-1`. Every
keyword and colour utility had a silent second spelling.

One rule fixed both: a leading `-` is meaningful only where the property accepts
a negative **and** the value is a number to negate. Anything else resolves to no
class.

Three things worth keeping:

- **Legality is keyed on the CSS property, not the utility** -
  `core`'s `acceptsNegative` in `helpers/negatable.ts`. A property is a fact
  about CSS, so a new utility mapping onto `margin-inline` inherits the right
  answer instead of needing someone to remember a flag. **Do not convert this
  to a per-utility boolean.**
- **Canon needed no change.** `validateClasses` resolves through the same
  `generateCSSRule`, so it reports these as unknown for free. There is a test
  asserting that, because the shared path is the only thing holding it.
- **Two that look like bugs and are not**, both covered by tests so nobody
  "fixes" them: negative grid line numbers are legal (`gcs--1` counts back from
  the end of the explicit grid), and negative `scale` mirrors. Also
  `letter-spacing`'s scale is *already* negative, so `ls--1` correctly yields a
  positive `.05em`, and transforms put the sign inside the parens
  (`transform: skew(-1deg)`) - a naive "output contains a leading minus"
  assertion fails on both.

Checked before shipping: `docs`, `ui` and `play` write 19 negative classes
between them and **every one still generates**.

### Phase 3 - Yumma UI: `prune`

**Decided 2026-08-28, after a real user's reaction.** She was shown
`add button --variant pill` and `add button-pill`, said neither made sense, and
said what she actually wanted was a way to delete what she was not using. That
is the signal worth acting on.

**Addressing stays exactly as it is.** `--variant` is gone from `cli.ts`
(replaced by `-a, --all`), and `add.ts` resolves a name against
`index.components[].component` **and** `index.blocks[].id`, so
`yummaui add button-group-pill` works directly. No component carries a
`variants` array any more: 36 components, 25 blocks, blocks addressed by flat
id. **Do not re-propose a `--variant` flag** - the thing it was for is served by
making the id addressable.

- [x] **`yummaui prune` is built.** `src/prune.ts` is the graph, `commands/prune.ts`
      the shell, 16 tests in `src/prune.test.ts`. Reachability from outside
      `componentsDir`, as specified. `prune` lists; `prune --write` deletes after
      a confirmation; `-y` skips it.
- [x] **One refinement on the spec: `componentsDir` is the candidate set,
      narrowed by the registry index.** Only a file `add` could have written -
      an installable name, `.tsx`, directly in `componentsDir` - is ever
      deletable, so a project's own component in that folder is never touched.
      This does not reintroduce a manifest, it only narrows, and it costs one
      index fetch that `add` and `list` already make.
- [x] **Anything kept is a root**, including those non-candidate files. Without
      that, a project's own `components/ui/my-card.tsx` importing `./button`
      would have `button` deleted out from under it. The surviving set has to be
      closed under its own imports.
- [x] **Verified end-to-end**, not only in unit tests: served the real registry
      out of `docs/public/ui/r`, ran `add button tooltip dialog-sign-in`, which
      wrote 6 files, then `prune` with only `button` imported. It named all five
      others, including `dialog`, `checkbox` and `field` - pulled in *by*
      `dialog-sign-in`, and unreachable once the block is. Re-importing the block
      dropped the list back to `tooltip` alone. After `--write`, zero dangling
      imports.
- [x] Worth knowing it is safer than the alternative: the workflow it replaces is
      "delete the unused ones with AI", whose failure mode is deleting a file
      that *is* used, silently, until a build breaks.
- [x] **Released**, as `0.2.0` then `0.2.1`. **Both times the merge took the
      branch one commit behind the last push**, so the refactor missed `0.2.0`
      and the version bump missed `0.2.1`, and both had to be redone by hand.
      **Push everything before calling a PR ready**; never trail a
      `chore: prepare` commit after saying so.
- [x] **`ui/cli.mdx` written**, under `ui > Get Started` between installation
      and customization. Every command, every flag, `yummaui.json` field by
      field, and the registry URLs. Sourced from `cli.ts`'s own help text and
      `README.md` at `0.2.1`, not from memory.
      **`<Hint icon="...">` is the callout, not `<Admonition>`** - 26 uses
      against 0, even though both are registered in `mdx-components.tsx`.
      Icons in use: `info`, `heart`, `warning`, `cursor`, `keyboard`.
- [ ] **A runtime-built specifier - `import(\`./${name}\`)` - cannot be resolved
      statically**, so `prune` counts those files and says so rather than
      guessing. If someone reports a wrongly-deleted file, look there first.

**Decided: the block/component split is going away.** Renildo's read is that
these are all just components with a different anatomy, and the test that
matters is **does it add API surface, or only arrange existing surface**. By
that test ~18 of the blocks are components nobody has written yet (four
`button-group`s are one `ButtonGroup` with props) and the dialogs are page
templates. **19 variants are deleted** - the 5 remaining
dialogs, the project-management demo scattered across 9 entries (`Acme
Website`, `Sprint points`, `Dashboard Redesign`), `button-favorite` (11 lines
of ghost button), and both colour pickers. **84 files down to 65, blocks 25 to
13.** Five components now have no variants at all: dialog, preview-card,
onboarding, rating, toolbar - their pages are the playground and the prop
table, which for dialog and preview-card is the right answer and for
onboarding is worth a look. **Two mechanical consequences before collapsing
the rest**: `--all` excludes blocks on purpose (each pulls its parents, so
`--all` would write `dialog` seven times), and `index.json`'s `blocks` key is
part of the published contract, so it moves in the same release as the
`registryDeps` rename.

**Old context, still true if it is revisited:** What is known if it is revisited: **only 10 of 36 components have
blocks** (dialog 7, button 4, checkbox 3, then 1-2 each), and the cost of an
unused block is **lines you own, not CSS** - dialog goes 246 to 643 lines with
all 7, while the CSS grows only 2733B to 3409B, because blocks reuse the same
utilities. The whole 84-file registry is 14KB of CSS. **The CSS argument against
blocks does not hold; the ownership argument does.**

**Polish, after `prune`. `yummaui` is published at `0.1.0`, so none of this
blocks a release.**

- [ ] Badge's icon wrapper sets `w-3 h-3`/`w-4 h-4` on a `<span>`, which does not
      constrain the SVG inside it. Harmless, but a lie in the code. Check
      Meter's `w-8 h-8` wrapper at the same time.
- [ ] A line on each page saying which file a code block belongs to. The base
      snippet's `@/components/ui/button` and the variant source's `./button` are
      both correct and look like drift. **`./` is load-bearing**:
      `generate-registry-json.mjs` builds `registryDependencies` by matching
      `from "./<id>"`, so rewriting it to the alias breaks
      `yummaui add <variant>` pulling its component.
- [ ] Seed an icon into the Badge, Separator, Meter and Tabs base demos. Each has
      an `icon` prop no demo passes, so the feature is invisible outside the
      table. Separator is the one that matters: an icon breaks the rule in half
      and centres the glyph in the gap, which is a spatial fact a type cannot
      state.

### Phase 4 - Docs debt

- [x] **Done: the 12 undocumented utilities are listed.** Re-measured against
      `3.30.0` before touching anything and the count held exactly - 239 core
      utilities, 227 referenced, 12 missing, all logical border properties.
      8 radius corners went on `border-radius.mdx` and 4 widths on
      `border-width.mdx`, alphabetically, matching the pages' existing shape.
      Verified in Chromium that each new section renders a real table rather
      than the empty one `<Reference>` falls through to on a bad name.
- [x] **`tests/reference.test.ts` is what stops this recurring.** Two
      assertions: every core utility appears in some `<Reference>`, and every
      `<Reference>` names a utility that exists. **Both were checked to bite** -
      deleting an entry fails the first, misspelling one fails both. This is the
      real deliverable; the 12 entries are a one-off, the test is not.
- [x] **`pnpm lint` is clean.** 9 errors and 8 warnings to zero, and the 17
      findings were four different problems, not one:
      **Dead code (5).** Unused imports in `navbar.tsx`, `token-block.tsx` and
      `toc.tsx`. Biome's own fix renamed `toc.tsx`'s unused `currentUI` to
      `_currentUI`, which silences rather than fixes - it was a `.find()` whose
      result is discarded, so it went, and so did the now-orphaned `slug` above
      it. **Biome does not flag `slug`**: reassignment counts as a use, so
      `let x = a; x = b;` reads as live even when nothing ever reads `x`.
      **Non-null assertions (3).** `allDocs.find(...)!` in the three `[slug]`
      routes. The invariant is real - `dynamicParams = false` 404s an unknown
      slug first - so the fix is `if (!doc) notFound()`, which keeps the
      invariant and turns the day it breaks into a 404 rather than a render
      error. Each file has **two** of these finds; only the one in the page
      component carries the `!`.
      **Decorative SVGs (8).** Brand marks in `icons.tsx` and the tooltip arrow
      in `palette.tsx` sit beside their own text label, so a `<title>` would
      have a screen reader announce the name twice. `aria-hidden="true"` goes
      **before** `{...props}` so a caller can still override it. The three under
      `public/` are static assets, not source: a `biome.json` override turns the
      rule off there rather than putting a title in a favicon.
      **`dangerouslySetInnerHTML` (1).** Correct for JSON-LD, so it is
      suppressed - but honestly: `JSON.stringify` does not escape `<`, so a
      frontmatter title containing `</script>` would close the tag and inject
      the rest as markup. Now escaped to `\u003c`, which is the same string to
      any JSON parser. Verified round-trip. **A biome-ignore reason must be one
      line** - a wrapped `//` chain does not suppress anything.
      `pnpm validate` stays at 3 non-canon classes, all deliberate custom ones
      (`admonition-body`, `invisible`, `preview-spinner`).
- [x] **`ComponentPreview` and `PropsTable` are gone**, and deleting them
      surfaced a live bug worth more than the deletion.
      **The `.md` routes for all 36 Yumma UI pages were empty.**
      `/ui/components/button.md` served 65 bytes - a title and one sentence, no
      source, no API. `mdx-markdown.ts` emitted those only for `<PropsTable>`
      and for a node carrying `registryId`, and `<ComponentPlayground />` uses
      neither, so both branches went dead and took the content with them. The
      comment in that file documents fixing this exact failure once before, at
      965 bytes; the migration undid it silently, because **nothing asserts a
      `.md` has a body**.
      **The fix**: `ComponentPlayground` resolves the page's own slug, passed in
      as `options.registryId` by the `ui-md` route, and emits the source *and*
      the props table. After: button 65 to 4,240 bytes, tooltip 5,274, dialog
      9,084, accordion 10,922, each with two fences and a full prop table.
      **The portal reset in `globals.css` stays - the earlier note was wrong.**
      `data-preview` is still set by `preview.tsx` and `playground/stage.tsx`.
      `tests/content.test.ts` was repointed rather than cut: the dead
      `<ComponentPreview>` regex is gone, and the assertion now checks that
      every playground page's slug names a real registry entry - the only link
      between the two, previously checked by nothing. Verified to bite.
- [ ] 23 `example`-kind previews are undocumented after the MDX migration.
      **Confirmed 2026-08-30: still exactly 23** in `public/ui/r`.
- [x] **`tests/markdown-routes.test.ts` closes the `.md` hole for good.** Two
      assertions: every docs page renders a body above a floor, and every UI
      page renders both a fenced source block and a prop table. Both verified to
      bite - reintroducing the `ComponentPlayground` bug fails the second,
      gutting a docs page to frontmatter fails the first. **This is the test
      whose absence let a 965-byte regression be fixed and then silently return
      at 65 bytes.**
- [x] **Both span pages deleted**, with 308s to their parents in `redirects.ts`
      (verified live, and both parents still 200). They were duplicate *pages*,
      not a stale API: each rendered the identical
      `<Reference name="grid-column" />` its parent already had, only with `###`
      headings. **`gc-s` and `gr-s` are current in `3.30.0`** and nothing
      replaced them. Sidebar is 184 pages now, not 186.
      **Worth knowing for v4:** `gc-s-3` generates `grid-column: span 3 / span
      3`, so the utility named `grid-column` **only does spans** - there is no
      way to write `grid-column: 2 / 4`. That is an API gap, not a docs one.
- [x] **`ui/customization.mdx` rewritten** - and **that entry was stale**: the
      page had already been rewritten at some point. No "Atomic customization",
      no "Component Slots", no empty `### Flexible by Design`, and one colour
      section that points at `colors.mdx` rather than duplicating it. Only the
      "need need" typo was still real. **Check the file before working from a
      note about it.**
      What was actually missing: the page's own description promises "Props,
      className & the file you own" and there was **no `className` section**.
      Now there is, and it says something true rather than reassuring:
      **`className` is appended but does not reliably win.** Every Yumma utility
      is a single-class selector, so they all have equal specificity and the
      winner is whichever sits later **in the generated stylesheet** - nothing
      to do with the order you pass them. Measured in the built CSS:
      `bg-red-5` beats `bg-indigo`, `px-8` beats `p-4`, but **`c-white` beats
      `c-accent`**, so overriding a colour a component already sets silently
      does nothing. That inconsistency is the argument for props, and it is the
      "cascade gotcha" the old `className` note was circling.
- [x] **`<Baseline />` and `<Palette />` reach the `.md` routes.** The entry
      this replaces named three `.tsx` files that **do not exist anywhere** -
      check the file before working from a note about it, again. The real gap
      was the same self-closing hole `<ComponentPlayground />` fell through:
      **142 `<Baseline />` uses across 130 pages** rendered nothing, and
      `/docs/colors.md` lost the whole palette.
      `src/utils/baseline.ts` is now the shared lookup, so the component and the
      `.md` renderer read one source. Markdown gets versions the page does not
      show (`Chrome 93 (desktop only) · Edge 93 · …`) because an icon does not
      survive the trip. **The palette is family plus base hex, not 19x13** - the
      shades are generated by the documented rule and every one of them is
      already on its own utility page.
      Two leaks found while measuring: `colors.md` served its raw
      `import { COLOR_FAMILIES } from "@/utils/colors"` line and the literal
      text `{COLOR_FAMILIES.length}`. Imports are stripped **outside fences
      only** - nine pages document an `import` inside one.
- [x] **`llms-full.txt` is deleted.** Measured before removing it: **2.37 MB,
      about 594,000 tokens**, past most context windows outright. `llms.txt` is
      21 KB (~5,300) and a page `.md` about 15 KB (~3,900), so the index plus
      the one page you need is roughly **65x cheaper** and more accurate than
      the dump. `llms.txt` now says that instead of linking it.
- [x] **`normalize.mdx` is read from `@yummacss/nitro`.** Measured first: the
      page and the shipped reset were **already identical** - 23 rules each,
      zero differences - so this is prevention, not a repair. Each fence now
      names selectors (```` ```css normalize="html; body" ````) and holds no
      text of its own.
      **A rehype plugin, not a component.** The fence has to carry its text
      *before* Shiki reads it or it would be the one uncoloured block on the
      site; `rehype-registry` injects component sources the same way for the
      same reason. It runs first in the chain in `next.config.ts`.
      **The trap: there are two pipelines, and the first version only fed one.**
      `.md` routes render from raw MDX through `mdx-markdown.ts` and never run
      rehype, so `/docs/normalize.md` served **18 empty fences**. Hence
      `src/utils/normalize-rules.mjs` as the single source both read - `.mjs`
      deliberately, because Next loads the plugin by path as plain ESM and could
      not import a `.ts` one, and the `/browser` entry keeps it free of
      `node:fs` so `mdx-markdown.ts` stays client-safe.
      **`markdown-routes.test.ts` did not catch it.** Its 400-char floor is a
      whole-page measure and the page is 3.5 KB of prose, so 18 empty fences
      cleared it comfortably. There is now an explicit empty-fence assertion
      across every page in both collections, plus `tests/normalize.test.ts`:
      every shipped rule is named by some fence, every named rule reaches the
      `.md` twin, and an unknown selector throws rather than rendering nothing.
      All three verified to bite.
      `@yummacss/nitro` moved to `dependencies` - `/api/docs-md/[slug]` is a
      **dynamic** route, so it is read at request time, not only at build.
      Dependabot's `@yummacss/*` group already covers it, so the page follows
      releases on its own.
      **Fixed in passing:** the last snippet said `normalize: true` while the
      prose above it said "to disable it set `normalize` to `false`". It says
      `false` now.
- [x] **Drafts are marked in the listing, dev only.** A separate section was
      rejected as heavier than the problem: there is exactly **one** draft
      (`yummacss-4.0.0.mdx`) of 7 posts. The marker is flat uppercase text next
      to the date, not a badge - the sharp-angles rule rules out a pill.
      `isVisible` already drops drafts everywhere but `next dev`, so it cannot
      leak, and that was **checked against the production build**: zero `Draft`
      markers in `blog.html`, the 4.0 post absent from the listing, and its
      route not prerendered at all.

### Phase 5 - Class merge (`yummacss/merge`)

**The problem, stated exactly.** Every Yumma utility is a single-class
selector, so they all have equal specificity and the winner is whichever sits
later **in the generated stylesheet** - nothing to do with the order you pass
them. Measured in the built CSS: `bg-red-5` beats `bg-indigo`, `px-8` beats
`p-4`, but **`c-white` beats `c-accent`**. So `className="c-accent"` on a
component that already sets `c-white` silently does nothing. `/docs/class-merge`
and `ui/customization.mdx` both document the fix now, not the limitation.

**Yumma's version is cheaper than Tailwind's, and that is the interesting
part.** `tailwind-merge`'s real cost is a large hand-maintained table of
conflict groups, needed because Tailwind's prefixes do not map cleanly to
properties (`text-sm` is font-size, `text-red-500` is color). Yumma's do:
**every utility in `@yummacss/core` already carries `{ prefix, properties[] }`**,
so the conflict map is generated, not written. 217 prefixes map straight out
of the 15 `*Utils` groups.

**The rule is a subset test, not an overlap test.** Walk the class list
backwards and drop a class only when **everything** it sets is already covered
by a later one, comparing within the same variant. That gets the case an
overlap test gets wrong: `px-8 p-4` loses `px-8`, but `p-4 px-8` **keeps
both**, because `px-8` says nothing about the block axis.

**The only hand-written part is six shorthand expansions**, because core
declares logical properties: `padding` covers `padding-inline` covers
`padding-inline-start`. Same for margin, plus `inset`, `gap`, `overflow`,
`border-*`.

- [x] **Built as `yummacss/merge`**, a subpath of the `yummacss` package
      (`packages/cli`), on the `merge` branch. **2.6 kB gzipped**, 8 tests in
      `tests/merge.test.ts`, each verified to bite.
      **It is not `ym` and not a registry file any more.** `ym` said nothing at
      a call site; `merge` says what it does. And a copied registry file would
      have been a second copy of logic that belongs with the CSS it describes -
      shipping it from the package that generates your stylesheet means it can
      never be out of step with it, and people using Yumma CSS **without**
      Yumma UI get it too.
      **`tsdown.config.ts` is now two configs**, because the `#!/usr/bin/env
      node` banner applied to every entry and has no business in a browser
      bundle. `dts: true` on the library half, so the subpath has types - the
      package shipped none before.
- [x] **A prefix alone is not enough - 31 are claimed by twice.** `c` is color
      **and** cursor, `p` padding and position, `f` fill and flex. Separator
      sets `c-slate-10` and `c-p` on one element, so a prefix-only map silently
      eats the colour. The value decides: for each contested prefix the
      **open-ended** utility (the palette, the spacing scale) is the default and
      its values are not listed, and the keyword utilities are listed by value.
      **129 keys instead of 2,258.**
- [x] **The registry-util machinery is reverted.** A third `kind` in the
      registry, `.ts` support in both generators and a `UTILS` list were built
      and then deleted the same day, because shipping from the package makes
      all of it unnecessary. Recorded so nobody rebuilds it: `git show
      3168890` in `docs` has the whole thing if a registry util is ever
      genuinely needed.
- [x] **`merge` is 5.7us per call for a 16-class string, in `3.31.1`.** It was
      **79us**: the first version scanned all 217 prefixes per class. It now
      cuts the base at each dash and looks up directly (longest prefix is 6
      chars, 15 contain a dash) and caches per class. 1000 elements per render
      is 5.7ms, not 79ms. Measure before believing a merge is cheap.
- [x] **`tests/merge-safety.test.ts` answers "how do we know nothing is lost".**
      `merge` removes classes, and a wrong removal throws nothing. The test
      extracts every static class string in `src/registry/ui` and asserts
      `merge(s) === s`: a component's own classes must never lose one.
      **767 strings, 0 losses**, run before the pass. Verified to bite by
      planting `c-white c-accent`. It does not cover template literals with
      `${}` or classes a caller passes; those are the ones that are meant to
      override.
- [x] **All 36 components merge instead of joining.** 41 call sites, every one
      that ended in a caller `className`. The 63 internal-only joins are left
      as they are: merge cannot change a list nobody overrides, and it is not
      free. `yummacss` moved from `devDependencies` to `dependencies`, because
      the components import it at runtime now.
      **Three states rendered wrong and now do not.** `bg-white` sits after
      `bg-silver-1` in the stylesheet, so the open Popover trigger, the open
      Select trigger and the disabled FileUpload dropzone all rendered white
      against their own state class. `preview-card`'s `td-none` is the fourth
      drop and changes nothing, `td-u` already won. Those four are the only
      classes dropped anywhere, and `c-p` and `p-a` survive every combination.
      **`Button` and `Field` declare `className?: string` now.** Both extend a
      Base UI props type where `className` may also be a function, which
      `join(" ")` was stringifying into the class attribute. merge's types are
      what caught it; the function form never worked.
- [x] **`tests/merge-composition.test.ts` is the unit merge-safety is not.**
      One string at a time is the wrong unit once a component merges a base
      string, a shape map, a state branch and `className` - a drop only happens
      across those arguments. It resolves each argument to the strings it can
      hold and merges all 4068 combinations, asserting the four expected drops
      by name, so a new one fails instead of changing a colour. Verified to bite
      by planting `c-white` next to `c-p` in `tooltip.tsx`.
- [x] **Decided: a subpath of `yummacss`. Not a new package, not the CLI, not
      a registry file.**
      **The CLI is impossible, not merely wrong** - `yummaui` runs under `dlx`
      and is never installed, while `ym` runs in the browser on every render.
      The CLI can *write* the file; it cannot export it.
      **A package that imports core at runtime costs 14.4 KB gzipped against
      3.7 KB** for the baked map plus `ym`, measured. A package with a *baked*
      map has the same staleness as a copy, just moved, and the direction of
      travel is fewer packages - `intellisense` is being retired.
      **Staleness degrades to today's behaviour, which is what makes the copy
      safe.** An unknown prefix resolves to null and the class passes through
      untouched, so a map that has not seen a new utility merges it exactly as
      badly as Yumma does now - never worse. The one real risk is core
      *changing* an existing prefix's properties, which is a major-version
      event. There is nothing to refresh: the map ships with the package that
      generates the stylesheet, so a `pnpm up yummacss` is the whole story.
- [x] **`/docs/class-merge`**, in Handbook after `negative-values`. Yumma CSS
      docs, not Yumma UI: the limitation is a CSS-level one and applies to
      anyone composing class strings. It carries the `p-4 px-8` pair that shows
      the rule is a subset test rather than "last one wins", the shared-prefix
      and variant cases, and the two alternatives below so the question is
      answered on the page rather than asked again.
- [x] **`@layer` and `!important` are both refused, on the page.** `@layer`
      cannot do this because a class is defined once: demoting `c-white` to a
      lower layer demotes it for every element, not for the one that was passed
      an override, and one definition cannot sit in two layers depending on who
      used it. `!important` is a blunter escape hatch that ends the
      conversation for that property everywhere and does nothing when both
      classes carry it.
- [x] **`ui/customization.mdx` documents the fix.** The `className` section was
      a warning that overrides do not reliably work; it is now the opposite,
      pointing at `/docs/class-merge`, with the prefer-a-prop advice kept as a
      hint rather than as the reason.
- [ ] **The shorthand table misses every physical longhand, and `docs` is
      hitting it.** `merge("px-8 p-4")` drops `px-8`, but `merge("pt-2 p-4")`
      keeps both, because core declares `p` as `padding` and `px` as
      `padding-inline` (logical) while `pt` is `padding-top` (physical), and
      `SHORTHANDS` in `packages/cli/src/merge.ts` only expands the logical
      side. Same for `ml`/`m`, `btw`/`bw`, `btc`/`bc`, `btlr`/`br`. It fails
      safe - a kept class is today's behaviour, never worse - which is why
      nothing rendered wrong and why it is not urgent.
      **The fix is to expand the true shorthands to their physical leaves as
      well** (`padding` to the four edges, `margin`, `border-width`,
      `border-color`, `border-radius` likewise). **Do not do the same to
      `padding-inline` or `padding-block`**: those map to left/right only in a
      horizontal writing mode, and Yumma has `wm-*`. `field.tsx` sets `pl-4
      pr-4 pt-3`, so a caller's `p-2` does not fully override it today.
      Needs a `yummacss` release to reach `docs`.
      **`pl-4 pr-4` should have been `px-4` in the first place.** Fix the
      component too, not only the table.
- [ ] **`merge` breaks in v4, and it is the sixth colon-splitter.** v4 classes
      are `bg:red-5`, `h:bg:red-5`, `@sm:d:b`. `merge` takes the variant with
      `className.lastIndexOf(":")` and cuts the prefix at dashes, so `bg:red-5`
      resolves to a variant named `bg`. **`yummacss` commit `b9eb894` on `v4`
      fixed exactly this in five other places** (hover's `parseUtility`, sort,
      conflicts, the monaco adapter, `suggestClasses`) and put **one splitter in
      core** that peels a variant only when what remains is not already a
      utility. `merge` uses that splitter. It does not grow its own.
- [ ] **Canon lint: two rules `merge-map` makes nearly free.** **`pl-4 pr-4`
      should be `px-4`** is "two classes whose properties union equals a
      shorthand's", needing no data the map does not carry. **A `style`
      attribute setting a property a utility covers** (`top: -1` when `t--1`
      exists) is the map inverted to properties-to-prefix; naming the exact
      replacement needs a value-to-scale lookup, but the warning is worth
      having without it.

### Phase 6 - Yumma UI API (`TODO.md`)

- [x] **`iconSide` renamed to `iconPosition`.** Measured: **14 components split
      across two names for one prop** - `iconPosition` on 9, `iconSide` on 5,
      identical `leading`/`trailing` values on both. `iconPosition` wins on
      three counts: the majority, it does not collide with `side` (Popover and
      Tooltip use that for placement relative to the trigger, a different
      thing), and `triggerIconPosition` already reads that way.
      `tests/registry.test.ts` now fails on **any** two prop names that differ
      only by a `Side`/`Position`/`Placement`/`Align` suffix, so the rule is
      enforced rather than the one pair banned. Verified to bite.
- [ ] **The separator entry is two bugs, not the one it describes.** "Both
      `orientation` and `shape` do nothing": `orientation` works in the plain
      branch and is **ignored entirely** in the icon/label branch, which
      hardcodes `h-px`. `shape` never touches a separator at all - it styles
      the icon **button**, so the prop's name lies. "No lines at all" is
      neither: every class resolves (`h-px{height:1px}`,
      `bg-silver-2{background-color:#e1e3e7}`), so the lines render - 1px of
      near-white on white.
- [ ] **The "does nothing" cluster is not schema drift.** Checked every prop in
      every meta against its component source: 4 hits, all spread-forwarded
      false positives. So `shadow`, `animate`, `defaultPressed` and the rest are
      **wired and ineffective**, which no static check will find. They need the
      component opened one at a time.

### Phase 7 - One breaking registry release

All three change something a published `yummaui.json` or an installed CLI
depends on, so they ship together or the ecosystem churns three times.

- [ ] `public/ui/r` to `public/ui/registry`, with a redirect from the old path:
      `registry` is stored as an **absolute URL**, so every existing install
      points at `/ui/r` forever.
- [ ] `registryDependencies` to `registryDeps` in the generator, the JSON and
      `ui/src/registry.ts`. A CLI reading the new field cannot read old JSON,
      so either both ship for one version or the CLI floor moves.
- [ ] Drop the `blocks` key from `index.json` once Phase 6 collapses the
      distinction. `resolveNames` reads `index.blocks`, so it moves in the same
      release. **`--all` currently excludes blocks on purpose** - each pulls its
      parents, so a flat `--all` would write `dialog` several times over. That
      guard needs replacing, not deleting.
- [ ] Add an OTP field component over `@base-ui/react`'s.
- [ ] **16 `example` entries are still unreachable**: not in `index.json`, not
      referenced by any page, and `resolveNames` rejects their ids. Publish
      them in the index or stop generating them - they cannot stay as they are.

### Phase 8 - Retire `@yummacss/intellisense`

The extensions are already deleted (see Rejected). This is the package.

- [ ] **`play` is the only consumer left**, importing
      `@yummacss/intellisense/monaco` from `play/src/utils/providers.ts`. The
      package is 1,243 lines and its **only adapter is Monaco**, which is play's
      own editor, so it has become play's editor logic living in the CSS
      monorepo.
- [ ] Before moving anything: `validate.ts` is a thin wrapper over
      `@yummacss/nitro/browser`, so the real logic is already in nitro. The
      substantial editor-agnostic parts are `sort.ts` (252) and `hover.ts` (251).
      Decide whether those move into `play` or become something nitro exposes.
      `constants.ts`'s `CLASS_ATTR_REGEX` is **not** a third copy of the scanner
      bug - it is anchored on `class=`, so it cannot desync.
- [ ] What survives of the `any` item afterwards is the colour-merge block
      (`const { percentage, ...userColors } = ... as any` then `createColors`),
      duplicated **five times**. Worth consolidating **only because 4.0 decision
      #16 (OKLCH) rewrites `createColors`** - five call sites, five chances to
      miss one. Do not refactor core/nitro/canon internals; they are clean and
      4.0 rewrites that surface anyway.
- [ ] `CHANGELOG.md`: `3.24.7` writes `## Changed` instead of `### Changed`; one
      `### Fix` among 34 `### Fixed`; `3.28.0` has no date on its heading.
- [ ] Core's `scroll-*` slugs are inconsistent: mostly fully qualified
      (`scroll-margin#scroll-margin-top`) but two are short (`#bottom`,
      `#inline-start`). The docs headings were written to match each slug exactly
      so all 16 anchors land; normalise core and those headings can go uniform.

### Phase 9 - v4 decisions

- [ ] **Bounded scale or unbounded?** See the 0-384 section below. This one
      decides the shape of canon, so it goes first.
- [ ] **Four config keys or one `theme.extend`-shaped mechanism?** Fonts,
      containers, viewport-minus and named grids all want the same shape.
- [ ] **What `@yummacss/canon` ships**, which falls out of the first two: an
      enumerable list, or a parser.
- [ ] **Move publishing to Trusted Publishing (OIDC)** and drop `NPM_TOKEN`
      entirely. See the token trap for what to verify first. Not urgent, but it
      is the only thing that stops this recurring every time a token expires.
      **The current token dies 2026-11-27**, so that is the deadline.
- [ ] `xs` at 32rem has no matching breakpoint. Drop it or add the breakpoint.
- [ ] **Drop `tinycolor2` for OKLCH.** These are one decision, not two, and
      both halves are measured.
      **Bundle:** `tinycolor2` is a devDependency that tsdown bundles *into*
      `@yummacss/core`, so it ships to every user. Building core with the calls
      stubbed: 55,915 B to 40,761 B. **It is 15,154 B, 27% of core, to do
      `mix` and `toHexString`.** OKLCH conversion is about 30 lines of matrix
      maths with no dependency, so this shrinks the bundle rather than growing
      it - which is the opposite of what "adopt OKLCH" sounds like it costs.
      **Evenness:** measured OKLCH lightness deltas across all 19 default hues.
      Median max/min ratio **2.5x**; worst yellow **5.6x**, green 5.0x, lime and
      sky 3.6x; best blue and gray 1.2x, slate 1.3x, indigo 1.4x. **The split is
      light-native hues against dark-native ones** - mixing toward white
      compresses the light half of a yellow scale and stretches its dark half,
      while a blue is already near-uniform. So it is not "5 of 19 hues are
      broken and the rest are fine" by accident; it is a systematic artefact of
      mixing in sRGB.
      **Wider gamut is the weakest argument** and should not be the reason:
      P3 only shows on wide-gamut displays, and the palette stays in sRGB
      anyway unless the hues are re-picked.
      **Blast radius is one function.** `generateShades` in
      `packages/core/src/helpers/create-colors.ts` is the only place that knows
      how a shade is derived. Nothing else in core touches `tinycolor2`.
      `docs` uses it separately - `palette.tsx` for display, `utils/colors.ts`
      for a luminance check - and would need its own change. `intellisense`
      uses it and is being deleted in Phase 8 anyway. **`play` does not depend
      on it at all.**
      **The catch:** every generated hex changes. That is a visual break for
      anyone who pinned a colour by eye, which is a v4 change, not a 3.x one.

### Phase 9b - The pre-v4 audit

Renildo's ask: a rundown of the whole codebase for redundancy, performance,
code reduction and bundle size before v4, plus possibly rewriting how core is
authored so adding utilities is pleasant.

**Split it in two, because the halves have opposite deadlines.**

- [ ] **Architecture and API - must come BEFORE Phase 10, not last.** How core is
      authored decides the canon shape, which the codemod and the docs migration
      are both written against. Doing it after means redoing them. If the
      utility record shape changes at all, it changes here or not until v5.
- [ ] **Mechanical cleanup - genuinely last, and cheap.** Dead code, duplicated
      helpers, bundle size, dependency removal. None of it changes a public
      shape, so it cannot invalidate work downstream of it. `tinycolor2` above
      is the biggest single item and is already measured.

**Do not start this as one open-ended sweep.** "Audit the codebase" over 8
packages plus three sites is the kind of task that produces a long list nobody
acts on. Pick a measurable target first - shipped bytes per package, or
"adding one utility touches N files" - and let the findings fall out of chasing
it. The `tinycolor2` number came from asking one question with a build, not
from reading everything.

**Baseline, measured 2026-08-30** (`dist`, unminified bytes): core 55,915 |
runtime 61,457 | cli 39,796 | intellisense 19,589 | nitro 18,897 | canon 3,597 |
postcss 1,973 | vite 1,727. Core and runtime are where the weight is, and
`tinycolor2` alone is 27% of core.

### Phase 10 - v4 build

- [ ] The 4.0 codemod. Everything else in 4.0 depends on it existing, and it
      gates the release.
- [ ] `@yummacss/canon`'s canon list, in whatever shape Phase 9 settled.
- [ ] `docs`: every code example. Run the codemod here first; largest real
      corpus, and it has to be migrated anyway.
- [ ] The config-driven generators, per the Phase 9 answer.
---

## The playground

Shipped across #108, #129 and #130. **This reverses the 2026-08-03 "do not
rebuild the `/ui` playground" ruling**, which was written after a Dimsum-style
stage was built and reverted the same day. The old objection was that a gallery
should show 27 finished previews in one flick rather than ask the reader to
operate one control panel. What changed: the playground is now the *page*, not a
replacement for the gallery, and Renildo asked for it directly. Do not resurrect
the revert note; do not re-propose the reverted design either.

Everything lives under `src/components/playground/` unless noted.

| File | Role |
| --- | --- |
| `context.tsx` | `PlaygroundProvider` keyed by slug. Holds `meta` + `values`, seeds from the schema, auto-satisfies `dependsOn` in `setValue`. |
| `stage.tsx` | `ComponentPlayground`, used from MDX. Live preview + usage snippet. Keeps the last ready frame while the next loads. |
| `rail.tsx` | The right column, Component API. Reads context; renders nothing when context is null. |
| `control.tsx` | One widget per prop. Enum -> select, boolean/icon slot -> `Toggle`. |
| `install.tsx` | `yummaui add` copy menu. `prominent` variant for the page header. |
| `../preview-frame.tsx` | The iframe. Exports `usePreviewContainer()` for portal targets. |
| `../../utils/demo.tsx` | `EXAMPLE_ICONS`, `exampleIcon`, `resolveIcons`, `seedValues`. |
| `../../utils/props.ts` | `typeOf`, `isControllable`. |
| `../../utils/snippet.ts` | `buildUsage`, `tokensToText`, `TOKEN_COLORS`. |

The provider lives in the layout, but **layouts do not re-render on navigation
in this Next**, so the slug comes from `usePathname` in a Client Component. Same
trick in `token-block.tsx` to find the current page's `primitive`.

333 of 407 props across 36 schemas are controllable (82%); no component has zero.

### Settled design, do not re-litigate

Each of these was asked for explicitly and at least one was lost once in a merge
and had to be restored.

- **One rail section.** Not two. Interactive and read-only props mix in the same
  list.
- **Every enum is a select**, however few values. Segmented controls wrapped in a
  three-column rail and broke the shared right edge.
- **Switches, not checkboxes.** Docs palette (`bg-accent-dim` on, `bg-border`
  off, `bg-page` thumb), square corners, geometry borrowed from Yumma UI's `sm`
  switch (`px-1` track, thumb `ml-0` to `ml-2`). The library's own `bg-indigo` on
  white does not belong in the rail.
- **No rounded corners anywhere.** See the sharp-angles rule below.
- **No reset button.** Leaving the page and coming back reseeds.
- **No copy button on the playground snippet.** The title bar carries Install and
  the Base UI link instead.
- **Install sits beside the pagination arrows** in the page header
  (`prominent`), and again in the snippet title bar.
- **`iconSide` fills its own icon.** Picking a side puts an icon there rather
  than doing nothing until one is toggled on. That is what `dependsOn` is for.
- **Read-only labels use existing text colors.** No new greys.
- **The preview does not stretch to fill the space under the code block.** Tried
  it, looked wrong, reverted.
- Base previews only in MDX. The playground does the transformation work.

---

## Yumma UI: architecture and conventions

Read before proposing a change to where things live or how a prop is shaped.

**Queued renames and additions, not yet done.** All three are breaking for
someone: do them together, in one release.

- [ ] `public/ui/r` to `public/ui/registry`. Old path needs a redirect - a
      published `yummaui.json` pins `registry` as an absolute URL, so every
      existing install points at `/ui/r`.
- [ ] `registryDependencies` to `registryDeps`, in the generator, the JSON, and
      `ui/src/registry.ts`. A CLI reading the new field cannot read old JSON, so
      the field ships in both shapes for one version or the CLI floor moves.
- [ ] Add an OTP field component, over `@base-ui/react`'s.

**The registry stays in `docs`, at `src/registry/`.** Served as static JSON from
`public/ui/r/`, generated at build time by `scripts/generate-registry-json.mjs`
(gitignored output). The CLI **fetches it over HTTP** and imports nothing. Six
things in `docs` need those files on disk: the `yumma.config.mjs` source glob
(CSS generation), `src/registry/index.ts`'s dynamic import map (bundling),
`rehype-registry.mjs`, both generators, and `validate-yummacss.mjs`. Moving the
registry to `ui` optimises for the consumer that does not need it. shadcn keeps
its registry in the docs site with the CLI separate over HTTP, which is the shape
we already have. **If one repo is ever wanted, bring the CLI into `docs` as a
package; never move the registry out.**

**Yumma UI must never ship CSS.** Components are styled with utilities the
*consumer's own* Yumma CSS build generates. This makes
copy-source-not-a-dependency **load-bearing, not philosophical**:
`yummaui add button` writes the file into their project, so their scanner sees it
and generates exactly those utilities. As an installed dependency the classes
would sit unscanned in `node_modules` and nothing would be styled. The only "fix"
would be shipping prebuilt CSS, which duplicates the stylesheet and defeats the
premise. The launch post commits to this in print under a "Not a Dependency"
heading.

**Nothing in the registry imports anything local.** That property is what makes
`yummaui add autocomplete-inset` write one file that just works. Shared fixture
files were considered and rejected on those grounds (137 registry files declare
their own const array, 56 use dicebear across 283 lines) - revisit only with
`registryDependencies` wired through, and even then ask whether fixture data
belongs in someone else's project.

### The CLI surface

Source of truth is `ui/src/cli.ts` and `ui/src/commands/add.ts`. **This section
exists because it did not**: in 2026-08 the docs printed install commands in a
form the CLI does not accept and 414 of 450 were broken.

```text
yummaui init                     write yummaui.json
yummaui add <component...>       copy components in
yummaui list [component]         browse what is available

  -v, --variant <name>   NOT IMPLEMENTED, see backlog
      --overwrite        replace existing files
  -y, --yes              skip prompts
```

`add` resolves its argument against `index.components[].component` in
`/ui/r/index.json`, which holds the **36 component names**, never the flat ids.
So `add button` works, `add button-pill` exits 1. The registry id is only how
registry *files* are keyed. That gap between "how files are keyed" and "what the
CLI addresses" is exactly what went wrong.

`scripts/lib/registry-ids.mjs` owns `splitId`, both generators import it, and
`generate-registry.mjs` emits a `registryTargets` map into `src/registry/index.ts`
so the browser can print a command that runs. **Duplicating that rule in a third
place is how it drifts again.** The check worth re-running after any registry
change replays the CLI's own lookup against every command the docs print:

```js
const entry = index.components.find((x) => x.component === target.component);
entry && (target.variant === "base" || entry.variants.includes(target.variant));
```

The usage snippet's `import Button from "@/components/ui/button";` assumes
`yummaui init`'s defaults (`ui/src/commands/init.ts`). **If those defaults
change, this string has to change with them** - it is the one place the docs
assume the CLI's config rather than reading it.

### Prop or compound part? Four fates, not two

Mask classNames, diff each variant against its base, and the line distance sorts
them:

1. **Prop** - styling only, or a fixed enumerable choice (0-3 lines).
2. **Compound part** - adds an element the consumer fills (6+ lines).
3. **Recipe** - a composition that stays in the docs and never becomes API.
4. **Separate component** - `avatar-stacked` maps over 5 members with overlap;
   that is `AvatarGroup`, not a variant.

Category 3 is the biggest lever and the easiest to miss.

**If an axis crosses with every other axis it must be a prop.** Badge has
`dot-pill`, `icon-pill`, `count-pill`, `close-pill`; `pill` multiplying against
everything is the tell.

**The test for keeping a recipe: is the difference in the props, or in the
structure?** Dialog kept 7 recipes because a dialog is a generic container and
the interesting thing is what you put inside it. Badge and Breadcrumb went to
zero because every variant was a prop combination. Menu's `menu-account`
collapsed despite looking bespoke, because its distinctiveness was entirely a
`trigger` ReactNode and per-item icons - both props.

### Standing prop rules

- **A state plus a message is one string prop.** `error?: string`,
  `success?: string`. Presence means "show this state, with this message". Not a
  `status` enum, not a compound part, not `<Field.Error>` in a copied file. The
  test for one prop or two: mutually exclusive alternatives (one prop, values
  swap) or genuinely two things sharing a visual pattern (two props). Error and
  success are the latter; `error` wins if both are set.
- **Item data has a fixed shape. The component does not go generic.** No render
  prop, no type parameter, no `itemToLabel`. **You own the file**, so data that
  does not fit is a five-line edit.
- **A menu genuinely *is* data**; a Collapsible's or Preview Card's panel is
  bespoke markup. That is the dividing line between a discriminated-union `items`
  prop and a `children` slot.
- **`shadow` is a prop everywhere**: `none | inset | outset` mapping to `""`,
  `bs-i-sm`, `bs-o-xs`.
- **Widen the component rather than leave a demo on `@base-ui/react`.** Standing
  rule from the demo-file import pass.
- Classes are plain object lookups, **not cva**. A copied component should not
  drag a class utility into someone's `package.json`.
- **Field does not wrap Autocomplete/Combobox/Checkbox.** They own their own
  label and description. Retrofitting Field as a universal wrapper was explicitly
  rejected; if revisited it is a deliberate breaking change, not a quiet refactor.
- **`Field.Label` auto-associates with `Field.Control`** through Base UI context.
  No `useId`/`htmlFor` bookkeeping.

### The schema

`src/registry/meta/<id>.json`, never exported from the component, because the
file is copied verbatim and metadata has no business shipping with it.
**One schema, four consumers:** the page's props table, the `.md` route, the
playground, and `yummaui add`. They cannot drift.

- `type` is `enum | boolean | string | number | none`. `none` plus `typeName`
  documents a `ReactNode` or `AutocompleteItem[]` that cannot have a control.
- `children` is a **top-level string field, sibling to `props`**, not a prop.
  Writing it as a prop silently renders empty. Absent means the component takes
  none and the snippet is written self-closing.
- `example` is a demo value, **not documentation**. `default` stays the truth the
  table reports. **Never give an `example` to a prop that is mutually exclusive
  with another** - the preview applies every example at once, which is how base
  Field once rendered a prefix and a suffix together.
- `exampleIcon` names an icon fixture for a `ReactNode` slot. `{ "$icon": "Star",
  "size": "w-4 h-4" }` is the array-shaped form, resolvable anywhere inside an
  example; the walk skips anything carrying `$$typeof`, because a React element
  is an object too. The icon map is **curated on purpose** - a dynamic
  `icons[name]` lookup would defeat tree-shaking and pull every glyph into the
  client bundle.
- `example: null` means the slot starts empty.
- `dependsOn` names the prop that must be filled for this one to do anything.
- `src/registry/index.ts` is **generated**. Type edits belong in
  `scripts/generate-registry.mjs`.

### Versioning

**Shipped at `0.1.0`.** The earlier argument for `0.0.1` - that `0.0.x` is the
only range where every release is free - is settled and does not need
re-litigating. What carries forward is the trigger it named: **the thing that
forces a version decision is not a date and not a component count, it is the
first outside user filing an issue the schema cannot answer without a breaking
change.** Stay on patches until then.

---

## Docs site conventions

**Sharp angles only. No cards, no rails, no rounded corners, no framed images.**
`src/app`, `src/components` and `src/styles` contain **zero** `br-*` utilities
and zero `border-radius`; every route is plain typography grouped by whitespace.
The only circle in the repo is the logo. **Run that grep before proposing any new
visual structure.** (The 1690 `br-*` uses all live in `src/registry`, including
384 `br-9999` across 149 files - if "sharp only" ever becomes a brand rule rather
than a page preference, that is where the decision lands, and it is a large job.)

**Palette:** page `#151724`, surface `#1a1d2e`, border `#232741`, accent
`#bec6f2`, accent-dim `#9aa5ef`, code `#dda2f6`, diff-add `#a8e1ad`, diff-remove
`#e1a8a8`. Eight semantic colours, no light/dark pairs, because the site is
single-scheme.

**Grid:** `d-g gtc-1 g-8 @lg:gtc-12`. Sidebar 3, content `@lg:gc-s-6`, rail 3.
The rail is about 15rem of content at 1440px.

**Every `oy-auto` gets `ob-c`.** `overscroll-behavior: contain` is what stops a
scroller handing the wheel to the page when it reaches its end. The left nav had
it; the other five scrollers on the site did not, which is why the chaining felt
random - it depended on what the pointer happened to be over. Measured on
`/docs/display`: wheeling a `<Reference>` filter list to its end threw the page
609px. The worst case was the mobile nav dialog (7936/720 on a phone), where the
page scrolls behind an open menu. `ob-c` is on all six now. **The registry
popups - `combobox`, `autocomplete`, `command-palette` - still lack it**; that is
a library change and needs the registry regenerated, so it was left alone.

**Containment is not the same as having something to scroll.** A scroller shorter
than its `max-height` is not a scroll container at all, so `overscroll-behavior`
does not apply and the wheel goes to the page - correct behaviour, not a bug. On
`/blog` the sidebar is 246px in an 820px column, so the empty space under it
scrolls the page. Nothing to fix; do not "fix" it by making the column a scroller.

**Fonts: Esteban for headings, iA Writer Quattro for body**, and there is an open
design decision here. Measured by rasterising text and counting ink pixels:

| Weight asked for | Ink pixels | Face actually used |
| --- | --- | --- |
| `fw-400` | 1654 | 400 |
| `fw-500` | 1654 | **400. Identical to regular** |
| `fw-600` | 2686 | 700 |
| `fw-700` | 2686 | 700 |

**`fw-500` is used 1144 times across `src` and renders exactly like `fw-400`**,
because Quattro has no 500 face and CSS weight matching resolves downward. That
is the flatness. To make emphasis visible it has to become `fw-600` (700 is the
only heavier face), but doing that across 1144 sites would make the whole site
noticeably bolder, so it probably wants to be selective: headings, nav active
states, table headers, labels, leaving body at 400. **Not done; needs a design
call.** Esteban ships 400 only, so display headings can never have weight
contrast without changing the face. Docs `h1` is `fs-4xl fw-400` = 36px on 54px
leading, loose for display type.

**Esteban only applies inside `<article>` or via `.ff-e`.** `globals.css` sets
`h1..h6` to `system-ui` and overrides only `article h1..h6, .ff-e`. Any new page
built from `<section>`/`<header>` gets system-ui headings silently.

**pnpm only.** Renildo's call, 2026-08-31, replacing the old two-tab rule:
every install or CLI command is a plain fence with the pnpm form, no
`<CodeGroup>` and no `title="pnpm"` label - a single tab labels nothing. `pnpm
add X -D`, `pnpm dlx X`. This holds in blog posts too, which is how the old rule
worked.
**`pnpx` DOES exist and the old note here was wrong.** Checked on pnpm 10.33:
`bin/pnpx.cjs` is four lines that splice `dlx` into argv and call pnpm, it is
shipped with pnpm, and it prints no deprecation warning. The five uses in
`yummacss-3.0.0.mdx` all ran fine. They were still changed to `pnpm dlx`,
because that is the form pnpm's own `--help` prints as canonical - a style
call, not a correctness one. **Do not repeat the claim that it does not
exist.**
**A CI example needs `pnpm/action-setup@v6` before `pnpm install`**, or the
snippet is broken for whoever copies it. `npm install` needed no setup step, so
this is not a find-and-replace.
**`playground/install.tsx` keeps every manager and is not part of this** - it is
a product feature handing a reader the command for the manager they use, not a
terminal example.

**An example earns its place when it shows something the API table cannot say.**
The table is good at **enumerable** facts (`shape: rounded | square | squircle`
is fully communicated) and bad at **spatial or structural** ones (it says
Separator takes `icon?: ReactNode`; it never says the icon sits centred in the
rule). One rule producing both answers, which is why it is the right one: it
deletes `autocomplete-lg` and keeps `separator-icon` without special pleading.
Corollaries: **base demos show range, not minimum** (Rating's base should pass
`count` even though 5 is the default), and icon *placement* is spatial, so icon
examples stay.

**How the API table is actually read**, from watching a real user: scan the
**Prop** column for the name, then conditionally read **Type** for that one row.
Not top to bottom, not every column. This validates the existing
`Prop | Type | Default | Description` order rather than asking for a change.
Description stays - `shadow`'s "inset reads as a well, outset as a raised
control" is not recoverable from the type alone.

**`## API Reference` is never called "Props"** and was the final section of a
component page, after every example, because the page's job is to show what the
library can do to someone who has not committed yet. The playground rail has
since taken that job; the density complaint that prompted a redesign ("it's
throwing way too many info in less than 3s") is what the rail answers.

**The "Base UI primitive" sidebar link is a different thing from the page's own
API reference**: ours documents what Yumma UI adds, theirs documents the
primitive underneath, which is what you need the moment you edit the file you
copied. `primitive` in frontmatter accepts `true` **or an explicit Base UI slug
string**, because the names diverge (Textarea is Field's `render={<textarea />}`
and `base-ui.com/react/components/textarea` is a 404). Re-run the
frontmatter-against-imports check if a new component's primitive name diverges
from its `@base-ui/react/*` import.

**`scripts/check-sidebar.mjs` runs before `next build`.** Every content page must
appear in `sidebarConfig` exactly once. It parses only the `sidebarConfig`
object, so link lists elsewhere in that file are ignored - which is why the
`/llms.txt` sidebar link is defined as `docsLinks` instead. Six consumers assume
every `sidebarConfig` entry resolves to an `.mdx`.

**`mdxToMarkdown` must stay client-safe by construction.** `registry-source.ts`
and `resolveRegistryMeta` are **injected** into it rather than imported by it. A
`node:fs` reachable from `mdx-components.tsx` is the leak that took the
playground down and failed the first OOM fix. Same rule for the Shiki theme:
module import, never `readFileSync`.

**Tests:** `tests/copywriting.test.ts` bans em dashes, contractions and first
person outside the blog, trailing whitespace, and British spelling; headings are
Title Case; descriptions are one sentence, 120 chars max, ending in punctuation.
`tests/content.test.ts` checks that a playground is flagged in frontmatter and
only exists where a schema backs it.

---

## Traps

The expensive ones, in rough order of how much time they have cost.

**A published GitHub Release does not mean a published npm package.** `3.30.0`
was tagged and released on 2026-08-29 and the publish run **failed** the first
time: build
green, 150 tests green, tarball packed, provenance signed, then
`npm error 404 Not Found - PUT https://registry.npmjs.org/@yummacss%2fcore`.
**A 404 on `PUT` is npm's way of saying unauthorized** - it will not admit
whether a package exists to a caller that cannot write it - so the cause is the
`NPM_TOKEN` secret being expired, revoked, or lacking write access to the
`@yummacss` scope, not a missing package. It died on the first package, so
nothing partially published; all nine stayed on `3.29.2`, verified against the
registry. **The fix is two steps and both are needed**: a new token in repo
secrets, *then* re-run the failed run from the Actions page. Re-running alone
changes nothing, and a new token alone does not retry - the run reads the
secret at start. No new tag or release either way. That is what happened: a
fresh granular token, a re-run, and `3.30.0` went out.

**Always check the Actions run, not the releases page,
before believing a version shipped**, and `npm view <pkg> version` is the
cheapest confirmation.

**The npm token needs "Bypass 2FA" ticked, and that is the wrong long-term
answer.** 2FA demands a one-time password on publish and a runner cannot type
one, so without the bypass the workflow fails with `EOTP`. The token also needs
**Read and write** on the `@yummacss` scope *and* the unscoped `yummacss`
package - npm's default of `No access` produces the same 404 as an expired one.
**The secret lives in repository settings, not the organization**, at
`github.com/yummacss/yummacss/settings/secrets/actions`, and is named
`NPM_TOKEN` - edit that entry rather than adding a new one, because the workflow
reads it by name. GitHub's iOS app has no repo settings at all, so rotating a
token is a mobile-Safari job; re-running the workflow afterwards is in the app.

**The token rotated on 2026-08-29 expires 2026-11-27** (90 days, npm's
default), so this breaks again then unless Trusted Publishing lands first.
Settings that work: Read and write, All packages, plus Read and write on the
`yummacss` organization - the scoped packages are org-owned, so both sections
are needed.

**npm's own form now steers to Trusted Publishing instead**, which is the real
fix: OIDC, so npm trusts `publish.yml` in this repo directly and the runner
exchanges its GitHub identity for a short-lived credential. Nothing to expire,
nothing to leak, and 2FA stops mattering. `publish.yml` already has
`id-token: write` for provenance, which is the same permission. **Two things to
check before migrating**: whether `pnpm -r publish` supports OIDC at the pinned
pnpm (the feature is in the npm CLI; pnpm's support arrived separately), and
that it is configured **per package on npmjs, so eight times**. Do not block a
release on this migration - rotate the token, ship, migrate separately.

**GitHub's "Generate release notes" button does not write notes.** It lists the
pull requests merged since the last release, one line each with author and link,
plus a compare URL. No prose, no AI, and **commits pushed straight to `main` do
not appear at all** because it only sees PRs. For `3.30.0` it would have listed
five PRs, three of them the same `fix-scanner` branch merged three times, and
advertised `#10 feat: add the v4 migrate command` - which this release
deliberately does not ship. **Keep the CHANGELOG as the source of the notes.**
It is fine as an addition below them, and `.github/release.yml` can categorise
by label if that is ever wanted.

**Cutting a release is `pnpm bump <version>` then `pnpm release`.** `release`
reads the version out of `package.json`, extracts that section of
`CHANGELOG.md` verbatim, and drafts the GitHub Release whose Publish button
fires `publish.yml`. It refuses on anything upstream being wrong: not on
`main`, a dirty tree, `main` and `origin/main` disagreeing, a tag that already
exists, a missing or empty changelog section, or a `package.json` the bump
missed. With `gh` present it creates the draft; without it, it prints a
prefilled `releases/new` URL. **Nothing about the release is typed by hand.**


**The downstream sites update by Dependabot, not by the release.** The dispatch
chain - `notify-downstream.yml` to a `repository_dispatch` to each site's
`update-yummacss.yml` - had four failure points and had been dead for three
months with nothing to say so. `docs` failed every run since 2026-06-27 at
`pnpm/action-setup` (`No pnpm version is specified`: no `packageManager` in its
`package.json`) and so never opened a single PR; `play` opened its PR and then
died on `gh pr merge --auto`, which needs "Allow auto-merge" on in repo
settings, so `play#61` just sat there. Both workflows also only ever named two
of the four `@yummacss` packages, so `canon` and `postcss` drifted behind even
on a green run. All three workflows are deleted. **Dependabot does it now**,
which is what has always kept `web-features` current here: the packages sit in
the `allow` list, grouped into one PR, and `auto-merge.yml` merges it. Cost is
latency - it polls npm daily rather than firing on the release.


**"Is it in the repo" and "is it in the package" are different questions.**
Every package sets `files: ["dist"]`, so `src` never publishes, and the bundler
tree-shakes anything the entry does not reach. Unwiring `migrate` from `cli.ts`
took the whole command out of the tarball: 43170 bytes to 39703, with every
identifier gone. **Check the built artifact, not the source**, when the question
is what a user receives - `grep` the `dist` bundle, or diff its size both ways.


**A class can be canon-valid and still generate no CSS.** `c-slate-12` is a real
token in `@yummacss/core` (`#101316`) but nothing is emitted for it, so four
popups inherited the page's own white text and Onboarding's step icon rendered
white on white. `validate-yummacss.mjs` will not catch this - it checks whether a
class is *canon*, which `c-slate-12` is. **`getComputedStyle` on the real element
is the only way to tell.** Same family as the two scanner bugs below.

**The scanner mangles multi-`${}` template literals.** `@yummacss/nitro`'s
build-time scanner silently drops or corrupts class names extracted from template
literals containing two or more `${}` interpolations, especially with nested
ternaries. Confirmed by calling `nitro.scan()` directly and inspecting the
returned `Set`: it contained garbage like `"className={\`d-f"` and `"o-60\""` -
fragments of surrounding syntax. **Fix: rewrite every dynamic className to
`[...].filter(Boolean).join(" ")` with zero backticks**, not fewer, all the way
to zero. A single-interpolation literal looked safe in isolation and was not once
the file had other backtick classNames nearby.

**Plain string literals were dropped too: quote-parity drift.** Fixed in nitro
2026-08-28; kept because it explains every odd scanner report before that date
and because the shape recurs. `tokenizer.ts` matched bare strings with
`/"([^"]+)"/g`. `[^"]+` is *one*-or-more, so an empty literal `""` could not
match; the regex backtracked and began its next match on the **second** quote of
that pair, capturing the code *between* strings from there on. Every later class
in the file was lost until another `""` re-synced it - which is why
`bc-accent-dim` survived while `bg-accent-dim` from the same literal did not,
and why "position in the file" and "a per-file cap" were correctly ruled out and
nothing replaced them. A regex literal or a quote inside a comment did the same.
**The bitter part: the prescribed fix for the template-literal bug above -
`[...].filter(Boolean).join(" ")` - is what introduces the `: ""` falsy branches
that cause this.** There were 75 in `src`.

`tokenizer.ts` is now a lexer: JS-family files by extension get a scanner that
tracks comments, escapes, template literals and regex literals, and everything
else gets a line-scoped pass, because `.mdx` is prose and an apostrophe must not
cost more than its line. **Two consequences worth remembering.** Class names in
comments are no longer collected, which is correct - `m-23` was generating a
real rule because a sentence explains the scale runs past it - so a class that
exists *only* in a comment will not generate. And `src/lib/code-decorate.mjs`
was always scannable; the older note claiming the glob was tried and did not
help was wrong. Line 43 is `const regex = /"([^"]+)"/g;`, three quotes, hiding
everything below it. The file contained the very pattern that hid it.

**If a component renders unstyled despite the class name looking correct, check
the built CSS for that literal before assuming the component is wrong**:
`grep -o "\.<class>{[^}]*}" .next/static/chunks/*.css` after a clean
`rm -rf .next && pnpm build`.

**Write probes to a `.mjs` file, never a bash heredoc.** Backslash mangling
between the heredoc and a JS regex has produced false "missing" results at least
three times, on classes that were present. `javascript_tool` against the live DOM
is better still - no shell in the path at all.

**A caller's `className` cannot reliably override a class the component already
sets** for the same property. Which one wins is decided by the generated
stylesheet's rule order, not by position in the `class` attribute. Confirmed:
`<Avatar className="bg-indigo-2">` against the component's own `bg-silver-1`
rendered silver; a `w-10` against its `w-12` rendered at 12. Yumma CSS has no
`!important` escape hatch. **When a recipe needs a real per-instance override,
that is a real prop, not a className string** (Avatar's `tint`, Skeleton's `size`,
Toggle's `swatchClassName`). `className` is still fine for anything the component
leaves unset.

**Canon is blind to class maps** - it reads `className` attributes, which is
useless for a prop-driven component where classes live in
`const SHAPES = { rounded: "br-lg", square: "br-none" }`. `br-none` does not
exist and canon reported clean. `validate-yummacss.mjs` now also scans string
literals inside `UPPER_SNAKE` class maps plus any multi-token string whose tokens
*all* look like classes. Valid `br-` values: `0, xs, sm, md, lg, xl, xxl, 3xl,
100%, 50%, 9999, px`. Opacity is percentage-based, so `o-1` means 1%, not 1.

**Two layout bugs, one shape: a box that cannot shrink.** Both fixed 2026-08-28,
kept because both will recur.

*Sticky clamps to its containing block.* The sidebar's scroller asks for
`calc(100dvh - 5rem)`. On a page short enough not to scroll that is taller than
the grid row it sits in, and a sticky box may not be offset outside its
containing block, so it clamped to the grid top at y=0 - under the fixed 49px
navbar, eating the first section heading and its first link. `main` has no top
offset; the content column only clears the navbar because it carries `pt-12`.
Measured on 9 routes, 7 were affected, every Yumma UI component page among them.
Fixed with `@lg:pt-20` on the `<aside>`, matching `t-20` so the unscrolled and
stuck positions are identical. **The TOC and the playground rail sit in the same
grid and were fine** - they are short enough to fit, so sticky never clamped.
Anything new in that third column inherits the bug the moment it gets tall.

*Flex items default to `min-width: auto`.* The page title could not shrink below
its longest unbreakable run, so `@yummacss/runtime` pushed the header row 50px
past a 390px viewport while `Grid Template Columns` was fine. That is the whole
of the "weird" part: **hyphens and spaces are break opportunities, a slash is
not.** Fixed with `min-w-0` plus `ow-bw` on the `h1` and `fs-0` on the actions.
Note `ow-bw` alone does nothing here - `overflow-wrap: break-word` does not
reduce min-content size, so it cannot rescue a flex item that is not already
allowed to shrink. **`mw-0` is not a class**; it was sitting in `admonition.tsx`
doing nothing, which `validate-yummacss.mjs` had been reporting all along. The
min-width prefix is `min-w`.

**Base UI portals escape the iframe.** They resolve against the top-level
`document.body`, not the trigger's `ownerDocument`. Pass `container` from
`usePreviewContainer()`; threaded through 13 base components and 12 variant files.
The stage only passes it when the schema declares a `container` prop, otherwise it
hits the DOM as an unknown attribute. (This is also why `globals.css` still
matches `[role="listbox"]`, `[role="menu"]` and friends - the pre-iframe reset for
the same problem.)

**PreviewFrame height feedback loop.** Measure the inner `#root` div, never
`body`. Measuring body with `min-height: 100vh` grew frames to 1400px. And read
page styles **once as text** via `cssRules`: cloning `<link>` elements cost 22
network requests per scroll, versus 7 after.

**Shiki writes `class`, not `className`.** It sets `properties.class = "line"` as
a raw string, not hast's canonical `className`, so appending to `className`
emitted **two class attributes** and the browser silently dropped the second. The
damage was not cosmetic: the decorator strips `\n` text nodes deliberately,
because `d-b` is meant to supply the breaks, so 92 fences across 14 files rendered
with every line run together, in production. **If you add any class to Shiki
output, fold `properties.class` in.** Method worth reusing: count distinct
`getBoundingClientRect().top` values among line spans - a collapsed block has
fewer distinct tops than lines, which catches this by geometry rather than by eye.

**Merge timing on a long-running branch.** This bit twice: a PR merged at its
third commit while later commits were still being pushed, leaving the branch 40+
commits behind with `git rev-list --count main..branch` showing 0. Check whether
the PR merged out from under you before pushing. Recovery is
`git checkout -B <branch> origin/main` then replay the unmerged commits.

**A merge resolution can silently drop design.** When main and the branch both
built the same thing, taking main's side everywhere discarded
select-for-every-enum and the header install button, and the user saw nothing
after merging. Diff against the settled-design list after any conflict resolution.

**The dev server does not know registry files affect MDX pages.**
`remark-component-source.mjs` reads registry `.tsx` straight off disk, but
content-collections' watcher does not track that dependency, so editing a registry
file does not invalidate the cached page. `rm -rf .next .content-collections` and
restart before trusting what "Show code" renders.

**If a generated file has impossible syntax, regenerate before debugging.**
`content-collections` once left `allUis.js` with `]"path": "tooltip"` and every
route 500ing; Next's `.next/dev/types/routes.d.ts` duplicated a block and failed
typecheck with `TS1109`. Neither was a real bug.

**Do not run repo-wide `pnpm lint:fix`** - it reformats unrelated files across the
repo. Scope it to the touched files.

**`git checkout <sha> -- path` writes the index too**, so old files come back
*staged*. Unstage with `git reset -- src/` and delete leftovers via
`git ls-files --others --exclude-standard src/` rather than reaching for
`reset --hard` or `clean -fd`.

**On Windows, stopping a background task does not kill the `next dev` child.**
Orphans accumulate; one reached 3.6 GB RSS and hung. Kill by PID.

**pnpm's registry fetch flakes.** `ERR_PNPM_PNPM_ENGINE_IDENTITY_UNVERIFIABLE`
with `terminated` in the text is a truncated download, not a bad signature. The
identical setup step on the identical runner succeeded before and after the
failure, and it has now happened three times in one week across two unrelated
repos. **If a release appears stuck, re-run the job before changing anything.**

**A base demo that looks broken *is* broken, whatever the reason.** A `ReactNode`
prop cannot have a JSON example, which for most components costs a decoration and
for Popover and Toggle cost everything - an empty square and an empty circle, as
the first example on the page. Both shipped that way, twice, with a note to
myself that it was "expected given the mechanism". **The reader does not know the
mechanism.** Verify against the question a reader asks ("does this page show me
the component"), not only against the mechanism (does the class land, does the
type check).

**Not every odd pattern is a bug**, either. The original ~450 demo files were
DeepSeek-generated, which retroactively explains most defects found during the
migration and is good reason for suspicion - but suspicion still has to be
*checked*. A suspected Base UI children-replacement bug in the alert-dialog demos
was investigated and disproven; a false claim nearly went into a commit message.
The useful residue: **a generator copy-pastes a wrong pattern across ten files as
easily as a right one**, so "the majority of files agree" is evidence of shared
ancestry, not of correctness. Prefer: does it work when rendered, is it
internally consistent, does it match the component's own semantics.

**Verify positioned things by comparing bounding rects**, not by eye. Comparing
the Tabs indicator's rect to the selected tab's, in both orientations, before and
after switching, proved zero drift across a structural rewrite. Much stronger
than a screenshot.

**Base UI tooltips and Autocomplete popups do not open under synthetic pointer
events**, so their timing and contents cannot be self-verified. Right-click *does*
work, so context menus can be. Open the rest by hand before shipping.

**A default nobody can see is a default nobody can fix.** `TooltipBase` passed
`delay` straight through and the meta only said "Base UI's own default applies
when unset", which is how a 2s tooltip survived. State the number.

**Base UI 1.7 prop locations that the typecheck catches but memory does not:**
`openOnHover` and `delay` live on `Popover.Trigger`, not `Popover.Root`; tooltip
`delay` lives on `Tooltip.Provider`, not `Tooltip.Root`.

**In `react-resizable-panels` v4, bare numbers are pixels; in v3 they were
percentages.** `defaultSize={50}` silently became 50px. v4 also never fires
`onResize`, so panel open state comes from `isCollapsed()` plus the Group's
`onLayoutChange`. (`play` only.)

**`play`'s preview runtime is no longer a manual bump.** It loads
`@yummacss/runtime` from a CDN, so its version was never a dependency and no bot
could reach it - the pin sat at `3.29.2` while everything around it moved.
`next.config.ts` now reads the number off the `yummacss` devDependency and
inlines it, so Dependabot's PR moves the iframe too. Still pinned: the runtime
cannot change under a deployed build. Verified by bumping the spec and diffing
the built chunks.

**Do not eyeball theme colours out of `eclipsa.json` by scope name.** Run
`codeToTokens` on the exact construct and read the colours off the output. Shell
command `#F5FAFF`, argument `#BEC6F2`, space `#B9BED5`.

**`yummacss.com` 308-redirects to `www.yummacss.com`.** `curl` checks without
`-L` are not outages.

---

## Rejected. Do not rebuild

- **The editor extensions.** `intellisense` and `intellisense-zed` are deleted:
  repos gone, unpublished from the VS Code Marketplace and Open VSX, and the Zed
  marketplace PR (#6731, open since 2026-07-22) withdrawn. The 18k VSIX installs
  were read as bots, the same way the npm download counts are; the only real user
  was Renildo. **Do not re-propose an editor extension, and do not treat the
  download numbers as evidence of an audience.** Two live consequences: v4 no
  longer has to migrate any class-detection pattern to `d:f`, and the
  `yummacss.com/docs/${util.slug}` hover links no longer have a consumer - core's
  `slug` field now only feeds the docs, which changes who the `scroll-*` slug
  cleanup is for.
- **`@yummacss/intellisense` as a package** is likely to follow. The plan is for
  `play` to own completions, colour decorators and hovers itself. Not done, and
  the one thing to check before deleting: whether anything besides the extensions
  imported it, and where `play` gets its class list from once it does. This also
  closes most of the `any` density item in the small-monorepo list.

- **The blog timeline**, after ten mockups. Rejected because it introduces a
  rail, marker blocks and bordered thumbs - three pieces of visual vocabulary
  that exist nowhere else on the site. Two findings worth keeping: a staggered
  timeline scans *worse* (3 posts above the fold versus 5, because the eye
  zigzags), and a snake weave cannot carry year headings without breaking the
  line.
- **A releases page.** Built and reverted the same day. It re-rendered
  `CHANGELOG.md`, which GitHub already renders, so `/releases.md` was
  byte-identical to GitHub's raw file, and the route was invisible to site search
  because `search-data.ts` indexes only `allDocs` and `allUis`. **If the itch
  returns, build per-utility "added in 3.29" badges or a version switcher
  instead** - those carry information GitHub does not have.
- **A "For LLMs" docs page.** Replaced by the plain sidebar link to `/llms.txt`,
  which is what was wanted.
- **Driving the sidebar from frontmatter.** Section order and 16 nested groups
  would still need a config file, and numeric order across 254 files is exactly
  what had already drifted into four duplicate values.
- **Replacing the tooling pages with README links.** Canon's README documents
  neither `--config` nor `extractClasses`, and deleting the pages would drop
  canon from `llms.txt` and site search.
- **Anatomy sections** on Yumma UI pages. They exist in Base UI's docs because
  Base UI is headless and you *must* know the compound tree. This migration did
  the opposite on purpose: every migrated component is a single default-exported
  props-driven unit whose only other exports are TypeScript interfaces. An
  Anatomy tree would document an API surface the consumer does not have.
- **Landing page and logo redesign.** Both attempted, both dropped. **Do not
  restart unprompted.** Four landing directions (Specimen, Index, Mechanism,
  Marginalia) were rejected as "messy, hard to scan, overwhelming", and a calmer
  rebuild was dropped too; explicitly ruled out as too generic are a centred
  heading over centred buttons, and a code block comparing Yumma CSS to other
  frameworks. The logo brief sharpened to **one circle, one square and one
  triangle, white, sharp angles only**, eight arrangements were drawn, none
  chosen, and then it was shelved. Method note: mockups live at
  `public/mockups/` (gitignored) served by `next dev`, with real fonts copied out
  of `node_modules/@fontsource/*` so type is faithful.

---

## Yumma CSS v4

**Target was early September and the work has started**: `yummacss` branch `v4`
carries colon-syntax parsing and migrated fixtures. The rationale for holding v4
behind Yumma UI still stands as recorded: nobody uses Yumma CSS yet, a real
person is waiting on Yumma UI, and Yumma UI is what gives anyone a reason to
adopt the CSS. Decision #15 in the 4.0 draft already rejected a compat mode
because "the user base is one person who will be migrated by hand".

**The motivation, stated properly:** Cursor suggested Tailwind's `-m-4` to a real
user and she preferred it, and she already likes Tailwind. The lesson is not that
the docs are thin. It is that **the v3 dash syntax reads as a worse Tailwind
rather than as CSS**, which is the actual argument for the colon syntax.

**Nested variants: keep media + state, drop state+state.** Verified against the
generator: `f:h:bg-red` produces `.f\:h\:bg-red:focus:hover`, which is real but
almost useless; `@sm:h:bg-red` ("hover styles only above 40rem") is the valuable
case, since hover is unreliable on touch. Dropping state+state removes parser
surface and codemod cases at close to zero cost. Recorded as #20 in the 4.0 draft.
Also known: stacking is order-independent (`@sm:h:` == `h:@sm:`), and **two media
queries silently collapse** (`@sm:@lg:bg-red` emits only `64rem`, dropping `@sm`
with no warning).

### Killing custom classes, without arbitrary values

The goal is to remove the *need* to write custom CSS without adopting Tailwind's
arbitrary-value escape hatch. All three below take the same shape, which is why
they belong together: **move the thing into `yumma.config.mjs` and generate a
utility for it.** The user names a value once, in config, and gets a real utility
with a real name; they do not inline a value into a class and get an unnamed one.

1. **Custom font families. Asked for directly, 2026-08-28 - `theme.fonts`, so
   the docs can dogfood it and drop `.ff-e`.** Colours are already
   configurable; families are not,
   which is the whole reason `.ff-e` exists. Config gives `ff-<name>`. Two things
   to settle: the docs need `ff-e` scoped to `article h1..h6`, which a utility
   does not do by itself, so that rule stays and only the class definition goes;
   and `ff-m` plus the default family already exist as built-ins, so config has
   to merge rather than replace, exactly as `colors` does.
2. **A `container` config.** `.cnt {}` was cut in 3.0 for being opinionated, and
   that was right: **a built-in container is opinionated, a configured one is
   not.** This site would want **two**, so the config shape is a map of named
   containers, not a single value.
3. **Viewport-minus utilities. Asked for directly, 2026-08-28**, framed as the
   answer to Tailwind users reaching for an arbitrary value on a genuinely common
   need. `max-height: calc(100dvh - 5rem)` appears twice
   as an inline style (`sidebar-nav.tsx`, `toc.tsx`). Shape: the existing 0-384
   scale subtracted from `100dvh`/`100vh`, e.g. `max-h-dvh--20`. **The sharpest
   version of the case:** an inline style cannot be made conditional on a
   breakpoint, so the moment one of these needs to apply only at `@lg` it becomes
   a custom class. That has happened once already. Note every call site is
   `p-st t-20` **plus** the cap, because the offset and the cap must agree -
   confirm `t-` already covers the sticky half before designing this in isolation.

A fourth candidate: **named grids**. `gtc-12` gives twelve equal columns and
that is the only shape available, which is why the `/ui` redesign once reached for
a raw `grid-template-columns` rule. `grid: { docs: "14rem minmax(0,1fr) 22rem" }`
-> `gt-docs`, same shape as #2. This may be the strongest of the four, since
asymmetric layout is the commonest reason to drop out of utilities.

**Careful with the count.** Four config-driven generators is where the config file
starts to *be* the design system rather than configure it. Decide up front whether
the answer is four keys or one `theme.extend`-shaped mechanism, because
retrofitting that is a breaking change and 4.0 is the cheapest moment to get it
right.

### The 0-384 scale, the t-shirt aliases, and unbounded values

Measured, because the answers are not what they look like.

**384 is not arbitrary.** The base is `0.25rem` and the range is `0..384` step 1,
so `384 * 0.25rem = 96rem`, which is exactly the `xxl` breakpoint. **The scale
runs to the widest breakpoint and stops.** That is a defensible rule and it
should be written down as one rather than rediscovered.

**The t-shirt aliases are not redundant, with one exception.** `sm` 40rem, `md`
48rem, `lg` 64rem, `xl` 80rem and `xxl` 96rem are **identical to the media-query
breakpoints**, so `max-w-md` means "as wide as the `md` breakpoint" - a semantic
fact the numeric step cannot state, even though every one of them *is* also a
numeric step (`xs`=128, `sm`=160, `md`=192, `lg`=256, `xl`=320, `xxl`=384).
**`xs` at 32rem is the odd one out: there is no `xs` breakpoint.** So the answer
to "why do I even have these" is: keep them and document them as breakpoint
aliases, and either drop `xs` or add the breakpoint that would justify it.

**"Would unbounded values save SO MUCH code?" - not where it looks.** Generation
is scan-driven, so the scale costs **zero bytes of output CSS**; only classes
actually written are emitted. What it costs is the build-time value table: 385
numeric keys plus 37 aliases is 422 entries, and **34 utilities bind to one of
those scales, so ~14,300 entries are held per build**. Real, but it is memory and
table-building, not stylesheet weight. **The second argument for a small scale
was the IntelliSense completion list, and that argument died with the
extensions.**

**The idea is still right, for a better reason.** Parsing `w-97` and emitting
`calc(0.25rem * 97)` deletes the min/max question entirely - no cap to configure,
no ceiling to justify, no user asking to extend the range. It also stays on the
right side of the arbitrary-value line, and the distinction is worth stating in
the 4.0 post: **`w-97` still resolves through the named base, so it is a scale
step with no ceiling; `w-[24.25rem]` inlines a value and belongs to no scale.**
Unbounded is not arbitrary.

**What it costs, and what has to be decided first.** Canon stops being "is this
class in the set" and becomes "does this class parse", which changes
`validate()`, the canon list that has to ship with 4.0, and every consumer that
expected an enumerable list. Decide that *before* the canon list is built, not
after - it is the same "four keys or one mechanism" question as the config
generators above, and 4.0 is equally the cheapest moment for both.

**Do not rename `yumma.config.mjs`.** The asymmetry with the `yummacss` package
looks like a mistake and is the convention: `tailwindcss` ships
`tailwind.config.js`. The cost is not cosmetic either - 15 files in `docs` and 3
in the monorepo name it, plus every docs example, the blog posts and `play` - and
decision #15 rules out a compat mode, so `loadConfig` would hard-break rather
than accept both. Nothing is gained that a reader was confused by.

**The honest ceiling on the whole idea:** `globals.css` today has two custom
classes (`docs-container`, `ff-e`), which #1 and #2 would remove entirely, plus
one selector-scoped rule no utility can replace - the preview reset, which matches
Base UI portals in `<body>` by role and attribute. **Some CSS is a *selector*
problem, not a value problem.** Aim at the value problems and say so.

---

## Parked

- **Inspect mode**: overlay dimensions and the box model on a preview. Survives
  the `/ui` layout revert because it does not depend on any of it; attach it to
  the preview and leave the page structure alone.
- **Interactive palette on `colors.mdx`**: type a hex, see the 13 generated
  shades. Same blocker as exposing `yumma.config.mjs` in `play` - `loadConfig`
  genuinely reads from disk (`node:fs`, `node:crypto`, `tinyglobby`), so it
  cannot simply be re-exported from `@yummacss/nitro/browser`. Needs a real
  browser config path: parse a config from a string in memory rather than resolve
  and import a file.
- **A 4.1, for utilities that are additive rather than breaking.** Renildo's
  call, 2026-08-31: neither of these gates v4, so neither should delay it.
  - **Colored box-shadows.**
  - **Shorten what `gc-s-*` and `gr-s-*` emit.** `grid-column: span 3 / span 3`
    and `grid-column: span 3` are the same declaration - measured in Chromium,
    both render 120px, because the Grid spec discards the second span when a
    placement contains two. Across the 32 `grid-column`/`grid-row` values that
    is **956 to 654 bytes, 32% smaller**, with no rendering change and no class
    renamed, so it is **not breaking and does not need v4**.
  - **A `grid-column: 2 / 4` shorthand.** Lower value than it looks: `gcs-2
    gce-4` already does it, both taking 1-16. And `/` is the opacity separator
    (`bg-red/50`), so `gc-2/4` would parse as "gc-2 at 4% opacity" - it would
    cost a delimiter that already means something.
- **Delete the `skeleton` component and let `loading` cover it via a prop.** Way
  less code, and nothing obvious explains why nobody does this.
- **Base UI `ScrollArea` in the docs sidebars.** Worth doing for the look - it
  hides the native scrollbar and renders its own thumb, which is the difference
  between the chunky Windows bar and something that matches the site. **It does
  not fix scroll chaining**: checked `@base-ui/react@1.7.0`, the viewport sets
  `overflow: scroll` and never touches `overscroll-behavior`, so `ob-c` stays
  either way. Cost is four more elements per sidebar and a client component.
  Aesthetics, not correctness - after v4.
- **Light theme, and possibly no switch at all.** A light palette was drawn by
  accident in an artifact and looked better than the dark one. The interesting
  version of this is not "add a switch" but **pick one scheme and commit**, which
  is what the site already does - the palette is eight semantic colours with no
  light/dark pairs, so a switch means pairing every one of them. A theme revert
  has already cost a day once (see the Cursor branches around `#112`), and a
  second attempt by Cursor was reverted too because it did not resemble the
  artifact. **Work from the artifact, not from a description of it.**
  **Whatever happens, code blocks stay dark in the light theme.** The `eclipsa`
  token colours were picked against `#151724` and eyeballing replacements has
  already been ruled out (run `codeToTokens`, do not guess by scope name), so a
  light-mode syntax theme is a whole second colour system to design and verify.
  Dark code on a light page is also the norm - it reads as deliberate, not as an
  omission. That makes `surface` the one token that does not flip.
- **Stop `play` looking like Tailwind Play.** It is close to a clone: same split
  editor, same generated-CSS drawer, same top-left brand and top-right share.
  The reference points are `diffs.com` and `trees.software` - what they get right
  is that the *chrome* is the product: a real window frame with traffic lights, a
  file tree, tabs, per-line diff gutters, a command bar at the bottom. None of
  that is playground-specific and all of it reads as its own tool rather than a
  reskin. Possibly rename to `try.yummacss.com`. **The strategic point stands on
  its own**: Yumma CSS gets compared to Tailwind constantly, and the playground
  is the single most-seen surface, so it is the cheapest place to stop inviting
  the comparison. After v4 and the UI work.
