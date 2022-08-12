/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Cast } from '../../type/cast'
import type { Item } from '../../type/item'
import type { DeepMutable } from '../../type/mutable'

export type FromEntries<T> = T extends [infer Key, any][]
    ? { [K in Cast<Key, string>]: Extract<Item<T>, [K, any]>[1] }
    : { [key in string]: any }

export type FromEntriesWithReadOnly<T> = FromEntries<DeepMutable<T>>

export function fromEntries<T extends any[]>(obj: T): FromEntriesWithReadOnly<T> {
    return Object.fromEntries(obj) as FromEntriesWithReadOnly<T>
}
