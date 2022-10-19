import { parallelLimit } from './parallel-limit'

import { sleep } from '../sleep'

test('simple', async () => {
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
