import { expect, it } from 'vitest'
import { Nothing, date, datetime, float, forAll, isJust, oneOf, string } from '../../index.js'
import { iterable } from '../../random/types/iterable/iterable.js'
import type { Maybe } from '../../type/maybe/maybe.js'
import { max, maxBy } from './max.js'

it('simple', () => {
    const n: number = max([1, 2, 3] as const)
    expect(n).toEqual(3)
})

it('max xs >= all y', () => {
    forAll(oneOf(iterable(float(), { minLength: 1 }), iterable(string(), { minLength: 1 })), (xs) => {
        const x = max(xs) as Maybe<number>
        return isJust(x) && Iterator.from(xs as number[]).every((y) => x >= y)
    })
})

it('max xs === Nothing, when |xs| === 0', () => {
    forAll(oneOf(iterable(float(), { maxLength: 0 }), iterable(string(), { maxLength: 0 })), (xs) => {
        return max(xs) === Nothing
    })
})

it('maxBy toISOString, xs >= all y.toISOString()', () => {
    forAll(iterable(oneOf(date(), datetime()), { minLength: 1 }), (xs) => {
        const dates = Iterator.from(xs).map((x) => new Date(x))
        const x = maxBy(dates, (d) => d.toISOString())
        return (
            isJust(x) &&
            Iterator.from(xs).every((y) => {
                const date = new Date(y)
                return x.toISOString() >= date.toISOString()
            })
        )
    })
})

it('maxBy identity, xs === Nothing, when |xs| === 0', () => {
    forAll(iterable(oneOf(float(), string()), { maxLength: 0 }), (xs) => {
        return maxBy(xs, (x) => x) === Nothing
    })
})
