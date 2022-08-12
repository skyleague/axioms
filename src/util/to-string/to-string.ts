import type { Maybe } from '../../type'

import { inspect } from 'util'

export function toString<T>(x: Maybe<T>): string {
    return inspect(x, false, 10)
}
