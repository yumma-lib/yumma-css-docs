/**
 * How Yumma CSS is wired up, per framework.
 *
 * A component you copy in is unstyled until Yumma CSS is generating, so every
 * component page shows this beside its snippet. Declared once here rather than
 * written into each page: 39 copies of a setup guide is 39 things to drift.
 *
 * Keep in step with `/docs/installation`, which is the long version.
 */
export interface Setup {
  /** Tab label. */
  title: string;
  /** File the snippet belongs in, shown under the tab. */
  file: string;
  code: string;
}

export const SETUP: Setup[] = [
  {
    title: "Vite",
    file: "vite.config.ts",
    code: `import { defineConfig } from "vite";
import yummacss from "@yummacss/vite";

export default defineConfig({
  plugins: [yummacss()],
});`,
  },
  {
    title: "Next.js",
    file: "postcss.config.mjs",
    code: `export default {
  plugins: {
    "@yummacss/postcss": {},
  },
};`,
  },
  {
    title: "CSS entry",
    file: "globals.css",
    code: `@yummacss;`,
  },
];
