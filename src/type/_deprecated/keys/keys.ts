import type { Simplify } from '../../../types.js'
import type { NoUndefinedFields } from '../fields/index.js'

/**
 * @deprecated Use `KeysOfUnion` from `@skyleague/axioms/types` instead
 */
export type KeyOf<T> = T extends unknown ? keyof T : never

/**
 * @deprecated
 */
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]

/**
 * @deprecated Use `RequiredKeysOf` from `@skyleague/axioms/types` instead
 */
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>
/**
 * @deprecated Use `OptionalKeysOf` from `@skyleague/axioms/types` instead
 */
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>

/**
 * @deprecated Use `SetRequired` from `@skyleague/axioms/types` instead
 */
export type RequireKeys<T, K extends PropertyKey> = T extends infer S
    ? Simplify<Omit<S, K> & Required<Pick<S, K & keyof S>>> extends infer U
        ? U extends Record<K, unknown>
            ? Simplify<DefinedKeys<U, K>>
            : never
        : never
    : never

/**
 * @deprecated
 */
export type DefinedKeys<T, K extends keyof T> = NoUndefinedFields<Pick<T, K>> & Omit<T, K>
