import type { Arbitrary } from '../arbitrary'
import type { ArbitraryContext } from '../context'
import { arbitraryContext } from '../context'

/**
 * It takes an arbitrary and a context, and returns a random value of the type that arbitrary generates
 *
 * ### Example
 * ```ts
 * random(integer())
 * // => 123
 * ```
 *
 * @param arbitrary - The arbitrary to generate a value from.
 * @param ctx - The context used for random value generation.
 *
 * @returns A random value of type T.
 *
 * @group Arbitrary
 */
export function random<T>(arbitrary: Arbitrary<T>, ctx: ArbitraryContext = arbitraryContext()) {
    return arbitrary.value(ctx).value
}
