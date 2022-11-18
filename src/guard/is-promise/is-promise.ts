export function isPromise<T>(obj: Promise<T> | unknown): obj is Promise<T> {
    return (
        obj !== undefined &&
        obj !== null &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof (obj as { then: unknown }).then === 'function'
    )
}
