import type { Arbitrary } from '../../arbitrary/arbitrary'
import { interleave } from '../../arbitrary/arbitrary'
import type { ArbitraryContext } from '../../arbitrary/context'
import type { Dependent } from '../../arbitrary/dependent'
import { makeDependent } from '../../arbitrary/dependent'

export function tuple<T extends Arbitrary<unknown>[]>(
    ...xs: [...T]
): Dependent<{ [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never }> {
    return makeDependent((context) => interleave(...xs.map((x) => x.value(context)))) as Dependent<{
        [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
    }>
}
