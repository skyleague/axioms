export type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> }
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }
