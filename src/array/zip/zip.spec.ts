import { array, forAll, unknown } from '../../random/index.js'
import { zip, zipWith } from './index.js'

import { describe, expect, it } from 'vitest'

describe('zip', () => {
    it('simple', () => {
        expect(zip([1, 2, 3], [1, 2, 3]).toArray()).toEqual([
            [1, 1],
            [2, 2],
            [3, 3],
        ])
    })

    it('empty', () => {
        expect(zip([]).toArray()).toEqual([])
    })

    it('zip empty', () => {
        expect(zip(...zip([])).toArray()).toEqual([])
    })

    it('array argument', () => {
        expect(zip([1, 2, 3], [1, 2, 3]).toArray()).toEqual([
            [1, 1],
            [2, 2],
            [3, 3],
        ])
    })

    it('variadic argument', () => {
        expect(zip([1, 2, 3], ['1', '2', '3']).toArray()).toEqual([
            [1, '1'],
            [2, '2'],
            [3, '3'],
        ])
    })

    it('zipzip', () => {
        expect(zip(...zip([1, 2, 3], [1, 2, 3])).toArray()).toEqual([
            [1, 2, 3],
            [1, 2, 3],
        ])
    })

    it('uneven', () => {
        expect(zip([1, 2, 3, 4], [1, 2, 3, 4], [1, 2]).toArray()).toEqual([
            [1, 1, 1],
            [2, 2, 2],
        ])
    })

    it('strings', () => {
        expect(zip([...'ABCD'], [...'ABCD'], [...'AB']).toArray()).toEqual([
            ['A', 'A', 'A'],
            ['B', 'B', 'B'],
        ])
    })

    it('with generator', () => {
        expect(zip([...'ABCD'], [...'ABCD'], [...'AB'], [0, 1, 3, 4, 5]).toArray()).toEqual([
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
        expect(zip(foo(), bar(), [1, 2]).toArray()).toEqual([
            [1, 'a', 1],
            [2, 'b', 2],
        ])
    })

    it('nothing', () => {
        expect(zip([], []).toArray()).toEqual([])
    })

    it('zip zip xs === xs, n > 0', () => {
        forAll(array(unknown(), { minLength: 1 }), (xs) => {
            expect(zip(...zip(xs, xs)).toArray()).toEqual([xs, xs])
        })
    })

    it('zip zip xs === xs, n === 0', () => {
        forAll(array(unknown(), { maxLength: 0 }), (xs) => {
            expect(zip(...zip(xs, xs)).toArray()).toEqual([])
        })
    })
})

describe('zipWith', () => {
    const add = (a: number, b: number) => a + b

    it('simple', () => {
        expect(zipWith(add, [1, 2, 3], [3, 2, 1]).toArray()).toMatchInlineSnapshot(`
            [
              4,
              4,
              4,
            ]
        `)
    })
})
