import { keysOf } from './index.js'

import { forAll, dict, unknown, string, array, oneOf, integer } from '../../random/index.js'

import { expect, it } from 'vitest'

it('keysOf === Object.keys', () => {
    forAll(dict(unknown()), (o) => {
        expect(keysOf(o)).toStrictEqual(Object.keys(o))
    })
})

it('keysOf [xs] === Object.keys', () => {
    forAll(array(string()), (o) => {
        expect(keysOf(o)).toStrictEqual(Object.keys(o))
    })
})

it('keysOf [1, 2, 3]', () => {
    expect(keysOf([1, 2, 3])).toMatchInlineSnapshot(`
        [
          "0",
          "1",
          "2",
        ]
    `)
})

it('keysOf union object and array', () => {
    forAll(oneOf(array(string()), dict([integer(), integer()])), (o) => {
        expect(keysOf(o)).toStrictEqual(Object.keys(o))
    })
    const _foo: string[] = keysOf([1, 2, 3])
    const _foo2: (number | string)[] = keysOf([1, '2', 3])
    const _foo3: 'foo'[] = keysOf({ foo: 'bar' } as const)
    const _foo4: string[] = keysOf<number[] | { foo: string }>({ foo: 'bar' })
})
