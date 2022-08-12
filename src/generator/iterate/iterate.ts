import type { Traversable } from '../../type'

export function* iterate<T>(x: T, f: (x: T, i: number) => T): Traversable<T> {
    let i = 0
    let v = x
    while (true) {
        yield v
        v = f(v, i++)
    }
}
