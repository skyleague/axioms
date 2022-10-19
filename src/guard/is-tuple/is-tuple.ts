/**
 * Checks if `xs` is a tuple of the given length.
 *
 * ### Example
 * ```ts
 * isTuple(1, [2])
 * // => true
 *
 * isTuple(1, [2, 3])
 * // => false
 *
 * isTuple(2, {})
 * // => false
 * ```
 *
 * @param xs - The value to check.
 *
 * @returns `true` if `xs` is a tuple of the given length, `false` otherwise.
 *
 * @group Guards
 */
export function isTuple<I extends ArrayLike<unknown>, L extends number>(length: L, xs: I | unknown): xs is I & { length: L } {
    return Array.isArray(xs) && xs.length === length
}
