import { head } from '../../array'
import { isArray } from '../../guard'
import type { BuildTuple, Maybe, Traversable } from '../../type'
import { Nothing } from '../../type'
import { drop } from '../drop'

export type Nth<N extends number, T> = T extends readonly any[] ? T[N] : never

/**
 * `at` returns the nth element of a traversable, or {@link Nothing} if the traversable is too short
 *
 * ### Example
 * ```ts
 * at([1, 2, 3], 1)
 * // => 2
 *
 * at([1, 2, 3], 4)
 * // => Nothing
 * ```
 *
 * @param xs - The traversable to find the element in.
 * @param n - The index of the element to retrieve.
 * @returns If the traversable contains an element as position `n` we return that element, otherwise {@link NOthing}.
 *
 * @typeParam T - The element type.
 * @typeParam N - The index of the element.
 *
 * @group Iterators
 */
export function at<Xs extends any[], N extends number>(
    xs: readonly [...Xs],
    n: N
): Xs extends readonly [...BuildTuple<N, any>, infer X, ...any[]] ? X : number extends Xs['length'] ? Maybe<Xs[N]> : Nothing
export function at<T, N extends number = number>(xs: Traversable<T>, n: N): Maybe<T>
export function at<T, N extends number = number>(xs: Traversable<T>, n: N): Maybe<T> {
    if (isArray<T>(xs)) {
        return n >= xs.length ? Nothing : xs[n]
    }
    // slow iterator compatible version
    return head(drop(xs, n))
}

/**
 * Return the first element of a traversable, or Nothing if the traversable is empty.
 *
 * The `first` function is a good example of how to use the at function. It's also a good example of how
 * to use the {@link Maybe} type.
 *
 * ### Example
 * ```ts
 * first([1, 2, 3])
 * // => 1
 *
 * first([])
 * // => Nothing
 * ```
 *
 * @param xs - The traversable to find the element in.
 *
 * @returns The first element of the traversable, otherwise {@link Nothing}.
 *
 * @typeParam T - The element type.
 *
 * @see {@link at}
 *
 * @group Iterators
 */
export function first<T>(xs: T): T extends readonly [infer N0, ...unknown[]] ? N0 : Nothing
export function first<T>(xs: Traversable<T>): Maybe<T>
export function first<T>(xs: Traversable<T>): Maybe<T> {
    return at(xs, 0)
}

/**
 * Return the second element of a traversable, or Nothing if the traversable is empty.
 *
 * The `second` function is a good example of how to use the at function. It's also a good example of how
 * to use the {@link Maybe} type.
 *
 * ### Example
 * ```ts
 * second([1, 2, 3])
 * // => 2
 *
 * second([])
 * // => Nothing
 * ```
 *
 * @param xs - The traversable to find the element in.
 *
 * @returns The second element of the traversable, otherwise {@link Nothing}.
 *
 * @typeParam T - The element type.
 *
 * @see {@link at}
 *
 * @group Iterators
 */
export function second<T>(xs: readonly [unknown, T, ...unknown[]]): T
export function second<T>(xs: Traversable<T>): Maybe<T>
export function second<T>(xs: Traversable<T>): Maybe<T> {
    return at(xs, 1)
}

/**
 * Return the third element of a traversable, or nothing if the traversable is empty.
 *
 * The `third` function is a good example of how to use the at function. It's also a good example of how
 * to use the {@link Maybe} type.
 *
 * ### Example
 * ```ts
 * third([1, 2, 3])
 * // => 2
 *
 * third([])
 * // => Nothing
 * ```
 *
 * @param xs - The traversable to find the element in.
 *
 * @returns The third element of the traversable, otherwise {@link Nothing}.
 *
 * @typeParam T - The element type.
 *
 * @see {@link at}
 *
 * @group Iterators
 */
export function third<T>(xs: readonly [unknown, unknown, T, ...unknown[]]): T
export function third<T>(xs: Traversable<T>): Maybe<T>
export function third<T>(xs: Traversable<T>): Maybe<T> {
    return at(xs, 2)
}
