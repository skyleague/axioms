import type { Arbitrary } from '../arbitrary'
import type { ArbitraryContext } from '../context'
import { arbitraryContext } from '../context'

export function random<T>(arb: Arbitrary<T>, ctx: ArbitraryContext = arbitraryContext()) {
    return arb.value(ctx).value
}
