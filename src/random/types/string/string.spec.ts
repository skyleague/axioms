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
import { constant } from '../helper/helper.js'
import { integer } from '../integer/index.js'
import { tuple } from '../tuple/index.js'

import { describe, expect, it } from 'vitest'

import util from 'node:util'

const isPrintable = (str: string) => /^[ -~]+$/.test(str)

describe('string', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return string({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            // inclusive
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength,
        )
    })

    it('check min constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((min) => {
                return tuple(constant(min), string({ minLength: min }))
            }),
            ([min, x]) => x.length >= min,
            { seed: 42n },
        )
    })

    it('check max constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((max) => {
                return tuple(constant(max), string({ maxLength: max }))
            }),
            ([max, x]) => x.length <= max,
            { seed: 42n },
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 105,
            "10": 110,
            "2": 82,
            "3": 84,
            "4": 93,
            "5": 80,
            "6": 104,
            "7": 76,
            "8": 108,
            "9": 73,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(string(), (str) => str.split('').every((c) => 32 <= c.charCodeAt(0) && c.charCodeAt(0) <= 126))
    })

    it('all printable', () => {
        forAll(string({ minLength: 1 }), isPrintable)
    })

    it('cardinality', () => {
        expect(string().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('950')
    })
})

describe('hex', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return hex({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            // inclusive
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength,
        )
    })

    it('check min constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((min) => {
                return tuple(constant(min), hex({ minLength: min }))
            }),
            ([min, x]) => x.length >= min,
            { seed: 42n },
        )
    })

    it('check max constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((max) => {
                return tuple(constant(max), hex({ maxLength: max }))
            }),
            ([max, x]) => x.length <= max,
            { seed: 42n },
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 105,
            "10": 110,
            "2": 82,
            "3": 84,
            "4": 93,
            "5": 80,
            "6": 104,
            "7": 76,
            "8": 108,
            "9": 73,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(hex(), (str) => str.split('').every((c) => '0123456789abcdef'.includes(c)))
    })

    it('cardinality', () => {
        expect(hex().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('160')
    })
})

describe('base64', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return base64({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            ([str, minLength, maxLength]) => {
                const nearestMin = Math.floor(minLength / 4) * 4
                const nearestMax = Math.ceil(maxLength / 4) * 4
                return nearestMin <= str.length && str.length <= nearestMax
            },
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 190,
            "12": 110,
            "4": 339,
            "8": 361,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(base64(), (str) =>
            str.split('').every((c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.includes(c)),
        )
    })

    it('cardinality', () => {
        expect(base64().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('640')
    })
})

describe('alpha', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return alpha({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            // inclusive
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength,
        )
    })

    it('check min constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((min) => {
                return tuple(constant(min), alpha({ minLength: min }))
            }),
            ([min, x]) => x.length >= min,
            { seed: 42n },
        )
    })

    it('check max constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((max) => {
                return tuple(constant(max), alpha({ maxLength: max }))
            }),
            ([max, x]) => x.length <= max,
            { seed: 42n },
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 105,
            "10": 110,
            "2": 82,
            "3": 84,
            "4": 93,
            "5": 80,
            "6": 104,
            "7": 76,
            "8": 108,
            "9": 73,
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
                str.split('').every((c) => `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${extra}`.includes(c)),
        )
    })

    it('cardinality', () => {
        expect(alpha().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('520')
    })
})

describe('lowerAlpha', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return lowerAlpha({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            // inclusive
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength,
        )
    })

    it('check min constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((min) => {
                return tuple(constant(min), lowerAlpha({ minLength: min }))
            }),
            ([min, x]) => x.length >= min,
            { seed: 42n },
        )
    })

    it('check max constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((max) => {
                return tuple(constant(max), lowerAlpha({ maxLength: max }))
            }),
            ([max, x]) => x.length <= max,
            { seed: 42n },
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 105,
            "10": 110,
            "2": 82,
            "3": 84,
            "4": 93,
            "5": 80,
            "6": 104,
            "7": 76,
            "8": 108,
            "9": 73,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(lowerAlpha(), (str) => str.split('').every((c) => 'abcdefghijklmnopqrstuvwxy'.includes(c)))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => lowerAlpha({ extra }).map((c) => [c, extra] as const)),
            ([str, extra]) => str.split('').every((c) => `abcdefghijklmnopqrstuvwxy${extra}`.includes(c)),
        )
    })

    it('cardinality', () => {
        expect(alpha().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('520')
    })
})

