import type { Either, Right } from '../../type/either'

export function isRight<L, R>(x: Either<L, R> | unknown): x is Right<R> {
    return x !== null && x !== undefined && typeof x === 'object' && 'right' in x
}
