import type { Traversable } from '../../type/index.js'

export function isIterable<T, R, O>(x: O | Traversable<T, R>): x is Traversable<T, R> {
    return x !== null && (typeof x === 'string' || (typeof x === 'object' && Symbol.iterator in x))
}
