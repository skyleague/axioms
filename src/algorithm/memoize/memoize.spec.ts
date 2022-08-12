import { memoize } from '.'

import { memoizeAttributes, memoizeGetters } from './memoize'

import { mapValues } from '../..'
import { range } from '../../generator'
import { forAll, integer, tuple, unknown } from '../../random'

test('mem x = x', () => {
    forAll(unknown(), (x) => {
        const mem = memoize(() => x)
        expect(mem()).toEqual(x)
    })
})

test('mem x only called once', () => {
    forAll(
        tuple(unknown(), integer({ min: 1, max: 1000 })),
        ([x, n]) => {
            const fn = jest.fn(() => x)
            const mem = memoize(fn)
            for (const _ of range(n)) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        },
        { tests: 2 }
    )
})

test('clear mem x only called once', () => {
    forAll(
        tuple(unknown(), integer({ min: 1, max: 1000 })),
        ([x, n]) => {
            const fn = jest.fn(() => x)
            const mem = memoize(fn)
            for (const _ of range(n)) {
                expect(mem()).toEqual(x)
            }
            mem.clear()
            for (const _ of range(n)) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(2)
        },
        { tests: 2 }
    )
})

test('clear mem x = undefined', () => {
    forAll(unknown(), (x) => {
        const mem = memoize(() => x)
        expect(mem.clear()).toBeUndefined()
    })
})

test('memoizeGetters', () => {
    let i = 0
    const x = {
        x: 0,
        get y() {
            return ++i
        },
        z() {
            return 2
        },

        a: undefined,
        b: (c: number) => c + 1,
    }
    expect({ ...x }).not.toEqual({ ...x })

    const y = memoizeGetters(x)
    const z = { ...y }

    expect({ ...z }).toEqual({ ...y })
    y.clear('y')
    expect({ ...z }).not.toEqual({ ...y })

    expect({ ...y }).toEqual({ ...y })
    expect({ ...y }).toMatchInlineSnapshot(`
        Object {
          "a": undefined,
          "b": [Function],
          "clear": [Function],
          "x": 0,
          "y": 4,
          "z": [Function],
        }
    `)
    expect(y.b(1)).toMatchInlineSnapshot(`2`)
})

test('memoizeAttributes', () => {
    let i = 0
    const x = {
        x: () => ++i,
    }
    expect({ ...x }).toEqual({ ...x })
    expect(mapValues(x, (f) => f())).not.toEqual(mapValues(x, (f) => f()))
    expect(mapValues(x, (f) => f())).toMatchInlineSnapshot(`
        Object {
          "x": 3,
        }
    `)

    const y = memoizeAttributes(x)
    expect({ ...y }).toEqual({ ...y })
    expect(mapValues(y, (f) => f())).toEqual(mapValues(y, (f) => f()))
    expect(mapValues(y, (f) => f())).toMatchInlineSnapshot(`
        Object {
          "x": 4,
        }
    `)
    y.x.clear()
    expect(mapValues(y, (f) => f())).toEqual(mapValues(y, (f) => f()))
    expect(mapValues(y, (f) => f())).toMatchInlineSnapshot(`
        Object {
          "x": 5,
        }
    `)
})
