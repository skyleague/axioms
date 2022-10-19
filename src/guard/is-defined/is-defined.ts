/**
 * Checks if `x` is not `null` or `undefined`.
 *
 * ### Example
 * ```ts
 * isDefined(true)
 * // => true
 *
 * isDefined("1234")
 * // => true
 *
 * isDefined(undefined)
 * // => false
 *
 * isDefined(null)
 * // => false
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `false` if `x` is a `undefined` or `null`, `true` otherwise.
 *
 * @typeParam T - The type of `x`.
 *
 * @group Guards
 */
export function isDefined<T>(x: T | null | undefined | void): x is T {
    return x !== null && x !== undefined
}
