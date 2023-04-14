import { build } from 'esbuild'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

describe('esbuild', () => {
    test('treeshaking', async () => {
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
              "// src/type/thrown/thrown.ts
            var thrownSymbol = "(Thrown)";
            var Thrown = Symbol.for(thrownSymbol);

            // src/iterator/equal/equal.ts
            import deepEqual from "fast-deep-equal/es6/index.js";

            // src/guard/is-right/is-right.ts
            function isRight(x) {
              return x !== null && x !== void 0 && typeof x === "object" && "right" in x;
            }

            // src/random/deterministic/hash/hash.ts
            import hasher from "node-object-hash";

            // test/stdin.ts
            if (isRight({ left: "" })) {
            }
            ",
            ]
        `)
    })
})
