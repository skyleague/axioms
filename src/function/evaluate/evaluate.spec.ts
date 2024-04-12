import { evaluate } from './evaluate.js'

import { sleep } from '../../async/index.js'
import { asyncForAll, forAll, unknown } from '../../random/index.js'

import { expectTypeOf, it } from 'vitest'

it('constant', () => {
    forAll(unknown(), (x) => evaluate(x) === x)
})

it('fn', () => {
    forAll(unknown(), (x) => evaluate(() => x) === x)
})

it('async fn', async () => {
    await asyncForAll(unknown(), async (x) => {
        return (
            (await evaluate(async () => {
                await sleep(0)
                return x
            })) === x
        )
    })
})

it('types', () => {
    expectTypeOf(evaluate(1)).toEqualTypeOf<1>()
    expectTypeOf(evaluate('foo')).toEqualTypeOf<'foo'>()
    expectTypeOf(evaluate(true)).toEqualTypeOf<true>()
    expectTypeOf(evaluate(null)).toEqualTypeOf<null>()

    expectTypeOf(evaluate(() => 1)).toEqualTypeOf<number>()
    expectTypeOf(evaluate(() => 'foo')).toEqualTypeOf<string>()
    expectTypeOf(evaluate(() => true)).toEqualTypeOf<boolean>()
    expectTypeOf(evaluate(() => null)).toEqualTypeOf<null>()

    expectTypeOf(evaluate((..._: any[]) => 1)).toEqualTypeOf<number>()
    expectTypeOf(evaluate((..._: any[]) => 'foo')).toEqualTypeOf<string>()
    expectTypeOf(evaluate((..._: any[]) => true)).toEqualTypeOf<boolean>()
    expectTypeOf(evaluate((..._: any[]) => null)).toEqualTypeOf<null>()
})
