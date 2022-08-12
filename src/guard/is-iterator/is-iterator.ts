import type { Traverser } from '../../type'

export function isIterator<T, R, O>(x: O | Traverser<T, R>): x is Traverser<T, R> {
    return x !== null && x !== undefined && typeof (x as Traverser<T, R>).next === 'function'
}
