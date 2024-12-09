import { concat } from '../../iterator/concat/index.js'
import { equal } from '../../iterator/equal/index.js'
import { array, forAll, integer, shuffle, tuple, unknown } from '../../random/index.js'
import {
    eitherAsValue,
    eitherToError,
    left,
    mapLeft,
    mapLefts,
    mapRight,
    mapRights,
    right,
    swapEither,
    whenLeft,
    whenLefts,
    whenRight,
    whenRights,
} from './either.js'

import { describe, expect, expectTypeOf, it } from 'vitest'
import { func } from '../../random/types/func/func.js'
import type { Either, Left, Right } from '../../type/either/either.js'

describe('eitherAsValue', () => {
    it('simple', () => {
        expect(eitherAsValue({ left: 'foo' })).toMatchInlineSnapshot(`"foo"`)
        expect(eitherAsValue({ right: 'bar' })).toMatchInlineSnapshot(`"bar"`)
    })

    it('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => x === eitherAsValue(either),
        )
    })

    it('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => x === eitherAsValue(either),
        )
    })

    it('types', () => {
        expectTypeOf(eitherAsValue({ left: 'foo' })).toEqualTypeOf<'foo'>()
        expectTypeOf(eitherAsValue({ right: 'bar' })).toEqualTypeOf<'bar'>()
        expectTypeOf(eitherAsValue({ right: 'bar' } as Either<'foo', 'bar'>)).toEqualTypeOf<'foo' | 'bar'>()

        expectTypeOf(eitherAsValue({ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' })).toEqualTypeOf<'foo' | 'bar'>()

        expectTypeOf(eitherAsValue({ right: 'bar' } as Either<'foo' | 1, 'bar' | 2> | Either<1, 2>)).toEqualTypeOf<
            'foo' | 'bar' | 1 | 2
        >()
        expectTypeOf(eitherAsValue({ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>)).toEqualTypeOf<
            'foo' | 'bar' | 1 | 2
        >()
    })
})

describe('eitherToError', () => {
    it('simple', () => {
        expect(() => eitherToError({ left: 'foo' })).toThrowErrorMatchingInlineSnapshot(`"foo"`)
        expect(eitherToError({ right: 'bar' })).toMatchInlineSnapshot(`"bar"`)
    })

    it('left', () => {
        forAll(
            unknown().map((x) => [x, { left: x }] as const),
            ([x, either]) => {
                try {
                    eitherToError(either)
                    return false
                } catch (e) {
                    expect(e).toBe(x)
                }
                return true
            },
        )
    })

    it('right', () => {
        forAll(
            unknown().map((x) => [x, { right: x }] as const),
            ([x, either]) => x === eitherToError(either),
        )
    })

    it('types', () => {
        expectTypeOf(() => eitherToError({ left: 'foo' })).toEqualTypeOf<() => never>()
        expectTypeOf(() => eitherToError({ right: 'bar' })).toEqualTypeOf<() => 'bar'>()
        expectTypeOf(() => eitherToError({ right: 'bar' } as Either<'foo', 'bar'>)).toEqualTypeOf<() => 'bar'>()

        expectTypeOf(() => eitherToError({ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' })).toEqualTypeOf<() => 'bar'>()

        expectTypeOf(() => eitherToError({ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>)).toEqualTypeOf<() => 'bar' | 2>()
        expectTypeOf(() => eitherToError({ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>)).toEqualTypeOf<
            () => 'bar' | 2
        >()
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
            tuple(unknown(), func(integer())).map(([x, fn]) => [x, { left: x }, fn] as const),
            ([x, either, fn]) => {
                expect(mapRight(either, fn)).toEqual({ left: x })
            },
        )
    })

    it('right', () => {
        forAll(
            tuple(unknown(), func(integer())).map(([x, fn]) => [x, { right: x }, fn] as const),
            ([x, either, fn]) => {
                expect(mapRight(either, fn)).toEqual({ right: fn(x) })
            },
        )
    })

    it('types', () => {
        expectTypeOf(mapRight({ left: 'foo' }, (x: never) => `fn-${x}` as const)).toEqualTypeOf<{ readonly left: 'foo' }>()
        expectTypeOf(mapRight({ right: 'bar' }, (x: 'bar') => `fn-${x}` as const)).toEqualTypeOf<{ right: 'fn-bar' }>()
        expectTypeOf(mapRight({ right: 'bar' } as Either<'foo', 'bar'>, (x: 'bar') => `fn-${x}` as const)).toEqualTypeOf<
            Left<'foo'> | Right<'fn-bar'>
        >()

        expectTypeOf(
            mapRight({ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }, (x: 'bar') => `fn-${x}` as const),
        ).toEqualTypeOf<Right<'fn-bar'> | (Left<'foo'> & { fooz: 'baz' })>()

        expectTypeOf(
            mapRight({ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>, (x: 'bar' | 2) => `fn-${x}` as const),
        ).toEqualTypeOf<Left<'foo' | 1> | Right<'fn-bar' | 'fn-2'>>()
        expectTypeOf(
            mapRight({ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>, (x: 'bar' | 2) => `fn-${x}` as const),
        ).toEqualTypeOf<Left<'foo'> | Left<1> | Right<'fn-bar' | 'fn-2'>>()
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
        forAll([array(integer()), func(integer())], ([xs, fn]) => {
            expect(
                mapRights(
                    xs.map((x) => ({ right: x })),
                    fn,
                ),
            ).toEqual({ right: fn(xs) })
        })
    })

    it('first left', () => {
        forAll(tuple(array(integer()), integer(), integer(), func(integer())), ([xs, left1, left2, fn]) => {
            expect(
                mapRights(
                    concat(
                        shuffle(
                            concat(
                                xs.map((x) => ({ right: x })),
                                [{ left: left1 }],
                            ),
                        ),
                        [{ left: left2 }],
                    ).toArray(),
                    fn,
                ),
            ).toEqual({ left: left1 })
        })
    })

    it('types', () => {
        expectTypeOf(mapRights([{ left: 'foo' }], (x: [never]) => `fn-${x[0]}` as const)).toEqualTypeOf<Left<'foo'>>()
        expectTypeOf(mapRights([{ right: 'bar' }], (x: ['bar']) => `fn-${x[0]}`)).toEqualTypeOf<Right<'fn-bar'>>()

        expectTypeOf(mapRights([{ right: 'bar' } as Either<'foo', 'bar'>], (x: ['bar']) => `fn-${x[0]}`)).toEqualTypeOf<
            Left<'foo'> | Right<'fn-bar'>
        >()

        expectTypeOf(
            mapRights([{ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }], (x: ['bar']) => `fn-${x[0]}`),
        ).toEqualTypeOf<Left<'foo'> | Right<'fn-bar'>>()

        expectTypeOf(
            mapRights([{ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>], (x: ['bar' | 2]) => `fn-${x[0]}`),
        ).toEqualTypeOf<Left<1 | 'foo'> | Right<'fn-bar' | 'fn-2'>>()
        expectTypeOf(
            mapRights([{ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>], (x: ['bar' | 2]) => `fn-${x[0]}`),
        ).toEqualTypeOf<Left<1 | 'foo'> | Right<'fn-bar' | 'fn-2'>>()
    })
})

describe('whenRight', () => {
    it('simple', () => {
        expect(whenRight({ left: 0 }, (x) => ({ right: x }))).toMatchInlineSnapshot(`
          {
            "left": 0,
          }
        `)
        expect(whenRight({ right: 0 }, (x) => ({ left: x }))).toMatchInlineSnapshot(`
          {
            "left": 0,
          }
        `)
    })

    it('left', () => {
        forAll(
            tuple(unknown(), func(integer())).map(([x, fn]) => [x, { left: x }, fn] as const),
            ([x, either, fn]) => {
                expect(whenRight(either, (y) => ({ left: fn(y) }))).toEqual({ left: x })
            },
        )
    })

    it('right - right', () => {
        forAll(
            tuple(unknown(), func(integer())).map(([x, fn]) => [x, { right: x }, fn] as const),
            ([x, either, fn]) => {
                expect(whenRight(either, (y) => ({ right: fn(y) }))).toEqual({ right: fn(x) })
            },
        )
    })

    it('right - left', () => {
        forAll(
            tuple(unknown(), func(integer())).map(([x, fn]) => [x, { right: x }, fn] as const),
            ([x, either, fn]) => {
                expect(whenRight(either, (y) => ({ left: fn(y) }))).toEqual({ left: fn(x) })
            },
        )
    })

    it('types - right', () => {
        expectTypeOf(whenRight({ left: 'foo' }, (x: never) => right(`fn-${x}` as const))).toEqualTypeOf<{
            readonly left: 'foo'
        }>()
        expectTypeOf(whenRight({ right: 'bar' }, (x: 'bar') => right(`fn-${x}`))).toEqualTypeOf<{
            right: 'fn-bar'
        }>()
        expectTypeOf(whenRight({ right: 'bar' } as Either<'foo', 'bar'>, (x: 'bar') => right(`fn-${x}`))).toEqualTypeOf<
            Left<'foo'> | Right<'fn-bar'>
        >()

        expectTypeOf(
            whenRight({ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }, (x: 'bar') => right(`fn-${x}`)),
        ).toEqualTypeOf<Right<'fn-bar'> | (Left<'foo'> & { fooz: 'baz' })>()

        expectTypeOf(
            whenRight({ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>, (x: 'bar' | 2) => right(`fn-${x}`)),
        ).toEqualTypeOf<Left<'foo' | 1> | Right<'fn-bar' | 'fn-2'>>()
        expectTypeOf(
            whenRight({ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>, (x: 'bar' | 2) => right(`fn-${x}`)),
        ).toEqualTypeOf<Left<'foo'> | Left<1> | Right<'fn-bar' | 'fn-2'>>()
    })

    it('types - left', () => {
        expectTypeOf(whenRight({ left: 'foo' }, (x: never) => left(`fn-${x}` as const))).toEqualTypeOf<{
            readonly left: 'foo'
        }>()
        expectTypeOf(whenRight({ right: 'bar' }, (x: 'bar') => left(`fn-${x}`))).toEqualTypeOf<Left<'fn-bar'>>()
        expectTypeOf(whenRight({ right: 'bar' } as Either<'foo', 'bar'>, (x: 'bar') => left(`fn-${x}`))).toEqualTypeOf<
            Left<'foo'> | Left<'fn-bar'>
        >()

        expectTypeOf(
            whenRight({ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }, (x: 'bar') => left(`fn-${x}`)),
        ).toEqualTypeOf<Left<'fn-bar'> | (Left<'foo'> & { fooz: 'baz' })>()

        expectTypeOf(
            whenRight({ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>, (x: 'bar' | 2) => left(`fn-${x}`)),
        ).toEqualTypeOf<Left<'foo' | 1> | Left<'fn-bar' | 'fn-2'>>()
        expectTypeOf(
            whenRight({ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>, (x: 'bar' | 2) => left(`fn-${x}`)),
        ).toEqualTypeOf<Left<'foo'> | Left<1> | Left<'fn-bar' | 'fn-2'>>()
    })
})

describe('whenRights', () => {
    it('simple', () => {
        expect(whenRights([{ left: 0 }, { right: 'a' }], ([_x0, x1]) => ({ right: x1 }))).toMatchInlineSnapshot(`
                  {
                    "left": 0,
                  }
          `)
        expect(whenRights([{ right: 0 }, { right: 'a' }], ([x0, x1]) => ({ left: [x0, x1] }))).toMatchInlineSnapshot(`
          {
            "left": [
              0,
              "a",
            ],
          }
        `)

        // @ts-expect-error We only define 2 arguments in the tuple
        expect(whenRights([{ right: 0 }, { right: 'a' }], ([x0, x1, x2]) => ({ left: [x0, x1, x2] }))).toMatchInlineSnapshot(`
          {
            "left": [
              0,
              "a",
              undefined,
            ],
          }
        `)
        expect(whenRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => ({ right: `${x0}${x1}` }))).toMatchInlineSnapshot(
            `
          {
            "right": "foobar",
          }
        `,
        )
    })

    it('all right - right', () => {
        forAll([array(integer()), func(integer())], ([xs, fn]) => {
            expect(whenRights(xs.map(right), (x) => right(fn(x)))).toEqual(right(fn(xs)))
        })
    })

    it('all right - left', () => {
        forAll([array(integer()), func(integer())], ([xs, fn]) => {
            expect(whenRights(xs.map(right), (x) => left(fn(x)))).toEqual(left(fn(xs)))
        })
    })

    it('first left - right', () => {
        forAll(tuple(array(integer()), integer(), integer(), func(integer())), ([xs, left1, left2, fn]) => {
            expect(
                whenRights(
                    concat(
                        shuffle(
                            concat(
                                xs.map((x) => ({ right: x })),
                                [{ left: left1 }],
                            ),
                        ),
                        [{ left: left2 }],
                    ).toArray(),
                    (x) => right(fn(x)),
                ),
            ).toEqual({ left: left1 })
        })
    })

    it('first left - left', () => {
        forAll(tuple(array(integer()), integer(), integer(), func(integer())), ([xs, left1, left2, fn]) => {
            expect(
                whenRights(
                    concat(
                        shuffle(
                            concat(
                                xs.map((x) => ({ right: x })),
                                [{ left: left1 }],
                            ),
                        ),
                        [{ left: left2 }],
                    ).toArray(),
                    (x) => left(fn(x)),
                ),
            ).toEqual({ left: left1 })
        })
    })

    it('types - left', () => {
        expectTypeOf(whenRights([{ left: 'foo' }], (x: [never]) => left(`fn-${x[0]}` as const))).toEqualTypeOf<Left<'foo'>>()
        expectTypeOf(whenRights([{ right: 'bar' }], (x: ['bar']) => left(`fn-${x[0]}`))).toEqualTypeOf<Left<'fn-bar'>>()

        expectTypeOf(whenRights([{ right: 'bar' } as Either<'foo', 'bar'>], (x: ['bar']) => left(`fn-${x[0]}`))).toEqualTypeOf<
            Left<'foo'> | Left<'fn-bar'>
        >()

        expectTypeOf(
            whenRights([{ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }], (x: ['bar']) => left(`fn-${x[0]}`)),
        ).toEqualTypeOf<Left<'foo'> | Left<'fn-bar'>>()

        expectTypeOf(
            whenRights([{ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>], (x: ['bar' | 2]) => left(`fn-${x[0]}`)),
        ).toEqualTypeOf<Left<1 | 'foo'> | Left<'fn-bar' | 'fn-2'>>()
        expectTypeOf(
            whenRights([{ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>], (x: ['bar' | 2]) => left(`fn-${x[0]}`)),
        ).toEqualTypeOf<Left<1 | 'foo'> | Left<'fn-bar' | 'fn-2'>>()
    })

    it('types - right', () => {
        expectTypeOf(whenRights([{ left: 'foo' }], (x: [never]) => right(`fn-${x[0]}` as const))).toEqualTypeOf<Left<'foo'>>()
        expectTypeOf(whenRights([{ right: 'bar' }], (x: ['bar']) => right(`fn-${x[0]}`))).toEqualTypeOf<Right<'fn-bar'>>()

        expectTypeOf(whenRights([{ right: 'bar' } as Either<'foo', 'bar'>], (x: ['bar']) => right(`fn-${x[0]}`))).toEqualTypeOf<
            Left<'foo'> | Right<'fn-bar'>
        >()

        expectTypeOf(
            whenRights([{ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }], (x: ['bar']) => right(`fn-${x[0]}`)),
        ).toEqualTypeOf<Left<'foo'> | Right<'fn-bar'>>()

        expectTypeOf(
            whenRights([{ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>], (x: ['bar' | 2]) => right(`fn-${x[0]}`)),
        ).toEqualTypeOf<Left<1 | 'foo'> | Right<'fn-bar' | 'fn-2'>>()
        expectTypeOf(
            whenRights([{ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>], (x: ['bar' | 2]) => right(`fn-${x[0]}`)),
        ).toEqualTypeOf<Left<1 | 'foo'> | Right<'fn-bar' | 'fn-2'>>()
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
            tuple(unknown(), func(integer())).map(([x, fn]) => [x, { right: x }, fn] as const),
            ([x, either, fn]) => {
                expect(mapLeft(either, fn)).toEqual({ right: x })
            },
        )
    })

    it('left', () => {
        forAll(
            tuple(integer(), func(integer())).map(([x, fn]) => [x, { left: x }, fn] as const),
            ([x, either, fn]) => {
                expect(mapLeft(either, fn)).toEqual({ left: fn(x) })
            },
        )
    })

    it('types', () => {
        expectTypeOf(mapLeft({ right: 'foo' }, (x: never) => `fn-${x}` as const)).toEqualTypeOf<{ readonly right: 'foo' }>()
        expectTypeOf(mapLeft({ left: 'bar' }, (x: 'bar') => `fn-${x}` as const)).toEqualTypeOf<{ left: 'fn-bar' }>()
        expectTypeOf(mapLeft({ left: 'bar' } as Either<'bar', 'foo'>, (x: 'bar') => `fn-${x}` as const)).toEqualTypeOf<
            Right<'foo'> | Left<'fn-bar'>
        >()

        expectTypeOf(
            mapLeft({ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }, (x: 'foo') => `fn-${x}` as const),
        ).toEqualTypeOf<Left<'fn-foo'> | (Right<'bar'> & { fooz: 'baz' })>()

        expectTypeOf(
            mapLeft({ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>, (x: 'foo' | 1) => `fn-${x}` as const),
        ).toEqualTypeOf<Right<2 | 'bar'> | Left<'fn-foo' | 'fn-1'>>()
        expectTypeOf(
            mapLeft({ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>, (x: 'foo' | 1) => `fn-${x}` as const),
        ).toEqualTypeOf<Left<'fn-foo' | 'fn-1'> | Right<'bar'> | Right<2>>()
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
        forAll([array(integer()), func(integer())], ([xs, fn]) =>
            equal(
                { left: fn(xs) },
                mapLefts(
                    xs.map((x) => ({ left: x })),
                    fn,
                ),
            ),
        )
    })

    it('first right', () => {
        forAll(tuple(array(integer()), integer(), integer(), func(integer())), ([xs, right1, right2, fn]) =>
            equal(
                { right: right1 },
                mapLefts(
                    concat(
                        shuffle(
                            concat(
                                xs.map((x) => ({ left: x })),
                                [{ right: right1 }],
                            ),
                        ),
                        [{ right: right2 }],
                    ).toArray(),
                    fn,
                ),
            ),
        )
    })

    it('types', () => {
        expectTypeOf(mapLefts([{ right: 'foo' }], (x: [never]) => `fn-${x[0]}` as const)).toEqualTypeOf<Right<'foo'>>()
        expectTypeOf(mapLefts([{ left: 'bar' }], (x: ['bar']) => `fn-${x[0]}`)).toEqualTypeOf<Left<'fn-bar'>>()

        expectTypeOf(mapLefts([{ right: 'bar' } as Either<'foo', 'bar'>], (x: ['foo']) => `fn-${x[0]}`)).toEqualTypeOf<
            Right<'bar'> | Left<'fn-foo'>
        >()

        expectTypeOf(
            mapLefts([{ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }], (x: ['foo']) => `fn-${x[0]}`),
        ).toEqualTypeOf<Right<'bar'> | Left<'fn-foo'>>()

        expectTypeOf(
            mapLefts([{ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>], (x: ['foo' | 1]) => `fn-${x[0]}`),
        ).toEqualTypeOf<Right<2 | 'bar'> | Left<'fn-foo' | 'fn-1'>>()
        expectTypeOf(
            mapLefts([{ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>], (x: ['foo' | 1]) => `fn-${x[0]}`),
        ).toEqualTypeOf<Right<2 | 'bar'> | Left<'fn-foo' | 'fn-1'>>()
    })
})

describe('whenLeft', () => {
    it('simple', () => {
        expect(whenLeft({ left: 0 }, (x) => ({ right: x }))).toMatchInlineSnapshot(`
          {
            "right": 0,
          }
        `)
        expect(whenLeft({ right: 0 }, (x) => ({ left: x }))).toMatchInlineSnapshot(`
          {
            "right": 0,
          }
        `)
    })

    it('right', () => {
        forAll(
            tuple(unknown(), func(integer())).map(([x, fn]) => [x, { right: x }, fn] as const),
            ([x, either, fn]) => {
                expect(whenLeft(either, (y) => ({ right: fn(y) }))).toEqual({ right: x })
            },
        )
    })

    it('left - right', () => {
        forAll(
            tuple(integer(), func(integer())).map(([x, fn]) => [x, { left: x }, fn] as const),
            ([x, either, fn]) => {
                expect(whenLeft(either, (y) => ({ right: fn(y) })).right).toEqual(fn(x))
            },
        )
    })

    it('left - left', () => {
        forAll(
            tuple(integer(), func(integer())).map(([x, fn]) => [x, { left: x }, fn] as const),
            ([x, either, fn]) => {
                expect(whenLeft(either, (y) => ({ left: fn(y) })).left).toEqual(fn(x))
            },
        )
    })

    it('types - left', () => {
        expectTypeOf(whenLeft({ right: 'foo' }, (x: never) => left(`fn-${x}` as const))).toEqualTypeOf<{
            readonly right: 'foo'
        }>()
        expectTypeOf(whenLeft({ left: 'bar' }, (x: 'bar') => left(`fn-${x}` as const))).toEqualTypeOf<{ left: 'fn-bar' }>()
        expectTypeOf(whenLeft({ left: 'bar' } as Either<'bar', 'foo'>, (x: 'bar') => left(`fn-${x}` as const))).toEqualTypeOf<
            Right<'foo'> | Left<'fn-bar'>
        >()

        expectTypeOf(
            whenLeft({ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }, (x: 'foo') => left(`fn-${x}` as const)),
        ).toEqualTypeOf<Left<'fn-foo'> | (Right<'bar'> & { fooz: 'baz' })>()

        expectTypeOf(
            whenLeft({ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>, (x: 'foo' | 1) => left(`fn-${x}` as const)),
        ).toEqualTypeOf<Right<2 | 'bar'> | Left<'fn-foo' | 'fn-1'>>()
        expectTypeOf(
            whenLeft({ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>, (x: 'foo' | 1) => left(`fn-${x}` as const)),
        ).toEqualTypeOf<Left<'fn-foo' | 'fn-1'> | Right<'bar'> | Right<2>>()
    })

    it('types - right', () => {
        expectTypeOf(whenLeft({ right: 'foo' }, (x: never) => right(`fn-${x}` as const))).toEqualTypeOf<{
            readonly right: 'foo'
        }>()
        expectTypeOf(whenLeft({ left: 'bar' }, (x: 'bar') => right(`fn-${x}` as const))).toEqualTypeOf<{ right: 'fn-bar' }>()
        expectTypeOf(whenLeft({ left: 'bar' } as Either<'bar', 'foo'>, (x: 'bar') => right(`fn-${x}` as const))).toEqualTypeOf<
            Right<'foo'> | Right<'fn-bar'>
        >()

        expectTypeOf(
            whenLeft({ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }, (x: 'foo') => right(`fn-${x}` as const)),
        ).toEqualTypeOf<Right<'fn-foo'> | (Right<'bar'> & { fooz: 'baz' })>()

        expectTypeOf(
            whenLeft({ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>, (x: 'foo' | 1) => right(`fn-${x}` as const)),
        ).toEqualTypeOf<Right<2 | 'bar'> | Right<'fn-foo' | 'fn-1'>>()
        expectTypeOf(
            whenLeft({ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>, (x: 'foo' | 1) => right(`fn-${x}` as const)),
        ).toEqualTypeOf<Right<'fn-foo' | 'fn-1'> | Right<'bar'> | Right<2>>()
    })
})

describe('whenLefts', () => {
    it('simple', () => {
        expect(whenLefts([{ left: 0 }, { right: 'a' }], ([_x0, x1]) => ({ right: x1 }))).toMatchInlineSnapshot(`
          {
            "right": "a",
          }
        `)
        expect(whenLefts([{ right: 0 }, { right: 'a' }], ([x0, x1]) => ({ left: [x0, x1] }))).toMatchInlineSnapshot(`
          {
            "right": 0,
          }
        `)

        // @ts-expect-error We only define 2 arguments in the tuple
        expect(whenLefts([{ right: 0 }, { right: 'a' }], ([x0, x1, x2]) => ({ left: [x0, x1, x2] }))).toMatchInlineSnapshot(`
          {
            "right": 0,
          }
        `)
        expect(whenLefts([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => ({ right: `${x0}${x1}` }))).toMatchInlineSnapshot(
            `
          {
            "right": "foo",
          }
        `,
        )
    })

    it('all left - right', () => {
        forAll(tuple(array(integer()), func(integer())), ([xs, fn]) => {
            expect(whenLefts(xs.map(left), (x) => right(fn(x)))).toEqual(right(fn(xs)))
        })
    })

    it('all left - left', () => {
        forAll(tuple(array(integer()), func(integer())), ([xs, fn]) => {
            expect(whenLefts(xs.map(left), (x) => left(fn(x)))).toEqual(left(fn(xs)))
        })
    })

    it('first right - right', () => {
        forAll(tuple(array(integer()), integer(), integer(), func(integer())), ([xs, right1, right2, fn]) => {
            expect(
                whenLefts(
                    concat(
                        shuffle(
                            concat(
                                xs.map((x) => ({ left: x })),
                                [{ right: right1 }],
                            ),
                        ),
                        [{ right: right2 }],
                    ).toArray(),
                    (x) => right(fn(x)),
                ),
            ).toEqual({ right: right1 })
        })
    })

    it('first right - left', () => {
        forAll(tuple(array(integer()), integer(), integer(), func(integer())), ([xs, right1, right2, fn]) => {
            expect(
                whenLefts(
                    concat(
                        shuffle(
                            concat(
                                xs.map((x) => ({ left: x })),
                                [{ right: right1 }],
                            ),
                        ),
                        [{ right: right2 }],
                    ).toArray(),
                    (x) => left(fn(x)),
                ),
            ).toEqual({ right: right1 })
        })
    })

    it('types - left', () => {
        expectTypeOf(whenLefts([{ right: 'foo' }], (x: [never]) => left(`fn-${x[0]}` as const))).toEqualTypeOf<Right<'foo'>>()
        expectTypeOf(whenLefts([{ left: 'bar' }], (x: ['bar']) => left(`fn-${x[0]}`))).toEqualTypeOf<Left<'fn-bar'>>()

        expectTypeOf(whenLefts([{ right: 'bar' } as Either<'foo', 'bar'>], (x: ['foo']) => left(`fn-${x[0]}`))).toEqualTypeOf<
            Right<'bar'> | Left<'fn-foo'>
        >()

        expectTypeOf(
            whenLefts([{ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }], (x: ['foo']) => left(`fn-${x[0]}`)),
        ).toEqualTypeOf<Right<'bar'> | Left<'fn-foo'>>()

        expectTypeOf(
            whenLefts([{ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>], (x: ['foo' | 1]) => left(`fn-${x[0]}`)),
        ).toEqualTypeOf<Right<2 | 'bar'> | Left<'fn-foo' | 'fn-1'>>()
        expectTypeOf(
            whenLefts([{ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>], (x: ['foo' | 1]) => left(`fn-${x[0]}`)),
        ).toEqualTypeOf<Right<2 | 'bar'> | Left<'fn-foo' | 'fn-1'>>()
    })

    it('types - right', () => {
        expectTypeOf(whenLefts([{ right: 'foo' }], (x: [never]) => right(`fn-${x[0]}` as const))).toEqualTypeOf<Right<'foo'>>()
        expectTypeOf(whenLefts([{ left: 'bar' }], (x: ['bar']) => right(`fn-${x[0]}`))).toEqualTypeOf<Right<'fn-bar'>>()

        expectTypeOf(whenLefts([{ right: 'bar' } as Either<'foo', 'bar'>], (x: ['foo']) => right(`fn-${x[0]}`))).toEqualTypeOf<
            Right<'bar'> | Right<'fn-foo'>
        >()

        expectTypeOf(
            whenLefts([{ right: 'bar' } as Either<'foo', 'bar'> & { fooz: 'baz' }], (x: ['foo']) => right(`fn-${x[0]}`)),
        ).toEqualTypeOf<Right<'bar'> | Right<'fn-foo'>>()

        expectTypeOf(
            whenLefts([{ right: 'bar' } as Either<'foo' | 1, 'bar' | 2>], (x: ['foo' | 1]) => right(`fn-${x[0]}`)),
        ).toEqualTypeOf<Right<'bar' | 2> | Right<'fn-foo' | 'fn-1'>>()
        expectTypeOf(
            whenLefts([{ right: 'bar' } as Either<'foo', 'bar'> | Either<1, 2>], (x: ['foo' | 1]) => right(`fn-${x[0]}`)),
        ).toEqualTypeOf<Right<2 | 'bar'> | Right<'fn-foo' | 'fn-1'>>()
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
