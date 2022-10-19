/**
 * Checks if `x` is `undefined`.
 *
 * ### Example
 * ```ts
 * isUndefined(undefined)
 * // => true
 *
 * isUndefined(true)
 * // => false
 *
 * isUndefined("1234")
 * // => false
 *
 * isUndefined(null)
 * // => false
 * ```
 *
 * ### Alternatives
 * - [Lodash isUndefined](https://lodash.com/docs/4.17.15#isUndefined)
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a `undefined`, `false` otherwise.
 *
 * @group Guards
 */
export function isUndefined(a: unknown | undefined): a is undefined {
    return a === undefined
}
