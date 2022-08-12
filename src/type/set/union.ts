export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true
