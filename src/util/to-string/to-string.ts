import type { Maybe } from '../../type/index.js'

import { inspect } from 'node:util'

export function toString<T>(x: Maybe<T>): string {
    return inspect(x, false, 10)
}
