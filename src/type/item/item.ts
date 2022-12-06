export type Item<T> = T extends (infer I)[] ? I : T extends [...infer I] ? I : never
