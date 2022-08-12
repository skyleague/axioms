export type Tail<T extends unknown[]> = T extends [head: unknown, ...tail: infer U] ? U : never
