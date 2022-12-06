import { evaluate } from '../../function'
import { isFailure } from '../../guard/is-failure'
import { isPromise } from '../../guard/is-promise'
import { isRight } from '../../guard/is-right'
import { isSuccess } from '../../guard/is-success'
import type { AsyncConstExpr, Either, Success, Try } from '../../type'
import { Nothing } from '../../type'
import type { Failure } from '../../type/try/try'

/**
 * @internal
 */
export type AsTry<T extends AsyncConstExpr> = T extends () => infer V
    ? V extends Promise<Try<infer _P>>
        ? Promise<Try<_P>>
        : V extends Try<infer _V>
        ? Try<_V>
        : Try<V>
    : T extends Promise<Try<infer V>>
    ? Promise<Try<V>>
    : Try<T>

/**
 * Converts the value to a `Failure`. The function as as an identity function on a failure.
 *
 * ### Example
 * ```ts
 * failure("foobar")
 * // => Error("foobar")
 *
 * failure(new Error("foobar"))
 * // => Error("foobar")
 * ```
 *
 * @param f - The value to create a Failure from.
 *
 * @returns The unpacked value.
 *
 * @typeParam T - The value type.
 *
 * @group Combinators
 */
export function failure<T>(f: T): Failure {
    if (isFailure(f)) {
        return f
    }
    // we didn't get an error object, wrap it with a cause attached
    const err = new Error()
    Error.captureStackTrace(err, failure)
    err.cause = f
    return err
}

/**
 * Take an expression and evaluate it. When the expression throws it will be converted to
 * a `Try` `Failure`.
 *
 * ### Example
 * ```ts
 * asTry("foobar")
 * // => "foobar"
 *
 * asTry(() => "foobar")
 * // => "foobar"
 *
 * asTry(async () => "foobar")
 * // => Promise<"foobar">
 * ```
 *
 * @param x - The expression to evaluate.
 *
 * @returns The unpacked value.
 *
 * @typeParam T - The expression type.
 *
 * @group Combinators
 */
export function asTry<T extends AsyncConstExpr>(x: T): AsTry<T> {
    try {
        const evaluated = evaluate(x)
        if (isPromise(evaluated)) {
            return evaluated.then((e) => e).catch((e) => failure(e)) as AsTry<T>
        }
        return evaluated as AsTry<T>
    } catch (e) {
        return failure(e) as AsTry<T>
    }
}

/**
 * @internal
 */
export type TryPromise<T> = T extends Promise<Try<infer P>> ? Promise<Try<P>> : T

/**
 * This transform takes a function for either a `Success` or a `Failure` value. Depending
 * on the state of the `Try`, it will apply the correct transformation and give back the result.
 *
 * Any thrown exceptions during the transformation will be caught and set as `Failure` value.
 *
 * ### Example
 * ```ts
 * transformTry("foobar", s => `${s}${s}`, f => `failure`)
 * // => "foobarfoobar"
 *
 * transformTry(new Error("foobar"), s => `${s}${s}`, f => `failure`)
 * // => "failure"
 * ```
 *
 * @param x - The `Try` to transform.
 * @param s - The success transform.
 * @param f - The failure transform.
 * @returns The transformed `Try`.
 *
 * @typeParam T - The input type.
 * @typeParam U - The transformed type.
 *
 * @group Combinators
 */
export function transformTry<T, U>(x: Try<T>, s: (e: T) => TryPromise<U>, f: (e: Failure) => TryPromise<U>) {
    return asTry(() => (isSuccess(x) ? s(x) : f(x)))
}

/**
 * Map the value of the `Try` when it is a `Success`.
 *
 * ### Example
 * ```ts
 * mapTry("foobar", s => `${s}${s}`)
 * // => "foobarfoobar"
 *
 * mapTry(new Error("foobar"), s => `${s}${s}`)
 * // => Error("foobar")
 * ```
 *
 * @param x - The `Try` to transform.
 * @param fn - The success transform.
 *
 * @typeParam T - The input type.
 * @typeParam U - The transformed type.
 *
 * @group Combinators
 */
