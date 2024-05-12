const vortyx = require('./src/themes/vortyx');

const config = {
  title: 'Yumma CSS',
  tagline: 'The documentation site for Yumma CSS.',
  favicon: '/img/yummacss.svg',
  customFields: {
    description: 'Bundled with components and small classes Yumma CSS is designed for fast development with small class names such as ins, btn, d-f, and many more.',
  },
  url: 'https://www.yummacss.com',
  baseUrl: '/',
  organizationName: 'yumma-lib',
  projectName: 'yumma-css-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          includeCurrentVersion: false
        },
        blog: {
          blogSidebarTitle: 'Latest articles',
          showReadingTime: false
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
      image: 'img/yummacss-social-card.png',
      navbar: {
        title: 'Yumma CSS',
        logo: {
          alt: 'yummacss_logo',
          src: 'img/yummacss.svg'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs'
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
            to: '/components'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right'
          }
        ],
      },
      footer: {
        links: [
          {
            title: 'Getting Started',
            items: [
              {
                label: 'Blog',
                to: '/blog'
              },
              {
                label: 'Docs',
                to: '/docs/installation'
              },
              {
                label: 'Playground',
                to: '/playground'
              }
            ],
          },
          {
            title: 'Releases',
            items: [
              {
                label: 'Yumma CSS v1.2',
                to: '/docs/installation'
              },
              {
                label: 'Yumma CSS v1.1',
                to: '/docs/1.1.0/installation'
              },
              {
                label: 'Yumma CSS v1.0',
                to: '/docs/1.0.0/installation'
              }
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'What is new',
                to: '/blog/tags/update'
              },
              {
                label: 'Customization',
                to: '/docs/fundamentals/appearance/colors'
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                to: 'https://github.com/yumma-lib/yumma-css-docs'
              },
              {
                label: 'LinkedIn — New',
                to: 'https://www.linkedin.com/company/yummacss/'
              },
              {
                label: 'Discord',
                to: 'https://discord.gg/w5Dp73pNw4'
              }
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'YouTube',
                to: 'https://www.youtube.com/@yummacss'
              },
              {
                label: 'Twitter',
                to: 'https://twitter.com/yummacss'
              }
            ],
          }
        ],
        copyright: `© ${new Date().getFullYear()} Yumma CSS. Code under <a href="https://github.com/yumma-lib/yumma-css-docs?tab=MIT-1-ov-file" target="_blank" rel="noopener noreferrer">MIT</a> license, documentation by <a href="https://twitter.com/rrenildoo" target="_blank" rel="noopener noreferrer">Renildo Pereira</a>.`,
      },
      prism: {
        theme: vortyx.light,
        darkTheme: vortyx.dark,
        additionalLanguages: ['sass', 'scss', 'bash']
      },
      algolia: {
        appId: '3NYT3J6P4Q',
        apiKey: '9a3208c466723a99a1ad2344f6ce3dd0',
        indexName: 'yummacss',
        contextualSearch: true
      },
    }),
  plugins: [
    [
      'pwa',
      {
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString'
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            to: 'img/yummacss.png'
          },
          {
            tagName: 'link',
            rel: 'manifest',
            to: '/manifest.json'
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(220, 9, 136)'
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#fff'
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            to: 'img/yummacss.png'
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            to: 'img/yummacss.png',
            color: 'rgb(220, 9, 136)'
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: 'img/yummacss.png'
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#fff'
          },
        ],
      },
    ],
  ],
};

module.exports = config;