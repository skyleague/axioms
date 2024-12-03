/**
 * @deprecated Has too few use cases and is not a good fit for the type system.
 */
export type Tail<T extends readonly unknown[]> = T extends [head: unknown, ...tail: infer U] ? U : never
