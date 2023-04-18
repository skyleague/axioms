import { unique } from './index.js'

import { collect } from '../../array/index.js'
import { groupBy } from '../../iterator/index.js'
import { array, forAll, json, unknown } from '../../random/index.js'
import { intersection } from '../../set/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(collect(unique([1, 1, 2, 3, 3]))).toEqual([1, 2, 3])
})

it('|X| >= unique X', () => {
    forAll(array(unknown()), (xs) => {
        expect(collect(unique(xs)).length).toBeLessThanOrEqual(xs.length)
    })
})

it('keys groupby identity X === map string unique X', () => {
    forAll(array(json()), (xs) => {
        const grouped = Object.keys(groupBy(xs, JSON.stringify))
        expect(
            intersection(
                collect(unique(xs)).map((x) => JSON.stringify(x)),
                grouped
            ).size
        ).toBe(grouped.length)
    })
})
