const yumma = require('./src/themes/yumma');

const config = {
  title: 'Yumma CSS',
  tagline: 'The documentation site for Yumma CSS.',
  favicon: '/img/yummacss.svg',
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
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          includeCurrentVersion: false,
          showLastUpdateTime: true
        },
        blog: {
          blogSidebarTitle: 'Latest articles',
          showReadingTime: false,
          blogSidebarCount: 12
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
            label: 'Docs',
            sidebarId: 'docsSidebar',
            position: 'left',

          },
          {
            label: 'Components',
            position: 'left',
            to: '/components'
          },
          {
            label: 'Blog',
            position: 'left',
            to: '/blog'
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
                label: 'Introduction',
                to: '/blog/introducing-yummacss'
              },
              {
                label: 'Components',
                to: '/components'
              },
              {
                label: 'Blog',
                to: '/blog'
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
                label: 'What is new?',
                to: '/blog/tags/update'
              },
              {
                label: 'Customization',
                to: '/docs/colors'
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
        theme: yumma.light,
        darkTheme: yumma.dark,
        additionalLanguages: [
          'bash',
          'diff',
          'scss'
        ]
      },
      colorMode: {
        respectPrefersColorScheme: true,
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
            content: '#dc0988'
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
            color: '#dc0988'
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