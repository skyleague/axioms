import type { BuiltinType } from '../primitives'

type SimplifyTuple<T> = T extends [infer X, ...infer Rest] ? [Simplify<X>, ...SimplifyTuple<Rest>] : []
export type SimplifyOnce<T> = T extends BuiltinType ? T : T extends any[] ? T : { [K in keyof T]: T[K] }
export type Simplify<T> = T extends BuiltinType
    ? T
    : T extends (infer I)[]
    ? T extends [any, ...infer Rest]
        ? [Simplify<T[0]>, ...SimplifyTuple<Rest>]
        : Simplify<I>[]
    : { [K in keyof T]: Simplify<T[K]> }
