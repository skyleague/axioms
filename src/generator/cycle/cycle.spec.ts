import { cycle } from '.'

import { repeat } from '..'
import { collect } from '../../array'
import { allEqual, take } from '../../iterator'
import { array, forAll, mappableFunc, natural, tuple, unknown } from '../../random'

test('simple', () => {
    expect(collect(take(cycle([1, 2, 3]), 10))).toMatchInlineSnapshot(`
              Array [
                1,
                2,
                3,
                1,
                2,
                3,
                1,
                2,
                3,
                1,
              ]
      `)
})

test('generator', () => {
    function* foo() {
        yield 1
        yield 2
    }

    expect(collect(take(cycle(foo), 10))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          1,
          2,
          1,
          2,
          1,
          2,
          1,
          2,
        ]
    `)
})

test('take n * |X| X === n * X', () => {
    forAll(tuple(array(unknown()), natural({ max: 100 })), ([xs, n]) => {
        expect(collect(take(cycle(xs), n * xs.length))).toEqual(
            collect(
                take(
                    repeat(() => xs),
                    n
                )
            ).flat()
        )
    })
})

test('take n cycle(mappable(xs)) === take n repeat(*xs)', () => {
    forAll(tuple(natural({ max: 10000 }), array(unknown(), { minLength: 1 }), mappableFunc()), ([n, xs, fn]) => {
        return allEqual(
            take(cycle(fn(xs)), n),
            take(
                repeat(function* () {
                    yield* xs
                }),
                n
            )
        )
    })
})

test('given n === 0, |take n cycle(X)| === 0', () => {
    forAll(tuple(natural({ max: 0 }), array(unknown(), { maxLength: 10 }), mappableFunc()), ([n, xs, fn]) => {
        return collect(take(cycle(fn(xs)), n)).length === 0
    })
})
