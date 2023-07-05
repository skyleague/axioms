import type { Dict } from '../../type/index.js'

export function isObject<T = unknown>(obj: unknown): obj is Dict<T> {
    return obj !== undefined && obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
