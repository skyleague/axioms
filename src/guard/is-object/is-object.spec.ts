import { isObject } from '.'

import { forAll, unknown } from '../../random'

test('object', () => {
    expect(isObject({})).toEqual(true)
    expect(isObject({ foo: 'bar' })).toEqual(true)
})

test('array', () => {
    expect(isObject([])).toEqual(false)
})

test('function', () => {
    expect(isObject((x: number) => x)).toEqual(false)
})

test('null', () => {
    expect(isObject(null)).toEqual(false)
})

test('undefined', () => {
    expect(isObject(undefined)).toEqual(false)
})

test('object isObject', () => {
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
        (x) => isObject(x)
    )
})
