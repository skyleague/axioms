export function isTuple<I, L extends number>(length: L, arr: I[] | unknown): arr is I[] & { length: L } {
    return Array.isArray(arr) && arr.length === length
}
