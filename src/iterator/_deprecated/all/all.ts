import type { Traversable } from '../../../type/index.js'

/**
 * The function tests whether all elements in the {@link Traversable} satisfy the predicate.
 *
 * ### Example
 * ```ts
 * all([true, true, true], identity)
 * // => true
 *
 * all([10, 11, 5], x => x > 10)
 * // => false
 *
 * all([true, false, true], identity)
 * // => false
 *
 * all([], identity)
 * // => true
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - Array.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
 * - [Lodash - every](https://lodash.com/docs/4.17.15#every)
 *
 * ### Proposals
 * - [`Iterator.prototype.every`](https://github.com/tc39/proposal-iterator-helpers)
 *
 * @param xs - The values to check.
 * @param predicate - The predicate that will be checked on every element.
 * @param predicate.x - The current element that is checked.
 *
 * @returns Whether all elements satisfy the predicate.
 *
 * @see {@link every}
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 * @deprecated use Iterator.every instead
 */
export function all<T>(xs: Traversable<T>, predicate: (x: T) => boolean): boolean {
    for (const x of xs) {
        if (!predicate(x)) {
            return false
        }
    }
    return true
}

/**
 * @inheritDoc all
 *
 * @see {@link all}
 *
 * @group Iterators
 * @deprecated use Iterator.every instead
 */
export const every = all
