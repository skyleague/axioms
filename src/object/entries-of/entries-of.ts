export type EntriesOf<T> = T extends Array<infer I> ? Array<[string, I]> : Array<{ [K in keyof T]: [K, T[K]] }[keyof T]>
export function entriesOf<T extends ArrayLike<unknown> | Record<string, unknown>>(obj: T): EntriesOf<T> {
    return Object.entries(obj) as EntriesOf<T>
}
