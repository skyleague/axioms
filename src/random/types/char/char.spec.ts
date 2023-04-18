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

import { describe, it } from 'vitest'

import util from 'node:util'

describe('char', () => {
    it('length is always 1', () => {
        forAll(char(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(char(), (c) => 32 <= c.charCodeAt(0) && c.charCodeAt(0) <= 126)
    })
})

describe('hexChar', () => {
    it('length is always 1', () => {
        forAll(hexChar(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(hexChar(), (c) => '0123456789abcdef'.includes(c))
    })
})

describe('base64Char', () => {
    it('length is always 1', () => {
        forAll(base64Char(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(base64Char(), (c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.includes(c))
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
            ([c, extra]) => `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${extra}`.includes(c)
        )
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
            ([c, extra]) => `abcdefghijklmnopqrstuvwxy${extra}`.includes(c)
        )
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
            ([c, extra]) => `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${extra}`.includes(c)
        )
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
            ([c, extra]) => `abcdefghijklmnopqrstuvwxyz0123456789${extra}`.includes(c)
        )
    })
})

describe('asciiChar', () => {
    it('length is always 1', () => {
        forAll(asciiChar(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        // eslint-disable-next-line no-control-regex
        forAll(asciiChar(), (c) => /[\x00-\x7F]/.test(c))
    })
})

describe('utf16Char', () => {
    it('length is always 1', () => {
        forAll(utf16Char(), (c) => c.length === 1)
    })

    it('allowed characters', () => {
        forAll(utf16Char(), (c) => util.toUSVString(c) === c)
    })
})

describe('utf16SurrogateChar', () => {
    it('length is always 1', () => {
        forAll(utf16SurrogateChar(), (c) => c.length >= 1 && c.length <= 2)
    })

    it('allowed characters', () => {
        forAll(utf16SurrogateChar(), (c) => util.toUSVString(c) === c)
    })
})
