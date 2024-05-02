import {
    alphaChar,
    alphaNumericChar,
    asciiChar,
    base64Char,
    char,
    hexChar,
    lowerAlphaChar,
    lowerAlphaNumericChar,
    utf16Char,
    utf16SurrogateChar,
} from './char.js'

import { forAll } from '../../arbitrary/index.js'
import { utf16 } from '../string/index.js'

import { describe, expect, it } from 'vitest'

import util from 'node:util'
import { arbitraryContext } from '../../arbitrary/context/context.js'

const isPrintable = (str: string) => /^[ -~]+$/.test(str)

describe('char', () => {
    it('length is always 1', () => {
        forAll(char(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(char(), (c) => 32 <= c.charCodeAt(0) && c.charCodeAt(0) <= 126)
    })

    it('all printable', () => {
        forAll(char(), isPrintable)
    })

    it('cardinality', () => {
        expect(char().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('95')
    })
})

describe('hexChar', () => {
    it('length is always 1', () => {
        forAll(hexChar(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(hexChar(), (c) => '0123456789abcdef'.includes(c))
    })

    it('all printable', () => {
        forAll(hexChar(), isPrintable)
    })

    it('cardinality', () => {
        expect(hexChar().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('16')
    })
})

describe('base64Char', () => {
    it('length is always 1', () => {
        forAll(base64Char(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(base64Char(), (c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.includes(c))
    })

    it('all printable', () => {
        forAll(base64Char(), isPrintable)
    })

    it('cardinality', () => {
        expect(base64Char().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('64')
    })
})

describe('alphaChar', () => {
    it('length is always 1', () => {
        forAll(alphaChar(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(alphaChar(), (c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.includes(c))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => alphaChar(extra).map((c) => [c, extra] as const)),
            ([c, extra]) => `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${extra}`.includes(c),
        )
    })

    it('all printable', () => {
        forAll(alphaChar(), isPrintable)
    })

    it('cardinality', () => {
        expect(alphaChar().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('52')
    })
})

describe('lowerAlphaChar', () => {
    it('length is always 1', () => {
        forAll(lowerAlphaChar(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(lowerAlphaChar(), (c) => 'abcdefghijklmnopqrstuvwxy'.includes(c))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => lowerAlphaChar(extra).map((c) => [c, extra] as const)),
            ([c, extra]) => `abcdefghijklmnopqrstuvwxy${extra}`.includes(c),
        )
    })

    it('all printable', () => {
        forAll(lowerAlphaChar(), isPrintable)
    })

    it('cardinality', () => {
        expect(lowerAlphaChar().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('25')
    })
})

describe('alphaNumericChar', () => {
    it('length is always 1', () => {
        forAll(alphaNumericChar(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(alphaNumericChar(), (c) => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(c))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => alphaNumericChar(extra).map((c) => [c, extra] as const)),
            ([c, extra]) => `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${extra}`.includes(c),
        )
    })

    it('all printable', () => {
        forAll(alphaNumericChar(), isPrintable)
    })

    it('cardinality', () => {
        expect(alphaNumericChar().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('62')
    })
})

describe('lowerAlphaNumericChar', () => {
    it('length is always 1', () => {
        forAll(lowerAlphaNumericChar(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(lowerAlphaNumericChar(), (c) => 'abcdefghijklmnopqrstuvwxyz0123456789'.includes(c))
    })

    it('extra characters', () => {
        forAll(
            utf16().chain((extra) => lowerAlphaNumericChar(extra).map((c) => [c, extra] as const)),
            ([c, extra]) => `abcdefghijklmnopqrstuvwxyz0123456789${extra}`.includes(c),
        )
    })

    it('all printable', () => {
        forAll(lowerAlphaNumericChar(), isPrintable)
    })

    it('cardinality', () => {
        expect(lowerAlphaNumericChar().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('36')
    })
})

describe('asciiChar', () => {
    it('length is always 1', () => {
        forAll(asciiChar(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        // biome-ignore lint/suspicious/noControlCharactersInRegex: This is intentional
        forAll(asciiChar(), (c) => /[\x00-\x7F]/.test(c))
    })

    it('cardinality', () => {
        expect(asciiChar().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('127')
    })
})

describe('utf16Char', () => {
    it('length is always 1', () => {
        forAll(utf16Char(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(utf16Char(), (c) => util.toUSVString(c) === c)
    })

    it('cardinality', () => {
        expect(utf16Char().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('65536')
    })
})

describe('utf16SurrogateChar', () => {
    it('length is always 1', () => {
        forAll(utf16SurrogateChar(), (c) => c.length >= 1 && c.length <= 2)
    })

    it('allowed characters', () => {
        forAll(utf16SurrogateChar(), (c) => util.toUSVString(c) === c)
    })

    it('cardinality', () => {
        expect(utf16SurrogateChar().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('1114112')
    })
})
