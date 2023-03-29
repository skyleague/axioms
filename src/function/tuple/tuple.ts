import type { CurriedVariadic } from '../curry/index.js'
import { curryVariadic } from '../curry/index.js'

/**
 * @experimental
 */
export function curryTuple<T extends unknown[], L extends number>(n: L): CurriedVariadic<[...T], [...T], L> {
    return curryVariadic((...xs: [...T]): [...T] => xs, n)
}
