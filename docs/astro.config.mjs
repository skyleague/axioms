import markdoc from '@astrojs/markdoc'
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import { createStarlightTypeDocPlugin } from 'starlight-typedoc'

import packageJson from '../package.json' with { type: 'json' }

const [_barStarlightTypeDoc, _barTypeDocSidebarGroup] = createStarlightTypeDocPlugin()

import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'
// https://astro.build/config
export default defineConfig({
    site: packageJson.homepage,
    outDir: '../.docs',
    integrations: [
        markdoc(),
        starlight({
            title: 'Axioms',
            logo: {
                src: './src/assets/dark-logo.svg',
                replacesTitle: true,
            },
            customCss: ['./src/styles/custom.css'],
            social: {
                github: packageJson.repository.url,
            },
            plugins: [
                starlightTypeDoc({
                    entryPoints: ['../src/index.ts'],
                    tsconfig: 'tsconfig.json',
                    sidebar: {
                        collapsed: true,
                    },
                    typeDoc: {
                        categorizeByGroup: true,
                        groupOrder: 'alphabetically',
                        groupReferencesByType: true,
                        excludePrivate: false,
                        cleanOutputDir: true,
                        hideBreadcrumbs: true,
                        disableSources: true,

                        markdownItOptions: {
                            html: true,
                            breaks: true,
                            linkify: true,
                            typographer: true,
                        },
                    },
                }),
            ],
            sidebar: [
                { label: 'Installation', slug: 'guides/intro' },
                { label: 'Axioms', slug: 'generated-docs' },
                typeDocSidebarGroup,
            ],
        }),
    ],
})
