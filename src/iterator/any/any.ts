import type { Traversable } from '../../type'

/**
 * The function tests whether any elements in the {@link Traversable} satisfy the predicate.
 *
 * ### Example
 * ```ts
 * any([true, true, true], identity)
 * // => true
 *
 * any([10, 11, 5], x => x > 10)
 * // => true
 *
 * any([true, false, true], identity)
 * // => true
 *
 * any(false, false, false], identity)
 * // => false
 *
 * all([], identity)
 * // => true
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
 * - [Lodash - some](https://lodash.com/docs/4.17.15#some)
 *
 * @param xs - The values to check.
 * @param predicate - The predicate that will be checked on every element.
 * @param predicate.x - The current element that is checked.
 *
 * @returns Whether any element satisfies the predicate.
 *
 * @see {@link every}
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function any<T>(xs: Traversable<T>, predicate: (x: T) => boolean): boolean {
    for (const x of xs) {
        if (predicate(x)) {
            return true
        }
    }
    return false
}

/**
 * @inheritDoc any
 *
 * @see {@link any}
 *
 * @group Iterators
 */
export const some = any
