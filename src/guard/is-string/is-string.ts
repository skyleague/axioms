/**
 * Checks if `x` is a {@link string}.
 *
 * ### Example
 * ```ts
 * isString("foobar")
 * // => true
 *
 * isString(1234)
 * // => false
 *
 * isString({})
 * // => false
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a {@link string}, `false` otherwise.
 *
 * @group Guards
 */
export function isString(x: string | unknown): x is string {
    return typeof x === 'string'
}
