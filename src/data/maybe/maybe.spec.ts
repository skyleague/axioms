import {
    asMaybe,
    leftToMaybe,
    maybeAsValue,
    maybeToLeft,
    maybeToRight,
    rightToMaybe,
    whenJust,
    whenJusts,
    whenNothing,
    whenNothings,
} from './maybe.js'

import { isJust, isLeft, isNothing, isRight } from '../../guard/index.js'
import { equal } from '../../iterator/equal/index.js'
import { concat } from '../../iterator/index.js'
import { array, deterministicInteger, forAll, integer, object, shuffle, unknown } from '../../random/index.js'
import type { Either, Maybe } from '../../type/index.js'
import { Nothing } from '../../type/index.js'
import { whenLeft, whenRight } from '../either/index.js'

import { assertType, describe, expect, expectTypeOf, it } from 'vitest'
import type { Left, Right } from '../../type/either/either.js'

class FooError extends Error {
    public foo() {
        return 'foo'
    }
}
class BarError extends Error {
    public bar() {
        return 'yolo'
    }
}

describe('leftToMaybe', () => {
    it('simple', () => {
        expect(leftToMaybe({ left: 'foo' })).toMatchInlineSnapshot(`"foo"`)
        expect(leftToMaybe({ right: 'foo' })).toMatchInlineSnapshot('Symbol((Nothing))')
    })

    it('left', () => {
        forAll(unknown(), (x) => leftToMaybe({ left: x }) === x)
    })

    it('right', () => {
        forAll(unknown(), (x) => isNothing(leftToMaybe({ right: x })))
    })

    it('unions', () => {
        const a: Either<FooError, boolean> = { right: true } as any
        const b = whenRight(a, (c): Either<BarError, Nothing> => (c ? { right: Nothing } : { left: new BarError() }))
        let x = leftToMaybe(b)
        expect(x).toEqual(Nothing)
        if (!isJust(x)) {
            x = new FooError('wut')
        }
        expect(x).toEqual(new FooError('wut'))
    })

    it('types', () => {
        expectTypeOf(leftToMaybe({ left: 42 })).toEqualTypeOf<42>()
        expectTypeOf(leftToMaybe({ right: 42 })).toEqualTypeOf<Nothing>()
        expectTypeOf(leftToMaybe({ right: 42 } as Either<unknown, 42>)).toEqualTypeOf<unknown>()
        expectTypeOf(leftToMaybe({ right: 42 } as Either<42, unknown>)).toEqualTypeOf<Maybe<42>>()
    })
})

describe('rightToMaybe', () => {
    it('simple', () => {
        expect(rightToMaybe({ right: 'foo' })).toMatchInlineSnapshot(`"foo"`)
        expect(rightToMaybe({ left: 'foo' })).toMatchInlineSnapshot('Symbol((Nothing))')
    })

    it('right', () => {
        forAll(unknown(), (x) => rightToMaybe({ right: x }) === x)
    })

    it('left', () => {
        forAll(unknown(), (x) => isNothing(rightToMaybe({ left: x })))
    })

    it('unions', () => {
        const a: Either<boolean, FooError> = { left: true } as any
        const b = whenLeft(a, (c): Either<Nothing, BarError> => (c ? { left: Nothing } : { right: new BarError() }))
        let x = rightToMaybe(b)
        expect(x).toEqual(Nothing)
        if (!isJust(x)) {
            x = new FooError('wut')
        }
        expect(x).toEqual(new FooError('wut'))
    })

    it('types', () => {
        expectTypeOf(rightToMaybe({ left: 42 })).toEqualTypeOf<Nothing>()
        expectTypeOf(rightToMaybe({ right: 42 })).toEqualTypeOf<42>()
        expectTypeOf(rightToMaybe({ right: 42 } as Either<unknown, 42>)).toEqualTypeOf<Maybe<42>>()
        expectTypeOf(rightToMaybe({ right: 42 } as Either<42, unknown>)).toEqualTypeOf<Maybe<unknown>>()
    })
})

describe('maybeToRight', () => {
    it('simple', () => {
        expect(maybeToRight('foo', 'foobar')).toMatchInlineSnapshot(`
            {
              "right": "foo",
            }
        `)
        expect(maybeToRight(Nothing, 'foobar')).toMatchInlineSnapshot(`
            {
              "left": "foobar",
            }
        `)
    })

    it('right', () => {
        forAll(object({ right: unknown({ nothing: false }), left: unknown() }), ({ right, left }) =>
            equal(maybeToRight(right, left), { right }),
        )
    })

    it('left', () => {
        forAll(unknown(), (left) => equal(maybeToRight(Nothing, left), { left }))
    })

    it('union', () => {
        const a: Maybe<BarError> | Maybe<FooError> = new BarError() as any
        let x = maybeToRight(a, Nothing)
        expect(x).toEqual({ right: new BarError() })
        if (isRight(x)) {
            x = { right: new FooError('wut') }
        }
        expect(x).toEqual({ right: new FooError('wut') })
    })

    it('types', () => {
        expectTypeOf(maybeToRight(42, 'fallback')).toEqualTypeOf<Right<42>>()
        expectTypeOf(maybeToRight(Nothing, 'fallback')).toEqualTypeOf<Left<'fallback'>>()
        expectTypeOf(maybeToRight(Nothing as Maybe<42>, 'fallback')).toEqualTypeOf<Either<'fallback', 42>>()
    })
})

