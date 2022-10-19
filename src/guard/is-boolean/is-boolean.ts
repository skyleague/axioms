/**
 * Checks if `x` is a boolean primitive.
 *
 * ### Example
 * ```ts
 * isBoolean(true)
 * // => true
 *
 * isBoolean("foobar")
 * // => false
 * ```
 *
 * ### Alternatives
 * - [Lodash - isBoolean](https://lodash.com/docs/#isBoolean)
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a boolean, `false` otherwise.
 *
 * @group Guards
 */
export function isBoolean(x: boolean | unknown): x is boolean {
    return typeof x === 'boolean'
}
