import type { RandomGenerator } from '../random'
import { seeder2 } from '../seed'

const R123_0x1p_53 = 1 / (4294967296 * 2097152)
// const R123_0x1p_64 = 1 / (4294967296 * 4294967296)

const b64Mask = (1n << 64n) - 1n

export interface Xoroshiro128plusGenerator extends Generator<bigint, bigint>, RandomGenerator {}

// noone will mistakenly use instead of random()
// http://prng.di.unimi.it/xoroshiro128plus.c
export function xoroshiro128plus(seed: bigint | [bigint, bigint]) {
    let [s0, s1] = Array.isArray(seed) ? seed : seeder2(seed)
    const generator: Xoroshiro128plusGenerator = (function* () {
        while (true) {
            // s1 ^= s0;
            const xors1 = s1 ^ s0

            // with manual inline of
            // static inline uint64_t rotl(const uint64_t x, int k) {
            // 	return (x << k) | (x >> (64 - k));
            // }

            // s[0] = rotl(s0, 24) ^ s1 ^ (s1 << 16); // a, b
            s0 = ((s0 << 24n) ^ (s0 >> 8n) ^ xors1 ^ (xors1 << 16n)) & b64Mask
            // s[1] = rotl(s1, 37); // c
            s1 = ((xors1 << 5n) ^ (xors1 >> 27n)) & b64Mask

            yield (s0 + s1) & b64Mask //BigInt.asUintN(64, s0 + s1)
        }
    })() as Xoroshiro128plusGenerator

    generator.jump = () => {
        const jumps = [0xdf900294d8f554a5n, 0x170865df4b3201fcn]

        let news0 = 0n
        let news1 = 0n
        for (const jump of jumps)
            for (let b = 0n; b < 64n; b++) {
                if (jump & (1n << b)) {
                    news0 ^= s0
                    news1 ^= s1
                }
                generator.next()
            }

        s0 = news0
        s1 = news1
    }
    generator.sample = () => {
        return Number(generator.next().value >> 11n) * R123_0x1p_53
    }
    generator.clone = () => {
        return xoroshiro128plus([s0, s1])
    }
    return generator
}