export function mapTry<U, T>(x: Try<T>, fn: (e: T) => U): AsTry<U> {
    return (isSuccess(x) ? asTry(() => fn(x)) : x) as AsTry<U>
}

/**
 * Map the value of the `Try` when it is a `Failure`.
 *
 * ### Example
 * ```ts
 * recoverTry("foobar", s => `${s}${s}`)
 * // => "foobar"
 *
 * recoverTry(new Error("foobar"), s => "bar")
 * // => "bar"
 * ```
 *
 * @param x - The `Try` to transform.
 * @param recover - The failure transform.
 *
 * @typeParam T - The input type.
 * @typeParam U - The transformed type.
 *
 * @group Combinators
 */
export function recoverTry<U, T>(x: Try<T>, recover: (e: Failure) => U): AsTry<U> {
    return (isFailure(x) ? asTry(() => recover(x)) : x) as AsTry<U>
}

/**
 * Convert the `Try` to an `Either`, where `Success` is converted to `Right`, and
 * `Failure` is converted to `Left`.
 *
 * ### Example
 * ```ts
 * tryToEither("foobar")
 * // => {right: "foobar"}
 *
 * tryToEither(new Error("foobar"))
 * // => {left: Error("foobar")}
 * ```
 *
 * @param x - The `Try` to transform.
 *
 * @typeParam T - The value type.
 *
 * @group Combinators
 */
export function tryToEither<T>(x: Try<T>): Either<Failure, T> {
    return isSuccess(x) ? { right: x } : { left: x }
}

/**
 * Convert the `Either` to a `Try`, where `Right` is converted to `Success`, and
 * `Left` is converted to `Failure`.
 *
 * ### Example
 * ```ts
 * tryFromEither({right: "foobar"})
 * // => "foobar"
 *
 * tryFromEither({left: new Error("foobar")})
 * // => Error("foobar")
 * ```
 *
 * @param x - The `Either` to transform.
 *
 * @typeParam L - The `Left` type.
 * @typeParam R - The `Right` type.
 *
 * @group Combinators
 */
export function tryFromEither<L, R extends Success<unknown>>(x: Either<L, R>): Try<R> {
    return (isRight(x) ? x.right : failure(x.left)) as Try<R>
}

/**
 * Convert the `Try` to a `Maybe`, where `Success` is converted to `Just`, and
 * `Failure` is converted to `Nothing`.
 *
 * ### Example
 * ```ts
 * tryToMaybe("foobar")
 * // => "foobar"
 *
 * tryToMaybe(new Error("foobar"))
 * // => Nothing
 * ```
 *
 * @param x - The `Try` to transform.
 *
 * @typeParam T - The value type.
 *
 * @group Combinators
 */
export function tryToMaybe<T>(x: Try<T>): T extends Failure ? Nothing : T {
    return (isSuccess(x) ? x : Nothing) as T extends Failure ? Nothing : T
}

/**
 * Convert the `Try` to a value, where `Success` is converted to the value, and
 * `Failure` is converted to `undefined`.
 *
 * ### Example
 * ```ts
 * tryAsValue("foobar")
 * // => "foobar"
 *
 * tryAsValue(new Error("foobar"))
 * // => undefined
 * ```
 *
 * @param x - The `Try` to transform.
 *
 * @typeParam T - The value type.
 *
 * @group Combinators
 */
export function tryAsValue<T>(x: Try<T>): T extends Failure ? undefined : T {
    return (isSuccess(x) ? x : undefined) as T extends Failure ? undefined : T
}

/**
 * Convert the `Try` to a its value, where `Success` is converted to the value, and
 * `Failure` is thrown`.
 *
 * ### Example
 * ```ts
 * tryToError("foobar")
 * // => "foobar"
 *
 * tryToError(new Error("foobar"))
 * // => throw Error("foobar")
 * ```
 *
 * @param x - The `Try` to transform.
 *
 * @typeParam T - The value type.
 *
 * @group Combinators
 */
export function tryToError<T>(x: Try<T>): T extends Failure ? never : T {
    if (isFailure(x)) {
        throw x
    }
    return x as T extends Failure ? never : T
}
