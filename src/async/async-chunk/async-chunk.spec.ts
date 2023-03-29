import { asyncChunk } from './async-chunk.js'

import { asyncCollect } from '../async-collect/index.js'

test('simple chunk function', async () => {
    expect(await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 1))).toEqual([[1], [2], [3], [4], [5]])
})

test('simple chunk function, other offset 3', async () => {
    expect(await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 3))).toEqual([
        [1, 2, 3],
        [4, 5],
    ])
})

test('simple chunk function, other offset 5', async () => {
    expect(await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 5))).toEqual([[1, 2, 3, 4, 5]])
})

test('simple chunk function larger than array', async () => {
    expect(await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 10))).toEqual([[1, 2, 3, 4, 5]])
})

test('simple chunk function offset 0', async () => {
    expect(await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 0))).toMatchInlineSnapshot(`
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

test('simple chunk function offset negative', async () => {
    expect(await asyncCollect(asyncChunk([1, 2, 3, 4, 5], -5))).toMatchInlineSnapshot(`
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

// test('tco', async () => {
//     expect((await asyncCollect(asyncChunk(range(32768), 3))).flat()).toEqual(collect(range(32768)))
// })
