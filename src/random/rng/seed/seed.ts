// http://prng.di.unimi.it/splitmix64.c

/**
 * @internal
 */
export function* splitmix64(seed = 0n) {
    let x = seed
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
        x += 0x9e3779b97f4a7c15n

        let z = x
        z = z ^ ((z >> 30n) * 0xbf58476d1ce4e5b9n)
        z = z ^ ((z >> 27n) * 0x94d049bb133111ebn)
        yield z ^ (z >> 31n)
    }
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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
        h = Math.imul(h ^ (h >>> 16), 2246822507)
        h = Math.imul(h ^ (h >>> 13), 3266489909)
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
