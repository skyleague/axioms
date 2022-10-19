/**
 * Checks if `f` is classified as {@link Function}.
 *
 * ### Example
 * ```ts
 * isFunction(() => true))
 * // => true
 *
 * isFunction("foobar")
 * // => false
 * ```
 *
 * ### Alternatives
 * - [Lodash - isFunction]https://lodash.com/docs/#isError)
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a {@link Function}, `false` otherwise.
 *
 * @group Guards
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T extends Function>(f: T | unknown): f is T {
    return typeof f === 'function'
}
