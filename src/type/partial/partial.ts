import type { Dict } from '../dict'

export type DeepPartial<T> = T extends Dict
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T extends Array<infer I>
    ? Array<DeepPartial<I>>
    : T | undefined

export type RelaxedPartial<T> = {
    [P in keyof T]?: T[P] | undefined
}
