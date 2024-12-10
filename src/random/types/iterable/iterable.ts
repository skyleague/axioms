import { applicative } from '../../../iterator/applicative/applicative.js'
import type { MaybePartial } from '../../../type/partial/partial.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/arbitrary.js'
import type { Dependent } from '../../arbitrary/dependent/dependent.js'
import { type ArrayGenerator, array } from '../array/array.js'
import { integer } from '../integer/integer.js'
import { tuple } from '../tuple/tuple.js'

const iterableFuncs = [
    <T>(xs: Iterable<T>) => xs,
    <T>(xs: Iterable<T>) => Iterator.from(xs).toArray(),
    <T>(xs: Iterable<T>) =>
        applicative(function* () {
            yield* xs
        }),
    <T>(xs: Iterable<T>) => ({
        [Symbol.iterator]() {
            return xs[Symbol.iterator]()
        },
    }),
]

export function iterableFunc(): Dependent<<T>(xs: Iterable<T>) => Iterable<T>> {
    return integer({ min: 0, max: iterableFuncs.length - 1 }).map((i) => {
        // biome-ignore lint/style/noNonNullAssertion: we know that the array is not empty
        return iterableFuncs[i]!
    })
}

export function iterable<T>(arbitrary: Arbitrary<T>, constraints: MaybePartial<ArrayGenerator<T>> = {}): Dependent<Iterable<T>> {
    return tuple(array(arbitrary, constraints), iterableFunc()).map(([xs, f]) => {
        return f(xs)
    })
}
