/**
 * Checks if `x` is classified as {@link Error}.
 *
 * ### Example
 * ```ts
 * isError(new Error("this is an error"))
 * // => true
 *
 * isError("foobar")
 * // => false
 * ```
 *
 * ### Alternatives
 * - [Lodash - isError]https://lodash.com/docs/#isError)
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is an {@link Error}, `false` otherwise.
 *
 * @group Guards
 */
export function isError(x: Error | unknown): x is Error {
    return x !== undefined && x !== null && (x as Error).message !== undefined && (x as Error).stack !== undefined
}
