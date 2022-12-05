/**
 * Checks if `x` is a `Promise`.
 *
 * ### Example
 * ```ts
 * isPromise(Promise.resolve(1))
 * // => true
 *
 * isPromise("foo")
 * // => false
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a `Promise`, `false` otherwise.
 *
 * @group Guards
 */
export function isPromise<T>(x: Promise<T> | unknown): x is Promise<T> {
    return (
        x !== undefined &&
        x !== null &&
        (typeof x === 'object' || typeof x === 'function') &&
        typeof (x as { then: unknown }).then === 'function'
    )
}
