import { valuesOf } from './index.js'

import { forAll, record, unknown, string, array, oneOf, integer } from '../../random/index.js'

import { expect, it } from 'vitest'

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
    const _foo: number[] = valuesOf([1, 2, 3])
    const _foo2: (number | string)[] = valuesOf([1, '2', 3])
    const _foo3: 'bar'[] = valuesOf({ foo: 'bar' } as const)
    const _foo4: number[] | string[] = valuesOf<number[] | { foo: string }>({ foo: 'bar' })
})
