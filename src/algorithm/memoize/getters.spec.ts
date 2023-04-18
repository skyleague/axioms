import { memoizeGetters } from './getters.js'

import { expect, it } from 'vitest'

it('memoizeGetters', () => {
    let i = 0
    const x = {
        x: 0,
        get y() {
            return ++i
        },
        z() {
            return 2
        },

        a: undefined,
        b: (c: number) => c + 1,
    }
    expect({ ...x }).not.toEqual({ ...x })

    const y = memoizeGetters(x)
    const z = { ...y }

    expect({ ...z }).toEqual({ ...y })
    y.clear('y')
    expect({ ...z }).not.toEqual({ ...y })

    expect({ ...y }).toEqual({ ...y })
    expect({ ...y }).toMatchInlineSnapshot(`
        {
          "a": undefined,
          "b": [Function],
          "clear": [Function],
          "x": 0,
          "y": 4,
          "z": [Function],
        }
    `)
    expect(y.b(1)).toMatchInlineSnapshot(`2`)
})
