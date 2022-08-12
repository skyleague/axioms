import { isJust } from '../../../guard'
import { replicate } from '../../../iterator/replicate'
import { Nothing } from '../../../type/maybe'
import type { Maybe } from '../../../type/maybe'
import { xoroshiro128plus } from '../../rng/xoroshiro128plus'
import type { Arbitrary } from '../arbitrary'
import type { ArbitraryContext } from '../context'
import { falsify, FalsifiedError } from '../falsify'
import { InfeasibleTree } from '../shrink'

export interface ForallOptions<T> {
    tests: number
    shrinks: number
    period: number
    maxSkips: number
    seed?: bigint
    counterExample?: T
}

export function forAll<T>(
    arbitrary: Arbitrary<T>,
    predicate: (x: T, context: ArbitraryContext) => boolean | void,
    {
        tests = 100,
        shrinks = 200,
        maxSkips = 100,
        seed = BigInt(new Date().getTime()),
        period = 13,
        counterExample,
    }: Partial<ForallOptions<T>> = {}
): void {
    const context: ArbitraryContext = {
        rng: xoroshiro128plus(BigInt(seed)),
        bias: undefined,
    }
    function safePredicate(x: T): [boolean, Maybe<Error>] {
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
    const maybeCounterExample = falsify<T>({
        predicate: safePredicate,
        values: (ctx = { skips: 0 }) =>
            replicate((i) => {
                while (ctx.skips < maxSkips) {
                    try {
                        const value = arbitrary.value({
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
    })

    if (isJust(maybeCounterExample)) {
        throw new FalsifiedError(maybeCounterExample, { seed })
    }
}
