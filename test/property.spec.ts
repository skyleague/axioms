import { array, forAll, integer, string, tuple } from '../src/index.js'

import { describe, expect, it } from 'vitest'

describe('sorting', () => {
    function sort(xs: number[]): number[] {
        return xs.sort()
    }

    function isSorted(xs: number[]): boolean {
        for (let i = 1; i < xs.length; ++i) {
            if (xs[i - 1]! > xs[i]!) {
                return false
            }
        }
        return true
    }

    it('sorts the numbers', () => {
        expect(sort([1, 2, 3])).toEqual([1, 2, 3])
        expect(isSorted(sort([1, 2, 3]))).toBe(true)
    })

    it.fails('sorts the numbers - arbitrary', () => {
        forAll(array(integer()), (xs) => isSorted(sort(xs)))
    })

    function sort2(xs: number[]): number[] {
        return xs.sort((a, z) => a - z)
    }

    it('sorts the numbers correctly - arbitrary', () => {
        forAll(array(integer()), (xs) => isSorted(sort2(xs)))
    })
})

describe('contains', () => {
    const contains = (text: string, pattern: string) => text.includes(pattern)

    it('should always contain itself', () => {
        forAll(string(), (text) => contains(text, text))
    })

    it('should always contain its substrings', () => {
        forAll(tuple(string(), string(), string()), ([a, b, c]) => {
            return contains(`${a}${b}${c}`, b)
        })
    })
})
