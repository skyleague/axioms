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
} from './maybe.js'

import { isJust, isLeft, isNothing, isRight } from '../../guard/index.js'
import { equal } from '../../iterator/equal/index.js'
import { concat } from '../../iterator/index.js'
import { array, deterministicInteger, forAll, integer, object, shuffle, unknown } from '../../random/index.js'
import type { Either, Maybe } from '../../type/index.js'
import { Nothing } from '../../type/index.js'
import { whenLeft, whenRight } from '../either/index.js'

import { expect, describe, it, assertType } from 'vitest'

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
        expect(leftToMaybe({ right: 'foo' })).toMatchInlineSnapshot(`Symbol((Nothing))`)
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
})

describe('rightToMaybe', () => {
    it('simple', () => {
        expect(rightToMaybe({ right: 'foo' })).toMatchInlineSnapshot(`"foo"`)
        expect(rightToMaybe({ left: 'foo' })).toMatchInlineSnapshot(`Symbol((Nothing))`)
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
            equal(maybeToRight(right, left), { right })
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
            equal(maybeToLeft(left, right), { left })
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
})

describe('maybeAsValue', () => {
    it('simple', () => {
        expect(maybeAsValue('foobar')).toMatchInlineSnapshot(`"foobar"`)
        expect(maybeAsValue(Nothing)).toMatchInlineSnapshot(`undefined`)
    })

    it('just', () => {
        forAll(unknown({ nothing: false }), (just) => maybeAsValue(just) === just)
    })
})

describe('whenJust', () => {
    it('simple', () => {
        expect(whenJust(0, (x) => `${x}${x}`)).toMatchInlineSnapshot(`"00"`)
        expect(whenJust<string>(Nothing, (x) => `${x}${x}`)).toMatchInlineSnapshot(`Symbol((Nothing))`)
    })

    it('just', () => {
        forAll(unknown({ nothing: false }), (x) => equal(deterministicInteger(x), whenJust(x, deterministicInteger)))
    })
})

describe('whenJusts', () => {
    it('simple', () => {
        expect(whenJusts([Nothing, 'a'], ([_x0, x1]) => x1)).toMatchInlineSnapshot(`Symbol((Nothing))`)
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
})

describe('whenNothing', () => {
    it('simple', () => {
        expect(whenNothing(Nothing, () => `foobar`)).toMatchInlineSnapshot(`"foobar"`)
        expect(whenNothing(0, () => `foobar`)).toMatchInlineSnapshot(`0`)
    })

    it('just', () => {
        forAll(unknown({ nothing: false }), (x) => equal(deterministicInteger(x), whenJust(x, deterministicInteger)))
    })
})

describe('asMaybe', () => {
    it('simple', () => {
        expect(asMaybe('foobar')).toMatchInlineSnapshot(`"foobar"`)
        expect(asMaybe(undefined)).toMatchInlineSnapshot(`Symbol((Nothing))`)
    })

    it('type exclusion', () => {
        assertType<Maybe<'foobar'>>(asMaybe('foobar'))
        assertType<Nothing>(asMaybe('foobar', 'foobar'))
        const foo: string | undefined = undefined as unknown as string | undefined
        assertType<Maybe<string>>(asMaybe(foo))
        assertType<Maybe<undefined>>(asMaybe(foo, 'foobar'))
    })

    it('just', () => {
        forAll(unknown({ undefined: false }), (just) => asMaybe(just) === just)
    })
})
