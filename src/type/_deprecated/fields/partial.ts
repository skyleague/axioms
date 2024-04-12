import type { UnknownRecord } from 'type-fest'

/**
 * @deprecated Use `PartialDeep` instead from '@skyleague/axioms/types'.
 */
export type DeepPartial<T> = T extends UnknownRecord
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T extends (infer I)[]
      ? DeepPartial<I>[]
      : T | undefined

/**
 * @deprecated Use `MaybePartial`
 */
export type RelaxedPartial<T> = {
    [P in keyof T]?: T[P] | undefined
}
