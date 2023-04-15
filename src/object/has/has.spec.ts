import { has } from './index.js'

import { all } from '../../iterator/index.js'
import { keysOf } from '../../object/index.js'
import { forAll, dict, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('all has keysOf o', () => {
    forAll(dict(unknown()), (o) => all(keysOf(o), (k) => has(o, k)))
})

it('typing', () => {
    expect(has({ foo: 'bar' }, 'foo')).toBe(true)
})
