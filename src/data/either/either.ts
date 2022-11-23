import { isLeft, isRight } from '../../guard'
import type { Left, Right, Either } from '../../type'

/**
 * If the Either is a Left, return the Left value, otherwise return the Right value.
 *
 * ### Example
 * ```ts
 * eitherAsValue({left: "foo"})
 * // => "foo"
 *
 * eitherAsValue({right: "bar"})
 * // => "bar"
 * ```
 *
 * @param x - The either value to unpack.
 *
 * @returns The unpacked value.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 *
 * @group Combinators
 */
export function eitherAsValue<L>(x: Left<L>): L
export function eitherAsValue<R>(x: Right<R>): R
export function eitherAsValue<L, R>(x: Either<L, R>): L | R
export function eitherAsValue<L, R>(x: Either<L, R>): L | R {
    return 'left' in x ? x.left : x.right
}

export type ArgRights<Xs> = Xs extends [infer X, ...infer Rest]
    ? [X extends Right<infer R> ? R : never, ...ArgRights<Rest>]
    : Xs extends []
    ? []
    : Xs extends Array<infer I>
    ? Array<I extends Right<infer R> ? R : never>
    : []
export type ArgLefts<Xs> = Xs extends [infer X, ...infer Rest]
    ? [X extends Left<infer L> ? L : never, ...ArgLefts<Rest>]
    : Xs extends []
    ? []
    : Xs extends Array<infer I>
    ? Array<I extends Left<infer L> ? L : never>
    : []

/**
 * If the input is a left, return it, otherwise apply the function to the right value and return the
 * result.
 *
 * ### Example
 * ```ts
 * mapRight({ right: 'bar' }, (x) => `${x}${x}`)
 * // => { right: "barbar" }
 *
 * mapRight({ left: 'bar' }, (x) => `${x}${x}`)
 * // => { left: "bar" }
 * ```
 *
 * @param x - The either value to map.
 * @param f - The map function.
 * @returns The mapped either object.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 * @typeParam T - The mapped type.
 *
 * @group Combinators
 */
export function mapRight<L, R, T>(x: Either<L, R>, f: (r: R) => T): Either<L, T> {
    if (isLeft(x)) {
        return x
    }
    return { right: f(x.right) }
}

/**
 * `mapRights` takes a tuple of `Either`s and a function that takes the right values of the `Either`s
 * and returns a new `Either` that is either the left value of the first `Either` in the tuple or the
 * result of the function
 *
 * ### Example
 * ```ts
 * mapRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
 * // => { right: "foobar" }
 *
 * mapRights([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
 * // => { left: "bar" }
 * ```
 *
 * @param xs - The either values to map.
 * @param f - The map function.
 * @returns The mapped either object.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 * @typeParam T - The mapped type.
 *
 * @group Combinators
 */
export function mapRights<Xs extends Either<any, any>[], T>(
    xs: readonly [...Xs],
    f: (rs: ArgRights<Xs>) => T
): Either<ArgLefts<Xs>[number], T> {
    return whenRights(xs, (...args) => ({ right: f(...args) }))
}

/**
 * If the given Either is a Left, return it, otherwise apply the given function to the Right value and
 * return the result.
 *
 * ### Example
 * ```ts
 * whenRight({ right: 'foo' }, (x) => `${x}${x}`)
 * // => "foofoo"
 *
 * whenRight({ left: 'bar' }, (x) => `${x}${x}`)
 * // => { left: "bar" }
 * ```
 *
 * @param x - The either value to map.
 * @param f - The map function.
 * @returns The mapped value if right.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 * @typeParam T - The mapped type.
 *
 * @group Combinators
 */
export function whenRight<L, R, T>(x: Either<L, R>, f: (r: R) => T): Left<L> | T {
    if (isLeft(x)) {
        return x
    }
    return f(x.right)
}

/**
 * `whenRights` takes an array of `Either`s and a function that takes the `right`s of the `Either`s as
 * arguments and returns a `Left` if any of the `Either`s are `Left`s or the result of the function if
 * all of the `Either`s are `Right`s.
 *
 * ### Example
 * ```ts
 * whenRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
 * // => "foobar"
 *
 * whenRights([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
 * // => { left: "bar" }
 * ```
 *
 * @param xs - The either values.
 * @param f - The map function.
 * @returns The mapped value if right.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 * @typeParam T - The mapped type.
 *
 * @group Combinators
 */
export function whenRights<Xs extends Either<any, any>[], T>(
    xs: readonly [...Xs],
    f: (rs: ArgRights<Xs>) => T
): Left<ArgLefts<Xs>[number]> | T {
    const l = xs.find((x) => !isRight(x))
    if (l !== undefined) {
        return l as Left<ArgLefts<Xs>[number]>
    }
    return f(xs.map((x) => (x as Right<unknown>).right) as ArgRights<Xs>)
}

/**
 * If the given Either is a Right, return it, otherwise return a new Left with the result of applying
 * the given function to the Left value.
 *
 * ### Example
 * ```ts
 * mapLeft({ left: 'bar' }, (x) => `${x}${x}`)
 * // => { left: "barbar" }
 *
 * mapLeft({ right: 'bar' }, (x) => `${x}${x}`)
 * // => { right: "bar" }
 * ```
 *
 * @param x - The either value to map.
 * @param f - The map function.
 * @returns The mapped either object.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 * @typeParam T - The mapped type.
 *
 * @group Combinators
 */
