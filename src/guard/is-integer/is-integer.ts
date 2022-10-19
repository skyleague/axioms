/**
 * Checks if `x` is an integer.
 *
 * ### Example
 * ```ts
 * isInteger(1234)
 * // => true
 *
 * isInteger(12.34)
 * // => false
 *
 * isInteger("foobar")
 * // => false
 * ```
 *
 * ### Alternatives
 * - [ECMAScript Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is an integer, `false` otherwise.
 *
 * @group Guards
 */
export function isInteger(x: number | unknown): x is number {
    return Number.isInteger(x)
}
