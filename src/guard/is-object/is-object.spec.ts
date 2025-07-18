import { expect, it } from 'vitest'

import { forAll, unknown } from '../../random/index.js'
import { isObject } from './index.js'

it('object', () => {
    expect(isObject({})).toEqual(true)
    expect(isObject({ foo: 'bar' })).toEqual(true)
})

it('array', () => {
    expect(isObject([])).toEqual(false)
})

it('function', () => {
    expect(isObject((x: number) => x)).toEqual(false)
})

it('null', () => {
    expect(isObject(null)).toEqual(false)
})

it('undefined', () => {
    expect(isObject(undefined)).toEqual(false)
})

it('object isObject', () => {
    forAll(
        unknown({
            float: false,
            integer: false,
            string: false,
            null: false,
            undefined: false,
            boolean: false,
            nothing: false,
            array: false,
        }),
        (x) => isObject(x),
    )
})
