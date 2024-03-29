import { isFunction, isGeneratorFunction } from '../../guard/index.js'
import type { InfiniteGenerator } from '../../type/index.js'

/**
 * Creates a generator repeats the given values as {@link InfiniteGenerator}.
 *
 * ### Example
 * ```ts
 * collect(take(repeat('foobar'), 4))
 * // => [
 * //   "foobar",
 * //   "foobar",
 * //   "foobar",
 * //   "foobar",
 * // ]
 *
 * collect(take(repeat(() => 123), 2))
 * // => [
 * //   123,
 * //   123,
 * // ]
 * ```
 *
 * @param x - The value to repeat.
 *
 * @returns The repeat generator.
 *
 * @typeParam T - The element type.
 *
 * @group Generators
 */
export function* repeat<T>(x: T | (() => Generator<T>) | ((i: number) => T)): InfiniteGenerator<T> {
    let i = 0
    if (isFunction(x)) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        while (true) {
            if (isGeneratorFunction<T, void>(x)) {
                yield* x()
            } else {
                yield (x as (i: number) => T)(i)
            }
            ++i
        }
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        while (true) {
            yield x
            ++i
        }
    }
}
