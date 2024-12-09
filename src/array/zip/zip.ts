type ZipItem<Arr> = Arr extends Generator<infer G> ? G : Arr extends (infer I)[] ? I : never
type Zip<T> = { [K in keyof T]: ZipItem<T[K]> }
type Unzip<T> = {
    [K in keyof T]: readonly T[K][]
}

/**
 * Take the {@link Iterable}s and return a {@link Iterable} of tuples.
 *
 * The function evaluates the {@link Iterable}s and converts them into arrays.
 *
 * ### Example
 * ```ts
 * collect(zip([1, 2, 3], [1, 2, 3]))
 * // => [[1, 1], [2, 2], [3, 3]]
 * ```
 */
export function* zip<T extends readonly [...Iterable<unknown>[]]>(...xs: [...T]): IteratorObject<Zip<T>> {
    if (xs.length === 0) {
        return
    }
    const traversers = xs.map((x) => Iterator.from(x))
    for (let vals = traversers.map((x) => x.next()); vals.every((x) => !x.done); vals = traversers.map((x) => x.next())) {
        yield vals.map((x) => x.value) as unknown as Zip<T>
    }
    return
}

/**
 * @deprecated
 */
export function* zipWith<T extends readonly [...unknown[]], R>(f: (...args: [...T]) => R, ...xs: Unzip<[...T]>) {
    if (xs.length === 0) {
        return
    }
    const traversers = xs.map((x) => Iterator.from(x))
    for (let vals = traversers.map((x) => x.next()); vals.every((x) => !x.done); vals = traversers.map((x) => x.next())) {
        yield f(...(vals.map((x) => x.value) as [...T]))
    }
    return
}
