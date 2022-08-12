import { isNothing } from '../../guard'
import { isJust } from '../../guard/is-just'
import { isLeft } from '../../guard/is-left'
import { isRight } from '../../guard/is-right'
import type { Either, Left, Right } from '../../type/either'
import type { Maybe } from '../../type/maybe'
import { Nothing } from '../../type/maybe'

export function leftToMaybe<T extends Either<any, any>>(x: T): Maybe<T extends Left<infer L> ? L : never> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isLeft(x) ? x.left : Nothing
}

export function rightToMaybe<T extends Either<any, any>>(x: T): Maybe<T extends Right<infer R> ? R : never> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isRight(x) ? x.right : Nothing
}

export function maybeToRight<L, X>(x: X, left: L): Either<L, Exclude<X, Nothing>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return isJust(x) ? { right: x as any } : { left }
}

export function maybeToLeft<X, R>(x: X, right: R): Either<Exclude<X, Nothing>, R> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return isJust(x) ? { left: x as any } : { right }
}

export function maybeAsValue<X>(x: X): Exclude<X, Nothing> | undefined {
    return isJust(x) ? x : undefined
}

export function whenJust<X, M>(x: Maybe<X>, f: (x: Exclude<X, Nothing>) => M): Maybe<M> {
    return isJust(x) ? f(x) : Nothing
}

export type ArgJusts<Xs> = Xs extends [infer X, ...infer Rest]
    ? [X extends infer J ? Exclude<J, Nothing> : never, ...ArgJusts<Rest>]
    : Xs extends []
    ? []
    : Xs extends Array<infer I>
    ? Array<I extends infer J ? Exclude<J, Nothing> : never>
    : []
export function whenJusts<Xs extends any[], M>(xs: readonly [...Xs], f: (...x: ArgJusts<Xs>) => M): Maybe<M> {
    const n = xs.find((x) => !isJust(x))
    if (n !== undefined) {
        return Nothing
    }
    return f(...(xs as unknown as ArgJusts<Xs>))
}

export function whenNothing<X, M>(x: Maybe<X>, f: () => M): M | X {
    return isNothing(x) ? f() : x
}
