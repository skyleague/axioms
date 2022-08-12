import { isArray, isObject } from '../../guard'
import type { Dict } from '../../type'

export function cloneDeep<Arr extends unknown[]>(arr: Arr): Arr
export function cloneDeep<T extends Dict>(obj: T): T
export function cloneDeep<V>(value: V): V
export function cloneDeep(obj: unknown): unknown {
    if (isArray(obj)) {
        return obj.map((x) => cloneDeep(x))
    } else if (isObject(obj)) {
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, cloneDeep(v)]))
    } else {
        return obj
    }
}
