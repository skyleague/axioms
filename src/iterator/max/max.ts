import { isJust } from '../../guard'
import type { ComparablePrimitive, Just, Maybe, Traversable } from '../../type'
import { Nothing } from '../../type'
import { foldl1 } from '../fold'
import { map } from '../map'

export function max<T extends ComparablePrimitive, Ts extends readonly [T, ...T[]]>(xs: Ts): Just<Ts[number]>
export function max<T extends ComparablePrimitive, Ts extends [T, ...T[]]>(xs: Ts): Just<Ts[number]>
export function max<T extends ComparablePrimitive>(xs: Traversable<T>): Maybe<T>
export function max<T extends ComparablePrimitive>(xs: Traversable<T>): Maybe<T> {
    return foldl1(xs, (a, b) => (b > a ? b : a))
}

export function maxBy<T, Ts extends readonly [T, ...T[]]>(f: (item: T) => ComparablePrimitive, xs: Ts): Just<Ts[number]>
export function maxBy<T, Ts extends [T, ...T[]]>(f: (item: T) => ComparablePrimitive, xs: Ts): Just<Ts[number]>
export function maxBy<T>(f: (item: T) => ComparablePrimitive, xs: Traversable<T>): Maybe<T>
export function maxBy<T>(f: (item: T) => ComparablePrimitive, xs: Traversable<T>): Maybe<T> {
    const xMax = foldl1(
        map(xs, (x) => [x, f(x)] as const),
        (acc, x) => (x[1] > acc[1] ? x : acc)
    )
    return isJust(xMax) ? xMax[0] : Nothing
}
