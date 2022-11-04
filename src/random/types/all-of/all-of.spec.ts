import { allOf } from './all-of'

import { isString } from '../../../guard'
import { chainArbitrary, forAll } from '../../arbitrary'
import { constant } from '../helper'
import { object } from '../object'
import { string } from '../string'
import { tuple } from '../tuple'

test('simple', () => {
    const aFoo = object({ foo: string() })
    const aBar = object({ bar: string() })
    forAll(allOf(aFoo, aBar), (x) => {
        return isString(x.foo) && isString(x.bar)
    })
})

test('merge order', () => {
    const aFoo = object({ foo: string(), bar: string() })
    const aBar = object({ bar: string() })

    forAll(
        chainArbitrary(tuple(aFoo, aBar), ([foo, bar]) => {
            return tuple(constant(foo), constant(bar), allOf(constant(foo), constant(bar)))
        }),
        ([foo, bar, x]) => {
            expect(x).toEqual({ ...foo, ...bar })
        }
    )
})
