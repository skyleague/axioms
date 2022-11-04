import {
    eitherAsValue,
    mapLeft,
    mapLefts,
    mapRight,
    mapRights,
    swapEither,
    whenLeft,
    whenLefts,
    whenRight,
    whenRights,
} from './either'

import { collect } from '../../array/collect'
import { concat } from '../../iterator/concat'
import { equal } from '../../iterator/equal'
import { array, deterministicInteger, forAll, integer, shuffle, tuple, unknown } from '../../random'
import { identity } from '../../util'

describe('eitherAsValue', () => {
    test('simple', () => {
        expect(eitherAsValue({ left: 'foo' })).toMatchInlineSnapshot(`"foo"`)
        expect(eitherAsValue({ right: 'bar' })).toMatchInlineSnapshot(`"bar"`)
    })

    test('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => x === eitherAsValue(either)
        )
    })

    test('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => x === eitherAsValue(either)
        )
    })
})

describe('mapRight', () => {
    test('simple', () => {
        const fn = (x: string) => `${x}${x}`
        expect(mapRight({ left: 'foo' }, fn)).toMatchInlineSnapshot(`
            {
              "left": "foo",
            }
        `)
        expect(mapRight({ right: 'bar' }, fn)).toMatchInlineSnapshot(`
            {
              "right": "barbar",
            }
        `)
    })

    test('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => equal({ left: x }, mapRight(either, deterministicInteger))
        )
    })

    test('right', () => {
        forAll(
            unknown().map((x) => [deterministicInteger(x), { right: x }] as const),
            ([x, either]) => equal({ right: x }, mapRight(either, deterministicInteger))
        )
    })
})

describe('mapRights', () => {
    test('simple', () => {
        expect(mapRights([{ left: 0 }, { right: 'a' }], ([_x0, x1]) => x1)).toMatchInlineSnapshot(`
                    {
                      "left": 0,
                    }
            `)
        expect(mapRights([{ right: 0 }, { right: 'a' }], ([x0, x1]) => [x0, x1])).toMatchInlineSnapshot(`
            {
              "right": [
                0,
                "a",
              ],
            }
        `)

        // @ts-expect-error We only define 2 arguments in the tuple
        expect(mapRights([{ right: 0 }, { right: 'a' }], ([x0, x1, x2]) => [x0, x1, x2])).toMatchInlineSnapshot(`
            {
              "right": [
                0,
                "a",
                undefined,
              ],
            }
        `)
    })

    test('all right', () => {
        forAll(array(integer()), (xs) =>
            equal(
                { right: deterministicInteger(xs) },
                mapRights(
                    xs.map((x) => ({ right: x })),
                    deterministicInteger
                )
            )
        )
    })

    test('first left', () => {
        forAll(tuple(array(integer()), integer(), integer()), ([xs, left1, left2]) =>
            equal(
                { left: left1 },
                mapRights(
                    collect(
                        concat(
                            shuffle(
                                concat(
                                    xs.map((x) => ({ right: x })),
                                    [{ left: left1 }]
                                )
                            ),
                            [{ left: left2 }]
                        )
                    ),
                    deterministicInteger
                )
            )
        )
    })
})

describe('whenRight', () => {
    test('simple', () => {
        expect(whenRight({ left: 0 }, identity)).toMatchInlineSnapshot(`
                  {
                    "left": 0,
                  }
          `)
        expect(whenRight({ right: 0 }, identity)).toMatchInlineSnapshot(`0`)
    })

    test('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => equal({ left: x }, whenRight(either, deterministicInteger))
        )
    })

    test('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => deterministicInteger(x) === whenRight(either, deterministicInteger)
        )
    })
})

describe('whenRights', () => {
    test('simple', () => {
        expect(whenRights([{ left: 0 }, { right: 'a' }], ([_x0, x1]) => x1)).toMatchInlineSnapshot(`
                  {
                    "left": 0,
                  }
          `)
        expect(whenRights([{ right: 0 }, { right: 'a' }], ([x0, x1]) => [x0, x1])).toMatchInlineSnapshot(`
                  [
                    0,
                    "a",
                  ]
          `)

        // @ts-expect-error We only define 2 arguments in the tuple
        expect(whenRights([{ right: 0 }, { right: 'a' }], ([x0, x1, x2]) => [x0, x1, x2])).toMatchInlineSnapshot(`
                  [
                    0,
                    "a",
                    undefined,
                  ]
          `)
        expect(whenRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => `${x0}${x1}`)).toMatchInlineSnapshot(`"foobar"`)
    })

    test('all right', () => {
        forAll(array(integer()), (xs) =>
            equal(
                deterministicInteger(xs),
                whenRights(
                    xs.map((x) => ({ right: x })),
                    deterministicInteger
                )
            )
        )
    })

    test('first left', () => {
        forAll(tuple(array(integer()), integer(), integer()), ([xs, left1, left2]) =>
            equal(
                { left: left1 },
                whenRights(
                    collect(
                        concat(
                            shuffle(
                                concat(
                                    xs.map((x) => ({ right: x })),
                                    [{ left: left1 }]
                                )
                            ),
                            [{ left: left2 }]
                        )
                    ),
                    deterministicInteger
                )
            )
        )
    })
})

