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
              "0": 95,
              "1": 94,
              "2": 111,
              "3": 108,
              "4": 92,
              "5": 109,
              "6": 106,
              "7": 113,
              "8": 84,
              "9": 88,
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
              "0": 95,
              "1": 94,
              "2": 111,
              "3": 108,
              "4": 92,
              "5": 109,
              "6": 106,
              "7": 113,
              "8": 84,
              "9": 88,
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
              "0": 189,
              "4": 420,
              "8": 391,
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
              "0": 95,
              "1": 94,
              "2": 111,
              "3": 108,
              "4": 92,
              "5": 109,
              "6": 106,
              "7": 113,
              "8": 84,
              "9": 88,
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
              "0": 95,
              "1": 94,
              "2": 111,
              "3": 108,
              "4": 92,
              "5": 109,
              "6": 106,
              "7": 113,
              "8": 84,
              "9": 88,
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
              "0": 95,
              "1": 94,
              "2": 111,
              "3": 108,
              "4": 92,
              "5": 109,
              "6": 106,
              "7": 113,
              "8": 84,
              "9": 88,
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
              "0": 95,
              "1": 94,
              "2": 111,
              "3": 108,
              "4": 92,
              "5": 109,
              "6": 106,
              "7": 113,
              "8": 84,
              "9": 88,
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
              "0": 95,
              "1": 94,
              "2": 111,
              "3": 108,
              "4": 92,
              "5": 109,
              "6": 106,
              "7": 113,
              "8": 84,
              "9": 88,
            }
        `)
    })

    it('allowed characters', () => {
        // eslint-disable-next-line no-control-regex
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
              "0": 95,
              "1": 94,
              "2": 111,
              "3": 108,
              "4": 92,
              "5": 109,
              "6": 106,
              "7": 113,
              "8": 84,
              "9": 88,
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
              "0": 95,
              "1": 4,
              "10": 82,
              "11": 24,
              "12": 86,
              "13": 38,
              "14": 76,
              "15": 25,
              "16": 62,
              "17": 35,
              "18": 41,
              "2": 91,
              "3": 23,
              "4": 87,
              "5": 14,
              "6": 94,
              "7": 24,
              "8": 72,
              "9": 27,
            }
        `)
    })

    it('allowed characters', () => {
        forAll(utf16Surrogate(), (str) => util.toUSVString(str) === str)
    })
})
