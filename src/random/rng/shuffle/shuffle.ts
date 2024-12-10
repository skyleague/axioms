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
export function shuffle<T>(xs: Iterable<T>, random: () => number = Math.random): T[] {
    const axs = Array.from(xs)
    for (let i = axs.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        // biome-ignore lint/style/noNonNullAssertion: The array is guaranteed to have a value at this index
        const temp = axs[i]!
        // biome-ignore lint/style/noNonNullAssertion: The array is guaranteed to have a value at this index
        axs[i] = axs[j]!
        axs[j] = temp
    }
    return axs
}
