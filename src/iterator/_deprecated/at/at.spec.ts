import { at, first, second, third } from './at.js'

import { array, forAll, integer, tuple, unknown } from '../../../random/index.js'
import { Nothing } from '../../../type/index.js'
import { drop } from '../drop/index.js'

import { describe, expectTypeOf, it } from 'vitest'
import { entriesOf } from '../../../object/entries-of/entries-of.js'
import type { Maybe } from '../../../type/maybe/maybe.js'

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
            integer({ min: 1, max: 50 }).chain((n) => tuple(array(unknown(), { minLength: n }), integer({ min: 0, max: n - 1 }))),
            ([xs, i]) => {
                return at(xs, i) === xs[i]
            },
        )
    })

    it('ith index on array - index out of bounds', () => {
        forAll(
            integer({ min: 0, max: 50 }).chain((n) =>
                tuple(array(unknown(), { minLength: n, maxLength: n }), integer({ min: n, max: 2 * n + 1 })),
            ),
            ([xs, i]) => {
                return at(xs, i) === Nothing
            },
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
                tuple(array(unknown(), { minLength: n, maxLength: n }), integer({ min: 0, max: n - 1 })),
            ),
            ([xs, i]) => {
                return at(drop(xs, 0), i) === xs[i]
            },
        )
    })

    it('overloaded types are correct', () => {
        expectTypeOf(at([1, 2, 3], 0)).toEqualTypeOf<1>()
        expectTypeOf(at([], 0)).toEqualTypeOf<Nothing>()

        expectTypeOf(at([1, 2, 3], 1)).toEqualTypeOf<2>()
        expectTypeOf(at([1], 1)).toEqualTypeOf<Nothing>()

        expectTypeOf(at([1, 2, 3], 2)).toEqualTypeOf<3>()
        expectTypeOf(at([1, 2], 2)).toEqualTypeOf<Nothing>()

        expectTypeOf(at([1, 2, 3] as number[], 2)).toEqualTypeOf<Maybe<number>>()
        expectTypeOf(at([1, 2] as number[], 2)).toEqualTypeOf<Maybe<number>>()
    })
})

describe('first', () => {
    it('overloaded types are correct', () => {
        expectTypeOf(first([1, 2, 3])).toEqualTypeOf<1>()
        expectTypeOf(first([])).toEqualTypeOf<Nothing>()

        expectTypeOf(first([1, 2, 3] as number[])).toEqualTypeOf<Maybe<number>>()
        expectTypeOf(first([] as number[])).toEqualTypeOf<Maybe<number>>()
    })
})

describe('second', () => {
    it('overloaded types are correct', () => {
        expectTypeOf(second([1, 2, 3])).toEqualTypeOf<2>()
        expectTypeOf(second([])).toEqualTypeOf<Nothing>()

        expectTypeOf(second([1, 2, 3] as number[])).toEqualTypeOf<Maybe<number>>()
        expectTypeOf(second([] as number[])).toEqualTypeOf<Maybe<number>>()
    })
})

describe('third', () => {
    it('overloaded types are correct', () => {
        expectTypeOf(third([1, 2, 3])).toEqualTypeOf<3>()
        expectTypeOf(third([])).toEqualTypeOf<Nothing>()

        expectTypeOf(third([1, 2, 3] as number[])).toEqualTypeOf<Maybe<number>>()
        expectTypeOf(third([] as number[])).toEqualTypeOf<Maybe<number>>()
    })
})

describe('complex', () => {
    it('overloaded types are correct', () => {
        const xs = [
            ['foo', 1],
            ['bar', 2],
        ] as const
        expectTypeOf(first(xs)).toEqualTypeOf<readonly ['foo', 1]>()
        expectTypeOf(xs.map(first)).toEqualTypeOf<('foo' | 'bar')[]>()

        expectTypeOf(entriesOf({ a: 1, b: 2, c: 3 }).map((xs) => at(xs, 0))).toEqualTypeOf<('a' | 'b' | 'c')[]>()
        expectTypeOf(entriesOf({ a: 1, b: 2, c: 3 }).map(first)).toEqualTypeOf<('a' | 'b' | 'c')[]>()

        expectTypeOf(entriesOf({ a: 1, b: 2, c: 3 }).map(second)).toEqualTypeOf<(1 | 2 | 3)[]>()
    })
})
