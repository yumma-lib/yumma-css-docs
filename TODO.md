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

    Closed  104
    Open    18
    Done    85%

---

## Phase 1 - Broken

Empty.


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

- [ ] **Field and Textarea: the label should be optional.** The counter half
      is done, at `maxLength: 0`. The label needs a way to be turned off that
      is not a text control: strings are documented, not driven.
- [ ] **A prop to control focus.** Some people do not want a ring at all, and
      the appearance could be props too: outline colour, outline offset, all
      Yumma CSS utilities. The indigo change has been and gone, so the pairing
      this entry was waiting for is spent: the focus classes get rewritten a
      second time whenever this lands.

## Phase 4 - Wants mockups

Design decisions. Nothing here starts without them.

- [ ] Replace the stage's tab bar with the **browser window** treatment,
      redrawn in Yumma CSS's own colours. **3 mockups.** Not urgent.

## Phase 5 - Infrastructure

Nothing here blocks a release, and all of it makes the next change cheaper.

- [ ] **Shared messages module.** User-facing strings in one file: empty
      states, hints, error copy. They sit inline as defaults today. Same edge
      as the icons module, and for the same reason: site only, never the
      registry.
- [ ] Give `play`, `yummacss` and `ui` their own icons and messages modules.
      Each repo gets its own file. This is not one module shared across four
      repos.
- [ ] **Playground state in the URL.** Nothing survives a reload: every value
      reseeds from the schema. Right for a shared link, but you cannot send
      anyone the configuration you are looking at.

## Phase 6 - After v4

- [ ] **Coloured box-shadow utilities**, v4 or v4.1. Without them a
      halo-plus-ring focus treatment cannot be written at all.
- [ ] **Attribute variants**, v4. Base UI marks popup enter and exit with
      `data-starting-style` and `data-ending-style`, and Yumma has no variant
      that can select an attribute. They are the last hand-written classes in
      the registry: without them the popup animations cannot be utilities.
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
- [ ] **Install command:** a dialog offering yarn and bun alongside pnpm and
      npm, a dropdown, or is a dialog overkill?
- [ ] **`bs-i-md` is invisible.** Alert Dialog's `inset` shadow is applied and
      unreadable: 10% black at 4px blur inside a white panel. It is a Yumma
      CSS token, so every component using it is the same. Strengthen the
      token, drop `inset` from the surfaces it cannot show on, or leave it?

## Known and accepted

Not bugs. Written down so they stop being rediscovered.

- Focus is treatment A and sits below WCAG 2.1 1.4.11. It was 1.21:1 for the
  outline and 1.80:1 for the border on indigo, and the silver pair that
  replaced it is no better. Deferred deliberately: no users, and a CSS change
  is reversible. A darker ring, `slate-4` or lower, would pass.
- Nothing in the playground survives a reload, by design, until the URL entry
  in Phase 5 lands.
- Number Field and Toolbar ring the input, not the group around it, so the
  steppers sit outside the ring. Chosen knowingly: `fv:` everywhere is worth
  more than a ring that wraps the whole control, which only `fw:` can draw.
- The focus ring's transition needs `outline-color` in `tp-c`, which landed in
  the yummacss repo. It reaches the docs on the next Yumma CSS release.
