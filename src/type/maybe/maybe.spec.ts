import { Nothing } from './index.js'

test('Nothing serializes', () => {
    expect(`${Nothing.toString()}`).toEqual('Symbol((Nothing))')
})

test('Nothing string coerces', () => {
    expect(`${String(Nothing)}`).toEqual('Symbol((Nothing))')
})

test('Nothing assignable to Nothing', () => {
    const _x: Nothing = Nothing
})

test('Nothing assignable to primitive', () => {
    const _x: Nothing | PropertyKey = Nothing
})
