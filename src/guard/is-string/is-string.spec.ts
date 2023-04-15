import { isString } from './index.js'

import { forAll, string, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('string is string', () => {
    expect(isString('foo')).toEqual(true)
})
it('symbol is not string', () => {
    const sym = Symbol.for('error')
    expect(isString(sym)).toEqual(false)
})

it('undefined is not string', () => {
    expect(isString(undefined)).toEqual(false)
})

it('null is not string', () => {
    expect(isString(null)).toEqual(false)
})

it('object is not string', () => {
    expect(isString({})).toEqual(false)
})

it('typeguard works', () => {
    const foo: number | string = 'foo'
    if (isString(foo)) {
        expect(foo.length).toEqual(3)
    }
})

it('unknown is not string', () => {
    forAll(unknown({ string: false }), (x) => !isString(x))
})

it('string is string', () => {
    forAll(string(), isString)
})
