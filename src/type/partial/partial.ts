import type { Dict } from '../_deprecated/dict/index.js'

/**
 * @deprecated Use `PartialDeep` instead from '@skyleague/axioms/types'.
 */
export type DeepPartial<T> = T extends Dict
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T extends (infer I)[]
      ? DeepPartial<I>[]
      : T | undefined

export type RelaxedPartial<T> = {
    [P in keyof T]?: T[P] | undefined
}
