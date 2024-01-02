import {
    alpha,
    alphaNumeric,
    ascii,
    base64,
    hex,
    lowerAlpha,
    lowerAlphaNumeric,
    string,
    utf16,
    utf16Surrogate,
} from './string.js'

import { groupBy, replicate } from '../../../iterator/index.js'
import { mapValues } from '../../../object/index.js'
import { arbitraryContext, forAll } from '../../arbitrary/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { integer } from '../integer/index.js'
import { tuple } from '../tuple/index.js'

import { expect, describe, it } from 'vitest'

import util from 'node:util'

describe('string', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return string({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => string().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 99,
            "2": 97,
            "3": 106,
            "4": 103,
            "5": 111,
            "6": 95,
            "7": 95,
            "8": 93,
            "9": 102,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(string(), (str) => str.split('').every((c) => 32 <= c.charCodeAt(0) && c.charCodeAt(0) <= 126))
    })
})

describe('hex', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return hex({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => hex().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 99,
            "2": 97,
            "3": 106,
            "4": 103,
            "5": 111,
            "6": 95,
            "7": 95,
            "8": 93,
            "9": 102,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(hex(), (str) => str.split('').every((c) => '0123456789abcdef'.includes(c)))
    })
})

describe('base64', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return base64({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => {
                const nearestMin = Math.floor(minLength / 4) * 4
                const nearestMax = Math.ceil(maxLength / 4) * 4
                return nearestMin <= str.length && str.length <= nearestMax
            }
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => base64().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 198,
            "4": 417,
            "8": 385,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(base64(), (str) =>
            str.split('').every((c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.includes(c))
        )
    })
})

describe('alpha', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return alpha({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => alpha().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 99,
            "2": 97,
            "3": 106,
            "4": 103,
            "5": 111,
            "6": 95,
            "7": 95,
            "8": 93,
            "9": 102,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(alpha(), (str) => str.split('').every((c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.includes(c)))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => alpha({ extra }).map((c) => [c, extra] as const)),
            ([str, extra]) =>
                str.split('').every((c) => `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${extra}`.includes(c))
        )
    })
})

describe('lowerAlpha', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return lowerAlpha({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => lowerAlpha().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 99,
            "2": 97,
            "3": 106,
            "4": 103,
            "5": 111,
            "6": 95,
            "7": 95,
            "8": 93,
            "9": 102,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(lowerAlpha(), (str) => str.split('').every((c) => 'abcdefghijklmnopqrstuvwxy'.includes(c)))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => lowerAlpha({ extra }).map((c) => [c, extra] as const)),
            ([str, extra]) => str.split('').every((c) => `abcdefghijklmnopqrstuvwxy${extra}`.includes(c))
        )
    })
})

describe('alphaNumeric', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return alphaNumeric({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => alphaNumeric().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 99,
            "2": 97,
            "3": 106,
            "4": 103,
            "5": 111,
            "6": 95,
            "7": 95,
            "8": 93,
            "9": 102,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(alphaNumeric(), (str) =>
            str.split('').every((c) => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(c))
        )
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => alphaNumeric({ extra }).map((c) => [c, extra] as const)),
            ([str, extra]) =>
                str.split('').every((c) => `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${extra}`.includes(c))
        )
    })
})

describe('lowerAlphaNumeric', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return lowerAlphaNumeric({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => lowerAlphaNumeric().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 99,
            "2": 97,
            "3": 106,
            "4": 103,
            "5": 111,
            "6": 95,
            "7": 95,
            "8": 93,
            "9": 102,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(lowerAlphaNumeric(), (str) => str.split('').every((c) => 'abcdefghijklmnopqrstuvwxyz0123456789'.includes(c)))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => lowerAlphaNumeric({ extra }).map((c) => [c, extra] as const)),
            ([str, extra]) => str.split('').every((c) => `abcdefghijklmnopqrstuvwxyz0123456789${extra}`.includes(c))
        )
    })
})

describe('ascii', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return ascii({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => ascii().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 99,
            "2": 97,
            "3": 106,
            "4": 103,
            "5": 111,
            "6": 95,
            "7": 95,
            "8": 93,
            "9": 102,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(ascii(), (str) => str.split('').every((c) => /[\x00-\x7F]/.test(c)))
    })
})

describe('utf16', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return utf16({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength
        )
    })

    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => utf16().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 99,
            "2": 97,
            "3": 106,
            "4": 103,
            "5": 111,
            "6": 95,
            "7": 95,
            "8": 93,
            "9": 102,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(utf16(), (str) => util.toUSVString(str) === str)
    })
})

describe('utf16Surrogate', () => {
    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        expect(
            mapValues(
                groupBy(
                    replicate(() => utf16Surrogate().sample(context), 1000),
                    (x) => x.length
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 99,
            "1": 8,
            "10": 86,
            "11": 31,
            "12": 71,
            "13": 30,
            "14": 70,
            "15": 28,
            "16": 57,
            "17": 27,
            "18": 70,
            "2": 91,
            "3": 9,
            "4": 92,
            "5": 16,
            "6": 88,
            "7": 16,
            "8": 88,
            "9": 23,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(utf16Surrogate(), (str) => util.toUSVString(str) === str)
    })
})
