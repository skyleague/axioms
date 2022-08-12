import { counter } from '.'

import { range } from '..'
import { collect } from '../../array'
import { take, allEqual } from '../../iterator'
import { forAll, natural, tuple } from '../../random'

test('simple', () => {
    expect(collect(take(counter(), 10))).toEqual(collect(range(10)))
})

test('range 0 n === take n counter', () => {
    forAll(natural({ max: 2000 }), (n) => allEqual(take(counter(0), n), range(0, n)))
})

test('range i n + i === take n counter i', () => {
    forAll(tuple(natural({ max: 2000 }), natural()), ([n, i]) => allEqual(take(counter(i), n), range(i, n + i)))
})
