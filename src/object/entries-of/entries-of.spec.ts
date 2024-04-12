import { entriesOf } from './index.js'

import { array, forAll, integer, oneOf, record, string, unknown } from '../../random/index.js'

import { expect, expectTypeOf, it } from 'vitest'

it('entriesOf === Object.entries', () => {
    forAll(record(unknown()), (o) => {
        expect(entriesOf(o)).toStrictEqual(Object.entries(o))
    })
})

it('entriesOf [xs] === Object.entries', () => {
    forAll(array(string()), (o) => {
        expect(entriesOf(o)).toStrictEqual(Object.entries(o))
    })
})

it('entriesOf [1, 2, 3]', () => {
    expect(entriesOf([1, 2, 3])).toMatchInlineSnapshot(`
        [
          [
            "0",
            1,
          ],
          [
            "1",
            2,
          ],
          [
            "2",
            3,
          ],
        ]
    `)
})

it('entriesOf union object and array', () => {
    forAll(oneOf(array(string()), record([integer(), integer()])), (o) => {
        expect(entriesOf(o)).toStrictEqual(Object.entries(o))
    })
    const _foo: [string, number][] = entriesOf([1, 2, 3])
    const _foo2: [string, number | string][] = entriesOf([1, '2', 3])
})

it('has correct typing', () => {
    expectTypeOf(entriesOf([1, 2, 3])).toEqualTypeOf<[string, 1 | 2 | 3][]>()
    expectTypeOf(entriesOf([1, '2', 3])).toEqualTypeOf<[string, 1 | '2' | 3][]>()

    expectTypeOf(entriesOf({ foo: 'bar' })).toEqualTypeOf<['foo', 'bar'][]>()
    expectTypeOf(entriesOf<number[] | { foo: string }>({ foo: 'bar' })).toEqualTypeOf<[string, number][] | ['foo', string][]>()
})
