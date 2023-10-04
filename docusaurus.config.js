// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const onyxTheme = require('./src/themes/onyx-theme');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yumma CSS',
  tagline: 'A CSS library for streamlined UI development.',
  favicon: 'img/favicon.ico',
  url: 'https://yummacss.netlify.app',
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
          includeCurrentVersion: true
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
            href: "https://github.com/rrenildopereiraa/yumma-css",
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Contribute',
          },
          {
            href: "https://twitter.com/yummacss",
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'right',
            label: 'Twitter'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            label: 'Canary'
          }
        ], 
      },
      footer: {
        logo: {
          alt: 'Created with ❤️ by rrenildopereiraa',
          src: '#',
          href: 'https://buymeacoffee.com/rrenildoo',
          width: 160,
          height: 51,
        },
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
        externalUrlRegex: 'external\\.com|domain\\.com',
        searchParameters: {},
        searchPagePath: 'search',
        replaceSearchResultPathname: {
          from: '/docs/',
          to: '/',
        },
      },
    }),
};

module.exports = config;
