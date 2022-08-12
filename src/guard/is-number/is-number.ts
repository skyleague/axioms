export function isNumber(x: number | unknown): x is number {
    return typeof x === 'number'
}
