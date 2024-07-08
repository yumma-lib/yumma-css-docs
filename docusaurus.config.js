const yumma = require('./src/themes/yumma');

const config = {
  baseUrl: '/',
  favicon: '/img/icon/favicon.ico',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'yumma-lib',
  projectName: 'yumma-css-docs',
  tagline: 'Quickly build applications with less code in your markup.',
  title: 'Yumma CSS',
  url: 'https://www.yummacss.com',
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
          includeCurrentVersion: false,
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          blogSidebarCount: 12,
          blogSidebarTitle: 'Latest updates',
          showReadingTime: false
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      tableOfContents: {
        maxHeadingLevel: 5,
        minHeadingLevel: 2
      },
      image: 'img/social-card.png',
      navbar: {
        title: 'Yumma CSS',
        logo: {
          alt: 'yummacss_logo',
          src: 'img/yummacss.svg'
        },
        items: [
          {
            label: 'Docs',
            position: 'left',
            sidebarId: 'docsSidebar',
            type: 'docSidebar'
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
            position: 'right',
            type: 'docsVersionDropdown'
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
              },
            ],
          },
          {
            title: 'Mini Screencasts',
            items: [
              {
                label: 'From Yumma CSS',
                to: 'https://www.youtube.com/@yummacss'
              },
              {
                label: 'From Renildo Pereira',
                to: 'https://www.youtube.com/@rrenildopereiraa'
              },
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
                to: 'https://github.com/yumma-lib/yumma-css'
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
                label: '(𝕏) Twitter',
                to: 'https://twitter.com/yummacss'
              },
              {
                label: 'LinkedIn',
                to: 'https://www.linkedin.com/company/yummacss/'
              },
            ],
          }
        ],
        copyright: `© ${new Date().getFullYear()} Yumma CSS. Code under <a href="https://github.com/yumma-lib/yumma-css-docs?tab=MIT-1-ov-file" target="_blank" rel="noopener noreferrer">MIT</a> license, documentation by <a href="https://twitter.com/rrenildoo" target="_blank" rel="noopener noreferrer">Renildo Pereira</a>.`,
      },
      prism: {
        additionalLanguages: [
          'bash',
          'diff',
          'scss'
        ],
        darkTheme: yumma.dark,
        theme: yumma.light
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      algolia: {
        apiKey: '9a3208c466723a99a1ad2344f6ce3dd0',
        appId: '3NYT3J6P4Q',
        contextualSearch: true,
        indexName: 'yummacss'
      },
    })
};

module.exports = config;