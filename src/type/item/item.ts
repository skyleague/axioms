export type Item<T> = T extends Array<infer I> ? I : T extends [...infer I] ? I : never
