import type { Traversable } from '../../type'

export function all<T>(xs: Traversable<T>, predicate: (x: T) => boolean): boolean {
    for (const x of xs) {
        if (!predicate(x)) {
            return false
        }
    }
    return true
}

export const every = all
