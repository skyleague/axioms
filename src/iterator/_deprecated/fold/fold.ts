import { isJust } from '../../../guard/is-just/index.js'
import { toTraversable } from '../../../type/_deprecated/traversable/index.js'
import type { Traversable } from '../../../type/_deprecated/traversable/index.js'
import type { Maybe } from '../../../type/maybe/index.js'
import { Nothing } from '../../../type/maybe/index.js'
import { uncons } from '../uncons/index.js'

/**
 * Takes a collection of values, a reducer function, and an initial value, and return the result of
 * applying the reducer function to each value in the collection, starting with the initial value
 *
 * ### Example
 * ```ts
 * foldl([1, 2], (a, b) => a + b)
 * // => 3
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
 * - [Lodash - reduce](https://lodash.com/docs/4.17.15#reduce)
 *
 * ### Proposals
 * - [`Iterator.prototype.reduce`](https://github.com/tc39/proposal-iterator-helpers)
 *
 * @param xs - The elements to fold.
 * @param reducer - A function that takes the accumulator and the current value and returns the new accumulator.
 * @param {R} init - The initial value of the accumulator.
 *
 * @returns The last value of the accumulator.
 *
 *
 * @returns This function returns true if all elements in the iterators are equal, and false otherwise.
 *
 * @typeParam T - The element type.
 * @typeParam R - The accumulation type.
 *
 * @group Iterators
 * @deprecated Use `xs.reduce(reducer, init)` instead
 */
export function foldl<T, R = T>(xs: Traversable<T>, reducer: (acc: R, val: T) => R, init: R): R {
    let acc = init
    for (const x of xs) {
        acc = reducer(acc, x)
    }
    return acc
}

/**
 * @experimental
 * @deprecated Use `xs.reduce(reducer)` instead
 */
export function foldl1<T>(xs: Traversable<T>, reducer: (acc: T, val: T) => T): Maybe<T> {
    const [head, rest] = uncons(xs)
    // if first is undefined due to the length of the Iterable
    // the result will be an empty array
    if (isJust(head)) {
        return foldl(toTraversable(rest), reducer, head)
    }
    return Nothing
}

/**
 * @inheritDoc foldl
 *
 * @see {@link foldl}
 *
 * @group Iterators
 * @deprecated Use `xs.reduce(reducer)` instead
 */

export const reduce = foldl
