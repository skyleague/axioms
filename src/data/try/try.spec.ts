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
} from './try.js'

import { isFailure } from '../../guard/is-failure/index.js'
import { isSuccess } from '../../guard/is-success/index.js'
import { isThrown } from '../../guard/is-thrown/index.js'
import { asyncForAll, forAll, primitive, string, tuple } from '../../random/index.js'
import type { AsyncConstExpr, Either, Maybe, Promisable, Try } from '../../type/index.js'
import { Nothing } from '../../type/index.js'
import { left, right } from '../either/index.js'

import { expect, describe, it } from 'vitest'

describe('asTry', () => {
    it('const', () => {
        forAll(primitive(), (x) => {
            const value: Try<typeof x> = asTry(x)
            return value === x && !isThrown(value)
        })
    })

    it('const fn', () => {
        forAll(primitive(), (x) => {
            const value: Try<typeof x> = asTry(() => x)
            return isSuccess(value) && value === x && !isThrown(value)
        })
    })

    it('const fn throws', () => {
        forAll(string(), (x) => {
            const value: Try<typeof x> = asTry((): string => {
                throw new Error(x)
            })
            return isFailure(value) && value.message === x && isThrown(value)
        })
    })

    it('async const', async () => {
        await asyncForAll(primitive(), async (x) => {
            const value: Try<typeof x> = await asTry(async () => await Promise.resolve(x))
            return isSuccess(value) && value === x && !isThrown(x)
        })
    })

    it('async const rejects', async () => {
        await asyncForAll(string(), async (x) => {
            const value: Try<typeof x> = await asTry(async (): Promise<string> => await Promise.reject(new Error(x)))
            return isFailure(value) && value.message === x && isThrown(value)
        })
    })

    it('async const rejects no await', async () => {
        await asyncForAll(string(), async (x) => {
            const value: Try<typeof x> = await asTry(async (): Promise<string> => Promise.reject(new Error(x)))
            return isFailure(value) && value.message === x && isThrown(value)
        })
    })

    it('async const throws', async () => {
        await asyncForAll(string(), async (x) => {
            // eslint-disable-next-line @typescript-eslint/require-await
            const value: Try<typeof x> = await asTry(async (): Promise<string> => {
                throw new Error(x)
            })
            return isFailure(value) && value.message === x && isThrown(value)
        })
    })

    it('distributed type', async () => {
        const fn: AsyncConstExpr<string> = (() => 'foobar') as AsyncConstExpr<string>
        const _x: Try<string> = await asTry(fn)
    })

    it('promisable type', async () => {
        const fn: () => Promisable<string> = (() => 'foobar') as () => Promisable<string>
        const _x: Try<string> = await asTry(fn)
    })

    it('async tryexpr type', async () => {
        // eslint-disable-next-line @typescript-eslint/require-await
        const fn = async () => asTry(() => 'foo') as Try<string>
        const _x: Try<string> = await asTry(fn)
    })

    it('tryexpr type', () => {
        const fn = () => asTry(() => 'foo') as Try<string>
        const _x: Try<string> = asTry(fn)
    })
})

describe('transformTry', () => {
    it('promisable type', async () => {
        const fn: () => Promisable<string> = (() => 'foobar') as () => Promisable<string>
        const _x: Try<string> = await transformTry('foobar', fn, fn)
    })

    it('promisable try type', async () => {
        const fn: () => Promisable<Try<string>> = (() => 'foobar') as () => Promisable<Try<string>>
        const _x: Try<string> = await transformTry('foobar', fn, fn)
    })

    it('mixed promisable try type', async () => {
        const fn: () => Promisable<Try<string>> = (() => 'foobar') as () => Promisable<Try<string>>
        const fn2 = () => 'foobar'
        const _x: Try<string> = await transformTry('foobar', fn, fn2)
    })

    it('inferred type', async () => {
        const _x: Try<string> = await transformTry(
            'foobar',
            async () => Promise.resolve('foobar'),
            // eslint-disable-next-line @typescript-eslint/require-await
            async () => new Error('foobar')
        )
    })
})

