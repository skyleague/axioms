import { omitUndefined, omit, omitBy } from './index.js'

import type { OmitUndefined } from './omit.js'

import { all, equal } from '../../iterator/index.js'
import { forAll, dict, unknown, deterministicBoolean } from '../../random/index.js'
import { keysOf, pickBy } from '../index.js'

describe('omitUndefined', () => {
    test('omitUndefined x === identity, if all values defined', () => {
        forAll(dict(unknown({ undefined: false })), (x) => equal(omitUndefined(x), x))
    })

    test('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitUndefined(x)
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    test('key in filtered if not omitted', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitUndefined(x)
            return all(keysOf(x), (k) => (x[k] !== undefined ? k in filtered : !(k in filtered) && k in x))
        })
    })

    test('type is valid', () => {
        interface Foo {
            foo: string
            bar: string | undefined
        }
        const _foo: OmitUndefined<Foo> = {
            foo: 'foo',
        }
        const _bar: { foo: string; bar?: string } = { foo: 'foo' } as OmitUndefined<Foo>
    })
})

describe('omitBy', () => {
    test('omitBy false x === identity', () => {
        forAll(dict(unknown()), (x) =>
            equal(
                omitBy(x, () => false),
                x
            )
        )
    })

    test('omitBy false x !== [ref] x', () => {
        forAll(dict(unknown()), (x) => omitBy(x, () => false) !== x)
    })

    test('omitBy true x == {}', () => {
        forAll(dict(unknown()), (x) =>
            equal(
                omitBy(x, () => true),
                {}
            )
        )
    })

    test('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitBy(x, (key) => deterministicBoolean(key))
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    test('key filtered if not picked', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitBy(x, ([k]) => deterministicBoolean(k))
            return all(keysOf(x), (k) => !(deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })

    test('omitBy ~ pickBy', () => {
        forAll(dict(unknown()), (x) => {
            const omitted = omitBy(x, ([k]) => deterministicBoolean(k))
            const picked = pickBy(x, ([k]) => !deterministicBoolean(k))
            return equal(omitted, picked)
        })
    })
})

describe('omit', () => {
    test('simple', () => {
        expect(omit({ foo: 'bar', bar: 'foo', baz: 'baz' }, ['foo', 'bar'])).toMatchInlineSnapshot(`
            {
              "baz": "baz",
            }
        `)
    })

    test('omit [] x === identity', () => {
        forAll(dict(unknown()), (x) => equal(omit(x, []), x))
    })

    test('omit [] x !== [ref] x', () => {
        forAll(dict(unknown()), (x) => omit(x, []) !== x)
    })

    test('omit keysOf x x == {}', () => {
        forAll(dict(unknown()), (x) => equal(omit(x, keysOf(x)), {}))
    })

    test('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omit(x, keysOf(x).filter(deterministicBoolean))
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    test('key filtered if not omited', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omit(x, keysOf(x).filter(deterministicBoolean))
            return all(keysOf(x), (k) => (!deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })
})
