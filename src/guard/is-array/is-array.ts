import type { Traversable } from '../../type/index.js'

/**
 * Checks if `xs` is classified as {@link Array}.
 *
 * ### Example
 * ```ts
 * asArray(1)
 * // => [1]
 *
 * asArray([2, 3, 4])
 * // => [2, 3, 4]
 * ```
 *
 * ### Alternatives
 * - [ECMAScript Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
 *
 * @param xs - The value to check.
 *
 * @returns Returns `true` if `xs` is an {@link Array}, else `false`.
 *
 * @typeParam I - The element type of the {@link Traversable} class.
 *
 * @group Guards
 */
export function isArray<I>(xs: Traversable<I> | unknown): xs is I[] {
    return Array.isArray(xs)
}
