<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Writing

Short. These were said out loud enough times to belong in a file.

- **PR bodies**: link every component you name to its page,
  `https://www.yummacss.com/ui/components/<id>`, with the link on the bold
  heading itself.
- **PR bodies**: one short block per topic, each under its own bold heading,
  then the checks line (`tsc`, test count, biome, `next build`). A sentence or
  two per topic saying **what changed**, and nothing else. No cause, no
  history, no justification: a reader outside the project does not care why a
  thing was renamed from A to B. The why goes in NOTES.md.
- **Commit messages**: a subject and a couple of lines. No essays.
- **Code comments**: one or two lines. A comment earns its length only where
  the code is genuinely surprising, and never by repeating the same paragraph
  in a dozen files - put it in NOTES.md once and point at it.
- **No attribution footers** in commits or PRs. `.claude/settings.json` clears
  them; do not add them by hand either.
- No em dashes.
- Never name another framework to explain a Yumma decision.

# Content model

What the examples are *about*, which is a separate question from how the copy
is written.

- One world: a person looking after their own files and settings. Files,
  folders, documents, search, themes, shortcuts, formatting.
- No organisations. No teams, members, roles, invitations, plans, billing,
  invoices, subscriptions, sprints or boards. A component demo that needs a
  second person to make sense is the wrong demo.
- People appear only where the component is about a person: Avatar, Avatar
  Stack, Preview Card. One person, not a cast, and nowhere else.
- Icons name the thing they sit beside. An icon chosen for decoration is a
  content decision, not a visual one, and belongs to this list.
- `tests/content-model.test.ts` holds the mechanical half.

# Shape

- `square` is no radius, `squircle` is `br-xxl cs-s`, and `rounded` is the
  natural round for that control: `br-sm` on a checkbox, `br-lg` on a panel,
  `br-9999` on a switch or a track, which is already a capsule at that height.
- `pill` appears only where a smaller `rounded` also makes sense, so a
  component offering both keeps them different. Never add `pill` as a synonym.
- Shape is not a style axis where it is the affordance. A radio is round
  because round means *one of these* and square means *any of these*, so it
  has no `shape` prop at all. Ask that question before adding one.
- `tests/registry.test.ts` holds the mechanical half.

# Working

- PRs, never direct commits to `main`. One PR per phase, on a branch named
  `feat/`, `fix/` or `chore/` plus a word or two of plain English. No hashes,
  no generated suffixes, nothing long.
- Every branch starts at `main` and every PR targets `main`. Never stack one on
  another: a stacked PR merged after its base has already gone up the chain
  lands on a dead branch and never reaches `main`, and it reports itself
  merged. Wait for `main` instead.
- Base UI primitives over raw HTML. A `<button>`, `<input>`, `<fieldset>` or
  anything else with a primitive uses it; where a primitive has to render a
  different element, that is its `render` prop, not a raw tag. Raw tags are for
  what Base UI has no part for: layout, text, lists.
- Update NOTES.md in the same commit as the change. It is the source of truth;
  TODO.md is the list, one phase per blocking level, ordered within a phase.
- A closed entry leaves TODO.md and its finding goes in NOTES.md under the
  phase it belongs to. Then recount TODO.md's header block: closed is the
  `- [x]` count under NOTES.md's Phase 6, open is `- [ ]` in TODO.md. Report
  that percentage with every PR.
- Verify a TODO or NOTES entry against the code before acting on it. Most
  entries are right about the symptom and wrong about the cause.
