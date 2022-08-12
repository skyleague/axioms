import type { InfiniteGenerator, Right, Traverser, Either } from '../../type'

export function next<T>(g: InfiniteGenerator<T>): Right<T>
export function next<T, R = unknown>(g: Generator<T, R> | Traverser<T, R>): Either<R, T>
export function next<T, R = unknown>(g: Generator<T, R> | Traverser<T, R>): Either<R, T> {
    const it = g.next()
    return it.done === true ? { left: it.value } : { right: it.value }
}
