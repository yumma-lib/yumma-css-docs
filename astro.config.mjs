import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
import starlightLinksValidator from "starlight-links-validator";
import { ExpressiveCodeTheme } from "@astrojs/starlight/expressive-code";

import fs from "node:fs";

const theme = fs.readFileSync(
  new URL(`./theme.jsonc`, import.meta.url),
  "utf-8"
);

const ariakeTheme = ExpressiveCodeTheme.fromJSONString(theme);

export default defineConfig({
  integrations: [
    starlight({
      title: "Yumma CSS",
      expressiveCode: {
        themes: [ariakeTheme],

        styleOverrides: {
          frames: {
            shadowColor: false,
          },
          textMarkers: {
            markHue: "hsl(176, 73%, 77%)",
            markBackground: "hsla(176, 73%, 77%, 0.100)",
          },
        },
      },
      favicon: "/favicon.ico",
      logo: {
        alt: "Yumma CSS Logo",
        dark: "/public/assets/vectors/dark-logo.svg",
        light: "/public/assets/vectors/light-logo.svg",
        replacesTitle: true,
      },
      plugins: [
        starlightLinksValidator(),
        starlightBlog({
          authors: {
            Renildo: {
              name: "Renildo Pereira",
              picture: "https://avatars.githubusercontent.com/u/56491937?v=4",
              title: "Maintainer",
              url: "https://x.com/rrenildoo",
            },
          },
        }),
      ],
      social: {
        github: "https://github.com/yumma-lib/yumma-css",
      },
      customCss: ["/src/styles/custom.css"],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            href: "/apple-icon.png",
            sizes: "180x180",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "/og.png",
          },
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Installation", link: "docs/installation" },
            { label: "Components", link: "/components" },
            { label: "Playground", link: "https://play.yummacss.com" },
          ],
        },
        {
          label: "Concepts",
          items: [
            { label: "Color System", link: "docs/color-system" },
            { label: "Responsive Design", link: "docs/responsive-design" },
            { label: "Utility Classes", link: "docs/utility-classes" },
            { label: "Variants", link: "docs/variants" },
          ],
        },
        {
          label: "Base Styles",
          items: [{ label: "Stylecent", link: "docs/stylecent" }],
        },
        {
          label: "Backgrounds & Borders",
          items: [
            {
              label: "Backgrounds",
              autogenerate: { directory: "backgrounds" },
            },
            {
              label: "Borders & Outlines",
              items: [
                {
                  label: "Borders",
                  items: [
                    { label: "Border Collapse", link: "docs/border-collapse" },
                    { label: "Border Color", link: "docs/border-color" },
                    { label: "Border Radius", link: "docs/border-radius" },
                    { label: "Border Style", link: "docs/border-style" },
                    { label: "Border Width", link: "docs/border-width" },
                  ],
                },
                {
                  label: "Outlines",
                  items: [
                    { label: "Outline Color ", link: "docs/outline-color" },
                    { label: "Outline Offset", link: "docs/outline-offset" },
                    { label: "Outline Style", link: "docs/outline-style" },
                    { label: "Outline Width", link: "docs/outline-width" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Box Model",
          autogenerate: { directory: "box-model" },
        },
        {
          label: "Effects & Filters",
          items: [
            { label: "Backdrop Blur", link: "docs/backdrop-blur" },
            { label: "Box Shadow", link: "docs/box-shadow" },
            { label: "Opacity", link: "docs/opacity" },
          ],
        },
        {
          label: "Flexbox & Grid",
          items: [
            {
              label: "Flexbox",
              items: [
                { label: "Align Content", link: "docs/align-content" },
                { label: "Align Items", link: "docs/align-items" },
                { label: "Align Self", link: "docs/align-self" },
                { label: "Flex Basis", link: "docs/flex-basis" },
                { label: "Flex Direction", link: "docs/flex-direction" },
                { label: "Flex Grow", link: "docs/flex-grow" },
                { label: "Flex Shrink", link: "docs/flex-shrink" },
                { label: "Flex Wrap", link: "docs/flex-wrap" },
                { label: "Flex", link: "docs/flex" },
                { label: "Justify Content", link: "docs/flex-wrap" },
                { label: "Justify Items", link: "docs/justify-items" },
                { label: "Justify Self", link: "docs/justify-self" },
              ],
            },
            {
              label: "Grid",
              items: [
                { label: "Column Gap", link: "docs/column-gap" },
                { label: "Gap", link: "docs/gap" },
                { label: "Grid Auto Columns", link: "docs/grid-auto-columns" },
                { label: "Grid Auto Flow", link: "docs/grid-auto-flow" },
                { label: "Grid Auto Rows", link: "docs/grid-auto-rows" },
                { label: "Grid Column", link: "docs/grid-column" },
                { label: "Grid Row", link: "docs/grid-row" },
                {
                  label: "Grid Template Columns",
                  link: "docs/grid-template-columns",
                },
                {
                  label: "Grid Template Rows",
                  link: "docs/grid-template-rows",
                },
                { label: "Row Gap", link: "docs/row-gap" },
              ],
            },
          ],
        },
        {
          label: "Layout",
          autogenerate: { directory: "layout" },
        },
        {
          label: "Miscellaneous",
          autogenerate: { directory: "miscellaneous" },
        },
        {
          label: "Tables",
          items: [
            { label: "Captions Side", link: "docs/caption-side" },
            { label: "Table Layout", link: "docs/table-layout" },
          ],
        },
        {
          label: "Typography",
          items: [
            {
              label: "Font",
              items: [
                { label: "Font Family", link: "docs/font-family" },
                { label: "Font Size", link: "docs/font-size" },
                { label: "Font Style", link: "docs/font-style" },
                { label: "Font Weight", link: "docs/font-weight" },
              ],
            },
            {
              label: "Text",
              items: [
                { label: "Text Align ", link: "docs/text-align" },
                { label: "Text Color", link: "docs/text-color" },
                {
                  label: "Text Decoration Color",
                  link: "docs/text-decoration-color",
                },
                {
                  label: "Text Decoration Line",
                  link: "docs/text-decoration-line",
                },
                {
                  label: "Text Decoration Style",
                  link: "docs/text-decoration-style",
                },
                {
                  label: "Text Decoration Thickness",
                  link: "docs/text-decoration-thickness",
                },
                { label: "Text Decoration", link: "docs/text-decoration" },
                { label: "Line Height", link: "docs/line-height" },
                { label: "Line Style Type", link: "docs/list-style-type" },
                { label: "Overflow Wrap", link: "docs/overflow-wrap" },
              ],
            },
          ],
        },
      ],
    }),
    AutoImport({
      imports: [
        // Import a component’s default export
        "/src/components/Color.astro",
        "/src/components/Footer.astro",
        "/src/components/Hover.astro",
        "/src/components/Live.astro",
        "/src/components/Palette.astro",
        "/src/components/Utility.astro",
        {
          // Import a module’s named exports
          "@astrojs/starlight/components": [
            "Aside",
            "Card",
            "CardGrid",
            "Code",
            "FileTree",
            "Icon",
            "Steps",
            "TabItem",
            "Tabs",
          ],
          "/src/constants/card.ts": [
            "regularCard",
            "tailwindCard",
            "yummaCard",
          ],
          "starlight-showcases": ["ShowcaseText", "ShowcaseImage"],
        },
      ],
    }),
  ],
});
