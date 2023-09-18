// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yumma CSS',
  tagline: 'An essential CSS library for streamlined UI development.',
  favicon: 'img/favicon.ico',

  url: 'https://your-docusaurus-test-site.com',

  baseUrl: '/',

  organizationName: 'rrenildopereiraa',
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
          // includeCurrentVersion: false
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
            type: 'docsVersionDropdown',

            position: 'right'
          },
          {
            href: "https://twitter.com/yummacss",
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'right',
            label: 'Twitter'
          },
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
        theme: require('./src/themes/yumma-light.js'),
        darkTheme: require('./src/themes/yumma-dark.js'),
      },
    }),
};

module.exports = config;
