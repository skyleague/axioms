import { chunk } from '../../iterator/index.js'

import { expect, it } from 'vitest'

it('simple chunk function', () => {
    expect(chunk([1, 2, 3, 4, 5], 1).toArray()).toEqual([[1], [2], [3], [4], [5]])
})

it('simple chunk function, other offset 3', () => {
    expect(chunk([1, 2, 3, 4, 5], 3).toArray()).toEqual([
        [1, 2, 3],
        [4, 5],
    ])
})

it('simple chunk function, other offset 5', () => {
    expect(chunk([1, 2, 3, 4, 5], 5).toArray()).toEqual([[1, 2, 3, 4, 5]])
})

it('simple chunk function larger than array', () => {
    expect(chunk([1, 2, 3, 4, 5], 10).toArray()).toEqual([[1, 2, 3, 4, 5]])
})

it('simple chunk function offset 0', () => {
    expect(chunk([1, 2, 3, 4, 5], 0).toArray()).toMatchInlineSnapshot(`
        [
          [
            1,
          ],
          [
            2,
          ],
          [
            3,
          ],
          [
            4,
          ],
          [
            5,
          ],
        ]
    `)
})

it('simple chunk function offset negative', () => {
    expect(chunk([1, 2, 3, 4, 5], -5).toArray()).toMatchInlineSnapshot(`
        [
          [
            1,
          ],
          [
            2,
          ],
          [
            3,
          ],
          [
            4,
          ],
          [
            5,
          ],
        ]
    `)
})

it('tco', () => {
    expect(
        chunk(
            Array.from({ length: 32768 }, (_, i) => i),
            3,
        )
            .toArray()
            .flat(),
    ).toEqual(Array.from({ length: 32768 }, (_, i) => i))
})
