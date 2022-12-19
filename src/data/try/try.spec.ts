import {
    asTry,
    failure,
    mapTry,
    recoverTry,
    transformTry,
    tryAsValue,
    tryFromEither,
    tryToEither,
    tryToError,
    tryToMaybe,
} from './try'

import { isFailure } from '../../guard/is-failure'
import { isSuccess } from '../../guard/is-success'
import { isThrown } from '../../guard/is-thrown'
import { asyncForAll, forAll, primitive, string, tuple } from '../../random'
import type { AsyncConstExpr, Either, Maybe, Promisable, Try } from '../../type'
import { Nothing } from '../../type'
import { left, right } from '../either'

describe('asTry', () => {
    test('const', () => {
        forAll(primitive(), (x) => {
            const value: Try<typeof x> = asTry(x)
            return value === x && !isThrown(value)
        })
    })

    test('const fn', () => {
        forAll(primitive(), (x) => {
            const value: Try<typeof x> = asTry(() => x)
            return isSuccess(value) && value === x && !isThrown(value)
        })
    })

    test('const fn throws', () => {
        forAll(string(), (x) => {
            const value: Try<typeof x> = asTry((): string => {
                throw new Error(x)
            })
            return isFailure(value) && value.message === x && isThrown(value)
        })
    })

    test('async const', async () => {
        await asyncForAll(primitive(), async (x) => {
            const value: Try<typeof x> = await asTry(async () => await Promise.resolve(x))
            return isSuccess(value) && value === x && !isThrown(x)
        })
    })

    test('async const rejects', async () => {
        await asyncForAll(string(), async (x) => {
            const value: Try<typeof x> = await asTry(async (): Promise<string> => await Promise.reject(new Error(x)))
            return isFailure(value) && value.message === x && isThrown(value)
        })
    })

    test('async const rejects no await', async () => {
        await asyncForAll(string(), async (x) => {
            const value: Try<typeof x> = await asTry(async (): Promise<string> => Promise.reject(new Error(x)))
            return isFailure(value) && value.message === x && isThrown(value)
        })
    })

    test('async const throws', async () => {
        await asyncForAll(string(), async (x) => {
            // eslint-disable-next-line @typescript-eslint/require-await
            const value: Try<typeof x> = await asTry(async (): Promise<string> => {
                throw new Error(x)
            })
            return isFailure(value) && value.message === x && isThrown(value)
        })
    })

    test('distributed type', async () => {
        const fn: AsyncConstExpr<string> = (() => 'foobar') as AsyncConstExpr<string>
        const _x: Try<string> = await asTry(fn)
    })

    test('promisable type', async () => {
        const fn: () => Promisable<string> = (() => 'foobar') as () => Promisable<string>
        const _x: Try<string> = await asTry(fn)
    })

    test('async tryexpr type', async () => {
        // eslint-disable-next-line @typescript-eslint/require-await
        const fn = async () => asTry(() => 'foo') as Try<string>
        const _x: Try<string> = await asTry(fn)
    })

    test('tryexpr type', () => {
        const fn = () => asTry(() => 'foo') as Try<string>
        const _x: Try<string> = asTry(fn)
    })
})

describe('transformTry', () => {
    test('promisable type', async () => {
        const fn: () => Promisable<string> = (() => 'foobar') as () => Promisable<string>
        const _x: Try<string> = await transformTry('foobar', fn, fn)
    })

    test('promisable try type', async () => {
        const fn: () => Promisable<Try<string>> = (() => 'foobar') as () => Promisable<Try<string>>
        const _x: Try<string> = await transformTry('foobar', fn, fn)
    })

    test('mixed promisable try type', async () => {
        const fn: () => Promisable<Try<string>> = (() => 'foobar') as () => Promisable<Try<string>>
        const fn2 = () => 'foobar'
        const _x: Try<string> = await transformTry('foobar', fn, fn2)
    })

    test('inferred type', async () => {
        const _x: Try<string> = await transformTry(
            'foobar',
            async () => Promise.resolve('foobar'),
            // eslint-disable-next-line @typescript-eslint/require-await
            async () => new Error('foobar')
        )
    })
})

