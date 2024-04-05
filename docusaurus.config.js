// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

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
    locales: ['en']
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: "https://github.com/yumma-lib/yumma-css-docs/blob/release",
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
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true
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
      // algolia: {
      //   appId: 'CVWK48NWBT',
      //   apiKey: '3cb030e87cdc3320fd915c88121e2d0b',
      //   indexName: 'yummacss',
      //   contextualSearch: true
      // }
    }),

  plugins: [[require.resolve('docusaurus-lunr-search'), {
    languages: ['en']
  }]],
};

module.exports = config;