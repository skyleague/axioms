import { zip, zipWith } from './index.js'

import { counter } from '../../generator/index.js'
import { allEqual } from '../../iterator/index.js'
import { array, forAll, unknown } from '../../random/index.js'
import { collect } from '../index.js'

import { describe, expect, it } from 'vitest'

describe('zip', () => {
    it('simple', () => {
        const zipped = collect(zip([1, 2, 3], [1, 2, 3]))
        expect(zipped).toEqual([
            [1, 1],
            [2, 2],
            [3, 3],
        ])
    })

    it('empty', () => {
        const zipped = collect(zip([]))
        expect(zipped).toEqual([])
    })

    it('zip empty', () => {
        const zipped = zip([])
        expect(collect(zip(...zipped))).toEqual([])
    })

    it('array argument', () => {
        expect(collect(zip([1, 2, 3], [1, 2, 3]))).toEqual([
            [1, 1],
            [2, 2],
            [3, 3],
        ])
    })

    it('variadic argument', () => {
        expect(collect(zip([1, 2, 3], ['1', '2', '3']))).toEqual([
            [1, '1'],
            [2, '2'],
            [3, '3'],
        ])
    })

    it('zipzip', () => {
        expect(collect(zip(...zip([1, 2, 3], [1, 2, 3])))).toEqual([
            [1, 2, 3],
            [1, 2, 3],
        ])
    })

    it('uneven', () => {
        expect(collect(zip([1, 2, 3, 4], [1, 2, 3, 4], [1, 2]))).toEqual([
            [1, 1, 1],
            [2, 2, 2],
        ])
    })

    it('strings', () => {
        expect(collect(zip([...'ABCD'], [...'ABCD'], [...'AB']))).toEqual([
            ['A', 'A', 'A'],
            ['B', 'B', 'B'],
        ])
    })

    it('with generator', () => {
        expect(collect(zip([...'ABCD'], [...'ABCD'], [...'AB'], counter()))).toEqual([
            ['A', 'A', 'A', 0],
            ['B', 'B', 'B', 1],
        ])
    })

    it('with multiple finite generators', () => {
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

    it('nothing', () => {
        expect(collect(zip([], []))).toEqual([])
    })

    it('zip zip xs === xs, n > 0', () => {
        forAll(array(unknown(), { minLength: 1 }), (xs) => allEqual(zip(...zip(xs, xs)), [xs, xs]))
    })

    it('zip zip xs === xs, n === 0', () => {
        forAll(array(unknown(), { maxLength: 0 }), (xs) => allEqual(zip(...zip(xs, xs)), []))
    })
})

describe('zipWith', () => {
    const add = (a: number, b: number) => a + b

    it('simple', () => {
        expect(collect(zipWith(add, [1, 2, 3], [3, 2, 1]))).toMatchInlineSnapshot(`
            [
              4,
              4,
              4,
            ]
        `)
    })
})
