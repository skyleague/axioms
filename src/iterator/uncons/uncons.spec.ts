import { uncons } from '.'

import { array, forAll, unknown } from '../../random'
import { Nothing, toTraversable } from '../../type'

test('simple', () => {
    expect(uncons([1, 2, 3])).toMatchInlineSnapshot(`
        [
          1,
          {},
        ]
    `)
})

test('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(uncons(foobar())).toMatchInlineSnapshot(`
        [
          "foo",
          {},
        ]
    `)
})

test('empty', () => {
    expect(uncons([])).toMatchInlineSnapshot(`
        [
          {
            "(Nothing)": true,
          },
          {},
        ]
    `)
})

test('concat uncons === identity, for n > 0', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => {
        const split = uncons(xs)
        expect([split[0], ...toTraversable(split[1])]).toEqual(xs)
    })
})

test('concat uncons === identity, for n == 0', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => {
        const split = uncons(xs)
        expect(split[0]).toBe(Nothing)
        expect(split[1].next()).toEqual({ done: true, value: undefined })
    })
})
