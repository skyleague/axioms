export interface Left<L> {
    left: L
}
export interface Right<R> {
    right: R
}

/**
 *
 *
 * @group Either
 */
export type Either<L, R> = Left<L> | Right<R>
