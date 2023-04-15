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
} from './either.js'

import { collect } from '../../array/collect/index.js'
import { concat } from '../../iterator/concat/index.js'
import { equal } from '../../iterator/equal/index.js'
import { array, deterministicInteger, forAll, integer, shuffle, tuple, unknown } from '../../random/index.js'
import { identity } from '../../util/index.js'

import { expect, describe, it } from 'vitest'

describe('eitherAsValue', () => {
    it('simple', () => {
        expect(eitherAsValue({ left: 'foo' })).toMatchInlineSnapshot(`"foo"`)
        expect(eitherAsValue({ right: 'bar' })).toMatchInlineSnapshot(`"bar"`)
    })

    it('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => x === eitherAsValue(either)
        )
    })

    it('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => x === eitherAsValue(either)
        )
    })
})

describe('mapRight', () => {
    it('simple', () => {
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

    it('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => equal({ left: x }, mapRight(either, deterministicInteger))
        )
    })

    it('right', () => {
        forAll(
            unknown().map((x) => [deterministicInteger(x), { right: x }] as const),
            ([x, either]) => equal({ right: x }, mapRight(either, deterministicInteger))
        )
    })
})

describe('mapRights', () => {
    it('simple', () => {
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

    it('all right', () => {
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

    it('first left', () => {
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
    it('simple', () => {
        expect(whenRight({ left: 0 }, identity)).toMatchInlineSnapshot(`
                  {
                    "left": 0,
                  }
          `)
        expect(whenRight({ right: 0 }, identity)).toMatchInlineSnapshot(`0`)
    })

    it('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => equal({ left: x }, whenRight(either, deterministicInteger))
        )
    })

    it('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => deterministicInteger(x) === whenRight(either, deterministicInteger)
        )
    })
})

describe('whenRights', () => {
    it('simple', () => {
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

    it('all right', () => {
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

    it('first left', () => {
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
    it('simple', () => {
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

    it('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => equal({ right: x }, mapLeft(either, deterministicInteger))
        )
    })

    it('left', () => {
        forAll(
            unknown().map((x) => [deterministicInteger(x), { left: x }] as const),
            ([x, either]) => equal({ left: x }, mapLeft(either, deterministicInteger))
        )
    })
})

describe('mapLefts', () => {
    it('simple', () => {
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

    it('all left', () => {
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

    it('first right', () => {
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
    it('simple', () => {
        expect(whenLeft({ left: 0 }, identity)).toMatchInlineSnapshot(`0`)
        expect(whenLeft({ right: 0 }, identity)).toMatchInlineSnapshot(`
            {
              "right": 0,
            }
        `)
    })

    it('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => equal({ right: x }, whenLeft(either, deterministicInteger))
        )
    })

    it('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => deterministicInteger(x) === whenLeft(either, deterministicInteger)
        )
    })
})

describe('whenLefts', () => {
    it('simple', () => {
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

    it('all left', () => {
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

    it('first right', () => {
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
    it('simple', () => {
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
