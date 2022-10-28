import { allOf } from './all-of'

import { isString } from '../../../guard'
import { forAll } from '../../arbitrary'
import { object } from '../object'
import { string } from '../string'

test('simple', () => {
    const aFoo = object({ foo: string() })
    const aBar = object({ bar: string() })
    forAll(allOf(aFoo, aBar), (x) => {
        return isString(x.foo) && isString(x.bar)
    })
})
