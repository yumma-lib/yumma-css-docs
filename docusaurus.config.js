const yumma = require('./src/themes/yumma');

const config = {
  title: 'Yumma CSS',
  tagline: 'The documentation site for Yumma CSS.',
  favicon: '/img/icon/favicon.ico',
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
          includeCurrentVersion: false
        },
        blog: {
          blogSidebarTitle: 'Latest updates',
          
          showReadingTime: false,
          blogSidebarCount: 12,
          
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
      image: 'img/social-card.png',
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
            position: 'left'

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
    })
};

module.exports = config;