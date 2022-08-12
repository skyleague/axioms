export function isBoolean(x: boolean | unknown): x is boolean {
    return typeof x === 'boolean'
}
