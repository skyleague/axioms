import { collect } from '../../array/index.js'
import { range } from '../../generator/index.js'
import { chunk } from '../../iterator/index.js'

import { expect, it } from 'vitest'

it('simple chunk function', () => {
    expect(collect(chunk([1, 2, 3, 4, 5], 1))).toEqual([[1], [2], [3], [4], [5]])
})

it('simple chunk function, other offset 3', () => {
    expect(collect(chunk([1, 2, 3, 4, 5], 3))).toEqual([
        [1, 2, 3],
        [4, 5],
    ])
})

it('simple chunk function, other offset 5', () => {
    expect(collect(chunk([1, 2, 3, 4, 5], 5))).toEqual([[1, 2, 3, 4, 5]])
})

it('simple chunk function larger than array', () => {
    expect(collect(chunk([1, 2, 3, 4, 5], 10))).toEqual([[1, 2, 3, 4, 5]])
})

it('simple chunk function offset 0', () => {
    expect(collect(chunk([1, 2, 3, 4, 5], 0))).toMatchInlineSnapshot(`
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
    expect(collect(chunk([1, 2, 3, 4, 5], -5))).toMatchInlineSnapshot(`
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
    expect(collect(chunk(range(32768), 3)).flat()).toEqual(collect(range(32768)))
})
