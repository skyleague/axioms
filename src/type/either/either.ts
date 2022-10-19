export type Left<L> = { left: L }
export type Right<R> = { right: R }

/**
 *
 *
 * @group Either
 */
export type Either<L, R> = Left<L> | Right<R>
