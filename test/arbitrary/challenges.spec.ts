import { collect } from '../../src/array'
import { equal, replicate } from '../../src/iterator'
import { filterArbitrary, array, integer, forAll, tuple, natural, constant, chainArbitrary } from '../../src/random'

describe('shrinking challenge', () => {
    // https://github.com/jlink/shrinking-challenge
    test('bound 5', () => {
        const sum16 = (a: number, b: number) => {
            let s = a + b
            while (s > 32767) s -= 65536
            while (s < -32768) s += 65536
            return s
        }

        const boundedList = filterArbitrary((x) => x.reduce(sum16, 0) < 256, array(integer({ min: -32768, max: 32767 })))
        expect(() =>
            forAll(
                tuple(boundedList, boundedList, boundedList, boundedList, boundedList),
                (xs) => xs.flat().reduce(sum16, 0) < 5 * 256,
                { seed: 42n }
            )
        ).toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 73 tests (seed: 42n)
            Shrunk 43 time(s)
            Counter example:

            [ [], [], [ -22148 ], [], [ -10621 ] ]"
        `)
    })

    test('coupling', () => {
        expect(() =>
            forAll(
                filterArbitrary((xs) => xs.every((v) => v < xs.length), array(natural({ max: 10 }))),
                (xs) => {
                    for (let i = 0; i !== xs.length; ++i) {
                        const j = xs[i]
                        if (i !== j && xs[j] === i) {
                            return false
                        }
                    }
                    return true
                },
                { seed: 42n }
            )
        ).toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 25 tests (seed: 42n)
            Shrunk 6 time(s)
            Counter example:

            [ 1, 0 ]"
        `)
    })

    test('deletion', () => {
        expect(() =>
            forAll(
                filterArbitrary(([xs, i]) => i < xs.length, tuple(array(integer()), natural({ max: 10 }))),
                ([xs, i]) => {
                    const x = xs[i]
                    const copyWithoutX = [...xs.slice(0, i), ...xs.slice(i + 1)]
                    return copyWithoutX.indexOf(x) === -1
                },
                { seed: 42n }
            )
        ).toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 10 tests (seed: 42n)
            Shrunk 4 time(s)
            Counter example:

            [ [ 0, 0 ], 0 ]"
        `)
    })

    test('distinct', () => {
        expect(() =>
            forAll(
                array(integer()),
                (xs) => {
                    return new Set(xs).size < 3
                },
                { seed: 42n }
            )
        ).toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 13 tests (seed: 42n)
            Shrunk 64 time(s)
            Counter example:

            [ 0, 1, 2 ]"
        `)
    })

    test('nested list', () => {
        expect(() =>
            forAll(
                array(array(constant(0))),
                (xs) => {
                    return xs.map((l) => l.length).reduce((a, b) => a + b, 0) <= 10
                },
                { seed: 42n }
            )
        ).toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 33 tests (seed: 42n)
            Shrunk 15 time(s)
            Counter example:

            [ [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ]"
        `)
    })

    test('length list', () => {
        const aint = integer({ min: 1, max: 100 })
        const alist = chainArbitrary(aint, (n) => {
            return tuple(...collect(replicate(natural({ max: 1000 }), n)))
        })
        expect(() =>
            forAll(
                alist,
                (xs) => {
                    return xs.reduce((a, b) => Math.max(a, b), 0) < 900
                },
                { seed: 42n, tests: 20 }
            )
        ).toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 12 tests (seed: 42n)
            Shrunk 6 time(s)
            Counter example:

            [ 900 ]"
        `)
    })

    test('large union list', () => {
        expect(() => forAll(array(array(integer())), (xs) => new Set(xs.flat()).size < 5, { seed: 42n }))
            .toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 37 tests (seed: 42n)
            Shrunk 121 time(s)
            Counter example:

            [ [ 0, 1, 2, 3, 4 ] ]"
        `)
    })

    test('reverse', () => {
        expect(() => forAll(array(integer()), (xs) => equal(xs, [...xs].reverse()), { seed: 42n }))
            .toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 2 tests (seed: 42n)
            Shrunk 32 time(s)
            Counter example:

            [ 0, 1 ]"
        `)
    })
})
