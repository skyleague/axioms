import { has } from './index.js'

import { all } from '../../../iterator/index.js'
import { forAll, unknown } from '../../../random/index.js'
import { record } from '../../../random/types/record/record.js'
import { keysOf } from '../../index.js'

import { expect, it } from 'vitest'

it('all has keysOf o', () => {
    forAll(record(unknown()), (o) => all(keysOf(o), (k) => has(o, k)))
})

it('typing', () => {
    expect(has({ foo: 'bar' }, 'foo')).toBe(true)
})
