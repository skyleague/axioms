import type { Arbitrary } from '../arbitrary'
import type { ArbitraryContext } from '../context'
import { makeContext } from '../context'

export function random<T>(arb: Arbitrary<T>, ctx: ArbitraryContext = makeContext()) {
    return arb.value(ctx).value
}
