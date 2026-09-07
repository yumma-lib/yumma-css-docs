export interface SidebarSection {
  title: string;
  items: (string | { title: string; items: string[] })[];
}

export interface SidebarLink {
  title: string;
  href: string;
}

/**
 * Links rendered at the end of the docs nav.
 *
 * Kept out of `sidebarConfig` on purpose: that maps slugs to content pages &
 * everything reading it - prev/next, llms.txt & the build-time
 * sidebar check - expects every entry to resolve to an `.mdx` file. These are
 * routes, not pages, so they are only ever rendered by the nav.
 */
export const docsLinks: SidebarLink[] = [
  { title: "llms.txt", href: "/llms.txt" },
];

export const sidebarConfig = {
  docs: [
    {
      title: "Get Started",
      items: ["installation", "configuration"],
    },
    {
      title: "Customization",
      items: ["colors", "dark-mode"],
    },
    {
      title: "Handbook",
      items: [
        "naming-convention",
        "normalize",
        "negative-values",
        "class-merge",
      ],
    },
    {
      title: "Variants",
      items: [
        "media-queries",
        "pseudo-classes",
        "pseudo-elements",
        "nested-variants",
      ],
    },
    {
      title: "Background",
      items: [
        "background-attachment",
        "background-clip",
        "background-origin",
        "background-position",
        "background-repeat",
        "background-size",
      ],
    },
    {
      title: "Border & Outline",
      items: [
        {
          title: "Border",
          items: [
            "border-collapse",
            "border-spacing",
            "border-style",
            "border-width",
          ],
        },
        {
          title: "Outline",
          items: ["outline-offset", "outline-style", "outline-width"],
        },
      ],
    },
    {
      title: "Radius & Corner",
      items: ["border-radius", "corner-shape"],
    },
    {
      title: "Box Model",
      items: [
        "aspect-ratio",
        "block-size",
        "box-sizing",
        "height",
        "inline-size",
        "margin",
        "padding",
        "width",
      ],
    },
    {
      title: "Colors",
      items: [
        "accent-color",
        "background-color",
        "border-color",
        "caret-color",
        "color-scheme",
        "color",
        "fill",
        "outline-color",
        "stroke",
        "text-decoration-color",
      ],
    },
    {
      title: "Effects",
      items: [
        "backdrop-blur",
        "backdrop-grayscale",
        "blur",
        "box-shadow",
        "grayscale",
        "mix-blend-mode",
        "opacity",
      ],
    },
    {
      title: "Flexbox & Grid",
      items: [
        {
          title: "Flexbox",
          items: [
            "align-content",
            "align-items",
            "align-self",
            "flex",
            "flex-basis",
            "flex-direction",
            "flex-grow",
            "flex-shrink",
            "flex-wrap",
            "justify-content",
            "justify-items",
            "justify-self",
            "order",
          ],
        },
        {
          title: "Grid",
          items: [
            "column-gap",
            "gap",
            "grid-auto-columns",
            "grid-auto-flow",
            "grid-auto-rows",
            "grid-column",
            "grid-row",
            "grid-template-columns",
            "grid-template-rows",
            "place-content",
            "place-items",
            "place-self",
            "row-gap",
          ],
        },
      ],
    },
    {
      title: "Interactivity",
      items: [
        "appearance",
        "cursor",
        "field-sizing",
        "overscroll-behavior",
        "pointer-events",
        "resize",
        "scroll-behavior",
        "scroll-margin",
        "scroll-padding",
        "scroll-snap-align",
        "scroll-snap-stop",
        "scroll-snap-type",
        "touch-action",
        "user-select",
      ],
    },
    {
      title: "Layout",
      items: ["clear", "display", "float", "isolation", "table-layout"],
    },
    {
      title: "Positioning",
      items: [
        "bottom",
        "inset",
        "left",
        "object-fit",
        "object-position",
        "overflow",
        "position",
        "right",
        "top",
        "visibility",
        "z-index",
      ],
    },
    {
      title: "Transform",
      items: [
        "rotate",
        "scale",
        "scale-z",
        "skew",
        "transform-origin",
        "translate",
      ],
    },
    {
      title: "Transition",
      items: [
        "transition-delay",
        "transition-duration",
        "transition-property",
        "transition-timing-function",
      ],
    },
    {
      title: "Typography",
      items: [
        {
          title: "Fonts",
          items: ["font-family", "font-size", "font-style", "font-weight"],
        },
        {
          title: "Text",
          items: [
            "letter-spacing",
            "line-height",
            "list-style-position",
            "list-style-type",
            "overflow-wrap",
            "text-align",
            "text-decoration-line",
            "text-decoration-style",
            "text-decoration-thickness",
            "text-decoration",
            "text-indent",
            "text-orientation",
            "text-overflow",
            "text-transform",
            "text-underline-offset",
            "text-wrap",
            "vertical-align",
            "white-space",
            "word-break",
            "writing-mode",
          ],
        },
      ],
    },
    {
      title: "Utils",
      items: ["vite", "postcss", "runtime", "canon", "core"],
    },
  ] satisfies SidebarSection[],
  ui: [
    { title: "Get Started", items: ["installation", "cli", "customization"] },
    {
      title: "Forms",
      items: [
        "autocomplete",
        "checkbox",
        "combobox",
        "file-upload",
        "field",
        "number-field",
        "radio",
        "select",
        "slider",
        "switch",
        "textarea",
        "toggle",
        "toggle-group",
      ],
    },
    {
      title: "Display",
      items: [
        "accordion",
        "avatar",
        "avatar-stack",
        "badge",
        "breadcrumb",
        "collapsible",
        "meter",
        "preview-card",
        "progress",
        "separator",
      ],
    },
    {
      title: "Interactive",
      items: ["button", "button-group", "context-menu", "menu", "menubar"],
    },
    { title: "Navigation", items: ["tabs", "toolbar"] },
    {
      title: "Overlays",
      items: [
        "alert-dialog",
        "command-palette",
        "dialog",
        "popover",
        "tooltip",
      ],
    },
    {
      title: "Application UI",
      items: ["empty-state", "onboarding", "rating", "skeleton"],
    },
  ] satisfies SidebarSection[],
};
