export function has<T extends {}>(obj: T, k: string | keyof T): k is keyof T {
    return (k as string) in obj
}
