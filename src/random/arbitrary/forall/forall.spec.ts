import { asyncForAll, forAll } from './index.js'

import { sleep } from '../../../async/index.js'
import { array, integer, tuple, utf16 } from '../../../random/index.js'

import { describe, expect, it } from 'vitest'

it('abs smaller than six', () => {
    expect(() => {
        forAll(integer(), (i) => Math.abs(i) <= 600000, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 4 tests (seed: 42n)
      Shrunk 15 time(s)
      Counter example:

      600001

      ]
    `)
    expect(() => {
        forAll(array(integer()), (i) => i.length === 0 || Math.abs(i[0]!) <= 600000, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 2 tests (seed: 42n)
      Shrunk 27 time(s)
      Counter example:

      [ 600001 ]

      ]
    `)
})

const contains = (text: string, pattern: string) => text.includes(pattern)
describe('properties', () => {
    // string text always contains itself
    it('should always contain itself', () => {
        forAll(utf16(), (text) => contains(text, text))
    })
    it('should always contain its substrings', () => {
        forAll(tuple(utf16(), utf16(), utf16()), ([a, b, c]) => {
            return contains(a + b + c, b)
        })
    })

    it('allows an actual tuple as tuple', () => {
        forAll([utf16(), utf16(), utf16()] as const, ([a, b, c]) => {
            return contains(a + b + c, b)
        })
    })

    it('allows an actual tuple as tuple without const', () => {
        forAll([utf16(), utf16(), utf16()], ([a, b, c]) => {
            return contains(a + b + c, b)
        })
    })

    it('allows an object as literal', () => {
        forAll({ a: utf16(), b: utf16(), c: utf16() }, ({ a, b, c }) => {
            return contains(a + b + c, b)
        })
    })
})

it('counter example with jest expect', () => {
    expect(() => {
        forAll(
            integer(),
            (i) => {
                expect(Math.abs(i)).toBeLessThanOrEqual(600000)
            },
            { seed: 42n, timeout: false },
        )
    }).toThrow(/^Counter example found after \d+ tests \(seed: 42n\)/)
})

it('async - counter example with jest expect', async () => {
    await expect(
        asyncForAll(
            integer(),
            // biome-ignore lint/suspicious/useAwait: it's a test
            async (i) => {
                expect(Math.abs(i)).toBeLessThanOrEqual(600000)
            },
            { seed: 42n, timeout: false },
        ),
    ).rejects.toThrow(/^Counter example found after \d+ tests \(seed: 42n\)/)
})

it('timeout async', async () => {
    await expect(
        asyncForAll(
            integer(),
            async (i) => {
                await sleep(2)
                expect(Math.abs(i)).toBeLessThanOrEqual(600000)
            },
            { seed: 42n },
        ),
    ).rejects.toThrow(/^Counter example found after/)
})
