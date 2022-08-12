import { forAll } from '.'

import { utf16string, tuple, integer, array } from '../../../random'

test('abs smaller than six', () => {
    expect(() => {
        forAll(integer(), (i) => Math.abs(i) <= 600000, { seed: 42n })
    }).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 3 tests (seed: 42n)
        Shrunk 20 time(s)
        Counter example:

        600001"
    `)
    expect(() => {
        forAll(array(integer()), (i) => i.length === 0 || Math.abs(i[0]) <= 600000, { seed: 42n })
    }).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 4 tests (seed: 42n)
        Shrunk 18 time(s)
        Counter example:

        [ 600001 ]"
    `)
})

const contains = (text: string, pattern: string) => text.indexOf(pattern) >= 0
describe('properties', () => {
    // string text always contains itself
    test('should always contain itself', () => {
        forAll(utf16string(), (text) => contains(text, text))
    })
    test('should always contain its substrings', () => {
        forAll(tuple(utf16string(), utf16string(), utf16string()), ([a, b, c]) => {
            return contains(a + b + c, b)
        })
    })
})
