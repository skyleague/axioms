import type { RandomGenerator } from '../random'

export interface Mulberry32Generator extends Generator<number, number>, RandomGenerator {}
export function mulberry32(seed: number): Mulberry32Generator {
    let x = seed
    const generator: Mulberry32Generator = (function* () {
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
