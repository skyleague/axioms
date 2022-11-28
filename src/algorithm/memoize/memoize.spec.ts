/* eslint-disable @typescript-eslint/require-await */
import { memoize, ttlCacheResolver } from '.'

import { sleep } from '../../async'
import { range } from '../../generator'
import { asyncForAll, forAll, integer, tuple, unknown } from '../../random'

describe('cache resolver', () => {
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
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = jest.fn(() => x)
            const mem = memoize(fn)
            for (const _ of range(n)) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    test('async mem x only called once', async () => {
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 1000 })), async ([x, n]) => {
            const fn = jest.fn(async () => x)
            const mem = memoize(fn)
            for (const _ of range(n)) {
                expect(await mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    test('clear mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
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
        })
    })

    test('clear mem x = undefined', () => {
        forAll(unknown(), (x) => {
            const mem = memoize(() => x)
            expect(mem.clear()).toBeUndefined()
        })
    })
})

describe('ttl cache resolver', () => {
    test('simple', () => {
        let i = 0
        const mem = memoize(() => i++, ttlCacheResolver(1_000))
        expect(mem()).toEqual(0)
        expect(mem()).toEqual(0)

        mem.clear()
        expect(mem()).toEqual(1)
    })

    test('mem x = x', () => {
        forAll(unknown(), (x) => {
            const mem = memoize(() => x, ttlCacheResolver(1_000))
            expect(mem()).toEqual(x)
        })
    })

    test('mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = jest.fn(() => x)
            const mem = memoize(fn, ttlCacheResolver(1_000))
            for (const _ of range(n)) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    test('async mem x only called once', async () => {
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 1000 })), async ([x, n]) => {
            const fn = jest.fn(async () => x)
            const mem = memoize(fn, ttlCacheResolver(1_000))
            for (const _ of range(n)) {
                expect(await mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    test('async mem x called twice after timeout', async () => {
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 500 })), async ([x, n]) => {
            const fn = jest.fn(async () => x)
            const mem = memoize(fn, ttlCacheResolver(5))
            for (const _ of range(n)) {
                expect(await mem()).toEqual(x)
            }

            jest.setSystemTime(new Date().getTime() + 10)

            for (const _ of range(n)) {
                expect(await mem()).toEqual(x)
            }

            expect(fn.mock.calls.length).toBe(2)
        })
    })

    test('async mem resolves', async () => {
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 10 })), async ([x, n]) => {
            const fn = jest.fn(async () => {
                await sleep(0)
                return x
            })
            const mem = memoize(fn, ttlCacheResolver(5))
            for (const _ of range(n)) {
                expect(await mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    test('clear mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = jest.fn(() => x)
            const mem = memoize(fn, ttlCacheResolver(1_000))
            for (const _ of range(n)) {
                expect(mem()).toEqual(x)
            }
            mem.clear()
            for (const _ of range(n)) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(2)
        })
    })

    test('clear mem x = undefined', () => {
        forAll(unknown(), (x) => {
            const mem = memoize(() => x, ttlCacheResolver(1_000))
            expect(mem.clear()).toBeUndefined()
        })
    })
})
