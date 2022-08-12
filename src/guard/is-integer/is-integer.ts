export function isInteger(x: number | unknown): x is number {
    return Number.isInteger(x)
}
