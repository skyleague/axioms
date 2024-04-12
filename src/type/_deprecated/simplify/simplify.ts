import type { Primitive } from '../../../types.js'

// biome-ignore lint/complexity/noBannedTypes:
type BuiltinType = Date | Error | Function | Primitive | RegExp

type SimplifyTuple<T> = T extends [infer X, ...infer Rest] ? [Simplify<X>, ...SimplifyTuple<Rest>] : []
/**
 * @deprecated Use `Simplify` instead from '@skyleague/axioms/types`.
 */
// biome-ignore lint/suspicious/noExplicitAny: we need to use `any` here to simplify the type
export type SimplifyOnce<T> = T extends BuiltinType ? T : T extends any[] ? T : { [K in keyof T]: T[K] }

/**
 * @deprecated Deep simplify is fairly complicated and shouldn't be used in most cases.
 */

export type Simplify<T> = T extends BuiltinType
    ? T
    : T extends (infer I)[]
      ? // biome-ignore lint/suspicious/noExplicitAny: we need to use `any` here to simplify the type
          T extends [any, ...infer Rest]
            ? [Simplify<T[0]>, ...SimplifyTuple<Rest>]
            : Simplify<I>[]
      : { [K in keyof T]: Simplify<T[K]> }