describe('maybeToLeft', () => {
    it('simple', () => {
        expect(maybeToLeft('foo', 'foobar')).toMatchInlineSnapshot(`
            {
              "left": "foo",
            }
        `)
        expect(maybeToLeft(Nothing, 'foobar')).toMatchInlineSnapshot(`
            {
              "right": "foobar",
            }
        `)
    })

    it('left', () => {
        forAll(object({ left: unknown({ nothing: false }), right: unknown() }), ({ right, left }) =>
            equal(maybeToLeft(left, right), { left }),
        )
    })

    it('right', () => {
        forAll(unknown(), (right) => equal(maybeToLeft(Nothing, right), { right }))
    })

    it('union', () => {
        const a: Maybe<BarError> | Maybe<FooError> = new BarError() as any
        let x = maybeToLeft(a, Nothing)
        expect(x).toEqual({ left: new BarError() })
        if (isLeft(x)) {
            x = { left: new FooError('wut') }
        }
        expect(x).toEqual({ left: new FooError('wut') })
    })

    it('types', () => {
        expectTypeOf(maybeToLeft(42, 'fallback')).toEqualTypeOf<Left<42>>()
        expectTypeOf(maybeToLeft(Nothing, 'fallback')).toEqualTypeOf<Right<'fallback'>>()
        expectTypeOf(maybeToLeft(Nothing as Maybe<42>, 'fallback')).toEqualTypeOf<Either<42, 'fallback'>>()
    })
})

describe('maybeAsValue', () => {
    it('simple', () => {
        expect(maybeAsValue('foobar')).toMatchInlineSnapshot(`"foobar"`)
        expect(maybeAsValue(Nothing)).toMatchInlineSnapshot('undefined')
    })

    it('just', () => {
        forAll(unknown({ nothing: false }), (just) => maybeAsValue(just) === just)
    })

    it('types', () => {
        expectTypeOf(maybeAsValue(42)).toEqualTypeOf<42>()
        expectTypeOf(maybeAsValue(Nothing)).toEqualTypeOf<undefined>()
        expectTypeOf(maybeAsValue(Nothing as Maybe<42>)).toEqualTypeOf<42 | undefined>()
    })
})

