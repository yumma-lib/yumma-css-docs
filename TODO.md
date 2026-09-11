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

- remove **Collapsible** component entirely
- having predefined colors is way TOO limiting… remove the color prop
- what if we split Meter component into two? Meter and Progress? My original idea was to swap these two Base UI primitives using the animate prop but this might be not the best way just because accessibility and their API and overall meaning might be very diff from each other… We need to check if one extends another too to really see if split makes sense
- does it really make sense to have `defaultChecked` in the playground? it won’t survive a refresh so what’s the point? how do we solve this?
- prop names MUST be consistent across ALL other Yumma UI components, I see VERY similar props with diff names and this for an API is VERY UGLY. e.g `iconSide` and `iconPosition` just pick one of them and reuse it across other Yumma UI components
- we SHOULD be a bit more strict, some options are NOT meant to work with other options e.g. we should disable A if B is enabled when needed… maybe using the `diff-remove` color for the switch track to display that that switch is disabled
- in the menu page clicking on the example trigger then click open in the playground option then switching the open playground option will break the trigger in the example… it won’t open anymore for some reason… bug? gotta check other componente to catch similar patterns...
- why not create a prop to control focus? some people don’t like it… we can also create props to change the focus appearance too like outline color and outline offset (all Yumma CSS utilities btw)

### **Autocomplete**

- When you click to open the autocomplete results and then click on disable the menu should close

### **Field**

- remove the `multiline` prop

### **Number Field**

- use the `TriangleFlag` icon instead of the `Folder` icon - **blocked**: Number Field has no icon slot at all, it only draws Minus and Plus on its steppers. Either this meant a different component, or it wants an icon prop adding first.

### **Accordion**

- `subtle` from `variant` have its copy content kissing the parent container but `border` and `ghost` have proper spacing?

### **Avatar**

- `squircle` is just a `circle` in the when set
- `default`options should either set `status` or `verified` not both at the same time

### **Breadcrumb**

- `chevron` icon is too small compared to the `slashes` icon

### Preview Card

- **0024eee** before making Yumma UI I had great copy content and now after the migration there is just this lifeless “Card content goes here.” phrase… restore original content please. (use commit ef1b54f or https://docs-97eq39ar2-rrenildopereiraas-projects.vercel.app/ to see the preview of the Yumma UI components if needed

### **Context Menu**

- `iconSide` won’t work without an icon so having it literally does nothing

### Menu

- `iconSide` won’t work without an icon so having it literally does nothing

### Menubar

- `iconSide` won’t work without an icon so having it literally does nothing

### Tooltip

- shouldn’t the `triggerTone` change the tooltip background color too? to red for example if set to danger?

### Onboarding

- using indicator set to count and dismissible set to true looks weird because the indicator and the X icon are almost kissing each other
- you missed the checklist in the indicator prop and maybe this prop for this component specifically should be called `type`or get another name like `style` maybe
there is an intentional grow animation when the onboarding container grows, make that animation a prop
