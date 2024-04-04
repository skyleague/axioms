import { entriesOf } from './index.js'

import { forAll, record, unknown, string, array, oneOf, integer } from '../../random/index.js'

import { expect, it } from 'vitest'

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
    const _foo3: ['foo', string][] = entriesOf({ foo: 'bar' })
    const _foo4: (['foo', string] | [string, number])[] = entriesOf<number[] | { foo: string }>({ foo: 'bar' })
})
