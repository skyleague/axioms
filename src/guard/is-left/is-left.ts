import type { Either, Left } from '../../type/either'

export function isLeft<L, R>(x: Either<L, R> | unknown): x is Left<L> {
    return x !== null && x !== undefined && typeof x === 'object' && 'left' in x
}
