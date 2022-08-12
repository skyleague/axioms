import { applicative } from '.'

import { collect } from '../../array'
import { range } from '../../generator'
import { allEqual, take } from '../../iterator'
import { array, forAll, unknown } from '../../random'

test('make reentrant', () => {
    const xs = range(1, 5)
    expect(collect(xs)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
        ]
    `)
    expect(collect(xs)).toMatchInlineSnapshot(`Array []`)

    const axs = applicative(range(1, 5))
    expect(collect(axs)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
        ]
    `)
    expect(collect(axs)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
        ]
    `)
})

test('make reentrant - lazy', () => {
    const fn = jest.fn()
    function* gen() {
        for (const x of range(5)) {
            fn()
            yield x
        }
    }
    const axs = applicative(gen())

    expect(collect(take(axs, 0))).toEqual([])
    expect(fn).not.toHaveBeenCalled()

    const take2 = collect(take(axs, 2))
    expect(fn).toHaveBeenCalledTimes(2)
    expect(collect(take(axs, 2))).toEqual(take2)
    expect(fn).toHaveBeenCalledTimes(2)

    expect(collect(take(axs, 3))).toMatchInlineSnapshot(`
        Array [
          0,
          1,
          2,
        ]
    `)
    expect(fn).toHaveBeenCalledTimes(3)

    expect(collect(axs)).toMatchInlineSnapshot(`
        Array [
          0,
          1,
          2,
          3,
          4,
        ]
    `)
    expect(fn).toHaveBeenCalledTimes(5)
})

test('identity', () => {
    forAll(array(unknown()), (xs) => allEqual(applicative(xs), xs))
})
