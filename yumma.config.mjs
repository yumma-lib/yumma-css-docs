import { defineConfig } from "yummacss";

export default defineConfig({
  source: ["./src/**/*.{ts,tsx,mdx,mjs}"],
  theme: {
    colors: {
      // Brand / chrome
      page: "151724",
      surface: "1a1d2e",
      "surface-2": "1f2237",
      border: "232741",
      "border-strong": "6b7399",

      text: "e7e9f6",
      "text-dim": "a0a6c9",

      accent: "c5cdf5",
      "accent-dim": "a8b0e8",
      "accent-hover": "d8ddf8",
      "accent-soft": "252a45",
      "on-accent": "151724",
      focus: "c5cdf5",

      // Docs-specific
      code: "e0b3f5",
      "diff-add": "7dca8a",
      "diff-remove": "e8a0a0",
    },
  },
});
