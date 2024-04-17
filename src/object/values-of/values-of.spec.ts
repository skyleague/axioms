import { valuesOf } from './index.js'

import { forAll, record, unknown, string, array, oneOf, integer } from '../../random/index.js'

import { expect, it, expectTypeOf } from 'vitest'

it('valuesOf === Object.values', () => {
    forAll(record(unknown()), (o) => {
        expect(valuesOf(o)).toStrictEqual(Object.values(o))
    })
})

it('valuesOf [xs] === Object.values', () => {
    forAll(array(string()), (o) => {
        expect(valuesOf(o)).toStrictEqual(Object.values(o))
    })
})

it('valuesOf [1, 2, 3]', () => {
    expect(valuesOf([1, 2, 3])).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
    `)
})

it('valuesOf union object and array', () => {
    forAll(oneOf(array(string()), record([integer(), integer()])), (o) => {
        expect(valuesOf(o)).toStrictEqual(Object.values(o))
    })
})

it('types', () => {
    expectTypeOf(valuesOf({ foo: 'bar' })).toEqualTypeOf<'bar'[]>()
    expectTypeOf(valuesOf<number[] | { foo: string }>({ foo: 'bar' })).toEqualTypeOf<number[] | string[]>()

    expectTypeOf(valuesOf([1, 2, 3])).toEqualTypeOf<(1 | 2 | 3)[]>()
    expectTypeOf(valuesOf([1, '2', 3])).toEqualTypeOf<(1 | '2' | 3)[]>()
})
