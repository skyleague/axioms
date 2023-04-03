import { queue } from './index.js'

import { collect, sum } from '../../array/index.js'
import { take, allEqual, map } from '../../iterator/index.js'
import { forAll, array, unknown } from '../../random/index.js'

test('simple', () => {
    expect(collect(queue([1, 2, 3, 4]))).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
})

test('continued', () => {
    const q = queue([1, 2, 3, 4])
    q.enqueue([5, 6, 7])
    expect(collect(take(q, 3))).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
    `)
    expect(collect(take(q, 2))).toMatchInlineSnapshot(`
        [
          4,
          5,
        ]
    `)
    expect(collect(q)).toMatchInlineSnapshot(`
        [
          6,
          7,
        ]
    `)
    q.enqueue([5, 6, 7])
    expect(collect(q)).toMatchInlineSnapshot(`[]`)
})

test('take n queue xs === xs', () => {
    forAll(array(unknown()), (xs) => allEqual(take(queue(xs), xs.length), xs))
})

test('take n queue ...xss === xs', () => {
    forAll(array(array(unknown())), (xss) => {
        const vals = queue()
        vals.enqueue(...xss)
        return allEqual(take(vals, sum(map(xss, (xs) => xs.length))), xss.flat())
    })
})
