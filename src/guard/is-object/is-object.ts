export function isObject<T = unknown>(obj: unknown): obj is Record<PropertyKey, T> {
    return obj !== undefined && obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
