export interface InfiniteGenerator<T> {
    next(): IteratorResult<T, T>
    [Symbol.iterator](): InfiniteGenerator<T>
}
