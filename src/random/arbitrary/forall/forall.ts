import { isJust, isObject } from '../../../guard/index.js'
import { replicate } from '../../../iterator/replicate/index.js'
import { Nothing } from '../../../type/maybe/index.js'
import type { Maybe } from '../../../type/maybe/index.js'
import { object } from '../../index.js'
import { xoroshiro128plus } from '../../rng/xoroshiro128plus/index.js'
import { tuple } from '../../types/tuple/tuple.js'
import type { Arbitrary, ArbitraryOrLiteral, AsArbitrary, TypeOfArbitrary } from '../arbitrary/arbitrary.js'
import type { ArbitraryContext } from '../context/index.js'
import { asyncFalsify } from '../falsify/falsify.js'
import { falsify, FalsifiedError } from '../falsify/index.js'
import { InfeasibleTree } from '../shrink/index.js'

/**
 * @internal
 */
export function asArbitrary<T extends ArbitraryOrLiteral<unknown>>(a: T): AsArbitrary<T> {
    if (Array.isArray(a)) {
        return tuple(...a) as unknown as AsArbitrary<T>
    }
    if (isObject<Arbitrary<unknown>>(a) && !('value' in a)) {
        return object(a) as unknown as AsArbitrary<T>
    }
    return a as AsArbitrary<T>
}

export interface ForallOptions<T> {
    tests: number
    shrinks: number
    period: number
    maxSkips: number
    seed?: bigint
    counterExample?: T
}

export function forAll<T extends ArbitraryOrLiteral<any>>(
    arbitrary: T,
    predicate: (x: TypeOfArbitrary<AsArbitrary<T>>, context: ArbitraryContext) => boolean | void,
    {
        tests = 100,
        shrinks = 200,
        maxSkips = 100,
        seed = BigInt(Math.floor(new Date().getTime() * Math.random())),
        period = 13,
        counterExample,
    }: Partial<ForallOptions<TypeOfArbitrary<AsArbitrary<T>>>> = {}
): void {
    const evaluatedArbitrary = asArbitrary(arbitrary)
    const context: ArbitraryContext = {
        rng: xoroshiro128plus(BigInt(seed)),
        bias: undefined,
    }
    function safePredicate(x: TypeOfArbitrary<AsArbitrary<T>>): [boolean, Maybe<Error>] {
        let holds: boolean | undefined | void
        let error: Maybe<Error> = Nothing
        try {
            holds = predicate(x, context)
        } catch (e: unknown) {
            holds = false
            error = e as Error
        }
        // void returned a proper result, which means the predicate held
        return [typeof holds === 'boolean' ? holds : true, error]
    }
    const maybeCounterExample = falsify<TypeOfArbitrary<AsArbitrary<T>>>({
        predicate: safePredicate,
        values: () =>
            replicate((i, ctx = { skips: 0 }) => {
                while (ctx.skips < maxSkips) {
                    try {
                        const value = evaluatedArbitrary.value({
                            ...context,
                            bias: context.rng.sample() < 1 / (1 + Math.log(i + 1)) ? context.rng.sample() : undefined,
                            // bias: undefined,
                        })

                        if (i > 0 && i % period === 0) {
                            context.rng.jump()
                        }
                        ctx.skips = 0
                        return value
                    } catch (e) {
                        if (e instanceof InfeasibleTree) {
                            ctx.skips++
                        } else {
                            throw e
                        }
                    }
                }
                throw new InfeasibleTree()
            }, tests),
        maxDepth: shrinks,
        counterExample,
    })

    if (isJust(maybeCounterExample)) {
        const error = new FalsifiedError(maybeCounterExample, { seed })
        Error.captureStackTrace(error, forAll)
        throw error
    }
}

export interface AsyncForallOptions<T> extends ForallOptions<T> {
    timeout?: number
}

export async function asyncForAll<T extends ArbitraryOrLiteral<any>>(
    arbitrary: T,
    predicate: (x: TypeOfArbitrary<AsArbitrary<T>>, context: ArbitraryContext) => Promise<boolean | void>,
    {
        tests = 100,
        shrinks = 200,
        maxSkips = 100,
        seed = BigInt(Math.floor(new Date().getTime() * Math.random())),
        period = 13,
        timeout = 4_500,
        counterExample,
    }: Partial<AsyncForallOptions<TypeOfArbitrary<AsArbitrary<T>>>> = {}
): Promise<void> {
    const evaluatedArbitrary = asArbitrary(arbitrary)
    const context: ArbitraryContext = {
        rng: xoroshiro128plus(BigInt(seed)),
        bias: undefined,
    }
    async function safePredicate(x: TypeOfArbitrary<AsArbitrary<T>>): Promise<[boolean, Maybe<Error>]> {
        let holds: boolean | undefined | void
        let error: Maybe<Error> = Nothing
        try {
            holds = await predicate(x, context)
        } catch (e: unknown) {
            holds = false
            error = e as Error
        }
        // void returned a proper result, which means the predicate held
        return [typeof holds === 'boolean' ? holds : true, error]
    }
    const maybeCounterExample = await asyncFalsify<TypeOfArbitrary<AsArbitrary<T>>>({
        predicate: safePredicate,
        values: (ctx = { skips: 0 }) =>
            replicate((i) => {
                while (ctx.skips < maxSkips) {
                    try {
                        const value = evaluatedArbitrary.value({
                            ...context,
                            bias: context.rng.sample() < 1 / (1 + Math.log(i + 1)) ? context.rng.sample() : undefined,
                            // bias: undefined,
                        })

                        if (i > 0 && i % period === 0) {
                            context.rng.jump()
                        }
                        return value
                    } catch (e) {
                        if (e instanceof InfeasibleTree) {
                            ctx.skips++
                        } else {
                            throw e
                        }
                    }
                }
                throw new InfeasibleTree()
            }, tests),
        maxDepth: shrinks,
        counterExample,
        tests,
        timeout,
    })

    if (isJust(maybeCounterExample)) {
        const error = new FalsifiedError(maybeCounterExample, { seed })
        Error.captureStackTrace(error, asyncForAll)
        throw error
    }
}
