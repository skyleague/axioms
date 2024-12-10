import { omit, omitBy, omitUndefined } from './index.js'

import type { OmitUndefined } from './omit.js'

import { equal } from '../../iterator/index.js'
import { forAll, record, unknown } from '../../random/index.js'
import { keysOf, pickBy } from '../index.js'

import { describe, expect, it } from 'vitest'
import { boolean } from '../../random/types/boolean/boolean.js'
import { func } from '../../random/types/func/func.js'

describe('omitUndefined', () => {
    it('omitUndefined x === identity, if all values defined', () => {
        forAll(record(unknown({ undefined: false })), (x) => equal(omitUndefined(x), x))
    })

    it('key filtered in both filtered and original', () => {
        forAll(record(unknown()), (x) => {
            const filtered = omitUndefined(x)
            return keysOf(filtered).every((k) => k in x && k in filtered)
        })
    })

    it('key in filtered if not omitted', () => {
        forAll(record(unknown()), (x) => {
            const filtered = omitUndefined(x)
            return keysOf(x).every((k) => (x[k] !== undefined ? k in filtered : !(k in filtered) && k in x))
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
        forAll(record(unknown()), (x) =>
            equal(
                omitBy(x, () => false),
                x,
            ),
        )
    })

    it('omitBy false x !== [ref] x', () => {
        forAll(record(unknown()), (x) => omitBy(x, () => false) !== x)
    })

    it('omitBy true x == {}', () => {
        forAll(record(unknown()), (x) =>
            equal(
                omitBy(x, () => true),
                {},
            ),
        )
    })

    it('key filtered in both filtered and original', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const filtered = omitBy(x, fn)
            return keysOf(filtered).every((k) => k in x && k in filtered)
        })
    })

    it('key filtered if not picked', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const filtered = omitBy(x, ([k]) => fn(k))
            return keysOf(x).every((k) => !(fn(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })

    it('omitBy ~ pickBy', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const omitted = omitBy(x, ([k]) => fn(k))
            const picked = pickBy(x, ([k]) => !fn(k))
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
        forAll(record(unknown()), (x) => equal(omit(x, []), x))
    })

    it('omit [] x !== [ref] x', () => {
        forAll(record(unknown()), (x) => omit(x, []) !== x)
    })

    it('omit keysOf x x == {}', () => {
        forAll(record(unknown()), (x) => equal(omit(x, keysOf(x)), {}))
    })

    it('key filtered in both filtered and original', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const filtered = omit(
                x,
                keysOf(x).filter((x) => fn(x)),
            )
            return keysOf(filtered).every((k) => k in x && k in filtered)
        })
    })

    it('key filtered if not omited', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const filtered = omit(
                x,
                keysOf(x).filter((x) => fn(x)),
            )
            return keysOf(x).every((k) => (!fn(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })
})
