import { uncons } from './index.js'

import { array, forAll, unknown } from '../../../random/index.js'
import { Nothing, toTraversable } from '../../../type/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(uncons([1, 2, 3])).toMatchInlineSnapshot(`
      [
        1,
        Iterator {},
      ]
    `)
})

it('generator', () => {
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

it('empty', () => {
    expect(uncons([])).toMatchInlineSnapshot(`
      [
        Symbol((Nothing)),
        Iterator {},
      ]
    `)
})

it('concat uncons === identity, for n > 0', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => {
        const split = uncons(xs)
        expect([split[0], ...toTraversable(split[1])]).toEqual(xs)
    })
})

it('concat uncons === identity, for n == 0', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => {
        const split = uncons(xs)
        expect(split[0]).toBe(Nothing)
        expect(split[1].next()).toEqual({ done: true, value: undefined })
    })
})
