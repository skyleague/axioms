export function isTuple<I extends ArrayLike<unknown>, L extends number>(length: L, arr: I | unknown): arr is I & { length: L } {
    return Array.isArray(arr) && arr.length === length
}
