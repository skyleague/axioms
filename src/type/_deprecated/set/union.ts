/**
 * @deprecated Use `UnionToIntersection` from `@skyleague/axioms/types` instead
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/**
 * @deprecated Type should not be used
 */
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true
