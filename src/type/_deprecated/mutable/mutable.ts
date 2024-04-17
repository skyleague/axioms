/**
 * @deprecated Use `Writable` from `@skyleague/axioms/types` instead
 */
export type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> }

/**
 * @deprecated Use `Writable` from `@skyleague/axioms/types` instead
 */
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }
