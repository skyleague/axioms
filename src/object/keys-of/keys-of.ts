import type { KeyOf } from '../../type'

export type KeysOf<T> = T extends Array<infer _I> ? Array<string> : Array<KeyOf<T>>
export function keysOf<T>(obj: T): KeysOf<T> {
    return Object.keys(obj) as KeysOf<T>
}
