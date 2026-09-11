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

- having predefined colors is way TOO limiting… remove the color prop
- does it really make sense to have `defaultChecked` in the playground? it won’t survive a refresh so what’s the point? how do we solve this?
- two prop names are still one name with two meanings, and both need a call: Accordion's `icon` is an enum picking a built-in glyph (`chevron`/`plus-minus`) while `icon` is a ReactNode on twelve other components, and Skeleton's `size` takes literal utilities (`"w-9 h-9"`) while `size` is an enum on sixteen others
- we SHOULD be a bit more strict, some options are NOT meant to work with other options e.g. we should disable A if B is enabled when needed… maybe using the `diff-remove` color for the switch track to display that that switch is disabled
- why not create a prop to control focus? some people don’t like it… we can also create props to change the focus appearance too like outline color and outline offset (all Yumma CSS utilities btw)

### **Number Field**

- use the `TriangleFlag` icon instead of the `Folder` icon - **blocked**: Number Field has no icon slot at all, it only draws Minus and Plus on its steppers. Either this meant a different component, or it wants an icon prop adding first.

### Tooltip

- shouldn’t the `triggerTone` change the tooltip background color too? to red for example if set to danger?

### Onboarding

- you missed the checklist in the indicator prop and maybe this prop for this component specifically should be called `type`or get another name like `style` maybe

