import { array } from './array'

import { collect } from '../../../array'
import { isArray, isInteger } from '../../../guard'
import { all, unique } from '../../../iterator'
import { forAll } from '../../arbitrary'
import { integer } from '../integer'

describe('array', () => {
    test('simple', () => {
        forAll(array(integer()), (xs) => {
            return isArray(xs) && all(xs, isInteger)
        })
    })

    test('unique', () => {
        forAll(array(integer(), { uniqueItems: true }), (xs) => {
            return isArray(xs) && all(xs, isInteger) && collect(unique(xs)).length === xs.length
        })
    })
})
