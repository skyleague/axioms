import { isFunction } from '../../guard/is-function'
import type { Lambda } from '../../type/lambda'

/**
 * Takes a value or a function that returns a value, and returns the value.
 *
 * ### Example
 * ```ts
 * evaluate("foobar")
 * // => "foobar"
 *
 * evaluate(() => "foobar"))
 * // => "foobar"
 * ```
 *
 * @param maybeEvaluate - The value to evaluate
 * @returns A function that takes a value of type T or a function that returns a value of type T and
 *          returns a value of type T.
 *
 * @typeParam T - The element type.
 *
 * @group Functions
 */
export function evaluate<T>(maybeEvaluate: T | (() => T)): T extends Lambda ? never : T {
    return (isFunction(maybeEvaluate) ? maybeEvaluate() : maybeEvaluate) as T extends Lambda ? never : T
}
