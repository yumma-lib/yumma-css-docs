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
          includeCurrentVersion: true,
          versions: {
            '0.1.1': {
              label: '0.1.1',
              path: '0.1.1',
            },
            '0.1.0': {
              label: '0.1.0',
              path: '0.1.0',
            },
            '0.0.1': {
              label: '0.0.1',
              path: '0.0.1',
            },
            current: {
              label: 'Unreleased'
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
            href: "https://github.com/rrenildopereiraa/yumma-css",
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Contribute',
          },
          {
            href: "https://yummacss-editor.vercel.app/",
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'right',
            label: 'Web Editor'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right'
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
