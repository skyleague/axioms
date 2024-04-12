// http://prng.di.unimi.it/splitmix64.c

const b64Mask = (1n << 64n) - 1n

/**
 * @internal
 */
export function* splitmix64(seed = 0n) {
    let x = seed
    while (true) {
        x = (x + 0x9e3779b97f4a7c15n) & b64Mask

        let z = x
        z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & b64Mask
        z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & b64Mask

        yield (z ^ (z >> 31n)) & b64Mask
    }
    //@ts-expect-error
    return x
}
/**
 * @internal
 */
export function* xmur3(str: string): Generator<number, number> {
    let h = 1779033703 ^ str.length
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
        h = (h << 13) | (h >>> 19)
    }

    while (true) {
        h = Math.imul(h ^ (h >>> 16), 2246822507)
        h = Math.imul(h ^ (h >>> 13), 3266489909)
        // biome-ignore lint/suspicious/noAssignInExpressions: This is a valid use case for assignment in an expression
        yield (h ^= h >>> 16) >>> 0
    }
}

/**
 * It takes a seed and returns a pair of seeds.
 *
 * @param seed - The seed to use for the random number generator.
 * @returns A tuple of two bigints.
 *
 * @internal
 */
export function seeder2(seed: bigint): [bigint, bigint] {
    const split = splitmix64(seed)
    return [split.next().value, split.next().value]
}

/**
 * It takes a seed string and returns number seed.
 *
 * @param seed - The seed to use for the random number generator.
 * @returns A number seed.
 *
 * @internal
 */
export function seederFromStr(seed: string): number {
    const split = xmur3(seed)
    return split.next().value
}