describe('mapTry', () => {
    it('success is mapped', () => {
        forAll(tuple(primitive(), primitive()), ([x1, x2]) => {
            const value: Try<typeof x2> = mapTry(x1, () => x2)
            return value === x2
        })
    })

    it('failure is not mapped', () => {
        forAll(tuple(primitive().map(failure), primitive()), ([x1, x2]) => {
            const value: Try<typeof x2> = mapTry(x1, () => x2)
            expect(value).toEqual(x1)
        })
    })

    it('promisable type', async () => {
        const fn: () => Promisable<string> = (() => 'foobar') as () => Promisable<string>
        const _x: Try<string> = await mapTry('foobar', fn)
    })

    it('promisable try type', async () => {
        const fn: () => Promisable<Try<string>> = (() => 'foobar') as () => Promisable<Try<string>>
        const _x: Try<string> = await mapTry('foobar', fn)
    })

    it('inferred type', async () => {
        const _x: Try<string> = await mapTry('foobar', async () => Promise.resolve('foobar'))
    })
})

describe('recoverTry', () => {
    it('failure is mapped', () => {
        forAll(tuple(primitive().map(failure), primitive()), ([x1, x2]) => {
            const value: Try<typeof x2> = recoverTry(x1, () => x2)
            expect(value).toEqual(x2)
        })
    })

    it('success is not mapped', () => {
        forAll(tuple(primitive(), primitive()), ([x1, x2]) => {
            const value: Try<typeof x2> = recoverTry(x1, () => x2)
            expect(value).toEqual(x1)
        })
    })

    it('promisable type', async () => {
        const fn: () => Promisable<string> = (() => 'foobar') as () => Promisable<string>
        const _x: Try<string> = await recoverTry('foobar', fn)
    })

    it('promisable try type', async () => {
        const fn: () => Promisable<Try<string>> = (() => 'foobar') as () => Promisable<Try<string>>
        const _x: Try<string> = await recoverTry('foobar', fn)
    })

    it('inferred type', async () => {
        const _x: Try<string> = await recoverTry('foobar', async () => Promise.resolve('foobar'))
    })
})

describe('tryToEither', () => {
    it('simple', () => {
        const x: Try<string> = 'foobar'
        const either: Either<Error, string> = tryToEither(x)
        expect(either).toEqual({ right: x })
    })

    it('failure is left', () => {
        forAll(primitive().map(failure), (x) => {
            expect(tryToEither(x)).toEqual({ left: x })
        })
    })

    it('success is right', () => {
        forAll(tuple(primitive()), ([x]) => {
            expect(tryToEither(x)).toEqual({ right: x })
        })
    })
})

describe('tryFromEither', () => {
    it('simple', () => {
        const either = { right: 'foobar' }
        const x: Try<string> = tryFromEither(either)
        expect(x).toEqual('foobar')
    })

    it('left is failure', () => {
        forAll(primitive().map(left), (x) => {
            expect(tryFromEither(x)).toEqual(failure(x.left))
        })
    })

    it('primitive left is failure', () => {
        forAll(primitive().map(left), (x) => {
            expect(tryFromEither(x)).toEqual(failure(x.left))
        })
    })

    it('right is success', () => {
        forAll(primitive().map(right), (x) => {
            expect(tryFromEither(x)).toEqual(x.right)
        })
    })
})

describe('tryToMaybe', () => {
    it('simple', () => {
        const val = 'foobar'
        const x: Maybe<string> = tryToMaybe(val)
        expect(x).toEqual('foobar')
    })

    it('failure is nothing', () => {
        forAll(primitive().map(failure), (x) => {
            expect(tryToMaybe(x)).toEqual(Nothing)
        })
    })

    it('success is just', () => {
        forAll(primitive(), (x) => {
            expect(tryToMaybe(x)).toEqual(x)
        })
    })
})

describe('tryAsValue', () => {
    it('simple', () => {
        const val = 'foobar'
        const x: string | undefined = tryAsValue(val)
        expect(x).toEqual('foobar')
    })

    it('failure is undefined', () => {
        forAll(primitive().map(failure), (x) => {
            expect(tryAsValue(x)).toEqual(undefined)
        })
    })

    it('success is just', () => {
        forAll(primitive(), (x) => {
            expect(tryAsValue(x)).toEqual(x)
        })
    })
})

describe('tryToError', () => {
    it('simple', () => {
        const val = 'foobar'
        const x: string = tryToError(val)
        expect(x).toEqual('foobar')
    })

    it('simple failure', () => {
        const val = failure('foobar')
        expect(() => {
            const _x: never = tryToError(val)
        }).toThrowError()
    })

    it('failure is throwing', () => {
        forAll(primitive().map(failure), (x) => {
            expect(() => tryToError(x)).toThrowError()
        })
    })

    it('success is value', () => {
        forAll(primitive(), (x) => {
            expect(tryToError(x)).toEqual(x)
        })
    })
})
