import type { SimplifyOnce } from '../../type/simplify'

export function pickBy<T, Predicate extends ([key, value]: [key: keyof T, value: T[keyof T]]) => boolean>(
    obj: T,
    predicate: Predicate
): Partial<T> {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => predicate([k as keyof T, v]))) as unknown as Partial<T>
}

export function pick<T, K extends keyof T>(obj: T, keys: readonly K[]): SimplifyOnce<Pick<T, K>> {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k as K))) as unknown as SimplifyOnce<Pick<T, K>>
}
