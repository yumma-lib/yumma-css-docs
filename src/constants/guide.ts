import { getMinifiedImport } from "../utils/getMinifiedImport";

export const guide = {
  angular: {
    onCSS: getMinifiedImport("../node_modules/yummacss/dist/yumma.min.css"),
    onPage: `
<div class="h-1/1 ins">
    <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Angular</h1>
</div>
    `,
  },
  astro: {
    onCSS: `
<style is:global>
    ${getMinifiedImport("/node_modules/yummacss/dist/yumma.min.css")}
</style>
    `,
    onPage: `
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Welcome to Astro.">
    <div class="h-1/1 ins">
        <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Astro</h1>
    </div>
</Layout>
    `,
  },
  cdn: {
    onHead: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Minified version -->
    <link href="https://cdn.jsdelivr.net/gh/yumma-lib/yumma-css@latest/dist/yumma.min.css" rel="stylesheet" crossorigin="anonymous" />
  </head>
  <body>
    <div class="h-1/1 ins">
      <h1 class="fs-xxl fw-500 tc-pink">Try Yumma CSS CDN</h1>
    </div>
  </body>
</html>
    `,
  },
  nextjs: {
    onCSS: getMinifiedImport("yummacss/dist/yumma.min.css"),
    onPage: `
export default function Home() {
    return (
        <div className="h-1/1 ins">
            <h1 className="fs-xxl fw-500 tc-pink">Yumma CSS + Next.js</h1>
        </div>
    );
}
    `,
  },
  nodejs: {
    onCSS: getMinifiedImport(),
    onPage: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <div class="h-1/1 ins">
      <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Node.js</h1>
    </div>
  </body>
</html>
    `,
  },
  nuxtjs: {
    onCSS: getMinifiedImport(),
    onConfig: `
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["/assets/global.css"],
});
    `,
    onPage: `
<template>
    <div class="h-1/1 ins">
        <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Nuxt.js</h1>
    </div>
</template>
    `,
  },
  preact: {
    onCSS: getMinifiedImport(),
    onPage: `
export function Home() {
    return (
        <div class="h-1/1 ins">
            <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Preact</h1>
        </div>
    );
}
    `,
  },
  react: {
    onCSS: getMinifiedImport(),
    onPage: `
import "./App.css";

function App() {
    return (
        <div class="h-1/1 ins">
            <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + React</h1>
        </div>
    );
}

export default App;
    `,
  },
  solidjs: {
    onCSS: getMinifiedImport(),
    onPage: `
function App() {
    return (
        <div class="h-1/1 ins">
            <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Solid.js</h1>
        </div>
    );
}

export default App;
    `,
  },
  svelte: {
    onCSS: getMinifiedImport(),
    onComponent: `
<script>
    import "../global.css";
</script>

<slot />
    `,
    onPage: `
<div class="h-1/1 ins">
    <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Svelte</h1>
</div>
    `,
  },
  vue: {
    onCSS: getMinifiedImport(),
    onPage: `
<template>
    <div class="h-1/1 ins">
        <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Vue</h1>
    </div>
</template>
    `,
  },
  dotnet: {
    onCSS: getMinifiedImport("/lib/yummacss/dist/yumma.min.css"),
    onPage: `
<div class="h-1/1 ins">
    <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + .NET</h1>
</div>
    `,
  },
};
