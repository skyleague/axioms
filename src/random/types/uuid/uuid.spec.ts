import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, it } from 'vitest'
import { uuidv4Arbitrary } from './uuid.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = uuidv4Arbitrary()
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10,
            ),
        ),
    ).toMatchInlineSnapshot(`
      [
        "935b684b-40f3-486f-9e2e-c404fd1e0e45",
        "d0eb1c7b-6308-478d-b582-4eb37858bf37",
        "95214947-77ee-42ff-8ecb-3c33338d58e6",
        "2ef07e18-d03a-4db9-9260-bd8efdd03e69",
        "194384df-f60a-408f-8af2-5cdf925b0933",
        "58014d8f-0e59-40c9-a8db-616022fb7e14",
        "3753b1dc-ea7e-43ad-8680-902d1069693a",
        "44e87e44-3702-45c9-9af0-74456013deb8",
        "a7de3320-11f3-4140-8e03-8893f0769da9",
        "e2c8d598-e4f8-4c57-a541-335a222110b4",
      ]
    `)
})
