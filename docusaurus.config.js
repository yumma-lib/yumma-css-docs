// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const vortyx = require('./src/themes/vortyx');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yumma CSS',
  tagline: 'The documentation site for Yumma CSS.',
  favicon: '/img/meta/favicon.ico',
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
        maxHeadingLevel: 5
      },
      announcementBar: {
        content: '🧩 Added Forms Components!',
        backgroundColor: '#dd0987',
        textColor: '#fff',
        isCloseable: true
      },
      image: 'img/yummacss-social-card.jpg',
      navbar: {
        title: 'Yumma CSS',
        logo: {
          alt: 'yummacss_logo',
          src: '/img/yummacss.png',
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
            to: '/playground'
          },
          {
            label: 'Blog',
            to: '/blog'
          },
          {
            label: 'Components',
            items: [
              {
                label: 'Alerts',
                to: '/components/alerts'
              },
              {
                label: 'Badges',
                to: '/components/badges'
              },
              {
                label: 'Buttons',
                to: '/components/buttons'
              },
              {
                label: 'Cards',
                to: '/components/cards'
              },
              {
                label: 'Footers',
                to: '/components/footers'
              },
              {
                label: 'Forms',
                to: '/components/forms'
              },
              {
                label: 'Navbars',
                to: '/components/navbars'
              },
              {
                label: 'Paginations',
                to: '/components/paginations'
              },
              {
                label: 'Tabs',
                to: '/components/tabs'
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
          src: '/img/yummacss.png',
          href: 'https://yummacss.com',
          width: 60,
          height: 60,
        },
        copyright: `© ${new Date().getFullYear()} Yumma CSS | Created with ❤️ by Renildo`,
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
            offlineModeActivationStrategies: [
              'appInstalled',
              'standalone',
              'queryString',
            ],
            pwaHead: [
              {
                tagName: 'link',
                rel: 'manifest',
                href: '/manifest.json',
              },
              {
                src: '/img/meta/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: '/img/meta/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png'
              },
              {
                src: '/img/meta/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png'
              },
              {
                src: '/img/meta/mstile-16x16.png',
                sizes: '16x16',
                type: 'image/png'
              },
              {
                src: '/img/meta/mstile-32x32.png',
                sizes: '32x32',
                type: 'image/png'
              },
              {
                src: '/img/meta/mstile-150x150.png',
                sizes: '150x150',
                type: 'image/png'
              }
            ],
          },
        ],
      ],
    }),
};

module.exports = config;