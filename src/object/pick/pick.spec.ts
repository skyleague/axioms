import { pick, pickBy } from './index.js'

import { isNumber } from '../../guard/index.js'
import { equal } from '../../iterator/index.js'
import { forAll, record, unknown } from '../../random/index.js'
import { keysOf } from '../index.js'

import { describe, expect, it } from 'vitest'
import { boolean } from '../../random/types/boolean/boolean.js'
import { func } from '../../random/types/func/func.js'

describe('pickBy', () => {
    it('simple', () => {
        expect(pickBy({ foo: 1, bar: 'foo' }, ([, v]) => isNumber(v))).toMatchInlineSnapshot(`
            {
              "foo": 1,
            }
        `)
    })

    it('pickBy true x === identity', () => {
        forAll(record(unknown()), (x) =>
            equal(
                pickBy(x, () => true),
                x,
            ),
        )
    })

    it('pickBy true x !== [ref] x', () => {
        forAll(record(unknown()), (x) => pickBy(x, () => true) !== x)
    })

    it('pickBy false x == {}', () => {
        forAll(record(unknown()), (x) =>
            equal(
                pickBy(x, () => false),
                {},
            ),
        )
    })

    it('key filtered in both filtered and original', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const filtered = pickBy(x, ([k]) => fn(k))
            return keysOf(filtered).every((k) => k in x && k in filtered)
        })
    })

    it('key filtered if not picked', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const filtered = pickBy(x, ([k]) => fn(k))
            return keysOf(x).every((k) => (fn(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })
})

describe('pick', () => {
    it('simple', () => {
        expect(pick({ foo: 'bar', bar: 'foo', baz: 'baz' }, ['foo', 'bar'])).toMatchInlineSnapshot(`
            {
              "bar": "foo",
              "foo": "bar",
            }
        `)
    })

    it('pick keysOf x x === identity', () => {
        forAll(record(unknown()), (x) => equal(pick(x, keysOf(x)), x))
    })

    it('pick keysOf x x !== [ref] x', () => {
        forAll(record(unknown()), (x) => pick(x, keysOf(x)) !== x)
    })

    it('pick [] x == {}', () => {
        forAll(record(unknown()), (x) => equal(pick(x, []), {}))
    })

    it('key filtered in both filtered and original', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const filtered = pick(
                x,
                keysOf(x).filter((x) => fn(x)),
            )
            return keysOf(filtered).every((k) => k in x && k in filtered)
        })
    })

    it('key filtered if not picked', () => {
        forAll([record(unknown()), func(boolean())], ([x, fn]) => {
            const filtered = pick(
                x,
                keysOf(x).filter((x) => fn(x)),
            )
            return keysOf(x).every((k) => (fn(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })

    it('infers correct type', () => {
        const orignal = {
            foo: 'bar' as const,
            fooz: 'baz' as const,
        }
        const picked: { foo: 'bar' } = pick(orignal, ['foo'])
        expect(picked).toMatchInlineSnapshot(`
            {
              "foo": "bar",
            }
        `)
    })
})
