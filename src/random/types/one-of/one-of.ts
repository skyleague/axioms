import { sum } from '../../../array/sum'
import type { Arbitrary, TypeOfArbitraries } from '../../arbitrary/arbitrary'
import type { Dependent } from '../../arbitrary/dependent'
import { makeDependent } from '../../arbitrary/dependent'
import { weightedChoice } from '../choice/choice'
import { integer } from '../integer/integer'

export function oneOf<T extends Arbitrary<unknown>[]>(...arbitraries: [...T]): Dependent<TypeOfArbitraries<T>> {
    const aint = integer({ min: 0, max: arbitraries.length })
    return makeDependent((context) => {
        const i = aint.sample(context)
        return arbitraries[i].value(context)
    })
}

export function oneOfWeighted<T extends [number, Arbitrary<unknown>][]>(
    ...arbitraries: [...T]
): Dependent<ReturnType<[...T][number][1]['value']>['value']> {
    const total = sum(arbitraries.map((a) => a[0]))
    const aint = integer({ min: 0, max: total })
    const choices = weightedChoice(arbitraries)
    return makeDependent((context) => {
        return choices(aint.sample(context)).value(context)
    })
}
