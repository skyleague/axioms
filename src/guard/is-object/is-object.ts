import type { Dict } from '../../type'

export function isObject(obj: unknown): obj is Dict<unknown> {
    return obj !== undefined && obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
