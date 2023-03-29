import type { RandomGenerator } from '../random/index.js'

export interface Mulberry32Generator extends Generator<number, number>, RandomGenerator {}

/**
 * A mulberry32 implementation to generate values between 0 and 1.
 *
 * ### Example
 * ```ts
 * sha256('hello world')
 * // => "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
 * ```
 *
 * @param seed -  The seed for the random number generator.
 * @returns A generator function that returns a random number between 0 and 1.
 *
 * @group Random
 */
export function mulberry32(seed: number): Mulberry32Generator {
    let x = seed
    const generator: Mulberry32Generator = (function* () {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        while (true) {
            x += 0x6d2b79f5
            let t = x
            t = Math.imul(t ^ (t >>> 15), t | 1)
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
            yield ((t ^ (t >>> 14)) >>> 0) / 4294967296
        }
    })() as Mulberry32Generator

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    generator.jump = () => {}
    generator.sample = () => {
        return generator.next().value
    }
    generator.clone = () => {
        return mulberry32(x)
    }

    return generator
}
