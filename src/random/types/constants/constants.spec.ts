import { constants } from './constants'

import { forAll, random } from '../../arbitrary'
import { object } from '../object'
import { string } from '../string'
import { tuple } from '../tuple'

test('simple', () => {
    const aFoo = object({ foo: string() })
    const aBar = object({ bar: string() })
    forAll(tuple(aFoo, aBar), ([a, b]) => {
        const c = constants(a, b)
        const x = random(c)
        return x === a || x === b
    })
})
