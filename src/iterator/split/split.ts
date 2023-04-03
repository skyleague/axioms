import { next } from '../../generator/next/index.js'
import { isRight } from '../../guard/is-right/index.js'
import type { Maybe } from '../../type/maybe/index.js'
import { Nothing } from '../../type/maybe/index.js'
import type { Traversable, Traverser } from '../../type/traversable/index.js'
import { take } from '../take/index.js'

/**
 * It takes a traversable and a number, and returns a tuple of the first `n` elements of the traversable
 * and the rest of the traversable
 *
 * ### Example
 * ```ts
 * const [init, rest] = splitAt('hello world!', 6)
 * init
 * // => ["h", "e", "l", "l", "o", " "]
 *
 * collect(rest)
 * // => ["w", "o", "r", "l", "d", "!"]
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
 * - [Lodash - slice](https://lodash.com/docs/4.17.15#slice)
 *
 * @param xs - The values to split.
 * @param at - The index to split the traversable on.
 * @returns A tuple.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function splitAt<T>(xs: Traversable<T>, at: number): [T[], Traverser<T>] {
    const takeIterator = take(xs, at)
    const first = []
    let it = next(takeIterator)
    while (isRight(it)) {
        first.push(it.right)
        it = next(takeIterator)
    }
    const rest = it.left
    return [first, rest]
}

/**
 * It takes a `Traversable` and returns a tuple of the first `n - 1` elements and the last element.
 *
 * ### Example
 * ```ts
 * const [rest, last] = splitAt('hello')
 * collect(rest)
 * // => ["h", "e", "l", "l"]
 *
 * last
 * // => "o"
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
 * - [Lodash - slice](https://lodash.com/docs/4.17.15#slice)
 *
 * @param xs - The values to split.
 * @returns A tuple.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function splitLast<T>(xs: Traversable<T>): [T[], Maybe<T>] {
    const array = [...xs]
    const last = array.length > 0 ? array.pop()! : Nothing
    return [array, last]
}