describe('mapLeft', () => {
    test('simple', () => {
        const fn = (x: string) => `${x}${x}`
        expect(mapLeft({ left: 'foo' }, fn)).toMatchInlineSnapshot(`
            {
              "left": "foofoo",
            }
        `)
        expect(mapLeft({ right: 'bar' }, fn)).toMatchInlineSnapshot(`
            {
              "right": "bar",
            }
        `)
    })

    test('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => equal({ right: x }, mapLeft(either, deterministicInteger))
        )
    })

    test('left', () => {
        forAll(
            unknown().map((x) => [deterministicInteger(x), { left: x }] as const),
            ([x, either]) => equal({ left: x }, mapLeft(either, deterministicInteger))
        )
    })
})

describe('mapLefts', () => {
    test('simple', () => {
        expect(mapLefts([{ left: 0 }, { right: 'a' }], ([_x0, x1]) => [x1])).toMatchInlineSnapshot(`
            {
              "right": "a",
            }
        `)
        expect(mapLefts([{ right: 0 }, { right: 'a' }], ([x0, x1]) => [x0, x1])).toMatchInlineSnapshot(`
            {
              "right": 0,
            }
        `)

        // @ts-expect-error We only define 2 arguments in the tuple
        expect(mapLefts([{ right: 0 }, { right: 'a' }], ([x0, x1, x2]) => [x0, x1, x2])).toMatchInlineSnapshot(`
            {
              "right": 0,
            }
        `)
    })

    test('all left', () => {
        forAll(array(integer()), (xs) =>
            equal(
                { left: deterministicInteger(xs) },
                mapLefts(
                    xs.map((x) => ({ left: x })),
                    deterministicInteger
                )
            )
        )
    })

    test('first right', () => {
        forAll(tuple(array(integer()), integer(), integer()), ([xs, right1, right2]) =>
            equal(
                { right: right1 },
                mapLefts(
                    collect(
                        concat(
                            shuffle(
                                concat(
                                    xs.map((x) => ({ left: x })),
                                    [{ right: right1 }]
                                )
                            ),
                            [{ right: right2 }]
                        )
                    ),
                    deterministicInteger
                )
            )
        )
    })
})

describe('whenLeft', () => {
    test('simple', () => {
        expect(whenLeft({ left: 0 }, identity)).toMatchInlineSnapshot(`0`)
        expect(whenLeft({ right: 0 }, identity)).toMatchInlineSnapshot(`
            {
              "right": 0,
            }
        `)
    })

    test('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => equal({ right: x }, whenLeft(either, deterministicInteger))
        )
    })

    test('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => deterministicInteger(x) === whenLeft(either, deterministicInteger)
        )
    })
})

describe('whenLefts', () => {
    test('simple', () => {
        expect(whenLefts([{ left: 0 }, { right: 'a' }], ([_x0, x1]) => x1)).toMatchInlineSnapshot(`
            {
              "right": "a",
            }
        `)
        expect(whenLefts([{ left: 0 }, { left: 'a' }], ([x0, x1]) => [x0, x1])).toMatchInlineSnapshot(`
            [
              0,
              "a",
            ]
        `)

        // @ts-expect-error We only define 2 arguments in the tuple
        expect(whenLefts([{ right: 0 }, { right: 'a' }], ([x0, x1, x2]) => [x0, x1, x2])).toMatchInlineSnapshot(`
            {
              "right": 0,
            }
        `)
    })

    test('all left', () => {
        forAll(array(integer()), (xs) =>
            equal(
                deterministicInteger(xs),
                whenLefts(
                    xs.map((x) => ({ left: x })),
                    deterministicInteger
                )
            )
        )
    })

    test('first right', () => {
        forAll(tuple(array(integer()), integer(), integer()), ([xs, right1, right2]) =>
            equal(
                { right: right1 },
                whenLefts(
                    collect(
                        concat(
                            shuffle(
                                concat(
                                    xs.map((x) => ({ left: x })),
                                    [{ right: right1 }]
                                )
                            ),
                            [{ right: right2 }]
                        )
                    ),
                    deterministicInteger
                )
            )
        )
    })
})

describe('swapEither', () => {
    test('simple', () => {
        expect(swapEither({ left: 'foo' })).toMatchInlineSnapshot(`
                      {
                        "right": "foo",
                      }
              `)
        expect(swapEither({ right: 'foo' })).toMatchInlineSnapshot(`
            {
              "left": "foo",
            }
        `)
    })
})
