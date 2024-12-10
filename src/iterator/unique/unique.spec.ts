import { array, forAll, json, unknown } from '../../random/index.js'
import { unique } from './index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(unique([1, 1, 2, 3, 3]).toArray()).toEqual([1, 2, 3])
})

it('|X| >= unique X', () => {
    forAll(array(unknown()), (xs) => {
        expect(unique(xs).toArray().length).toBeLessThanOrEqual(xs.length)
    })
})

it('keys groupby identity X === map string unique X', () => {
    forAll(array(json()), (xs) => {
        const grouped = Object.keys(Object.groupBy(xs, (x) => JSON.stringify(x)))
        expect(new Set(unique(xs).map((x) => JSON.stringify(x))).intersection(new Set(grouped)).size).toBe(grouped.length)
    })
})
