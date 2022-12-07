import { collect } from '../../../array'
import type { Traversable } from '../../../type'

/**
 * It takes a traversable and returns a new array with the same elements in a random order.
 *
 * ### Example
 * ```ts
 * shuffle([1, 2, 3])
 * // => [2, 3, 1]
 *
 * shuffle([1, 2, 3])
 * // => [2, 1, 3]
 * ```
 *
 * @param xs - The array to shuffle.
 * @param random - The random implementation to shuffle
 * @returns A new array with the same elements as the original array, but in a random order.
 *
 * @group Random
 */
export function shuffle<T>(xs: Traversable<T>, random: () => number = Math.random): T[] {
    const axs = collect(xs)
    for (let i = axs.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        const temp = axs[i]
        axs[i] = axs[j]
        axs[j] = temp
    }
    return axs
}
