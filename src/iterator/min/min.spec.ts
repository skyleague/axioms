import { expect, it } from 'vitest'
import { Nothing, date, datetime, float, forAll, isJust, oneOf, string } from '../../index.js'
import { iterable } from '../../random/types/iterable/iterable.js'
import type { Maybe } from '../../type/maybe/maybe.js'
import { min, minBy } from './min.js'

it('simple', () => {
    const n: number = min([1, 2, 3] as const)
    expect(n).toEqual(1)
})

it('min xs <= all y', () => {
    forAll(oneOf(iterable(float(), { minLength: 1 }), iterable(string(), { minLength: 1 })), (xs) => {
        const x = min(xs) as Maybe<number>
        return isJust(x) && Iterator.from(xs as number[]).every((y) => x <= y)
    })
})

it('min xs === Nothing, when |xs| === 0', () => {
    forAll(oneOf(iterable(float(), { maxLength: 0 }), iterable(string(), { maxLength: 0 })), (xs) => {
        return min(xs) === Nothing
    })
})

it('minBy toISOString, xs <= all y.toISOString()', () => {
    forAll(iterable(oneOf(date(), datetime()), { minLength: 1 }), (xs) => {
        const dates = Iterator.from(xs).map((x) => new Date(x))
        const x = minBy(dates, (d) => d.toISOString())
        return (
            isJust(x) &&
            Iterator.from(xs).every((y) => {
                const date = new Date(y)
                return x.toISOString() <= date.toISOString()
            })
        )
    })
})

it('minBy identity, xs === Nothing, when |xs| === 0', () => {
    forAll(iterable(oneOf(float(), string()), { maxLength: 0 }), (xs) => {
        return minBy(xs, (x) => x) === Nothing
    })
})
