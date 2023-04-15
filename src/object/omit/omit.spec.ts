import { omitUndefined, omit, omitBy } from './index.js'

import type { OmitUndefined } from './omit.js'

import { all, equal } from '../../iterator/index.js'
import { forAll, dict, unknown, deterministicBoolean } from '../../random/index.js'
import { keysOf, pickBy } from '../index.js'

import { expect, describe, it } from 'vitest'

describe('omitUndefined', () => {
    it('omitUndefined x === identity, if all values defined', () => {
        forAll(dict(unknown({ undefined: false })), (x) => equal(omitUndefined(x), x))
    })

    it('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitUndefined(x)
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    it('key in filtered if not omitted', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitUndefined(x)
            return all(keysOf(x), (k) => (x[k] !== undefined ? k in filtered : !(k in filtered) && k in x))
        })
    })

    it('type is valid', () => {
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
    it('omitBy false x === identity', () => {
        forAll(dict(unknown()), (x) =>
            equal(
                omitBy(x, () => false),
                x
            )
        )
    })

    it('omitBy false x !== [ref] x', () => {
        forAll(dict(unknown()), (x) => omitBy(x, () => false) !== x)
    })

    it('omitBy true x == {}', () => {
        forAll(dict(unknown()), (x) =>
            equal(
                omitBy(x, () => true),
                {}
            )
        )
    })

    it('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitBy(x, (key) => deterministicBoolean(key))
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    it('key filtered if not picked', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitBy(x, ([k]) => deterministicBoolean(k))
            return all(keysOf(x), (k) => !(deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })

    it('omitBy ~ pickBy', () => {
        forAll(dict(unknown()), (x) => {
            const omitted = omitBy(x, ([k]) => deterministicBoolean(k))
            const picked = pickBy(x, ([k]) => !deterministicBoolean(k))
            return equal(omitted, picked)
        })
    })
})

describe('omit', () => {
    it('simple', () => {
        expect(omit({ foo: 'bar', bar: 'foo', baz: 'baz' }, ['foo', 'bar'])).toMatchInlineSnapshot(`
            {
              "baz": "baz",
            }
        `)
    })

    it('omit [] x === identity', () => {
        forAll(dict(unknown()), (x) => equal(omit(x, []), x))
    })

    it('omit [] x !== [ref] x', () => {
        forAll(dict(unknown()), (x) => omit(x, []) !== x)
    })

    it('omit keysOf x x == {}', () => {
        forAll(dict(unknown()), (x) => equal(omit(x, keysOf(x)), {}))
    })

    it('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omit(x, keysOf(x).filter(deterministicBoolean))
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    it('key filtered if not omited', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omit(x, keysOf(x).filter(deterministicBoolean))
            return all(keysOf(x), (k) => (!deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })
})
