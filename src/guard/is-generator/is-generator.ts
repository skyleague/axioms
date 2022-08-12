export function isGeneratorFunction<T, R, A extends unknown[] | unknown = unknown>(
    fn: unknown | (A extends unknown[] ? (...args: [...A]) => Generator<T, R> : () => Generator<T, R>)
): fn is () => Generator<T, R, A> {
    return (
        fn !== undefined &&
        fn !== null &&
        typeof fn === 'function' &&
        fn.constructor !== null &&
        fn.constructor.name === 'GeneratorFunction'
    )
}

export function isGenerator<T, R = T>(gen: Generator<T, R> | unknown): gen is Generator<T, R> {
    return gen !== undefined && gen !== null && typeof (gen as Generator<T, R>).next === 'function'
}
