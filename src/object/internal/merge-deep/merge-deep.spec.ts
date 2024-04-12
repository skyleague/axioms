import { mergeDeep } from './merge-deep.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(
        mergeDeep(
            {
                a: [{ b: 2 }, { d: 4 }],
            },
            {
                a: [{ c: 3 }, { e: 5 }],
            },
        ),
    ).toMatchInlineSnapshot(`
        {
          "a": [
            {
              "b": 2,
            },
            {
              "d": 4,
            },
          ],
        }
    `)
})
