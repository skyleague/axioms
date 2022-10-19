import { stack } from '.'

import { collect, sum } from '../../array'
import { take, allEqual, map } from '../../iterator'
import { forAll, array, unknown } from '../../random'

test('simple', () => {
    expect(collect(stack([1, 2, 3, 4]))).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
})

test('continued', () => {
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
    expect(collect(q)).toMatchInlineSnapshot(`[]`)
})

test('continued 2', () => {
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
    expect(collect(q)).toMatchInlineSnapshot(`[]`)
})

test('take n stack xs === xs', () => {
    forAll(array(unknown()), (xs) => allEqual(take(stack(xs), xs.length), xs))
})

test('take n stack.push(...xss) === reverse xs', () => {
    forAll(array(array(unknown())), (xss) => {
        const values = stack()
        values.push(...xss)
        return allEqual(take(values, sum(map(xss, (xs) => xs.length))), xss.reverse().flat())
    })
})
