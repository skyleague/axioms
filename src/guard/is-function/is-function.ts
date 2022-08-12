// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T extends Function>(f: T | unknown): f is T {
    return typeof f === 'function'
}
