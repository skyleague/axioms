import { has } from './index.js'

import { all } from '../../iterator/index.js'
import { keysOf } from '../../object/index.js'
import { forAll, dict, unknown } from '../../random/index.js'

test('all has keysOf o', () => {
    forAll(dict(unknown()), (o) => all(keysOf(o), (k) => has(o, k)))
})

test('typing', () => {
    expect(has({ foo: 'bar' }, 'foo')).toBeTrue()
})
