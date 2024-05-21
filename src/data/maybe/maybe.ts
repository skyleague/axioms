import { isNothing } from '../../guard/index.js'
import { isJust } from '../../guard/is-just/index.js'
import { isLeft } from '../../guard/is-left/index.js'
import { isRight } from '../../guard/is-right/index.js'
import type { Either, Left, Right } from '../../type/either/index.js'
import type { Just, Maybe } from '../../type/maybe/index.js'
import { Nothing } from '../../type/maybe/index.js'
import type { IsEqual } from '../../types.js'

/**
 * Converts a `Left` type from an `Either` into a `Maybe`. If the input is a `Left`, the value is returned as a `Just`.
 * Otherwise, if the input is a `Right`, `Nothing` is returned.
 *
 * ### Example
 * ```ts
 * leftToMaybe({left: "error"})
 * // => "error"
 *
 * leftToMaybe({right: 42})
 * // => Nothing
 * ```
 *
 * @param x - The `Either` value to be converted.
 * @returns A `Maybe` wrapping the left value, or `Nothing`.
 * @typeParam T - The type of the `Either` value.
 * @group Combinators
 */
export function leftToMaybe<const T extends Either<unknown, unknown>>(
    x: T,
): T extends Left<infer L> ? (T extends Right<unknown> ? Maybe<L> : L) : Nothing {
    return (isLeft(x) ? x.left : Nothing) as T extends Left<infer L> ? (T extends Right<unknown> ? Maybe<L> : L) : Nothing
}

/**
 * Converts a Right value from an Either type to a Just type, or returns Nothing if the value is Left.
 *
 * ### Example
 * ```ts
 * rightToMaybe({right: "foo"})
 * // => "foo"
 *
 * rightToMaybe({left: "bar"})
 * // => Nothing
 * ```
 *
 * @param x - The Either object to examine. This function checks if it is a Right and extracts its value.
 * @returns A Maybe type, wrapping the Right value if present; otherwise, Nothing.
 * @typeParam T - The type of the Either. It determines the type encapsulated if Right.
 * @group Combinators
 */
export function rightToMaybe<const T extends Either<unknown, unknown>>(
    x: T,
): T extends Right<infer R> ? (T extends Left<unknown> ? Maybe<R> : R) : Nothing {
    return (isRight(x) ? x.right : Nothing) as T extends Right<infer R> ? (T extends Left<unknown> ? Maybe<R> : R) : Nothing
}

/**
 * Converts a Maybe value to an Either type. If the input is a Just, it returns the value as a Right.
 * If the input is Nothing, it returns a specified default value as a Left.
 *
 * ### Example
 * ```ts
 * maybeToRight("foo", "foobar")
 * // => {right: "foo"}
 *
 * maybeToRight(Nothing, "foobar")
 * // => {left: "foobar"}
 * ```
 *
 * @param x - The Maybe value to evaluate.
 * @param left - The default value to use if `x` is Nothing.
 * @returns An Either type, encapsulating the value in a Right if `x` is Just, or the default in a Left if `x` is Nothing.
 * @typeParam T - The type encapsulated in Just, if `x` is Just.
 * @typeParam L - The type of the default value, and of the Left result.
 * @group Combinators
 */
export function maybeToRight<const L, const T>(
    x: T,
    left: L,
): [Nothing] extends [T] ? (IsEqual<T, Nothing> extends true ? Left<L> : Either<L, Just<T>>) : Right<T> {
    return (isJust(x) ? { right: x } : { left }) as [Nothing] extends [T]
        ? IsEqual<T, Nothing> extends true
            ? Left<L>
            : Either<L, Just<T>>
        : Right<T>
}

/**
 * Transforms a Maybe value into an Either type, returning a Left containing the Just value.
 * If the Maybe is Nothing, it returns a Right with a specified default value.
 *
 * ### Example
 * ```ts
 * maybeToLeft("foo", "fallback")
 * // => {left: "foo"}
 *
 * maybeToLeft(Nothing, "fallback")
 * // => {right: "fallback"}
 * ```
 *
 * @param x - The Maybe value to transform. If it is a Just, it is returned as the Left part of an Either.
 * @param right - The default value to use for the Right part if `x` is Nothing.
 * @returns Either a Left containing the Just value or a Right with the default value.
 * @typeParam T - The type held by Just in the Maybe.
 * @typeParam R - The type of the Right value in the returned Either.
 * @group Combinators
 */
