import { evaluate } from './evaluate.js'

import { sleep } from '../../async/index.js'
import { asyncForAll, forAll, unknown } from '../../random/index.js'

import { it } from 'vitest'

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
