/**
 * A type that represents either a constant or a constant function.
 *
 * @typeParam T - The constant type.
 *
 * @group Types
 */
export type ConstOrFn<T> = T | (() => T)
