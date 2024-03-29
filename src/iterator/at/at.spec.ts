import { at, first, second } from './at.js'

import { array, forAll, integer, tuple, unknown } from '../../random/index.js'
import { Nothing } from '../../type/index.js'
import { drop } from '../drop/index.js'

import { describe, it } from 'vitest'

describe('at', () => {
    it('first on array', () => {
        forAll(array(unknown(), { minLength: 1 }), (xs) => {
            return at(xs, 0) === xs[0]
        })
    })

    it('first on array === first', () => {
        forAll(array(unknown(), { minLength: 1 }), (xs) => {
            return at(xs, 0) === first(xs)
        })
    })

    it('second on array', () => {
        forAll(array(unknown(), { minLength: 2 }), (xs) => {
            return at(xs, 1) === xs[1]
        })
    })

    it('second on array === second', () => {
        forAll(array(unknown(), { minLength: 1 }), (xs) => {
            return at(xs, 1) === second(xs)
        })
    })

    it('ith index on array - index in bounds', () => {
        forAll(
            integer({ min: 1, max: 50 }).chain((n) => tuple(array(unknown(), { minLength: n }), integer({ min: 0, max: n }))),
            ([xs, i]) => {
                return at(xs, i) === xs[i]
            }
        )
    })

    it('ith index on array - index out of bounds', () => {
        forAll(
            integer({ min: 0, max: 50 }).chain((n) =>
                tuple(array(unknown(), { minLength: n, maxLength: n }), integer({ min: n, max: 2 * n + 1 }))
            ),
            ([xs, i]) => {
                return at(xs, i) === Nothing
            }
        )
    })

    it('first on iterator', () => {
        forAll(array(unknown(), { minLength: 1 }), (xs) => {
            return at(drop(xs, 0), 0) === xs[0]
        })
    })

    it('first on iterator === first', () => {
        forAll(array(unknown(), { minLength: 1 }), (xs) => {
            return at(drop(xs, 0), 0) === first(drop(xs, 0))
        })
    })

    it('second on iterator', () => {
        forAll(array(unknown(), { minLength: 2 }), (xs) => {
            return at(drop(xs, 0), 1) === xs[1]
        })
    })

    it('second on iterator === second', () => {
        forAll(array(unknown(), { minLength: 2 }), (xs) => {
            return at(drop(xs, 0), 1) === second(drop(xs, 0))
        })
    })

    it('ith index on iterator', () => {
        forAll(
            integer({ min: 1, max: 50 }).chain((n) =>
                tuple(array(unknown(), { minLength: n, maxLength: n }), integer({ min: 0, max: n - 1 }))
            ),
            ([xs, i]) => {
                return at(drop(xs, 0), i) === xs[i]
            }
        )
    })

    // it('overloaded types are correct', () => {
    //     const _foo1: 1 = at(0, [1, 2, 3] as const)
    //     const _bar1: Nothing = at(0, [] as const)
    //     const _foo2: 2 = at(1, [1, 2, 3] as const)
    //     const _bar2: Nothing = at(1, [1] as const)
    //     const _foo3: 3 = at(2, [1, 2, 3] as const)
    //     const _bar3: Nothing = at(2, [1, 2] as const)

    //     const __foo1: 1 = first([1, 2, 3] as const)
    //     // @ts-expect-error first element must exist on tuple
    //     const __bar1: Nothing = first([] as const)
    //     const __foo2: 2 = second([1, 2, 3] as const)
    //     // @ts-expect-error second element must exist on tuple
    //     const __bar2: Nothing = second([1] as const)
    //     const __foo3: 3 = third([1, 2, 3] as const)
    //     // @ts-expect-error third element must exist on tuple
    //     const __bar3: Nothing = third([1, 2] as const)

    //     const distributive: 'foo' | 'bar' = first([['foo', 1] as const, ['bar', 2] as const])

    //     const _keys0: string[] = entriesOf({ a: 1, b: 2, c: 3 }).map(xs => at(0, xs))
    //     const entires = entriesOf({ a: 1, b: 2, c: 3 })
    //     type Foo = typeof entires
    //     type f = ReturnType<typeof () => first<Foo>([] as any)>
    //     const _keys: string[] = entriesOf({ a: 1, b: 2, c: 3 }).map(first)
    //     const _values: number[] = entriesOf({ a: 1, b: 2, c: 3 }).map(second)
    // })
})
