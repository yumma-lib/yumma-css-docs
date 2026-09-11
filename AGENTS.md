<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Writing

Short. These were said out loud enough times to belong in a file.

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

# Working

- PRs, never direct commits to `main`.
- Update NOTES.md in the same commit as the change. It is the source of truth;
  TODO.md is the list, one phase per blocking level, ordered within a phase.
- A closed entry leaves TODO.md and its finding goes in NOTES.md under the
  phase it belongs to. Then recount TODO.md's header block: closed is the
  `- [x]` count under NOTES.md's Phase 6, open is `- [ ]` in TODO.md. Report
  that percentage with every PR.
- Verify a TODO or NOTES entry against the code before acting on it. Most
  entries are right about the symptom and wrong about the cause.
