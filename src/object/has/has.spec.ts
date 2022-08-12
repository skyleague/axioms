import { has } from '.'

import { all } from '../../iterator'
import { keysOf } from '../../object'
import { forAll, dict, unknown } from '../../random'

test('all has keysOf o', () => {
    forAll(dict(unknown()), (o) => all(keysOf(o), (k) => has(o, k)))
})

test('typing', () => {
    expect(has({ foo: 'bar' }, 'foo')).toBeTrue()
})
