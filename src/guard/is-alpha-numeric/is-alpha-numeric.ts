export function isAlphaNumeric(str: string, extra?: string): boolean {
    return new RegExp(`^[A-Za-z0-9${extra ?? ''}]+$`).test(str)
}
