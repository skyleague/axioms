import type { Mappable } from '../../type'
import { toTraversable } from '../../type'

export function collect<T>(xs: Mappable<T>): T[] {
    return [...toTraversable(xs)]
}
