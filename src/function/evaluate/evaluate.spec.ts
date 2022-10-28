import { evaluate } from './evaluate'

import { sleep } from '../../async'
import { asyncForAll, forAll, unknown } from '../../random'

test('constant', () => {
    forAll(unknown(), (x) => evaluate(x) === x)
})

test('fn', () => {
    forAll(unknown(), (x) => evaluate(() => x) === x)
})

test('async fn', async () => {
    await asyncForAll(unknown(), async (x) => {
        return (
            (await evaluate(async () => {
                await sleep(0)
                return x
            })) === x
        )
    })
})
