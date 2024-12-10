import { memoize, ttlCacheResolver } from './index.js'

import { sleep } from '../../async/index.js'
import { asyncForAll, forAll, integer, tuple, unknown } from '../../random/index.js'

import { describe, expect, it, vi } from 'vitest'
import { LRUCacheResolver, cacheResolver } from './resolver.js'

describe('cache resolver', () => {
    it('simple', () => {
        let i = 0
        const mem = memoize(() => i++)
        expect(mem()).toEqual(0)
        expect(mem()).toEqual(0)

        mem.clear()
        expect(mem()).toEqual(1)
    })

    it('types', () => {
        // @ts-expect-error
        memoize((x: number) => x)
        // @ts-expect-error
        memoize((x: number) => x, cacheResolver())
        // @ts-expect-error
        memoize((x: number) => x, ttlCacheResolver())
        memoize((x: number) => x, LRUCacheResolver())
    })

    it('mem x = x', () => {
        forAll(unknown(), (x) => {
            const mem = memoize(() => x)
            expect(mem()).toEqual(x)
        })
    })

    it('mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = vi.fn(() => x)
            const mem = memoize(fn)
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    it('async mem x only called once', async () => {
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 1000 })), async ([x, n]) => {
            const fn = vi.fn(async () => x)
            const mem = memoize(fn)
            for (let i = 0; i < n; i++) {
                expect(await mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    it('clear mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = vi.fn(() => x)
            const mem = memoize(fn)
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            mem.clear()
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(2)
        })
    })
})

describe('ttl cache resolver', () => {
    it('simple', () => {
        let i = 0
        const mem = memoize(() => i++, ttlCacheResolver(1_000))
        expect(mem()).toEqual(0)
        expect(mem()).toEqual(0)

        mem.clear()
        expect(mem()).toEqual(1)
    })

    it('mem x = x', () => {
        forAll(unknown(), (x) => {
            const mem = memoize(() => x, ttlCacheResolver(1_000))
            expect(mem()).toEqual(x)
        })
    })

    it('mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = vi.fn(() => x)
            const mem = memoize(fn, ttlCacheResolver(1_000))
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    it('async mem x only called once', async () => {
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 1000 })), async ([x, n]) => {
            const fn = vi.fn(async () => x)
            const mem = memoize(fn, ttlCacheResolver(1_000))
            for (let i = 0; i < n; i++) {
                expect(await mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    it('async mem x called twice after timeout', async () => {
        vi.setSystemTime(new Date().getTime())
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 500 })), async ([x, n]) => {
            const fn = vi.fn(async () => x)
            const mem = memoize(fn, ttlCacheResolver(5))
            for (let i = 0; i < n; i++) {
                expect(await mem()).toEqual(x)
            }

            vi.setSystemTime(new Date().getTime() + 10)

            for (let i = 0; i < n; i++) {
                expect(await mem()).toEqual(x)
            }

            expect(fn.mock.calls.length).toBe(2)
        })
    })

    it('async mem resolves', async () => {
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 10 })), async ([x, n]) => {
            const fn = vi.fn(async () => {
                await sleep(0)
                return x
            })
            const mem = memoize(fn, ttlCacheResolver(5))
            for (let i = 0; i < n; i++) {
                expect(await mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    it('clear mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = vi.fn(() => x)
            const mem = memoize(fn, ttlCacheResolver(1_000))
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            mem.clear()
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(2)
        })
    })
})

describe('lru resolver', () => {
    it('simple', () => {
        let i = 0
        const mem = memoize(() => i++, LRUCacheResolver())
        expect(mem()).toEqual(0)
        expect(mem()).toEqual(0)

        mem.clear()
        expect(mem()).toEqual(1)
    })

    it('mem x = x', () => {
        forAll(unknown(), (x) => {
            const mem = memoize(() => x, LRUCacheResolver())
            expect(mem()).toEqual(x)
        })
    })

    it('mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = vi.fn(() => x)
            const mem = memoize(fn, LRUCacheResolver())
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    it('async mem x only called once', async () => {
        await asyncForAll(tuple(unknown(), integer({ min: 1, max: 1000 })), async ([x, n]) => {
            const fn = vi.fn(async () => x)
            const mem = memoize(fn, LRUCacheResolver())
            for (let i = 0; i < n; i++) {
                expect(await mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(1)
        })
    })

    it('clear mem x only called once', () => {
        forAll(tuple(unknown(), integer({ min: 1, max: 1000 })), ([x, n]) => {
            const fn = vi.fn(() => x)
            const mem = memoize(fn, LRUCacheResolver({ maxItems: n }))
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            mem.clear()
            for (let i = 0; i < n; i++) {
                expect(mem()).toEqual(x)
            }
            expect(fn.mock.calls.length).toBe(2)
        })
    })

    it('fibbonacci', () => {
        let calls = 0
        const fib = memoize(
            (n: number): number => {
                calls++
                if (n <= 1) {
                    return n
                }
                if (n === 2) {
                    return 1
                }
                return fib(n - 1) + fib(n - 2)
            },
            LRUCacheResolver({ maxItems: 1000 }),
        )
        expect(fib(10)).toEqual(55)
        expect(calls).toBe(10)
    })
})
