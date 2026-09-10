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

- Don't use the `PageSearch` icon, use the `Search` icon instead
- When you click to open the autocomplete results and then click on disable the menu should close

### **Checkbox**

- `defaultChecked` and `checked` should turn the checkbox on
- `indeterminate` should display child checkboxes, just one isn't enough

### **Combobox**

- `multiple` will result in Cannot read properties of null (reading 'map')
- `clearable` doesn't add a clear button to the combobox to clear the combobox

### **Field**

- use the `Folder` icon instead of the `Mail` icon
- remove the `multiline` prop

### **Number Field**

- use the `TriangleFlag` icon instead of the `Folder` icon

### **Switch**

- `defaultChecked` prop does nothing?

### **Toggle**

- `defaultPressed` does nothing?

### **Accordion**

- `subtle` from `variant` have its copy content kissing the parent container but `border` and `ghost` have proper spacing?

### **Avatar**

- `squircle` is just a `circle` in the when set
- `default`options should either set `status` or `verified` not both at the same time

### **Breadcrumb**

- `chevron` icon is too small compared to the `slashes` icon

### Preview Card

- **0024eee** before making Yumma UI I had great copy content and now after the migration there is just this lifeless “Card content goes here.” phrase… restore original content please. (use commit ef1b54f or https://docs-97eq39ar2-rrenildopereiraas-projects.vercel.app/ to see the preview of the Yumma UI components if needed

### Button

- the `iconOnly` doesn’t actually remove the label to become icon only

### **Context Menu**

- when i click to trigger the menu there is an unwanted black thick border around the menu and when i hover over one of the menu items it also shows up
- `iconSide` won’t work without an icon so having it literally does nothing

### Menu

- `iconSide` won’t work without an icon so having it literally does nothing

### Menubar

- `iconSide` won’t work without an icon so having it literally does nothing

### Tabs

- when using the `pill` in the `shape` option the the Tabs track turns into a circle and the tab items overflow its container which looks VERY unpleasant to look at. This happens ONLY when using `horizontal` set to `vertical.` this happens because we are not strict at all. you have to look at https://docs-97eq39ar2-rrenildopereiraas-projects.vercel.app/ui/components/tabs to understand better the solution.

### Alert Dialog

- there is no outbound animation like in https://docs-97eq39ar2-rrenildopereiraas-projects.vercel.app/ui/components/alert-dialog

### Dialog

- spacing here looks terrible when it comes to the parent container, copy from Alert Dialog which looks good
- there is no outbound animation like in https://docs-97eq39ar2-rrenildopereiraas-projects.vercel.app/ui/components/dialog

### Tooltip

- shouldn’t the `triggerTone` change the tooltip background color too? to red for example if set to danger?

### Onboarding

- don’t use the `Star` icon use the `SparksSolid` icon
- using indicator set to count and dismissible set to true looks weird because the indicator and the X icon are almost kissing each other
- you missed the checklist in the indicator prop and maybe this prop for this component specifically should be called `type`or get another name like `style` maybe
there is an intentional grow animation when the onboarding container grows, make that animation a prop