export function maybeToLeft<const T, const R>(
    x: T,
    right: R,
): [Nothing] extends [T] ? (IsEqual<T, Nothing> extends true ? Right<R> : Either<Just<T>, R>) : Left<T> {
    return (isJust(x) ? { left: x } : { right }) as [Nothing] extends [T]
        ? IsEqual<T, Nothing> extends true
            ? Right<R>
            : Either<Just<T>, R>
        : Left<T>
}

/**
 * This function checks if the provided Maybe value is a Just and returns the contained value.
 * If the value is Nothing, it returns undefined, effectively handling optional values in your code.
 *
 * ### Example
 * ```ts
 * maybeAsValue("foobar")
 * // => "foobar"
 *
 * maybeAsValue(Nothing)
 * // => undefined
 * ```
 *
 * @param x - The Maybe value to extract the value from.
 * @returns The value contained within Just, or undefined if the input is Nothing.
 * @typeParam T - The type of the value encapsulated by Just.
 * @group Combinators
 */
export function maybeAsValue<const T extends Maybe<unknown>>(
    x: T,
): [Nothing] extends [T] ? (IsEqual<T, Nothing> extends true ? undefined : Just<T> | undefined) : Just<T> {
    return (isJust(x) ? x : undefined) as [Nothing] extends [T]
        ? IsEqual<T, Nothing> extends true
            ? undefined
            : Just<T> | undefined
        : Just<T>
}

/**
 * Applies a transformation function to the value inside a Just, or returns Nothing if the value is Nothing.
 * This function is used to manipulate the data within a Just, allowing for operations like transformations or computations,
 * while safely handling cases where there is no value (i.e., Nothing).
 *
 * ### Example
 * ```ts
 * whenJust(5, x => x * 2)
 * // => 10
 *
 * whenJust(Nothing, (x) => `${x}${x}`)
 * // => Nothing
 * ```
 *
 * @param x - The Maybe value to process. It can be a Just containing a value or Nothing.
 * @param f - A function to apply to the value inside the Just.
 * @returns If x is a Just, returns a new Just containing the result of applying f to the original value. If x is Nothing, returns Nothing.
 * @typeParam T - The type of the value inside the Just.
 * @typeParam M - The type of the value returned by function f, wrapped in a Just.
 * @group Combinators
 */
export function whenJust<const T extends Maybe<unknown>, const M extends Maybe<unknown> = T>(
    x: T,
    f: (x: Just<T>) => M,
): [Nothing] extends [T] ? (IsEqual<T, Nothing> extends true ? T : Maybe<M>) : M {
    return (isJust(x) ? f(x) : Nothing) as [Nothing] extends [T] ? (IsEqual<T, Nothing> extends true ? T : Maybe<M>) : M
}

export type ArgJust<Xs> = Xs extends [infer X, ...infer Rest]
    ? [IsEqual<X, Nothing> extends true ? never : Just<X>, ...ArgJust<Rest>]
    : Xs extends []
      ? []
      : Xs extends (infer I)[]
        ? (IsEqual<I, Nothing> extends true ? never : Just<I>)[]
        : []

/**
 * `whenJusts` takes a tuple of `Maybe`s and a function that takes the values of the `Just`s and
 * returns a `Maybe` of the result of the function.
 *
 * ### Example
 * ```ts
 * whenJusts([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
 * // => "foobar"
 *
 * whenJusts([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
 * // => { left: "bar" }
 * ```
 *
 * @param xs - The maybe values.
 * @param f - The map function.
 * @returns The mapped value if just.
 *
 * @typeParam Xs - The maybe types.
 * @typeParam M - The mapped type.
 *
 * @group Combinators
 */
