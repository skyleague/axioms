import { json } from '.'

import { oneOf, constant } from '..'
import { isObject } from '../../../guard'
import { equal } from '../../../iterator'
import { forAll } from '../../../random/arbitrary'

test('parse stringify x == x', () => {
    forAll(json(), (j) => equal(JSON.parse(JSON.stringify(j)), j))
})

test('parse stringify x | undefined == x fails (nodejs bug)', () => {
    expect(() =>
        forAll(oneOf(json({ object: false }), constant(undefined)), (j) => equal(JSON.parse(JSON.stringify(j)), j), { seed: 42n })
    ).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 2 tests (seed: 42n)
        Shrunk 0 time(s)
        Counter example:

        undefined

        Unexpected token u in JSON at position 0"
    `)
})

test('parse stringify x != x fails', () => {
    expect(() => forAll(json({ object: false }), (j) => !equal(JSON.parse(JSON.stringify(j)), j), { seed: 42n }))
        .toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 7 tests (seed: 42n)
        Shrunk 1 time(s)
        Counter example:

        0"
    `)
})

test('parse stringify x != object x fails', () => {
    expect(() => {
        forAll(json({ object: false }), (j) => !isObject(j), { seed: 42n })
    }).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 14 tests (seed: 42n)
        Shrunk 8 time(s)
        Counter example:

        {}"
    `)
})
