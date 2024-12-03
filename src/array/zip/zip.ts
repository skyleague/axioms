import { next } from '../../generator/_deprecated/next/index.js'
import { isRight } from '../../guard/is-right/index.js'
import { toTraverser } from '../../type/_deprecated/traversable/index.js'
import type { Traversable } from '../../type/_deprecated/traversable/index.js'

type ZipItem<Arr> = Arr extends Generator<infer G> ? G : Arr extends (infer I)[] ? I : never
type Zip<T> = { [K in keyof T]: ZipItem<T[K]> }
type Unzip<T> = {
    [K in keyof T]: readonly T[K][]
}

/**
 * Take the {@link Traversable}s and return a {@link Traversable} of tuples.
 *
 * The function evaluates the {@link Traversable}s and converts them into arrays.
 *
 * ### Example
 * ```ts
 * collect(zip([1, 2, 3], [1, 2, 3]))
 * // => [[1, 1], [2, 2], [3, 3]]
 * ```
 */
export function* zip<T extends readonly [...Traversable<unknown>[]]>(...xs: [...T]): Traversable<Zip<T>> {
    if (xs.length === 0) {
        return
    }
    const traversers = xs.map(toTraverser)
    for (let vals = traversers.map(next); vals.every(isRight); vals = traversers.map(next)) {
        yield vals.map((x) => x.right) as unknown as Zip<T>
    }
    return
}

/**
 * @deprecated
 */
export function* zipWith<T extends readonly [...unknown[]], R>(f: (...args: [...T]) => R, ...xs: Unzip<[...T]>) {
    if (xs.length === 0) {
        return
    }
    const traversers = xs.map(toTraverser)
    for (let vals = traversers.map(next); vals.every(isRight); vals = traversers.map(next)) {
        yield f(...(vals.map((x) => x.right) as [...T]))
    }
    return
}
