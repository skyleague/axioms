import { identity } from './index.js'

import { forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('self', () => {
    expect(identity(1)).toEqual(1)
    expect(identity('1')).toEqual('1')
    expect(identity({ '1': 2 })).toEqual({ '1': 2 })
})

it('identity x === x', () => {
    forAll(unknown(), (x) => identity(x) === x)
})
