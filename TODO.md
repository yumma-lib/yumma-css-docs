# Yumma UI and Yumma CSS: the list

One list, ordered by what blocks what. Phase 1 is what stops a release; Phase
6 is what happens after v4. Inside a phase, order is the order to do them in.

**Verify every entry against the code before acting on it.** Most are right
about the symptom and wrong about the cause, and several have turned out to
be already fixed.

When an entry is done it leaves this file and the finding goes in NOTES.md,
so the open count alone would flatter the progress. `Closed` is the number of
`- [x]` findings under **Phase 6** in NOTES.md, which is the record of the
work actually finished; `Open` is the `- [ ]` count here. Recount both rather
than adjusting the numbers by hand:

    grep -c '^- \[ \]' TODO.md

    Closed  67
    Open    43
    Done    61%

---

## Phase 1 - Broken

Things that do the wrong thing today. No decisions needed, no mockups.

- [ ] **Toolbar** plus and minus buttons get in the way of the Number Field
      part, and the focus ring paints behind the soft silver background.
- [ ] **Onboarding** `animatedResize` fades up and down inside the dialog; it
      should resize the dialog itself.

## Phase 2 - Content model

The per-component copy items are all instances of the first one, so it goes
first or they get done twice.

- [ ] **Define one content model and apply it everywhere.** Drop the SaaS
      framing the copy-and-paste system used. With the CLI the examples should
      be neutral and simple. Covers copywriting **and** icon choices.
- [ ] **Autocomplete** "Assign member" is too much context and the avatars are
      not needed. Same for **Combobox**.
- [ ] **Docs site** the button beside the navigation that copies the install
      command uses an arrow-down icon; it should be a copy icon, and with no
      label it says nothing about what it does.

## Phase 3 - API changes

Breaking for the registry, so they ship together in one release with the
renames already on `main`.

- [ ] **Checkbox and Switch** the toggle should drive `checked`, not
      `defaultChecked`.
- [ ] **Checkbox** `indeterminate` belongs to Checkbox Group. Keep the prop,
      drop its control, describe it as a boolean.
- [ ] **Radio** remove the leading and trailing icons.
- [ ] **Toggle** remove `tone`. It and `swatchClassName` are both too strict.
- [ ] **Empty State** `shape` controls the icon, not the buttons. Rename it
      `iconShape`.
- [ ] **Field and Textarea** the label and the character count should be
      optional.
- [ ] **Avatar** `fallback` should be controllable from the API sidebar.
- [ ] **Popover and Tooltip** should use `arrow` by default.
- [ ] **Autocomplete** no spinner when `loading` is `true`. Add one, and
      respect `animated`.
- [ ] **A prop to control focus.** Some people do not want a ring at all, and
      the appearance could be props too: outline colour, outline offset, all
      Yumma CSS utilities. Now unblocked, focus is settled.
- [ ] **JSDoc warnings** for interactions that lock each other, so the block
      and the reason reach anyone reading the source, not just the playground.

## Phase 4 - Wants mockups

Design decisions. Nothing here starts without them.

- [ ] **Number Field** visual revamp. **5 mockups.** The plus and minus icons
      are too small. (The focus ring around the whole component is done.)
- [ ] **Slider** should look like `Switch` with a longer track. **5 mockups.**
- [ ] **File Upload** barely customisable: the dashed border and the icon
      should both be the user's choice. Barely functional: drag and drop does
      nothing, the upload button does nothing, and dragging a file over it
      should change the border colour.
- [ ] Default every component to `square`, so Yumma UI matches the Yumma CSS
      docs.
- [ ] Drop indigo as the primary. Black or dark grey, with colour kept where
      it carries meaning: red for destructive, blue for links. Wants other
      takes alongside the grayscale one.
- [ ] Replace the stage's tab bar with the **browser window** treatment,
      redrawn in Yumma CSS's own colours. **3 mockups.** Not urgent.

## Phase 5 - Infrastructure

Nothing here blocks a release, and all of it makes the next change cheaper.

- [ ] **Shared icons module.** Every icon re-exported from one file, so
      changing icon library is one edit. Two half-versions exist already:
      `EXAMPLE_ICONS` in `src/utils/demo.tsx`, and per-component imports
      everywhere else.
- [ ] **Shared messages module.** The same for user-facing strings: empty
      states, hints, error copy. They sit inline as defaults today.
- [ ] Roll both out to `docs`, `play`, `yummacss` and `ui`.
- [ ] **Playground state in the URL.** Nothing survives a reload: every value
      reseeds from the schema. Right for a shared link, but you cannot send
      anyone the configuration you are looking at.

## Phase 6 - After v4

- [ ] **Coloured box-shadow utilities**, v4 or v4.1. Without them a
      halo-plus-ring focus treatment cannot be written at all.
- [ ] **Dark theme across every component.** Yumma CSS has handled dark since
      3.29.0, so this is a Yumma UI concern now. Big enough to be the headline
      of **1.0**. Mockups need a theme toggle from the start.
- [ ] **Remove Skeleton**, in favour of a new prop on every component.
- [ ] `snippets` joins the shared-constants rollout.

## Decisions

Blocked on Renildo. Each one holds up the entry beside it.

- [ ] **File Upload: remove it?** Base UI ships no primitive, and it is the
      least functional component in the set.
- [ ] **Avatar:** should `verified` and `status` be mutually exclusive rather
      than both at once?
- [ ] **Meter:** should `warning` be `yellow` rather than `orange`? Orange was
      chosen because the solid tone paints white on the fill.
- [ ] **Install command:** a dialog offering yarn and bun alongside pnpm and
      npm, a dropdown, or is a dialog overkill?
- [ ] **`bs-i-md` is invisible.** Alert Dialog's `inset` shadow is applied and
      unreadable: 10% black at 4px blur inside a white panel. It is a Yumma
      CSS token, so every component using it is the same. Strengthen the
      token, drop `inset` from the surfaces it cannot show on, or leave it?

## Known and accepted

Not bugs. Written down so they stop being rediscovered.

- Focus is treatment A and sits below WCAG 2.1 1.4.11. Measured at 1.21:1 for
  the outline and 1.80:1 for the border. Deferred deliberately: no users, and
  a CSS change is reversible. The same treatment one or two shades down the
  indigo scale would pass.
- Nothing in the playground survives a reload, by design, until the URL entry
  in Phase 5 lands.
