import type { CurriedVariadic } from '../curry'
import { curryVariadic } from '../curry'

export function curryTuple<T extends unknown[], L extends number>(n: L): CurriedVariadic<[...T], [...T], L> {
    return curryVariadic((...xs: [...T]): [...T] => xs, n)
}
