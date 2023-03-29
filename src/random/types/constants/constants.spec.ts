import { constants } from './constants.js'

import { forAll, random } from '../../arbitrary/index.js'
import { object } from '../object/index.js'
import { string } from '../string/index.js'
import { tuple } from '../tuple/index.js'

test('simple', () => {
    const aFoo = object({ foo: string() })
    const aBar = object({ bar: string() })
    forAll(tuple(aFoo, aBar), ([a, b]) => {
        const c = constants(a, b)
        const x = random(c)
        return x === a || x === b
    })
})
