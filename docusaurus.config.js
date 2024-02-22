// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const vortyx = require('./src/themes/vortyx');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yumma CSS',
  tagline: 'The documentation site for Yumma CSS.',
  favicon: 'img/favicon.ico',
  url: 'https://yummacss.com',
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
          editUrl: "https://github.com/yumma-lib/yumma-css-docs/blob/release",
          includeCurrentVersion: false,
        },
        blog: {
          postsPerPage: 5,
          blogSidebarTitle: 'Latest blogs',
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
      announcementBar: {
        content: '🧩 Added Input Components!',
        backgroundColor: '#dd0987',
        textColor: '#fff',
        isCloseable: true
      },
      navbar: {
        title: 'Yumma CSS',
        logo: {
          alt: 'yummacss_logo',
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
            label: 'Playground',
            to: '/playground',
          },
          {
            label: 'Blog',
            to: '/blog',
          },
          {
            label: 'Components',
            items: [
              {
                label: 'Alerts',
                to: '/components/alerts',
              },
              {
                label: 'Badges',
                to: '/components/badges',
              },
              {
                label: 'Buttons',
                to: '/components/buttons',
              },
              {
                label: 'Cards',
                to: '/components/cards',
              },
              {
                label: 'Footers',
                to: '/components/footers',
              },
              {
                label: 'Inputs',
                to: '/components/inputs',
              },
              {
                label: 'Navbars',
                to: '/components/navbars',
              },
              {
                label: 'Paginations',
                to: '/components/paginations',
              },
              {
                label: 'Tabs',
                to: '/components/tabs',
              }
            ]
          },
          {
            type: 'docsVersionDropdown',
            position: 'right'
          }
        ],
      },
      footer: {
        logo: {
          alt: 'yummacss_logo',
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
      plugins: [
        [
          '@docusaurus/plugin-pwa',
          {
            debug: true,
            offlineModeActivationStrategies: [
              'appInstalled',
              'standalone',
              'queryString',
            ],
            pwaHead: [
              {
                tagName: 'meta',
                name: 'theme-color',
                content: 'rgb(221, 9, 135)',
              },
              {
                tagName: 'link',
                rel: 'icon-180',
                href: 'static/img/icons/icon-180.png',
              },
              {
                tagName: 'link',
                rel: 'icon',
                href: 'static/img/icons/icon-512.png',
              },
              {
                tagName: 'link',
                rel: 'manifest',
                href: '/manifest.json',
              }
            ],
          },
        ],
      ],
    }),
};

module.exports = config;