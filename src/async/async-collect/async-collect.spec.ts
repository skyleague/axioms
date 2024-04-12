import { asyncCollect } from './async-collect.js'

import { sleep } from '../sleep/index.js'

import { expect, it } from 'vitest'

it('is ordered', async () => {
    const xs: number[] = []

    expect(
        await asyncCollect(
            [
                async () => {
                    await sleep(1)
                    xs.push(1)
                    return 1
                },
                async () => {
                    await sleep(5)
                    xs.push(2)
                    return 2
                },
                async () => {
                    await sleep(2)
                    xs.push(3)
                    return 3
                },
            ].map((x) => x()),
        ),
    ).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
    `)
    expect(xs).toMatchInlineSnapshot(`
        [
          1,
          3,
          2,
        ]
    `)
})
