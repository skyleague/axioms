import { cycle } from './index.js'

import { collect } from '../../array/index.js'
import { allEqual, take } from '../../iterator/index.js'
import { array, forAll, mappableFunc, natural, tuple, unknown } from '../../random/index.js'
import { repeat } from '../index.js'

test('simple', () => {
    expect(collect(take(cycle([1, 2, 3]), 10))).toMatchInlineSnapshot(`
        [
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
        [
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

test('small', () => {
    expect(collect(take(cycle([1, 2]), 4))).toMatchInlineSnapshot(`
        [
          1,
          2,
          1,
          2,
        ]
    `)
})

test('small reentrant', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }

    expect(collect(take(cycle(foobar()), 4))).toMatchInlineSnapshot(`
        [
          "foo",
          "bar",
          "foo",
          "bar",
        ]
    `)
})
