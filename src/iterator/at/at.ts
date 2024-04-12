import { head } from '../../array/index.js'
import { isArray } from '../../guard/index.js'
import type { Maybe, Traversable } from '../../type/index.js'
import { Nothing } from '../../type/index.js'
import type { IterableElement, ReadonlyTuple, UnknownArray } from '../../types.js'
import { drop } from '../drop/index.js'

export type Nth<N extends number, T> = T extends readonly unknown[] ? T[N] : never

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
export function at<const XS extends Traversable<unknown> | readonly unknown[], N extends number>(
    xs: XS,
    n: N,
): XS extends readonly [...ReadonlyTuple<unknown, N>, infer X, ...unknown[]]
    ? X
    : XS extends UnknownArray
      ? number extends XS['length']
            ? Maybe<XS[N]>
            : Nothing
      : Nothing {
    if (isArray(xs)) {
        // biome-ignore lint/suspicious/noExplicitAny: any
        return n >= xs.length ? Nothing : (xs[n] as any)
    }
    // slow iterator compatible version

    // biome-ignore lint/suspicious/noExplicitAny: any
    return head(drop(xs, n)) as any
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
export function first<const T extends Traversable<unknown> | readonly unknown[]>(
    xs: T,
): T extends readonly [infer N0, ...unknown[]] ? N0 : Maybe<IterableElement<T>> {
    return at(xs, 0) as T extends readonly [infer N0, ...unknown[]] ? N0 : Maybe<IterableElement<T>>
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
export function second<const T extends Traversable<unknown> | readonly unknown[]>(
    xs: T,
): T extends readonly [unknown, infer N1, ...unknown[]] ? N1 : Maybe<IterableElement<T>> {
    return at(xs, 1) as T extends readonly [unknown, infer N1, ...unknown[]] ? N1 : Maybe<IterableElement<T>>
}

/**
 * Return the third element of a traversable, or Nothing if the traversable is empty.
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
export function third<const T extends Traversable<unknown> | readonly unknown[]>(
    xs: T,
): T extends readonly [unknown, unknown, infer N2, ...unknown[]] ? N2 : Maybe<IterableElement<T>> {
    return at(xs, 2) as T extends readonly [unknown, unknown, infer N2, ...unknown[]] ? N2 : Maybe<IterableElement<T>>
}
