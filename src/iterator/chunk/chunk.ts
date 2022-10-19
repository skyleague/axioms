import { toTraversable } from '../../type/traversable'
import type { Traversable } from '../../type/traversable'
import { itrampoline } from '../../util/trampoline'
import type { RecurrentGenerator } from '../../util/trampoline'
import { splitAt } from '../split'

function _chunk<T>(xs: Traversable<T>, size: number): RecurrentGenerator<T[]> {
    const [init, rest] = splitAt(xs, size)
    return [init, init.length > 0 ? () => _chunk(toTraversable(rest), size) : undefined]
}

/**
 * Creates a generator that splits the given {@link Traversable} into chunks of the required size. If
 * no even chunks can be created, the last chunk will have fewer elements.
 *
 * ### Example
 * ```ts
 * collect(chunk([1, 2, 3, 4, 5], 1))
 * // => [[1], [2], [3], [4], [5]]
 *
 * collect(chunk([1, 2, 3, 4, 5], 3))
 * // => [[1, 2, 3], [4, 5]]
 *
 * collect(chunk([1, 2, 3], 0))
 * // => [[1], [2], [3]]
 * ```
 *
 * ### Alternatives
 * - [Lodash - chunk](https://lodash.com/docs/4.17.15#chunk)
 *
 * @param xs - The values to split in chunks.
 * @param size - The maximum size of a chunk, constrained to minimum value of 1.
 *
 * @returns A chunk generator.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function* chunk<T>(xs: Traversable<T>, size: number): Generator<T[]> {
    yield* itrampoline(_chunk)(xs, Math.max(size, 1))
}
