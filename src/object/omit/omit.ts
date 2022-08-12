import type { NoUndefinedFields, SimplifyOnce } from '../../type'
import { pickBy } from '../pick'

export function omitUndefined<T>(obj: T): NoUndefinedFields<T> {
    return pickBy(obj, ([, v]) => v !== undefined) as unknown as NoUndefinedFields<T>
}

export function omitBy<T, Predicate extends ([key, value]: [key: keyof T, value: T[keyof T]]) => boolean>(
    obj: T,
    predicate: Predicate
): Partial<T> {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => !predicate([k as keyof T, v]))) as unknown as Partial<T>
}

export function omit<T, K extends keyof T>(obj: T, keys: readonly K[]): SimplifyOnce<Omit<T, K>> {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k as K))) as SimplifyOnce<Omit<T, K>>
}