describe('mapTry', () => {
    test('success is mapped', () => {
        forAll(tuple(primitive(), primitive()), ([x1, x2]) => {
            const value: Try<typeof x2> = mapTry(x1, () => x2)
            return value === x2
        })
    })

    test('failure is not mapped', () => {
        forAll(tuple(primitive().map(failure), primitive()), ([x1, x2]) => {
            const value: Try<typeof x2> = mapTry(x1, () => x2)
            expect(value).toEqual(x1)
        })
    })

    test('promisable type', async () => {
        const fn: () => Promisable<string> = (() => 'foobar') as () => Promisable<string>
        const _x: Try<string> = await mapTry('foobar', fn)
    })

    test('promisable try type', async () => {
        const fn: () => Promisable<Try<string>> = (() => 'foobar') as () => Promisable<Try<string>>
        const _x: Try<string> = await mapTry('foobar', fn)
    })

    test('inferred type', async () => {
        const _x: Try<string> = await mapTry('foobar', async () => Promise.resolve('foobar'))
    })
})

describe('recoverTry', () => {
    test('failure is mapped', () => {
        forAll(tuple(primitive().map(failure), primitive()), ([x1, x2]) => {
            const value: Try<typeof x2> = recoverTry(x1, () => x2)
            expect(value).toEqual(x2)
        })
    })

    test('success is not mapped', () => {
        forAll(tuple(primitive(), primitive()), ([x1, x2]) => {
            const value: Try<typeof x2> = recoverTry(x1, () => x2)
            expect(value).toEqual(x1)
        })
    })

    test('promisable type', async () => {
        const fn: () => Promisable<string> = (() => 'foobar') as () => Promisable<string>
        const _x: Try<string> = await recoverTry('foobar', fn)
    })

    test('promisable try type', async () => {
        const fn: () => Promisable<Try<string>> = (() => 'foobar') as () => Promisable<Try<string>>
        const _x: Try<string> = await recoverTry('foobar', fn)
    })

    test('inferred type', async () => {
        const _x: Try<string> = await recoverTry('foobar', async () => Promise.resolve('foobar'))
    })
})

describe('tryToEither', () => {
    test('simple', () => {
        const x: Try<string> = 'foobar'
        const either: Either<Error, string> = tryToEither(x)
        expect(either).toEqual({ right: x })
    })

    test('failure is left', () => {
        forAll(primitive().map(failure), (x) => {
            expect(tryToEither(x)).toEqual({ left: x })
        })
    })

    test('success is right', () => {
        forAll(tuple(primitive()), ([x]) => {
            expect(tryToEither(x)).toEqual({ right: x })
        })
    })
})

describe('tryFromEither', () => {
    test('simple', () => {
        const either = { right: 'foobar' }
        const x: Try<string> = tryFromEither(either)
        expect(x).toEqual('foobar')
    })

    test('left is failure', () => {
        forAll(primitive().map(left), (x) => {
            expect(tryFromEither(x)).toEqual(failure(x.left))
        })
    })

    test('primitive left is failure', () => {
        forAll(primitive().map(left), (x) => {
            expect(tryFromEither(x)).toEqual(failure(x.left))
        })
    })

    test('right is success', () => {
        forAll(primitive().map(right), (x) => {
            expect(tryFromEither(x)).toEqual(x.right)
        })
    })
})

describe('tryToMaybe', () => {
    test('simple', () => {
        const val = 'foobar'
        const x: Maybe<string> = tryToMaybe(val)
        expect(x).toEqual('foobar')
    })

    test('failure is nothing', () => {
        forAll(primitive().map(failure), (x) => {
            expect(tryToMaybe(x)).toEqual(Nothing)
        })
    })

    test('success is just', () => {
        forAll(primitive(), (x) => {
            expect(tryToMaybe(x)).toEqual(x)
        })
    })
})

describe('tryAsValue', () => {
    test('simple', () => {
        const val = 'foobar'
        const x: string | undefined = tryAsValue(val)
        expect(x).toEqual('foobar')
    })

    test('failure is undefined', () => {
        forAll(primitive().map(failure), (x) => {
            expect(tryAsValue(x)).toEqual(undefined)
        })
    })

    test('success is just', () => {
        forAll(primitive(), (x) => {
            expect(tryAsValue(x)).toEqual(x)
        })
    })
})

describe('tryToError', () => {
    test('simple', () => {
        const val = 'foobar'
        const x: string = tryToError(val)
        expect(x).toEqual('foobar')
    })

    test('simple failure', () => {
        const val = failure('foobar')
        expect(() => {
            const _x: never = tryToError(val)
        }).toThrowError()
    })

    test('failure is throwing', () => {
        forAll(primitive().map(failure), (x) => {
            expect(() => tryToError(x)).toThrowError()
        })
    })

    test('success is value', () => {
        forAll(primitive(), (x) => {
            expect(tryToError(x)).toEqual(x)
        })
    })
})
