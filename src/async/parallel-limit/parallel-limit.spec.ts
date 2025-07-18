import { expect, it } from 'vitest'

import { sleep } from '../sleep/index.js'
import { parallelLimit } from './parallel-limit.js'

it('simple', async () => {
    const limit = parallelLimit(2)
    const tasks = [
        limit(async () => {
            await sleep(100)
            return 1
        }),
        limit(() => 2),
        limit(() => 3),
    ]

    expect(await Promise.all(tasks)).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
    `)
})
