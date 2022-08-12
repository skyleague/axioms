import { groupBy, replicate } from '../../../iterator'
import { mapValues } from '../../../object'
import { boolean, forAll, makeContext, xoroshiro128plus } from '../../../random'

test('distribution', () => {
    const context = makeContext({
        rng: xoroshiro128plus(42n),
    })

    expect(
        mapValues(
            groupBy(
                replicate(() => boolean().sample(context), 1000),
                (x) => x.toString()
            ),
            (v) => v.length
        )
    ).toMatchInlineSnapshot(`
        Object {
          "false": 509,
          "true": 491,
        }
    `)
})

test('counter example - true', () => {
    expect(() => forAll(boolean(), (v) => v === true, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 6 tests (seed: 42n)
        Shrunk 0 time(s)
        Counter example:

        false"
    `)
})

test('counter example - false', () => {
    expect(() => forAll(boolean(), (v) => v === false, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 1 tests (seed: 42n)
        Shrunk 0 time(s)
        Counter example:

        true"
    `)
})
