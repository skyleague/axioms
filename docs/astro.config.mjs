import starlight from '@astrojs/starlight'
// @ts-check
import { defineConfig } from 'astro/config'
import { createStarlightTypeDocPlugin } from 'starlight-typedoc'

const [barStarlightTypeDoc, barTypeDocSidebarGroup] = createStarlightTypeDocPlugin()

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Axioms',
            logo: {
                src: './src/assets/dark-logo.svg',
                replacesTitle: true,
            },
            customCss: ['./src/styles/custom.css'],
            social: {
                github: 'https://github.com/withastro/starlight',
            },
            plugins: [
                barStarlightTypeDoc({
                    entryPoints: ['../src/index.ts'],
                    tsconfig: '../tsconfig.json',
                    sidebar: {
                        collapsed: true,
                        label: 'Arbitrary axioms',
                    },
                    typeDoc: {
                        readme: '../README.md',
                    },
                }),
            ],
            sidebar: [
                {
                    label: 'Guides',
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: 'Intro', slug: 'guides/intro' },
                    ],
                },
                {
                    label: 'Arbitrary axioms',
                    items: [barTypeDocSidebarGroup],
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
            ],
        }),
    ],
})
