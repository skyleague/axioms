import { concat } from './index.js'

import { collect } from '../../array/index.js'
import { range, repeat } from '../../generator/index.js'
import { forAll, tuple, array, unknown } from '../../random/index.js'
import { allEqual, take } from '../index.js'

test('multiple variadic', () => {
    const foo = collect(concat(['1', '2', '3'], [4, 5, 6], [true, false, true]))
    expect(foo).toMatchInlineSnapshot(`
        [
          "1",
          "2",
          "3",
          4,
          5,
          6,
          true,
          false,
          true,
        ]
    `)
})

test('multiple variadic 2', () => {
    const a = ['1', '2', '3']
    const b = [4, 5, 6]
    const c = [true, false, true]
    const foo = collect(concat(a, b, c))
    expect(foo).toMatchInlineSnapshot(`
        [
          "1",
          "2",
          "3",
          4,
          5,
          6,
          true,
          false,
          true,
        ]
    `)
})

test('concat xs ys === xs ++ ys', () => {
    forAll(tuple(array(unknown()), array(unknown())), ([xs, ys]) => allEqual(concat(xs, ys), [...xs, ...ys]))
})

test('concat range 1 3 range 3 7 === 1 ... 6', () => {
    expect(collect(concat(range(1, 3), range(3, 7)))).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
          5,
          6,
        ]
    `)
})

test('concat abc def === abcdef', () => {
    expect(collect(concat('abc', 'def'))).toMatchInlineSnapshot(`
        [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
        ]
    `)
})

test('concat take 2 repeat 1 take 2 repeat 2 === 1 1 2 2', () => {
    expect(
        collect(
            concat(
                take(
                    repeat(() => 1),
                    2
                ),

                take(
                    repeat(() => 2),
                    2
                )
            )
        )
    ).toMatchInlineSnapshot(`
        [
          1,
          1,
          2,
          2,
        ]
    `)
})
