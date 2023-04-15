import { Nothing } from './index.js'

import { expect, it } from 'vitest'

it('Nothing serializes', () => {
    expect(`${Nothing.toString()}`).toEqual('Symbol((Nothing))')
})

it('Nothing string coerces', () => {
    expect(`${String(Nothing)}`).toEqual('Symbol((Nothing))')
})

it('Nothing assignable to Nothing', () => {
    const _x: Nothing = Nothing
})

it('Nothing assignable to primitive', () => {
    const _x: Nothing | PropertyKey = Nothing
})
