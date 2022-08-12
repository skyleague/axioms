import type { Mappable, Traversable, Traverser } from '../traversable'

export type AsyncTraverser<T, R = unknown> = AsyncIterator<T, R, void> | Traverser<T, R>
export type AsyncTraversable<T, R = unknown> =
    | Traversable<Promise<T>, R>
    | Traversable<T, R>
    | { [Symbol.asyncIterator](): AsyncIterator<T, R, void> }
export type AsyncMappable<T, R = unknown> =
    | AsyncTraversable<T, R>
    | AsyncTraverser<T, R>
    | Mappable<T, R>
    | (() => AsyncGenerator<T, R, void>)
