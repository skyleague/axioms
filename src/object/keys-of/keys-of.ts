import type { KeyOf } from '../../type'

export type KeysOf<T> = T extends Array<infer _I> ? Array<string> : Array<KeyOf<T>>
export function keysOf<T extends ArrayLike<unknown> | Record<string, unknown>>(obj: T): KeysOf<T> {
    return Object.keys(obj) as KeysOf<T>
}
