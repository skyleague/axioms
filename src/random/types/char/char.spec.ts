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
} from './char'

import { forAll } from '../../arbitrary'
import { utf16 } from '../string'

import util from 'util'

describe('char', () => {
    test('length is always 1', () => {
        forAll(char(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        forAll(char(), (c) => 32 <= c.charCodeAt(0) && c.charCodeAt(0) <= 126)
    })
})

describe('hexChar', () => {
    test('length is always 1', () => {
        forAll(hexChar(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        forAll(hexChar(), (c) => '0123456789abcdef'.includes(c))
    })
})

describe('base64Char', () => {
    test('length is always 1', () => {
        forAll(base64Char(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        forAll(base64Char(), (c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.includes(c))
    })
})

describe('alphaChar', () => {
    test('length is always 1', () => {
        forAll(alphaChar(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        forAll(alphaChar(), (c) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.includes(c))
    })

    test('extra characters', () => {
        forAll(
            utf16().chain((extra) => alphaChar(extra).map((c) => [c, extra] as const)),
            ([c, extra]) => `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${extra}`.includes(c)
        )
    })
})

describe('lowerAlphaChar', () => {
    test('length is always 1', () => {
        forAll(lowerAlphaChar(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        forAll(lowerAlphaChar(), (c) => 'abcdefghijklmnopqrstuvwxy'.includes(c))
    })

    test('extra characters', () => {
        forAll(
            utf16().chain((extra) => lowerAlphaChar(extra).map((c) => [c, extra] as const)),
            ([c, extra]) => `abcdefghijklmnopqrstuvwxy${extra}`.includes(c)
        )
    })
})

describe('alphaNumericChar', () => {
    test('length is always 1', () => {
        forAll(alphaNumericChar(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        forAll(alphaNumericChar(), (c) => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(c))
    })

    test('extra characters', () => {
        forAll(
            utf16().chain((extra) => alphaNumericChar(extra).map((c) => [c, extra] as const)),
            ([c, extra]) => `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${extra}`.includes(c)
        )
    })
})

describe('lowerAlphaNumericChar', () => {
    test('length is always 1', () => {
        forAll(lowerAlphaNumericChar(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        forAll(lowerAlphaNumericChar(), (c) => 'abcdefghijklmnopqrstuvwxyz0123456789'.includes(c))
    })

    test('extra characters', () => {
        forAll(
            utf16().chain((extra) => lowerAlphaNumericChar(extra).map((c) => [c, extra] as const)),
            ([c, extra]) => `abcdefghijklmnopqrstuvwxyz0123456789${extra}`.includes(c)
        )
    })
})

describe('asciiChar', () => {
    test('length is always 1', () => {
        forAll(asciiChar(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        // eslint-disable-next-line no-control-regex
        forAll(asciiChar(), (c) => /[\x00-\x7F]/.test(c))
    })
})

describe('utf16Char', () => {
    test('length is always 1', () => {
        forAll(utf16Char(), (c) => c.length === 1)
    })

    test('allowed characters', () => {
        forAll(utf16Char(), (c) => util.toUSVString(c) === c)
    })
})

describe('utf16SurrogateChar', () => {
    test('length is always 1', () => {
        forAll(utf16SurrogateChar(), (c) => c.length >= 1 && c.length <= 2)
    })

    test('allowed characters', () => {
        forAll(utf16SurrogateChar(), (c) => util.toUSVString(c) === c)
    })
})
