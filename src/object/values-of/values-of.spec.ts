import { valuesOf } from '.'

import { forAll, dict, unknown, string, array, oneOf, integer } from '../../random'

test('valuesOf === Object.values', () => {
    forAll(dict(unknown()), (o) => {
        expect(valuesOf(o)).toStrictEqual(Object.values(o))
    })
})

test('valuesOf [xs] === Object.values', () => {
    forAll(array(string()), (o) => {
        expect(valuesOf(o)).toStrictEqual(Object.values(o))
    })
})

test('valuesOf [1, 2, 3]', () => {
    expect(valuesOf([1, 2, 3])).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
})

test('valuesOf union object and array', () => {
    forAll(oneOf(array(string()), dict([integer(), integer()])), (o) => {
        expect(valuesOf(o)).toStrictEqual(Object.values(o))
    })
    const _foo: number[] = valuesOf([1, 2, 3])
    const _foo2: (number | string)[] = valuesOf([1, '2', 3])
    const _foo3: 'bar'[] = valuesOf({ foo: 'bar' } as const)
    const _foo4: number[] | string[] = valuesOf<number[] | { foo: string }>({ foo: 'bar' })
})
