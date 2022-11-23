import { isFunction } from '../../guard/is-function'
import type { ConstExpr } from '../../type/function'

export type Evaluated<T extends ConstExpr<unknown>> = T extends () => infer V ? V : T

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
export function evaluate<T extends ConstExpr<unknown>>(maybeEvaluate: T): Evaluated<T> {
    return (isFunction(maybeEvaluate) ? maybeEvaluate() : maybeEvaluate) as Evaluated<T>
}
