import { counter } from './index.js'

import { collect } from '../../array/index.js'
import { take, allEqual } from '../../iterator/index.js'
import { forAll, natural, tuple } from '../../random/index.js'
import { range } from '../index.js'

test('simple', () => {
    expect(collect(take(counter(), 10))).toEqual(collect(range(10)))
})

test('range 0 n === take n counter', () => {
    forAll(natural({ max: 2000 }), (n) => allEqual(take(counter(0), n), range(0, n)))
})

test('range i n + i === take n counter i', () => {
    forAll(tuple(natural({ max: 2000 }), natural()), ([n, i]) => allEqual(take(counter(i), n), range(i, n + i)))
})

test('small', () => {
    expect(collect(take(counter(), 4))).toMatchInlineSnapshot(`
        [
          0,
          1,
          2,
          3,
        ]
    `)
})

test('small with offset', () => {
    expect(collect(take(counter(10), 4))).toMatchInlineSnapshot(`
        [
          10,
          11,
          12,
          13,
        ]
    `)
})
