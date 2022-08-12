import { applicative } from '../../iterator/applicative'
import type { Mappable, InfiniteGenerator } from '../../type'
import { toTraversable } from '../../type'

export function* cycle<T>(xs: Mappable<T>): InfiniteGenerator<T> {
    const xss = applicative(toTraversable(xs))
    while (true) {
        for (const x of xss) {
            yield x
        }
    }
}
