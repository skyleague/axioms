import type { Dict } from '../../type'

export function isPrimitive(obj: unknown): obj is Dict<unknown>
export function isPrimitive(obj: PropertyKey | boolean | unknown): obj is PropertyKey | boolean
export function isPrimitive(obj: PropertyKey | boolean | unknown): obj is PropertyKey | boolean {
    const type = typeof obj
    return obj === undefined || obj === null || type === 'string' || type === 'boolean' || type === 'number' || type === 'symbol'
}
