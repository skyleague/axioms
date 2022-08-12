export function sortStrings(str: string[], { mode = 'asc' }: { mode?: 'asc' | 'desc' } = {}): string[] {
    const fn = mode === 'asc' ? (a: string, z: string) => a.localeCompare(z) : (a: string, z: string) => z.localeCompare(a)
    return str.sort(fn)
}
