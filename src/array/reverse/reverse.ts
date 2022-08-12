import { isArray } from '../../guard'
import type { Traversable } from '../../type'

export function* reverse<T>(xs: Traversable<T>): Generator<T, void> {
    if (isArray<T>(xs)) {
        for (let i = xs.length - 1; i >= 0; --i) {
            yield xs[i]
        }
    } else {
        for (const x of [...xs].reverse()) {
            yield x
        }
    }
}
