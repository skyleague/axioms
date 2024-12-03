import type { Traversable } from '../../../type/index.js'

/**
 * Creates a stateful generator that iterates over a predicates output given an initial value.
 *
 * ### Example
 * ```ts
 * collect(take(iterate('foo', (str) => `${str}bar`), 4))
 * // => [
 * //   "foo",
 * //   "foobar",
 * //   "foobarbar",
 * //   "foobarbarbar",
 * // ]
 * ```
 *
 * @param x - The initial value to start iterating with.
 * @param f - The lambda that will be used to iterate with.
 * @param f.x - The value of the iteration.
 * @param f.i - The index of the iteration.
 *
 * @returns The iterate generator.
 *
 * @typeParam T - The element type.
 *
 * @group Generators
 * @deprecated Rarely used in practice
 */
export function* iterate<T>(x: T, f: (x: T, i: number) => T): Traversable<T> {
    let i = 0
    let v = x
    while (true) {
        yield v
        v = f(v, i++)
    }
}
