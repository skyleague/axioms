import { asTry, mapTry } from '../../../data/try/try.js'
import { isJust, isObject } from '../../../guard/index.js'
import { replicate } from '../../../iterator/replicate/index.js'
import { object } from '../../index.js'
import { xoroshiro128plus } from '../../rng/xoroshiro128plus/index.js'
import { tuple } from '../../types/tuple/tuple.js'
import type { Arbitrary, ArbitraryOrLiteral, AsArbitrary, TypeOfArbitrary } from '../arbitrary/arbitrary.js'
import type { AbsoluteSize } from '../arbitrary/size.js'
import { arbitraryContext } from '../context/context.js'
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
    timeout?: number | false
    size?: AbsoluteSize
    depth?: AbsoluteSize
}

function valuesFromArbitrary<T>({
    maxSkips,
    evaluatedArbitrary,
    context,
    period,
    tests,
}: {
    maxSkips: number
    evaluatedArbitrary: AsArbitrary<T>
    context: ArbitraryContext
    period: number
    tests: number
}) {
    return replicate((i, ctx = { skips: 0 }) => {
        while (ctx.skips < maxSkips) {
            try {
                const value = evaluatedArbitrary.value(
                    arbitraryContext({ ...context, bias: context.rng.sample() < 0.5 ? context.rng.sample() : undefined })
                )

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
        console.warn("Couldn't generate a value in a reasonable amount of time")
        return new InfeasibleTree()
    }, tests)
}

export function forAll<const T extends ArbitraryOrLiteral<any>>(
    arbitrary: T,
    predicate: (x: TypeOfArbitrary<AsArbitrary<T>>, context: ArbitraryContext) => boolean | void,
    {
        tests = 100,
        shrinks = 200,
        maxSkips = 100,
        seed = BigInt(Math.floor(new Date().getTime() * Math.random())),
        period = 13,
        timeout = 4_500,
        size,
        depth,
        counterExample,
    }: Partial<ForallOptions<TypeOfArbitrary<AsArbitrary<T>>>> = {}
): void {
    const evaluatedArbitrary = asArbitrary(arbitrary)
    const context: ArbitraryContext = arbitraryContext({
        rng: xoroshiro128plus(BigInt(seed)),
        bias: undefined,
        size,
        depth,
    })
    const maybeCounterExample = falsify<TypeOfArbitrary<AsArbitrary<T>>>({
        predicate: (x) =>
            mapTry(
                asTry(() => predicate(x, context) ?? true),
                (holds) => (holds ? holds : new Error())
            ),
        values: () => valuesFromArbitrary({ maxSkips, evaluatedArbitrary, context, period, tests }),
        maxDepth: shrinks,
        counterExample,
        tests,
        timeout,
    })

    if (isJust(maybeCounterExample)) {
        const error = new FalsifiedError(maybeCounterExample, { seed })
        throw error
    }
}
export async function asyncForAll<const T extends ArbitraryOrLiteral<any>>(
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
        size,
        depth,
    }: Partial<ForallOptions<TypeOfArbitrary<AsArbitrary<T>>>> = {}
): Promise<void> {
    const evaluatedArbitrary = asArbitrary(arbitrary)
    const context: ArbitraryContext = arbitraryContext({
        rng: xoroshiro128plus(BigInt(seed)),
        bias: undefined,
        size,
        depth,
    })
    const maybeCounterExample = await asyncFalsify<TypeOfArbitrary<AsArbitrary<T>>>({
        predicate: async (x) =>
            mapTry(await asTry(async () => (await predicate(x, context)) ?? true), (holds) => (holds ? holds : new Error())),
        values: () => valuesFromArbitrary({ maxSkips, evaluatedArbitrary, context, period, tests }),
        maxDepth: shrinks,
        counterExample,
        tests,
        timeout,
    })

    if (isJust(maybeCounterExample)) {
        const error = new FalsifiedError(maybeCounterExample, { seed })
        throw error
    }
}
