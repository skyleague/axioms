import { mapValues } from '../../../object/map-values/map-values.js'
import { memoizeAttributes } from './attributes.js'

import { expect, it } from 'vitest'

it('memoizeAttributes', () => {
    let i = 0
    const x = {
        x: () => ++i,
    }
    expect({ ...x }).toEqual({ ...x })
    expect(mapValues(x, (f) => f())).not.toEqual(mapValues(x, (f) => f()))
    expect(mapValues(x, (f) => f())).toMatchInlineSnapshot(`
        {
          "x": 3,
        }
    `)

    const y = memoizeAttributes(x)
    expect({ ...y }).toEqual({ ...y })
    expect(mapValues(y, (f) => f())).toEqual(mapValues(y, (f) => f()))
    expect(mapValues(y, (f) => f())).toMatchInlineSnapshot(`
        {
          "x": 4,
        }
    `)
    y.x.clear()
    expect(mapValues(y, (f) => f())).toEqual(mapValues(y, (f) => f()))
    expect(mapValues(y, (f) => f())).toMatchInlineSnapshot(`
        {
          "x": 5,
        }
    `)
})
