import { allOf } from './all-of.js'

import { isString } from '../../../guard/index.js'
import { chainArbitrary, forAll } from '../../arbitrary/index.js'
import { constant } from '../helper/index.js'
import { object } from '../object/index.js'
import { string } from '../string/index.js'
import { tuple } from '../tuple/index.js'

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