export function mapLeft<L, R, T>(x: Either<L, R>, f: (r: L) => T): Either<T, R> {
    if (isRight(x)) {
        return x
    }
    return { left: f(x.left) }
}

/**
 * `mapLefts` takes a tuple of `Either`s and a function that takes the left values of the `Either`s and
 * returns a new `Either` with the left value being the result of the function and the right value
 * being the right value of the first `Either` in the tuple.
 *
 * ### Example
 * ```ts
 * mapLefts([{ left: 'foo' }, { left: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
 * // => { left: "foobar" }
 *
 * mapLefts([{ right: 'bar' }, { left: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
 * // => { right: "bar" }
 * ```
 *
 * @param xs - The either values to map.
 * @param f - The map function.
 * @returns The mapped either object.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 * @typeParam T - The mapped type.
 *
 * @group Combinators
 */
export function mapLefts<Xs extends Either<any, any>[], T>(
    xs: readonly [...Xs],
    f: (ls: ArgLefts<Xs>) => T
): Either<T, ArgRights<Xs>[number]> {
    return whenLefts(xs, (args) => ({ left: f(args) }))
}

/**
 * If the given Either is a Left, apply the given function to the Left value and return the result.
 * Otherwise, return the given Either.
 *
 * ### Example
 * ```ts
 * whenLeft({ left: 'foo' }, (x) => `${x}${x}`)
 * // => "foofoo"
 *
 * whenLeft({ right: 'bar' }, (x) => `${x}${x}`)
 * // => { right: "bar" }
 * ```
 *
 * @param x - The either value to map.
 * @param f - The map function.
 * @returns The mapped value if right.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 * @typeParam T - The mapped type.
 *
 * @group Combinators
 */
export function whenLeft<L, R, T>(x: Either<L, R>, f: (r: L) => T): Right<R> | T {
    if (isRight(x)) {
        return x
    }
    return f(x.left)
}

/**
 * `whenLefts` takes an array of `Either`s and a function that takes the left values of the `Either`s
 * and returns a value. If any of the `Either`s are `Right`s, then the first `Right` is returned.
 * Otherwise, the function is called with the left values and its return value is returned.
 *
 * ### Example
 * ```ts
 * whenLefts([{ left: 'foo' }, { left: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
 * // => "foobar"
 *
 * whenLefts([{ right: 'bar' }, { left: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
 * // => { right: "bar" }
 * ```
 *
 * @param xs - The either values.
 * @param f - The map function.
 * @returns The mapped value if right.
 *
 * @typeParam L - The left type.
 * @typeParam R - The right type.
 * @typeParam T - The mapped type.
 *
 * @group Combinators
 */
export function whenLefts<Xs extends Either<any, any>[], T>(
    xs: readonly [...Xs],
    f: (rs: ArgLefts<Xs>) => T
): Right<ArgRights<Xs>[number]> | T {
    const l = xs.find((x) => !isLeft(x))
    if (l !== undefined) {
        return l as Right<ArgRights<Xs>[number]>
    }
    return f(xs.map((x) => (x as Left<unknown>).left) as ArgLefts<Xs>)
}

/**
 * If the input is a Left, return a Right with the same value, otherwise return a Left with the same
 * value.
 *
 * ### Example
 * ```ts
 * swapEither({left: "foobar"})
 * // => {right: "foobar"}
 *
 * swapEither({right: "foobar"})
 * // => {left: "foobar"}
 * ```
 *
 * @typeParam L - The {@link Left} type.
 * @typeParam R - The {@link Right} type.
 *
 * @group Combinators
 */
export function swapEither<L, R>(x: Either<L, R>): Either<R, L> {
    return isLeft(x) ? { right: x.left } : { left: x.right }
}

/**
 * Returns {@link x.right} when `x` is a {@link Right} type, otherwise
 * throw {@link x.left}.
 *
 * ### Pseudocode
 * ```ts
 * if (isLeft(x)) {
 *     throw x.left
 * }
 * return x.right
 * ```
 *
 * ### Example
 * ```ts
 * eitherToError({ right: 'foo' })
 * // => 'foo'
 *
 * eitherToError({ left: new MyError('my-message') })
 * // => throw new MyError('my-message')
 * ```
 *
 * @param x - The {@link Either} type.
 *
 * @returns {@link x.right} when the {@link Either} is {@link Right}.
 * @throws  {@link x.left} when the {@link Either} is {@link Left}.
 *
 * @typeParam L - The {@link Left} type.
 * @typeParam R - The {@link Right} type.
 *
 * @group Combinators
 *
 * @see [Factorial - Wikipedia](https://en.wikipedia.org/wiki/Factorial)
 */
export function eitherToError<L, R>(x: Either<L, R>): R {
    if (isLeft(x)) {
        throw x.left
    }
    return x.right
}

/**
 * Creates a {@link Right} from the given input.
 *
 * ### Example
 * ```ts
 * right("foobar")
 * // => {right: "foobar"}
 * ```
 *
 * @typeParam R - The {@link Right} type.
 *
 * @group Combinators
 */
export function right<R>(x: R): Right<R> {
    return { right: x }
}

/**
 * Creates a {@link Right} from the given input.
 *
 * ### Example
 * ```ts
 * right("foobar")
 * // => {right: "foobar"}
 * ```
 *
 * @typeParam L - The {@link Left} type.
 *
 * @group Combinators
 */
export function left<L>(x: L): Left<L> {
    return { left: x }
}