export function whenJusts<const Xs extends unknown[], const M extends Maybe<unknown>>(
    xs: readonly [...Xs],
    f: (x: ArgJust<Xs>) => M,
): ArgJust<Xs> extends never[] ? Nothing : [Nothing] extends [Xs[number]] ? Nothing | M : M {
    const allJust = xs.every((x) => isJust(x))
    if (!allJust) {
        return Nothing as ArgJust<Xs> extends never[] ? Nothing : [Nothing] extends [Xs[number]] ? Nothing | M : M
    }
    return f(xs as unknown as ArgJust<Xs>) as ArgJust<Xs> extends never[]
        ? Nothing
        : [Nothing] extends [Xs[number]]
          ? Nothing | M
          : M
}

/**
 * If the given Maybe is a Nothing, then return the result of the given function, otherwise return the
 * given Maybe.
 *
 * ### Example
 * ```ts
 * whenNothing(Nothing, () => `foobar`)
 * // => "foobar"
 *
 * whenNothing(0, () => `foobar`)
 * // => 0
 * ```
 *
 * @param x - The Maybe value to map.
 * @param f - The map function.
 * @returns The mapped value if Nothing.
 *
 * @typeParam T - The maybe type.
 * @typeParam M - The mapped type.
 *
 * @group Combinators
 */
export function whenNothing<const T extends Maybe<unknown>, const M extends Maybe<unknown> = T>(
    x: T,
    f: () => M,
): [Nothing] extends [T] ? (IsEqual<T, Nothing> extends true ? M : M | T) : T {
    return (isNothing(x) ? f() : x) as [Nothing] extends [T] ? (IsEqual<T, Nothing> extends true ? M : M | T) : T
}

/**
 * If all the given Maybe values are Nothings, then return the result of the given function, otherwise return the
 * first Just value.
 *
 * ### Example
 * ```ts
 * whenNothings([Nothing, Nothing], () => `foobar`)
 * // => "foobar"
 *
 * whenNothings([Nothing, 0], () => `foobar`)
 * // => Nothing
 * ```
 *
 * @param xs - The Maybe values to map.
 * @param f - The map function.
 * @returns The mapped value if all are Nothing.
 *
 * @typeParam Xs - The maybe types.
 * @typeParam M - The mapped type.
 *
 * @group Combinators
 */
export function whenNothings<const Xs extends unknown[], const M extends Maybe<unknown>>(
    xs: readonly [...Xs],
    f: () => M,
): ArgJust<Xs> extends never[] ? M : [Nothing] extends [Xs[number]] ? Nothing | M : Nothing {
    const allNothing = xs.every(isNothing)
    if (!allNothing) {
        return Nothing as ArgJust<Xs> extends never[] ? M : [Nothing] extends [Xs[number]] ? Nothing | M : Nothing
    }
    return f() as ArgJust<Xs> extends never[] ? M : [Nothing] extends [Xs[number]] ? Nothing | M : Nothing
}

/**
 * Creates a Just from the given value.
 *
 * ### Example
 * ```ts
 * just("foobar")
 * // => "foobar"
 * ```
 *
 * @param x - The either object to unpack.
 *
 * @returns The just value.
 *
 * @typeParam T - The Just type.
 *
 * @group Combinators
 */
export function just<const T extends Just<unknown>>(x: T): T {
    return x
}

/**
 * Creates a Maybe from the given value.
 *
 * ### Example
 * ```ts
 * asMaybe("foobar")
 * // => "foobar"
 *
 * asMaybe("foobar", "foobar")
 * // => Nothing
 *
 * asMaybe("foobar", "barfoo")
 * // => "foobar"
 * ```
 *
 * @param x - The value to unpack.
 * @param nothingValue - The value to use as Nothing.
 * @returns The maybe value.
 *
 * @typeParam T - The Maybe type.
 *
 * @group Combinators
 */
export function asMaybe<const T, const N = undefined>(
    x: T,
    nothingValue?: N,
): [N] extends [T] ? (IsEqual<T, N> extends true ? Nothing : Maybe<Exclude<T, N>>) : Exclude<T, N> {
    return (x !== nothingValue ? x : Nothing) as [N] extends [T]
        ? IsEqual<T, N> extends true
            ? Nothing
            : Maybe<Exclude<T, N>>
        : Exclude<T, N>
}
