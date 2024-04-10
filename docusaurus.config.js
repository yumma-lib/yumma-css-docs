const vortyx = require('./src/themes/vortyx');

const config = {
  title: 'Yumma CSS',
  tagline: 'The documentation site for Yumma CSS.',
  favicon: '/img/favicon/favicon.ico',
  url: 'https://yummacss.com',
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
          postsPerPage: 5,
          blogSidebarTitle: 'Latest blogs',
          showReadingTime: true,
          blogSidebarCount: 5
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
          src: '/img/yummacss.png'
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
                to: '/docs/intro'
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
                href: '/docs/intro'
              },
              {
                label: 'Yumma CSS v1.1',
                href: '/docs/1.1.0/intro'
              },
              {
                label: 'Yumma CSS v1.0',
                href: '/docs/1.0.0/intro'
              }
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'What is new',
                href: 'http://localhost:3000/blog/tags/update'
              },
              {
                label: 'Customization',
                href: '/docs/fundamentals/appearance/color-palette'
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/yumma-lib'
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/yummacss'
              }
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'YouTube',
                href: 'https://youtube.com/@rrenildopereiraa'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/yummacss'
              }
            ],
          }
        ],
        copyright: `© ${new Date().getFullYear()} Yumma CSS | Designed by Renildo`,
      },
      prism: {
        theme: vortyx.light,
        darkTheme: vortyx.dark,
        additionalLanguages: ['sass', 'scss', 'bash'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true
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
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: 'img/yummacss.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(220, 9, 136)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#fff',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/yummacss.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: 'img/yummacss.png',
            color: 'rgb(220, 9, 136)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: 'img/yummacss.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#fff',
          },
        ],
      },
    ],
  ],
};

module.exports = config;