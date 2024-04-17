import { keysOf } from './index.js'

import { array, forAll, integer, oneOf, record, string, unknown } from '../../random/index.js'

import { expect, expectTypeOf, it } from 'vitest'

it('keysOf === Object.keys', () => {
    forAll(record(unknown()), (o) => {
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
    forAll(oneOf(array(string()), record([integer(), integer()])), (o) => {
        expect(keysOf(o)).toStrictEqual(Object.keys(o))
    })
})

it('types correctly', () => {
    forAll(oneOf(array(string()), record([integer(), integer()])), (o) => {
        expect(keysOf(o)).toStrictEqual(Object.keys(o))
    })

    expectTypeOf(keysOf([1, 2, 3])).toEqualTypeOf<string[]>()
    expectTypeOf(keysOf([1, '2', 3])).toEqualTypeOf<string[]>()

    expectTypeOf(keysOf([1, 2, 3] as number[])).toEqualTypeOf<string[]>()
    expectTypeOf(keysOf([1, '2', 3] as (number | string)[])).toEqualTypeOf<string[]>()

    expectTypeOf(keysOf({ foo: 'bar' } as const)).toEqualTypeOf<'foo'[]>()
    expectTypeOf(keysOf<number[] | { foo: string }>({ foo: 'bar' })).toEqualTypeOf<string[] | 'foo'[]>()
})
