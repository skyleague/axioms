import type { Traversable } from '../../type'

export function any<T>(xs: Traversable<T>, predicate: (x: T) => boolean): boolean {
    for (const x of xs) {
        if (predicate(x)) {
            return true
        }
    }
    return false
}

export const some = any
