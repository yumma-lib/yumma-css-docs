// default imports
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// other imports
import autoImport from 'astro-auto-import';
import starlightBlog from 'starlight-blog';
import starlightLinksValidator from 'starlight-links-validator';

export default defineConfig({
	integrations: [
		starlight({
			favicon: '/favicon.ico',
			logo: {
				light: '/public/yma-light.svg',
				dark: '/public/yma-dark.svg',
				alt: 'Yumma CSS Logo',
				replacesTitle: true
			},
			plugins: [
				starlightLinksValidator(),
				starlightBlog({
					authors: {
						Renildo: {
							name: 'Renildo Pereira',
							title: 'Maintainer',
							picture: '/renildo.jpg',
							url: 'https://x.com/rrenildoo'
						},
					},
				}),
			],
			title: 'Yumma CSS',
			customCss: ['/src/styles/custom.css'],
			social: {
				github: 'https://github.com/yumma-lib/yumma-css',
				discord: 'https://discord.gg/Zd2y6yVqgK',
				twitter: 'https://x.com/yummacss'
			},
			sidebar: [

				{
					label: 'Getting Started',
					items: [
						{ label: 'Installation', link: 'docs/installation' },
						{ label: 'Components', link: '/components' },
						{ label: 'Playground', link: 'https://play.yummacss.com/' }

					]
				},
				{
					label: 'Concepts',
					items: [
						{ label: 'Color System', link: 'docs/color-system' },
						{ label: 'Responsive Design', link: 'docs/responsive-design' },
						{ label: 'Utility Classes', link: 'docs/utility-classes' },
						{ label: 'Variants', link: 'docs/variants' }
					]
				},
				{
					label: 'Base Styles',
					items: [
						{ label: 'Stylecent', link: 'docs/stylecent' }
					],
				},
				{
					label: 'Backgrounds & Borders',
					items: [
						{
							label: 'Backgrounds',
							autogenerate: { directory: 'backgrounds' }
						},
						{
							label: 'Borders & Outlines',
							items: [
								{
									label: 'Borders',
									items: [
										{ label: 'Border Collapse', link: 'docs/border-collapse' },
										{ label: 'Border Color', link: 'docs/border-color' },
										{ label: 'Border Radius', link: 'docs/border-radius' },
										{ label: 'Border Style', link: 'docs/border-style' },
										{ label: 'Border Width', link: 'docs/border-width' }
									]
								},
								{
									label: 'Outlines',
									items: [
										{ label: 'Outline Color ', link: 'docs/outline-color' },
										{ label: 'Outline Offset', link: 'docs/outline-offset' },
										{ label: 'Outline Style', link: 'docs/outline-style' },
										{ label: 'Outline Widith', link: 'docs/outline-width' }
									]
								},
							]
						}
					]
				},
				{
					label: 'Box Model',
					autogenerate: { directory: 'box-model' }
				},
				{
					label: 'Effects & Filters',
					items: [
						{ label: 'Backdrop Blur', link: 'docs/backdrop-blur' },
						{ label: 'Box Shadow', link: 'docs/box-shadow' },
						{ label: 'Opacity', link: 'docs/opacity' }
					]
				},
				{
					label: 'Flexbox & Grid',
					items: [
						{
							label: 'Flexbox',
							items: [
								{ label: 'Flex Basis', link: 'docs/flex-basis' },
								{ label: 'Flex Direction', link: 'docs/flex-direction' },
								{ label: 'Flex Grow', link: 'docs/flex-grow' },
								{ label: 'Flex Shrink', link: 'docs/flex-shrink' },
								{ label: 'Flex Wrap', link: 'docs/flex-wrap' },
								{ label: 'Flex', link: 'docs/flex' }
							]
						},
						{
							label: 'Grid',
							items: [
								{ label: 'Grid Auto Columns', link: 'docs/grid-auto-columns' },
								{ label: 'Grid Auto Flow', link: 'docs/grid-auto-flow' },
								{ label: 'Grid Auto Rows', link: 'docs/grid-auto-rows' },
								{ label: 'Grid Column', link: 'docs/grid-column'},
								{ label: 'Grid Row', link: 'docs/grid-row'},
								{ label: 'Grid Template Columns', link: 'docs/grid-template-columns' },
								{ label: 'Grid Template Rows', link: 'docs/grid-template-rows' }
							]
						}
					]
				},
				{
					label: 'Layout',
					autogenerate: { directory: 'layout' }
				},
				{
					label: 'Miscellaneous',
					autogenerate: { directory: 'miscellaneous' }
				},
				{
					label: 'Typography',
					items: [
						{
							label: 'Font',
							items: [
								{ label: 'Font Family', link: 'docs/font-family' },
								{ label: 'Font Size', link: 'docs/font-size' },
								{ label: 'Font Style', link: 'docs/font-style' },
								{ label: 'Font Weight', link: 'docs/font-weight' }
							]
						},
						{
							label: 'Text',
							items: [
								{ label: 'Text Align ', link: 'docs/text-align' },
								{ label: 'Text Color', link: 'docs/text-color' },
								{ label: 'Text Decoration Color', link: 'docs/text-decoration-color' },
								{ label: 'Text Decoration Line', link: 'docs/text-decoration-line' },
								{ label: 'Text Decoration Style', link: 'docs/text-decoration-style' },
								{ label: 'Text Decoration Thickness', link: 'docs/text-decoration-thickness' },
								{ label: 'Text Decoration', link: 'docs/text-decoration' }

							]
						}
					]
				},
			],
		}),
		autoImport({
			imports: [
				'./src/components/Color.astro',
				'./src/components/Hover.astro',
				'./src/components/Palette.astro',
				'./src/components/Preview.astro',
				'./src/components/Utility.astro'
			],
		}),
	],
});
