import { isNothing } from '../../guard/index.js'
import { isJust } from '../../guard/is-just/index.js'
import { isLeft } from '../../guard/is-left/index.js'
import { isRight } from '../../guard/is-right/index.js'
import type { Either, Left, Right } from '../../type/either/index.js'
import type { Just, Maybe } from '../../type/maybe/index.js'
import { Nothing } from '../../type/maybe/index.js'

/**
 * If the input is a Left, return the Left's value wrapped in a Just, otherwise return Nothing.
 *
 * ### Example
 * ```ts
 * leftToMaybe({left: "foo"})
 * // => "foo"
 *
 * leftToMaybe({right: "bar"})
 * // => Nothing
 * ```
 *
 * @param x - The either object to unpack.
 *
 * @returns The unpacked value.
 *
 * @typeParam T - The either type.
 *
 * @group Combinators
 */
export function leftToMaybe<T extends Either<unknown, unknown>>(x: T): T extends Left<infer L> ? Maybe<L> : Nothing {
    return (isLeft(x) ? x.left : Nothing) as T extends Left<infer L> ? Maybe<L> : Nothing
}

/**
 * If the input is a Right, return the Right's value wrapped in a Just, otherwise return Nothing.
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
 * @param x - The either object to unpack.
 *
 * @returns The unpacked value.
 *
 * @typeParam T - The either type.
 *
 * @group Combinators
 */
export function rightToMaybe<T extends Either<unknown, unknown>>(x: T): T extends Right<infer R> ? Maybe<R> : Nothing {
    return (isRight(x) ? x.right : Nothing) as T extends Right<infer R> ? Maybe<R> : Nothing
}

/**
 * Takes the Maybe value, and returns a Right if Just. Otherwise give a Left with the given default value.
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
 * @param x - The Maybe value to unpack if Right.
 * @param left - The default Left value.
 *
 * @returns The Just value as Right, otherwise the given Left.
 *
 * @typeParam T - The Maybe type.
 * @typeParam L - The Left type.
 *
 * @group Combinators
 */
export function maybeToRight<L, T>(x: T, left: L): Either<L, Just<T>> {
    return isJust(x) ? { right: x as never } : { left }
}

/**
 * Takes the Maybe value, and returns a Left if Just. Otherwise give a Right with the given default value.
 *
 * ### Example
 * ```ts
 * maybeToLeft("foo", "foobar")
 * // => {left: "foo"}
 *
 * maybeToLeft(Nothing, "foobar")
 * // => {right: "foobar"}
 * ```
 *
 * @param x - The Maybe value to unpack if Left.
 * @param right - The default Right value.
 *
 * @returns The Just value as Left, otherwise the given Right.
 *
 * @typeParam T - The Maybe type.
 * @typeParam R - The Right type.
 *
 * @group Combinators
 */
export function maybeToLeft<T, R>(x: T, right: R): Either<Just<T>, R> {
    return isJust(x) ? { left: x as never } : { right }
}

/**
 * If the input is a Just, return the value inside the Just, otherwise return undefined.
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
 * @param x - The Maybe value to unpack if Left.
 * @param right - The default Right value.
 *
 * @returns The Just value, otherwise `undefined`.
 *
 * @typeParam T - The Maybe type.
 *
 * @group Combinators
 */
export function maybeAsValue<T>(x: T): Just<T> | undefined {
    return isJust(x) ? x : undefined
}

/**
 * If the given value is a Just, then apply the given function to the value inside the Just, otherwise
 * return Nothing.
 *
 * ### Example
 * ```ts
 * whenJust(0, (x) => `${x}${x}`)
 * // => "00"
 *
 * whenJust(Nothing, (x) => `${x}${x}`)
 * // => Nothing
 * ```
 *
 * @param x - The Maybe value to map.
 * @param f - The map function.
 * @returns The mapped value if Just.
 *
 * @typeParam T - The maybe type.
 * @typeParam M - The mapped type.
 *
 * @group Combinators
 */
export function whenJust<T, M = T>(x: Maybe<T>, f: (x: Just<T>) => M): Maybe<M> {
    return isJust(x) ? f(x) : Nothing
}

export type ArgJusts<Xs> = Xs extends [infer X, ...infer Rest]
    ? [X extends infer J ? Just<J> : never, ...ArgJusts<Rest>]
    : Xs extends []
    ? []
    : Xs extends (infer I)[]
    ? (I extends infer J ? Just<J> : never)[]
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
export function whenJusts<Xs extends any[], M>(xs: readonly [...Xs], f: (x: ArgJusts<Xs>) => M): Maybe<M> {
    const n = xs.find((x) => !isJust(x))
    if (n !== undefined) {
        return Nothing
    }
    return f(xs as unknown as ArgJusts<Xs>)
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
export function whenNothing<T, M = T>(x: Maybe<T>, f: () => M): M | T {
    return isNothing(x) ? f() : x
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
export function just<T extends Just<unknown>>(x: T): T {
    return x
}
