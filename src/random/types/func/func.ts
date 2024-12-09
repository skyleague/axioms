import type { Arbitrary } from '../../arbitrary/arbitrary/arbitrary.js'
import type { Dependent } from '../../arbitrary/dependent/dependent.js'
import { objectHasher } from '../../deterministic/hash/hash.js'
import { seederFromStr } from '../../rng/seed/seed.js'
import { array } from '../array/array.js'
import { integer } from '../integer/integer.js'
import { tuple } from '../tuple/tuple.js'

export function func<T>(arbitrary: Arbitrary<T>): Dependent<(...args: unknown[]) => T> {
    return tuple(array(arbitrary, { minLength: 1 }), integer().constant()).map(([xs, seed]) => {
        // biome-ignore lint/style/noNonNullAssertion: always defined
        return (...args: unknown[]) => xs[seederFromStr(objectHasher.hash([...args, seed])) % xs.length]!
    })
}
