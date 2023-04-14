import type { Traversable } from '../../type/index.js'
import { toTraverser } from '../../type/index.js'

import deepEqual from 'fast-deep-equal/es6/index.js'

/**
 * Take two traversables and an equality function and returns `true` if all the elements of
 * the first traversable are equal to the elements of the second traversable
 *
 * ### Example
 * ```ts
 * allEqual([1, 2, 3], [1, 2, 3])
 * // => true
 *
 * allEqual([1, 2, 3], [1, 2])
 * // => false
 *
 * allEqual([{foo: "bar"}], [{bar: "foo"}])
 * // => false
 * ```
 *
 * ### Alternatives
 * - [Lodash - isEqual](https://lodash.com/docs/4.17.15#isEqual)
 *
 * @param {Xs} xs - The first traversable to compare.
 * @param {As} as - The second traversable to compare
 * @param eq - A predicate that checks if elements are equal, uses {@link equal} by default.
 *
 * @returns This function returns true if all elements in the iterators are equal, and false otherwise.
 *
 * @typeParam As - The type of the first iterator.
 * @typeParam Xs - The type of the second iterator.
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function allEqual<
    Xs extends Traversable<unknown>,
    As extends Xs extends Traversable<infer S> ? Traversable<S> : never,
    T = Xs extends Traversable<infer S> ? S : never
>(xs: Xs, as: As, eq: (a: T, b: T) => boolean = equal): boolean {
    const ixs = toTraverser(xs)
    const ias = toTraverser(as)

    let xv = ixs.next()
    let av = ias.next()
    for (; xv.done !== true && av.done !== true; xv = ixs.next(), av = ias.next()) {
        if (!eq(xv.value as T, av.value as T)) {
            return false
        }
    }
    return xv.done === true && av.done === true
}

/**
 * It returns true if the two arguments are deeply equal, and false otherwise.
 *
 * This function is a wrapper around [fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal).
 *
 * ### Example
 * ```ts
 * equal({foo: "bar"}, {foo: "bar"})
 * // => true
 *
 * equal([1, 2, 3], [1, 2, 3])
 * // => true
 *
 * equal([1, 2, 3], [1, 2])
 * // => false
 *
 * equal([{foo: "bar"}], [{bar: "foo"}])
 * // => false
 * ```
 *
 * ### Alternatives
 * - [fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal)
 * - [Lodash - isEqual](https://lodash.com/docs/4.17.15#isEqual)
 *
 * @param a - unknown
 * @param b - unknown
 *
 * @returns A function that takes two arguments and returns a boolean.
 *
 * @group Iterators
 */
export function equal(a: unknown, b: unknown): boolean {
    return deepEqual(a, b)
}