describe('whenJust', () => {
    it('simple', () => {
        expect(whenJust(0, (x) => `${x}${x}`)).toMatchInlineSnapshot(`"00"`)
        expect(whenJust(Nothing as Maybe<string>, (x) => `${x}${x}`)).toMatchInlineSnapshot('Symbol((Nothing))')
    })

    it('just', () => {
        forAll(unknown({ nothing: false }), (x) => equal(deterministicInteger(x), whenJust(x, deterministicInteger)))
    })

    it('types', () => {
        expectTypeOf(whenJust(Nothing, (_: never) => 'foobar' as const)).toEqualTypeOf<Nothing>()
        expectTypeOf(whenJust(42, (_: 42) => 'foobar' as const)).toEqualTypeOf<'foobar'>()

        expectTypeOf(whenJust(Nothing, (_: never) => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Nothing>()
        expectTypeOf(whenJust(42, (_: 42) => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Maybe<'foobar'>>()

        expectTypeOf(whenJust(Nothing as Maybe<42>, (_: 42) => 'foobar' as const)).toEqualTypeOf<Maybe<42> | 'foobar'>()
        expectTypeOf(whenJust(Nothing as Maybe<42>, (_: 42) => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Maybe<42 | 'foobar'>>()
    })
})

describe('whenJusts', () => {
    it('simple', () => {
        expect(whenJusts([Nothing, 'a'], ([_x0, x1]) => x1)).toMatchInlineSnapshot('Symbol((Nothing))')
        expect(whenJusts([0, 'a'], ([x0, x1]) => [x0, x1])).toMatchInlineSnapshot(`
                  [
                    0,
                    "a",
                  ]
          `)

        // @ts-expect-error We only define 2 arguments in the tuple
        expect(whenJusts([0, 'a'], ([x0, x1, x2]) => [x0, x1, x2])).toMatchInlineSnapshot(`
                  [
                    0,
                    "a",
                    undefined,
                  ]
          `)
        expect(whenJusts(['foo', 'bar'], ([x0, x1]) => `${x0}${x1}`)).toMatchInlineSnapshot(`"foobar"`)
    })

    it('all just', () => {
        forAll(array(integer()), (xs) => equal(deterministicInteger(xs), whenJusts(xs, deterministicInteger)))
    })

    it('first nothing', () => {
        forAll(array(integer()), (xs) => isNothing(whenJusts(shuffle(concat(xs, [Nothing])), deterministicInteger)))
    })

    it('types', () => {
        expectTypeOf(whenJusts([Nothing], (_: never[]) => 'foobar' as const)).toEqualTypeOf<Nothing>()
        expectTypeOf(whenJusts([42], (_: [42]) => 'foobar' as const)).toEqualTypeOf<'foobar'>()

        expectTypeOf(whenJusts([Nothing], (_: never[]) => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Nothing>()
        expectTypeOf(whenJusts([42], (_: [42]) => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Maybe<'foobar'>>()

        expectTypeOf(whenJusts([Nothing as Maybe<42>], (_: [42]) => 'foobar' as const)).toEqualTypeOf<Nothing | 'foobar'>()
        expectTypeOf(whenJusts([Nothing as Maybe<42>], (_: [42]) => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<
            Nothing | 'foobar'
        >()
    })
})

describe('whenNothing', () => {
    it('simple', () => {
        expect(whenNothing(Nothing, () => 'foobar')).toMatchInlineSnapshot(`"foobar"`)
        expect(whenNothing(0, () => 'foobar')).toMatchInlineSnapshot('0')
    })

    it('just', () => {
        forAll(unknown({ nothing: false }), (x) => equal(deterministicInteger(x), whenJust(x, deterministicInteger)))
    })

    it('types', () => {
        expectTypeOf(whenNothing(Nothing, () => 'foobar' as const)).toEqualTypeOf<'foobar'>()
        expectTypeOf(whenNothing(42, () => 'foobar' as const)).toEqualTypeOf<42>()

        expectTypeOf(whenNothing(Nothing, () => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Maybe<'foobar'>>()
        expectTypeOf(whenNothing(42, () => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<42>()

        expectTypeOf(whenNothing(Nothing as Maybe<42>, () => 'foobar' as const)).toEqualTypeOf<Maybe<42> | 'foobar'>()
        expectTypeOf(whenNothing(Nothing as Maybe<42>, () => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Maybe<42 | 'foobar'>>()
    })
})

describe('whenNothings', () => {
    it('simple', () => {
        expect(whenNothings([Nothing], () => 'foobar')).toEqual('foobar')
        expect(whenNothings([0], () => 'foobar')).toEqual(Nothing)
    })

    it('all nothing', () => {
        forAll(array(integer()), (xs) => {
            expect(
                whenNothings(
                    xs.map(() => Nothing),
                    () => xs,
                ),
            ).toEqual(xs)
        })
    })

    it('first just', () => {
        forAll([array(integer()), integer()], ([xs, x]) => {
            expect(
                whenNothings(
                    shuffle(
                        concat(
                            xs.map(() => Nothing),
                            [x],
                        ),
                    ),
                    () => xs,
                ),
            ).toEqual(Nothing)
        })
    })

    it('types', () => {
        expectTypeOf(whenNothings([Nothing], () => 'foobar' as const)).toEqualTypeOf<'foobar'>()
        expectTypeOf(whenNothings([42], () => 'foobar' as const)).toEqualTypeOf<Nothing>()

        expectTypeOf(whenNothings([Nothing], () => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Maybe<'foobar'>>()
        expectTypeOf(whenNothings([42], () => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Nothing>()

        expectTypeOf(whenNothings([Nothing as Maybe<42>], () => 'foobar' as const)).toEqualTypeOf<Nothing | 'foobar'>()
        expectTypeOf(whenNothings([Nothing as Maybe<42>], () => 'foobar' as Maybe<'foobar'>)).toEqualTypeOf<Maybe<'foobar'>>()
    })
})

describe('asMaybe', () => {
    it('simple', () => {
        expect(asMaybe('foobar')).toMatchInlineSnapshot(`"foobar"`)
        expect(asMaybe(undefined)).toMatchInlineSnapshot('Symbol((Nothing))')
    })

    it('type exclusion', () => {
        assertType<Maybe<'foobar'>>(asMaybe('foobar'))
        assertType<Nothing>(asMaybe('foobar', 'foobar'))
        const foo: string | undefined = undefined as unknown as string | undefined
        assertType<Maybe<string>>(asMaybe(foo))
        assertType<Maybe<string | undefined>>(asMaybe(foo, 'foobar'))
    })

    it('just', () => {
        forAll(unknown({ undefined: false }), (just) => asMaybe(just) === just)
    })

    it('types', () => {
        expectTypeOf(asMaybe(42)).toEqualTypeOf<42>()
        expectTypeOf(asMaybe(undefined)).toEqualTypeOf<Nothing>()
        expectTypeOf(asMaybe(undefined as 42 | undefined)).toEqualTypeOf<Maybe<42>>()

        expectTypeOf(asMaybe(42, 'foobar')).toEqualTypeOf<42>()
        expectTypeOf(asMaybe(undefined, 'foobar')).toEqualTypeOf<undefined>()
        expectTypeOf(asMaybe(undefined as 42 | undefined, 'foobar')).toEqualTypeOf<42 | undefined>()

        expectTypeOf(asMaybe('foobar', 'foobar')).toEqualTypeOf<Nothing>()
        expectTypeOf(asMaybe(42 as 42 | 'foobar', 'foobar')).toEqualTypeOf<Maybe<42>>()
    })
})
