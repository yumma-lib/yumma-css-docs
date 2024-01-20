// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const vortyx = require('./src/themes/vortyx');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yumma CSS',
  tagline: 'The documentation site for Yumma CSS.',
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
          includeCurrentVersion: false,
        },
        blog: {
          postsPerPage: 5,
          blogSidebarTitle: 'All blogs',
          showReadingTime: true,
          blogSidebarCount: 50,
        },
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
            label: 'Blog',
            to: '/blog',
          },
          {
            href: "https://yummacss-editor.vercel.app/",
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Playground'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right'
          },
          {
            type: 'html',
            position: 'right',
            value: '<a href="https://github.com/yumma-lib" target="_blank" rel="noreferrer noopener" aria-label="GitHub"><i class="bi bi-github"></i></a>',
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
        theme: vortyx.light,
        darkTheme: vortyx.dark,
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
