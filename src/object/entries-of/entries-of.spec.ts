import { entriesOf } from '.'

import { forAll, dict, unknown, string, array, oneOf, integer } from '../../random'

test('entriesOf === Object.entries', () => {
    forAll(dict(unknown()), (o) => {
        expect(entriesOf(o)).toStrictEqual(Object.entries(o))
    })
})

test('entriesOf [xs] === Object.entries', () => {
    forAll(array(string()), (o) => {
        expect(entriesOf(o)).toStrictEqual(Object.entries(o))
    })
})

test('entriesOf [1, 2, 3]', () => {
    expect(entriesOf([1, 2, 3])).toMatchInlineSnapshot(`
        Array [
          Array [
            "0",
            1,
          ],
          Array [
            "1",
            2,
          ],
          Array [
            "2",
            3,
          ],
        ]
    `)
})

test('entriesOf union object and array', () => {
    forAll(oneOf(array(string()), dict([integer(), integer()])), (o) => {
        expect(entriesOf(o)).toStrictEqual(Object.entries(o))
    })
    const _foo: [string, number][] = entriesOf([1, 2, 3])
    const _foo2: [string, number | string][] = entriesOf([1, '2', 3])
    const _foo3: ['foo', string][] = entriesOf({ foo: 'bar' })
    const _foo4: (['foo', string] | [string, number])[] = entriesOf<number[] | { foo: string }>({ foo: 'bar' })
})
