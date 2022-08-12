import type { Traversable } from '../../type'

export function* map<T, R = T>(xs: Traversable<T>, f: (x: T, i: number) => R): Traversable<R, void> {
    let i = 0
    for (const x of xs) {
        yield f(x, i)
        ++i
    }
}
