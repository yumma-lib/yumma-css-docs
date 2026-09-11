## **Visual direction**

A separate pass from the API fixes. All three want mockups before any code.

### **Look and feel**

- default every component to `square`, so Yumma UI matches the Yumma CSS docs
- rework focus entirely. The solid outline is what everyone ships and it reads
  as unconsidered - a friend scored it 4/10. The direction is a soft outline
  plus a border-colour shift, drafted on play.yummacss.com:
  `fv:oc-indigo-2/60 fv:bc-indigo-3` over `bc-gray-2 bw-1`. Pairs with the
  existing Global entry about a focus prop. Contrast against WCAG 2.1 is a
  known concern, deliberately left until the look is settled.
- make every component dark-theme compatible. Yumma CSS has handled dark
  since 3.29.0, so this is a Yumma UI concern now, and it is big enough to be
  the headline of **1.0** rather than a patch. The mockups need a theme
  toggle from the start: the focus treatment was drafted against a light
  input, and a near-black primary changes what reads on a dark ground.
- replace the stage's tab bar with the **browser window** treatment from the
  earlier mockups, redrawn in Yumma CSS's own colours rather than the generic
  chrome that was drafted. The flat tab strip is the weakest part of the
  component page. Wants 3 fresh mockups first, and is **not urgent** - it goes
  after the bugs, whenever the remaining work is light enough.
- drop indigo as the primary. It is an opinionated colour; black or dark grey
  instead, with colour kept for the places it carries meaning - red for
  destructive, blue for links. Wants other takes alongside the grayscale one.

## **State-of-Yumma-UI report**

Renildo's pass over the whole library, 2026-09-11. Verify each against the
code before acting: most are right about the symptom.

### **Copy and context, library-wide**

- **Define one content model and apply it everywhere.** Drop the SaaS framing
  the old copy-and-paste system used. With the CLI the examples should be as
  neutral and simple as possible. Covers copywriting **and** icon choices, and
  every component follows the same model once it exists. Do this first: the
  per-component copy items below are instances of it.
- `Autocomplete`: "Assign member" is too much context, and the avatars are not
  needed. Same for `Combobox`.

### **Docs site**

- The button beside the navigation that copies the install command uses an
  arrow-down icon; it should be a copy icon. With no label it says nothing
  about what it does. **Open question:** a dialog offering yarn, bun and the
  rest alongside pnpm and npm, or is a dropdown enough, or is a dialog
  overkill?
- `/ui/components/accordion` shows `shape` and `indicatorPosition` in red on
  arrival, because `variant` defaults to `default`. The inert message should
  only appear once the user tries to interact with the control.

### **Autocomplete**

- No spinner when `loading` is `true`. Add one, and respect `animated`.

### **Checkbox**

- The toggle should drive `checked`, not `defaultChecked`. Same for `Switch`.
- `indeterminate` makes no sense here - `Checkbox Group` already supports it.
  Keep the prop, remove its control, describe it as a boolean in the API.

### **Combobox**

- Toggling `multiple` still shifts the layout: the whole component moves up
  when enabled and down when disabled. The chips row mounts empty, and the
  parent's gap counts it. The throw is fixed.

### **File Upload**

- Barely customisable: the dashed border and the icon should both be the
  user's choice.
- Barely functional: drag and drop does not work, and the upload button does
  nothing. Dragging a file over it should change the border colour, and there
  is more visual feedback it should have.
- **Open question:** Base UI ships no primitive for this. Remove it from
  Yumma UI?

### **Field**

- With `revealable` on, `iconPosition` and `iconInteractive` go red but stay
  clickable. An inert control should be locked, not just coloured.
- Warn about these interactions in JSDoc too, so the block and the reason
  reach anyone reading the source.
- The label and the character count should be optional. Same for `Textarea`.

### **Number Field**

- Wants a visual revamp. **5 mockups.** A focus outline around the whole
  component has never worked, and the plus and minus icons are too small.

### **Radio**

- Remove the leading and trailing icons.

### **Slider**

- Should look like `Switch` with a longer track. **5 mockups.**

### **Toggle**

- Remove `tone`. It and `swatchClassName` are both too strict.

### **Toggle Group**

- No icons render inside the toggle buttons; only border and background
  colours are applied.

### **Avatar**

- `fallback` should be controllable from the API sidebar.
- `verified` and `status` should not work together. **Open question:** either
  A or B rather than both?

### **Avatar Stack**

- Shows initials rather than avatars, so every one of them is falling back.

### **Meter**

- Should `warning` be `yellow` rather than `orange`?


### **Separator**

- `iconShape` draws no `square`, `circle` or `squircle` around the "Or".

### **Button**

- `iconOnly` does nothing until `icon` is also set.

### **Toolbar**

- The plus and minus buttons get in the way of the Number Field part, and the
  focus ring paints behind the soft silver background.

### **Alert Dialog**

- `inset` shadow does nothing.

### **Popover and Tooltip**

- Both should use `arrow` by default.

### **Empty State**

- `shape` controls the icon's shape, not the buttons'. Rename it `iconShape`.

### **Onboarding**

- `animatedResize` fades up and down inside the dialog; it should resize the
  dialog itself.
- It renders checkboxes by default. They should only appear when `indicator`
  is `checklist`.

### **Skeleton**

- Already slated for removal, in favour of a new prop on every component.

## **Shared constants**

One file per kind of thing that gets swapped wholesale, so swapping it is one
edit instead of a hunt. Not a new idea - it is the adapter/barrel pattern, and
shadcn/ui ships exactly an `icons.tsx` for this reason - but Yumma UI does not
do it and the CLI half does.

- **icons**: every icon the project uses, re-exported from one module, so
  changing icon library means editing that file and nothing else. Today a
  migration means finding every occurrence and matching each name by hand.
  Yumma UI has two half-versions already: `EXAMPLE_ICONS` in `src/utils/demo.tsx`
  for the playground, and per-component imports everywhere else.
- **messages**: the same treatment for user-facing strings - empty states,
  hints, error copy. Today they sit inline in each component as defaults.
- rolls out to `docs`, `play`, `yummacss` and `ui`. `snippets` later; it does
  not touch v4 or Yumma UI so it is out of scope for now.

## **API changes**

### **Global**

- **playground state in the URL.** Nothing survives a reload today: every
  value reseeds from the schema. That is right for a link someone shares, but
  it means you cannot send anyone the configuration you are looking at. Encode
  the non-default values as a query string and read them back on mount.
- why not create a prop to control focus? some people don’t like it… we can also create props to change the focus appearance too like outline color and outline offset (all Yumma CSS utilities btw)


