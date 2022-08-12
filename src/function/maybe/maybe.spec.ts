import { leftToMaybe, maybeToRight } from './maybe'

import { isJust, isRight } from '../../guard'
import type { Either, Maybe } from '../../type'
import { Nothing } from '../../type'
import { whenRight } from '../either'

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

test('leftToMaybe on unions', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const a: Either<FooError, boolean> = { right: true } as any
    const b = whenRight(a, (c): Either<BarError, Nothing> => (c ? { right: Nothing } : { left: new BarError() }))
    let x = leftToMaybe(b)
    expect(x).toEqual(Nothing)
    if (!isJust(x)) {
        x = new FooError('wut')
    }
    expect(x).toEqual(new FooError('wut'))
})

test('maybeToRight on union', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const a: Maybe<BarError> | Maybe<FooError> = new BarError() as any
    let x = maybeToRight(a, Nothing)
    expect(x).toEqual({ right: new BarError() })
    if (isRight(x)) {
        x = { right: new FooError('wut') }
    }
    expect(x).toEqual({ right: new FooError('wut') })
})
