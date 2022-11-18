/**
 * A type that represents either a constant or a constant function.
 *
 * @typeParam T - The constant type.
 *
 * @group Types
 */
export type ConstExpr<T = unknown> = T | (() => T)

/**
 * A type that represents either a constant or a constant function.
 *
 * @typeParam T - The constant type.
 *
 * @group Types
 */
export type AsyncConstExpr<T = unknown> = Promise<T> | T | (() => Promise<T>) | (() => T)
