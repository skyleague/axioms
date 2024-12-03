/**
 * A Deferred Promise that can be resolved or rejected elsewhere in the code.
 */
export interface Deferred<T, Err = Error> extends Promise<T> {
    resolve: T extends void ? () => void : (value: T) => void
    reject: (error: Err) => void
}

/**
 * Creates a Deferred Promise that can be resolved or rejected elsewhere in the code.
 *
 * @returns {Deferred}
 * @deprecated Use `Promise.withResolvers()` instead.
 */
export function defer<T, Err = Error>(): Deferred<T, Err> {
    let resolve: T extends void ? () => void : (value: T) => void
    let reject: (error: Err) => void

    const deferred = new Promise<T>((res, rej) => {
        resolve = res as T extends void ? () => void : (value: T) => void
        reject = rej
    }) as Deferred<T, Err>

    // biome-ignore lint/style/noNonNullAssertion: we know that `resolve` and `reject` are defined
    deferred.resolve = resolve!
    // biome-ignore lint/style/noNonNullAssertion: we know that `resolve` and `reject` are defined
    deferred.reject = reject!

    return deferred
}
