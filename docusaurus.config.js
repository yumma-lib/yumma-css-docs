// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const onyxTheme = require('./src/themes/onyx-theme');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yumma CSS',
  tagline: 'A CSS library for streamlined UI development.',
  favicon: 'img/favicon.ico',
  url: 'https://yummacss.vercel.app',
  baseUrl: '/',
  organizationName: 'yumma-lib',
  projectName: 'yumma-css-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: "https://github.com/yumma-lib/yumma-css-docs/blob/release",
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions: {
            '0.2.0': {
              label: 'v0.2.0',
              path: '0.2.0',
            },
            '0.1.1': {
              label: 'v0.1.1',
              path: '0.1.1',
            },
            '0.1.0': {
              label: 'v0.1.0',
              path: '0.1.0',
            },
            '0.0.1': {
              label: 'v0.0.1',
              path: '0.0.1',
            },
            current: {
              label: 'Canary'
            },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Yumma CSS',
        logo: {
          alt: 'Yumma CSS Logo',
          src: 'img/yumma-css.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: "https://yummacss-editor.vercel.app/",
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Web Editor'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right'
          },
          {
            type: 'html',
            position: 'right',
            value: '<a href="https://github.com/yumma-lib/yumma-css" target="_blank" rel="noreferrer noopener" aria-label="GitHub"><i class="bi bi-github"></i></a>',
          }
        ], 
      },
      footer: {
        logo: {
          alt: 'Yumma CSS logo',
          src: '/img/yumma-css.png',
          href: 'https://buymeacoffee.com/rrenildoo',
          width: 60,
          height: 60,
        },
        copyright: `© ${new Date().getFullYear()} Yumma CSS | Created with ❤️ by rrenildopereiraa`,
      },
      prism: {
        theme: onyxTheme.light,
        darkTheme: onyxTheme.dark,
      },
      algolia: {
        appId: process.env.APP_ID,
        apiKey: process.env.API_KEY,
        indexName: 'yummacss',
        contextualSearch: true,
        externalUrlRegex: "external\\.com|domain\\.com",
        searchParameters: {}
      },
    }),
};

module.exports = config;
