import type { Traversable } from '../../type'

export function concat<T, U>(xs1: Traversable<T>, xs2: Traversable<U>): Traversable<T | U, void>
export function concat<T, U, V>(xs1: Traversable<T>, xs2: Traversable<U>, xs3: Traversable<V>): Traversable<T | U | V, void>
export function concat<T>(...xs: Traversable<T>[]): Traversable<T, void>
export function* concat<T>(...xs: Traversable<T>[]): Traversable<T, void> {
    for (const x of xs) {
        yield* x
    }
}
