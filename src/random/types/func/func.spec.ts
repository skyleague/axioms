import { describe, expect, it } from 'vitest'
import { forAll } from '../../arbitrary/forall/index.js'
import { unknown } from '../complex/complex.js'
import { constant } from '../helper/helper.js'
import { integer } from '../integer/integer.js'
import { tuple } from '../tuple/tuple.js'
import { func } from './func.js'

describe('func', () => {
    it('should return consistent results for same input - fixed', () => {
        forAll(func(integer()), (f) => {
            const x = 42
            const result1 = f(x)
            const result2 = f(x)
            expect(result1).toBe(result2)
        })
    })

    it('should return consistent results for same input', () => {
        forAll(tuple(func(unknown()), unknown()), ([f, x]) => {
            const result1 = f(x)
            const result2 = f(x)
            expect(result1).toBe(result2)
        })
    })

    it('should respect codomain constraints', () => {
        forAll(func(integer({ min: -100, max: 100 })), (f) => {
            const result = f(123)
            expect(result).toBeGreaterThanOrEqual(-100)
            expect(result).toBeLessThanOrEqual(100)
        })
    })

    it('should generate different functions', () => {
        forAll(tuple(func(integer()), func(integer())), ([f1, f2]) => {
            // Test with a few sample inputs
            const inputs = [0, 42, -42, 100]
            return inputs.some((x) => f1(x) !== f2(x))
        })
    })

    it('should maintain deterministic output based on seed', () => {
        forAll(tuple(func(constant(42)), constant(123)), ([f, input]) => {
            const result1 = f(input)
            const result2 = f(input)
            expect(result1).toBe(42)
            expect(result2).toBe(42)
        })
    })
})
