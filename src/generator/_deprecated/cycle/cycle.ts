import { applicative } from '../../../iterator/index.js'
import type { InfiniteGenerator, Mappable } from '../../../type/index.js'
import { toTraversable } from '../../../type/index.js'

/**
 * Creates a generator cycles through the given {@link Mappable}.
 *
 * The generator makes the given {@link Mappable} applicative before
 * cycling through it. This ensures the cycle is reentrant.
 *
 * ### Example
 * ```ts
 * collect(take(cycle([1, 2]), 4))
 * // => [1, 2, 1, 2]
 *
 * function* foobar() {
 *   yield 'foo'
 *   yield 'bar'
 * }
 * collect(take(counter(foobar), 4))
 * // => ["foo", "bar", "foo", "bar"]
 * ```
 *
 * @param xs - The {@link Mappable} values to cycle through.
 *
 * @returns The cycle generator.
 *
 * @typeParam T - The item type.
 *
 * @group Generators
 * @deprecated Rarely used in practice
 */
export function* cycle<T>(xs: Mappable<T>): InfiniteGenerator<T> {
    const xss = applicative(toTraversable(xs))
    while (true) {
        for (const x of xss) {
            yield x
        }
    }
}
