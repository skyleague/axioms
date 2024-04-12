export type Tail<T extends readonly unknown[]> = T extends [head: unknown, ...tail: infer U] ? U : never
