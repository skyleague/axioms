/**
 * @deprecated Has too few use cases and is not a good fit for the type system.
 */
export interface InfiniteGenerator<T> {
    next(): IteratorResult<T, T>
    [Symbol.iterator](): InfiniteGenerator<T>
}
