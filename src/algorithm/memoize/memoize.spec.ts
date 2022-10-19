import { memoize } from '.'

import { range } from '../../generator'
import { forAll, integer, tuple, unknown } from '../../random'

test('simple', () => {
    let i = 0
    const mem = memoize(() => i++)
    expect(mem()).toEqual(0)
    expect(mem()).toEqual(0)

    mem.clear()
    expect(mem()).toEqual(1)
})

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