describe('alphaNumeric', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return alphaNumeric({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            // inclusive
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength,
        )
    })

    it('check min constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((min) => {
                return tuple(constant(min), alphaNumeric({ minLength: min }))
            }),
            ([min, x]) => x.length >= min,
            { seed: 42n },
        )
    })

    it('check max constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((max) => {
                return tuple(constant(max), alphaNumeric({ maxLength: max }))
            }),
            ([max, x]) => x.length <= max,
            { seed: 42n },
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 105,
            "10": 110,
            "2": 82,
            "3": 84,
            "4": 93,
            "5": 80,
            "6": 104,
            "7": 76,
            "8": 108,
            "9": 73,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(alphaNumeric(), (str) =>
            str.split('').every((c) => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(c)),
        )
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => alphaNumeric({ extra }).map((c) => [c, extra] as const)),
            ([str, extra]) =>
                str.split('').every((c) => `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${extra}`.includes(c)),
        )
    })

    it('cardinality', () => {
        expect(alphaNumeric().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('620')
    })
})

describe('lowerAlphaNumeric', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return lowerAlphaNumeric({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            // inclusive
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength,
        )
    })

    it('check min constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((min) => {
                return tuple(constant(min), lowerAlphaNumeric({ minLength: min }))
            }),
            ([min, x]) => x.length >= min,
            { seed: 42n },
        )
    })

    it('check max constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((max) => {
                return tuple(constant(max), lowerAlphaNumeric({ maxLength: max }))
            }),
            ([max, x]) => x.length <= max,
            { seed: 42n },
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 105,
            "10": 110,
            "2": 82,
            "3": 84,
            "4": 93,
            "5": 80,
            "6": 104,
            "7": 76,
            "8": 108,
            "9": 73,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(lowerAlphaNumeric(), (str) => str.split('').every((c) => 'abcdefghijklmnopqrstuvwxyz0123456789'.includes(c)))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => lowerAlphaNumeric({ extra }).map((c) => [c, extra] as const)),
            ([str, extra]) => str.split('').every((c) => `abcdefghijklmnopqrstuvwxyz0123456789${extra}`.includes(c)),
        )
    })

    it('cardinality', () => {
        expect(lowerAlphaNumeric().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('360')
    })
})

describe('ascii', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return ascii({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            // inclusive
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength,
        )
    })

    it('check min constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((min) => {
                return tuple(constant(min), ascii({ minLength: min }))
            }),
            ([min, x]) => x.length >= min,
            { seed: 42n },
        )
    })

    it('check max constraint - inclusive', () => {
        forAll(
            integer({ min: 0, max: 100 }).chain((max) => {
                return tuple(constant(max), ascii({ maxLength: max }))
            }),
            ([max, x]) => x.length <= max,
            { seed: 42n },
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 105,
            "10": 110,
            "2": 82,
            "3": 84,
            "4": 93,
            "5": 80,
            "6": 104,
            "7": 76,
            "8": 108,
            "9": 73,
          }
        `)
    })

    it('allowed characters', () => {
        // biome-ignore lint/suspicious/noControlCharactersInRegex: This is a valid use case for control characters
        forAll(ascii(), (str) => str.split('').every((c) => /[\x00-\x7F]/.test(c)))
    })

    it('cardinality', () => {
        expect(ascii().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('1270')
    })
})

describe('utf16', () => {
    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b + 1
                return utf16({ minLength, maxLength }).map((str) => [str, minLength, maxLength] as const)
            }),
            // inclusive
            ([str, minLength, maxLength]) => minLength <= str.length && str.length <= maxLength,
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 105,
            "10": 110,
            "2": 82,
            "3": 84,
            "4": 93,
            "5": 80,
            "6": 104,
            "7": 76,
            "8": 108,
            "9": 73,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(utf16(), (str) => util.toUSVString(str) === str)
    })

    it('cardinality', () => {
        expect(utf16().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('655360')
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
                    (x) => x.length,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 85,
            "1": 11,
            "10": 61,
            "11": 24,
            "12": 76,
            "13": 22,
            "14": 62,
            "15": 31,
            "16": 75,
            "17": 22,
            "18": 55,
            "19": 37,
            "2": 94,
            "20": 62,
            "3": 11,
            "4": 72,
            "5": 20,
            "6": 65,
            "7": 19,
            "8": 74,
            "9": 22,
          }
        `)
    })

    it('allowed characters', () => {
        forAll(utf16Surrogate(), (str) => util.toUSVString(str) === str)
    })

    it('cardinality', () => {
        expect(utf16Surrogate().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('11141120')
    })
})
