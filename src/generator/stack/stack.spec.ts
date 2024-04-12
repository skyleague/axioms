import { stack } from './index.js'

import { collect, sum } from '../../array/index.js'
import { allEqual, map, take } from '../../iterator/index.js'
import { array, forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(collect(stack([1, 2, 3, 4]))).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
})

it('continued', () => {
    const q = stack([1, 2, 3, 4])
    q.push([5, 6, 7])
    expect(collect(take(q, 3))).toMatchInlineSnapshot(`
        [
          5,
          6,
          7,
        ]
    `)
    expect(collect(take(q, 2))).toMatchInlineSnapshot(`
        [
          1,
          2,
        ]
    `)
    expect(collect(q)).toMatchInlineSnapshot(`
        [
          3,
          4,
        ]
    `)
    q.push([5, 6, 7])
    expect(collect(q)).toMatchInlineSnapshot('[]')
})

it('continued 2', () => {
    const q = stack([1])
    q.push([2, 3])
    q.push([4, 5])
    q.push([6, 7])

    expect(collect(take(q, 3))).toMatchInlineSnapshot(`
        [
          6,
          7,
          4,
        ]
    `)
    expect(collect(take(q, 2))).toMatchInlineSnapshot(`
        [
          5,
          2,
        ]
    `)
    expect(collect(q)).toMatchInlineSnapshot(`
        [
          3,
          1,
        ]
    `)
    q.push([5, 6, 7])
    expect(collect(q)).toMatchInlineSnapshot('[]')
})

it('take n stack xs === xs', () => {
    forAll(array(unknown()), (xs) => allEqual(take(stack(xs), xs.length), xs))
})

it('take n stack.push(...xss) === reverse xs', () => {
    forAll(array(array(unknown())), (xss) => {
        const values = stack()
        values.push(...xss)
        return allEqual(take(values, sum(map(xss, (xs) => xs.length))), xss.reverse().flat())
    })
})
