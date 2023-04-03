import { unique } from './index.js'

import { collect } from '../../array/index.js'
import { groupBy } from '../../iterator/index.js'
import { array, forAll, json, unknown } from '../../random/index.js'

test('simple', () => {
    expect(collect(unique([1, 1, 2, 3, 3]))).toEqual([1, 2, 3])
})

test('|X| >= unique X', () => {
    forAll(array(unknown()), (xs) => {
        expect(collect(unique(xs)).length).toBeLessThanOrEqual(xs.length)
    })
})

test('keys groupby identity X === map string unique X', () => {
    forAll(array(json()), (xs) => {
        expect(collect(unique(xs)).map((x) => JSON.stringify(x))).toContainAllValues(Object.keys(groupBy(xs, JSON.stringify)))
    })
})
