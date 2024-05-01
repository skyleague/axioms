import { isLeft, isRight } from '../../guard/index.js'
import type { Either, Left, Right } from '../../type/index.js'

/**
 * Extracts and returns the value from an Either type, whether it is a Left or a Right.
 * This function discriminates between Left and Right and returns the contained value directly.
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
 * @param x - The Either value to extract from.
 * @returns The value contained in the Either.
 * @typeParam L - The type of the Left value.
 * @typeParam R - The type of the Right value.
 * @group Combinators
 */
export function eitherAsValue<const E extends Either<unknown, unknown>>(
    x: E,
): E extends Left<infer L> ? (E extends Right<infer R> ? L | R : L) : E extends Right<infer R> ? R : never {
    return ('left' in x ? x.left : x.right) as E extends Left<infer L>
        ? E extends Right<infer R>
            ? L | R
            : L
        : E extends Right<infer R>
          ? R
          : never
}

export type ArgRights<Xs> = Xs extends [infer X, ...infer Rest]
    ? [X extends Right<infer R> ? R : never, ...ArgRights<Rest>]
    : Xs extends []
      ? []
      : Xs extends (infer I)[]
        ? (I extends Right<infer R> ? R : never)[]
        : []

export type ArgLefts<Xs> = Xs extends [infer X, ...infer Rest]
    ? [X extends Left<infer L> ? L : never, ...ArgLefts<Rest>]
    : Xs extends []
      ? []
      : Xs extends (infer I)[]
        ? (I extends Left<infer L> ? L : never)[]
        : []

/**
 * Applies a transformation function to the `Right` value of an `Either` type, if present.
 * If the input is a `Left`, it remains unchanged.
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
 * @param x - The `Either` value to map.
 * @param f - The transformation function to apply to the `Right` value.
 * @returns An `Either` object where the `Right` has been transformed if present, or the original `Left`.
 *
 * @typeParam E - The type of the Either.
 * @typeParam T - The type of the transformed `Right` value.
 *
 * @group Combinators
 */
export function mapRight<const E extends Either<unknown, unknown>, T>(
    x: E,
    f: (r: E extends Right<infer R> ? R : never) => T,
): E extends Right<unknown> ? Right<T> : E {
    if (isLeft(x)) {
        return x as E extends Right<unknown> ? Right<T> : E
    }
    return { right: f(x.right as E extends Right<infer R> ? R : never) } as E extends Right<unknown> ? Right<T> : E
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
export function mapRights<const Xs extends Either<unknown, unknown>[], const T>(
    xs: readonly [...Xs],
    f: (rs: ArgRights<Xs>) => T,
): ArgRights<Xs> extends never[]
    ? Left<ArgLefts<Xs>[number]>
    : ArgLefts<Xs>[number] extends never[]
      ? Right<T>
      : Left<ArgLefts<Xs>[number]> | Right<T> {
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
export function whenRight<const E extends Either<unknown, unknown>, T extends Either<unknown, unknown>>(
    x: E,
    f: (r: E extends Right<infer R> ? R : never) => T,
): E extends Right<unknown> ? T : E {
    if (isLeft(x)) {
        return x as E extends Right<unknown> ? T : E
    }
    return f(x.right as E extends Right<infer R> ? R : never) as E extends Right<unknown> ? T : E
}

/**
 * `whenRights` takes an array of `Either`s and a function that takes the `right`s of the `Either`s as
 * arguments and returns a `Left` if any of the `Either`s are `Left`s or the result of the function if
 * all of the `Either`s are `Right`s.
 *
 * ### Example
 * ```ts
 * whenRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => ({right: `${x0}${x1}`}))
 * // => { right: "foobar"}
 *
 * whenRights([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => ({right: `${x0}${x1}`}))
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
export function whenRights<const Xs extends Either<unknown, unknown>[], T extends Either<unknown, unknown>>(
    xs: readonly [...Xs],
    f: (rs: ArgRights<Xs>) => T,
): ArgRights<Xs> extends never[]
    ? Left<ArgLefts<Xs>[number]>
    : ArgLefts<Xs>[number] extends never[]
      ? T
      : Left<ArgLefts<Xs>[number]> | T {
    const l = xs.find((x) => !isRight(x))
    if (l !== undefined) {
        return l as Left<ArgLefts<Xs>[number]>
    }
    return f(xs.map((x) => (x as Right<unknown>).right) as ArgRights<Xs>) as ArgRights<Xs> extends never[]
        ? Left<ArgLefts<Xs>[number]>
        : ArgLefts<Xs>[number] extends never[]
          ? T
          : Left<ArgLefts<Xs>[number]> | T
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
export function mapLeft<const E extends Either<unknown, unknown>, T>(
    x: E,
    f: (l: E extends Left<infer L> ? L : never) => T,
): E extends Left<unknown> ? Left<T> : E {
    if (isRight(x)) {
        return x as E extends Left<unknown> ? Left<T> : E
    }
    return { left: f(x.left as E extends Left<infer L> ? L : never) } as E extends Left<unknown> ? Left<T> : E
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
export function mapLefts<const Xs extends Either<unknown, unknown>[], const T>(
    xs: readonly [...Xs],
    f: (ls: ArgLefts<Xs>) => T,
): ArgLefts<Xs> extends never[]
    ? Right<ArgRights<Xs>[number]>
    : ArgRights<Xs>[number] extends never[]
      ? Left<T>
      : Left<T> | Right<ArgRights<Xs>[number]> {
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

export function whenLeft<const E extends Either<unknown, unknown>, T extends Either<unknown, unknown>>(
    x: E,
    f: (l: E extends Left<infer L> ? L : never) => T,
): E extends Left<unknown> ? T : E {
    if (isRight(x)) {
        return x as E extends Left<unknown> ? T : E
    }
    return f(x.left as E extends Left<infer L> ? L : never) as E extends Left<unknown> ? T : E
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
export function whenLefts<const Xs extends Either<unknown, unknown>[], T>(
    xs: readonly [...Xs],
    f: (rs: ArgLefts<Xs>) => T,
): ArgLefts<Xs> extends never[]
    ? Right<ArgRights<Xs>[number]>
    : ArgRights<Xs>[number] extends never[]
      ? T
      : Right<ArgRights<Xs>[number]> | T {
    const l = xs.find((x) => !isLeft(x))
    if (l !== undefined) {
        return l as Right<ArgRights<Xs>[number]>
    }
    return f(xs.map((x) => (x as Left<unknown>).left) as ArgLefts<Xs>) as ArgLefts<Xs> extends never[]
        ? Right<ArgRights<Xs>[number]>
        : ArgRights<Xs>[number] extends never[]
          ? T
          : Right<ArgRights<Xs>[number]> | T
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
 * Returns {@link right} when `x` is a {@link Right} type, otherwise
 * throw {@link left}.
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
export function eitherToError<const E extends Either<unknown, unknown>>(
    x: E,
): E extends Right<infer R> ? (E extends Left<unknown> ? R : R) : never {
    if (isLeft(x)) {
        throw x.left
    }
    return x.right as E extends Right<infer R> ? (E extends Left<unknown> ? R : R) : never
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
export function right<const R>(x: R): Right<R> {
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
export function left<const L>(x: L): Left<L> {
    return { left: x }
}
