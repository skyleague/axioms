import type { NoUndefinedFields } from '../fields'
import type { SimplifyOnce } from '../simplify'

export type KeyOf<T> = T extends unknown ? keyof T : never
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>
export type RequireKeys<T, K extends PropertyKey> = T extends infer S
    ? SimplifyOnce<Omit<S, K> & Required<Pick<S, K & keyof S>>> extends infer U
        ? U extends Record<K, unknown>
            ? SimplifyOnce<DefinedKeys<U, K>>
            : never
        : never
    : never

export type DefinedKeys<T, K extends keyof T> = NoUndefinedFields<Pick<T, K>> & Omit<T, K>
