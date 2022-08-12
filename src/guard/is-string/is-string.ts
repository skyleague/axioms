export function isString(x: string | unknown): x is string {
    return typeof x === 'string'
}
