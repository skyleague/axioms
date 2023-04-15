import { array } from './array.js'

import { collect } from '../../../array/index.js'
import { isArray, isInteger } from '../../../guard/index.js'
import { all, unique } from '../../../iterator/index.js'
import { forAll } from '../../arbitrary/index.js'
import { integer } from '../integer/index.js'

import { describe, it } from 'vitest'

describe('array', () => {
    it('simple', () => {
        forAll(array(integer()), (xs) => {
            return isArray(xs) && all(xs, isInteger)
        })
    })

    it('unique', () => {
        forAll(array(integer(), { uniqueItems: true }), (xs) => {
            return isArray(xs) && all(xs, isInteger) && collect(unique(xs)).length === xs.length
        })
    })
})
