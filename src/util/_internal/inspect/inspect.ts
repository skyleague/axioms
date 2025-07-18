import { inspect as utilInspect } from 'node:util'
import type { Maybe } from '../../../type/index.js'

/**
 * @internal
 */
export function inspect<T>(x: Maybe<T>): string {
    return utilInspect(x, false, 10)
}
