import { zip, zipWith } from '.'

import { collect } from '..'
import { counter } from '../../generator'
import { allEqual } from '../../iterator'
import { forAll, array, unknown } from '../../random'

describe('zip', () => {
    test('simple', () => {
        const zipped = collect(zip([1, 2, 3], [1, 2, 3]))
        expect(zipped).toEqual([
            [1, 1],
            [2, 2],
            [3, 3],
        ])
    })

    test('empty', () => {
        const zipped = collect(zip([]))
        expect(zipped).toEqual([])
    })

    test('zip empty', () => {
        const zipped = zip([])
        expect(collect(zip(...zipped))).toEqual([])
    })

    test('array argument', () => {
        expect(collect(zip([1, 2, 3], [1, 2, 3]))).toEqual([
            [1, 1],
            [2, 2],
            [3, 3],
        ])
    })

    test('variadic argument', () => {
        expect(collect(zip([1, 2, 3], ['1', '2', '3']))).toEqual([
            [1, '1'],
            [2, '2'],
            [3, '3'],
        ])
    })

    test('zipzip', () => {
        expect(collect(zip(...zip([1, 2, 3], [1, 2, 3])))).toEqual([
            [1, 2, 3],
            [1, 2, 3],
        ])
    })

    test('uneven', () => {
        expect(collect(zip([1, 2, 3, 4], [1, 2, 3, 4], [1, 2]))).toEqual([
            [1, 1, 1],
            [2, 2, 2],
        ])
    })

    test('strings', () => {
        expect(collect(zip([...'ABCD'], [...'ABCD'], [...'AB']))).toEqual([
            ['A', 'A', 'A'],
            ['B', 'B', 'B'],
        ])
    })

    test('with generator', () => {
        expect(collect(zip([...'ABCD'], [...'ABCD'], [...'AB'], counter()))).toEqual([
            ['A', 'A', 'A', 0],
            ['B', 'B', 'B', 1],
        ])
    })

    test('with multiple finite generators', () => {
        function* foo() {
            yield 1
            yield 2
            yield 3
        }

        function* bar() {
            yield 'a'
            yield 'b'
        }
        expect(collect(zip(foo(), bar(), [1, 2]))).toEqual([
            [1, 'a', 1],
            [2, 'b', 2],
        ])
    })

    test('nothing', () => {
        expect(collect(zip([], []))).toEqual([])
    })

    test('zip zip xs === xs, n > 0', () => {
        forAll(array(unknown(), { minLength: 1 }), (xs) => allEqual(zip(...zip(xs, xs)), [xs, xs]))
    })

    test('zip zip xs === xs, n === 0', () => {
        forAll(array(unknown(), { maxLength: 0 }), (xs) => allEqual(zip(...zip(xs, xs)), []))
    })
})

describe('zipWith', () => {
    const add = (a: number, b: number) => a + b

    test('simple', () => {
        expect(collect(zipWith(add, [1, 2, 3], [3, 2, 1]))).toMatchInlineSnapshot(`
            Array [
              4,
              4,
              4,
            ]
        `)
    })
})
