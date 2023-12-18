import { build } from 'esbuild'
import { expect, describe, it } from 'vitest'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

describe('esbuild', () => {
    it('treeshaking', async () => {
        await expect(
            build({
                stdin: {
                    contents: `import {isRight} from '../src/index.js'; if (isRight({left:''})) {}`,
                    resolveDir: path.dirname(fileURLToPath(import.meta.url)),
                    sourcefile: 'stdin.ts',
                    loader: 'ts',
                },
                bundle: true,
                format: 'esm',
                minify: false,
                target: 'es2022',
                write: false,
                platform: 'node',
                external: ['node-object-hash', 'fast-deep-equal'],
            }).then((x) => x.outputFiles.map((y) => y.text))
        ).resolves.toMatchInlineSnapshot(`
          [
            "// src/guard/is-right/is-right.ts
          function isRight(x) {
            return x !== null && x !== void 0 && typeof x === "object" && "right" in x;
          }

          // test/stdin.ts
          if (isRight({ left: "" })) {
          }
          ",
          ]
        `)
    })
})
