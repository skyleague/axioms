import { expect, it } from 'vitest'
import { mergeDeep } from './merge-deep.js'

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
