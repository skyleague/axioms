import { isTuple } from './is-tuple.js'

import { array, forAll, integer, tuple, unknown } from '../../../index.js'

import { expect, it } from 'vitest'

it('for x is not tuple, isTuple xs === false', () => {
    forAll(tuple(unknown({ array: false }), integer()), ([xs, l]) => !isTuple(l, xs))
})

it('|xs| === L, isTuple L xs === true', () => {
    forAll(array(unknown()), (xs) => isTuple(xs.length, xs))
})

it('|xs| !== L, isTuple L xs === false', () => {
    forAll(tuple(array(unknown()), integer()), ([xs, l]) => isTuple(l, xs) === (xs.length === l))
})

it('guards tuple type', () => {
    const foo: unknown[] | [number, string, number] = [1, 'foo', 2]

    if (isTuple(3, foo)) {
        expect(foo[1].length).toBe(3)
    }
    if (isTuple(2, foo)) {
        // @ts-expect-error we didn't detect a tuple type
        expect(foo[1].length).toBe(3)
    }
    if (isTuple(1, foo)) {
        // @ts-expect-error we didn't detect a tuple type
        expect(foo[1].length).toBe(3)
    }
})
