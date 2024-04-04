import { pick, pickBy } from './index.js'

import { isNumber } from '../../guard/index.js'
import { all, equal } from '../../iterator/index.js'
import { forAll, record, unknown, deterministicBoolean } from '../../random/index.js'
import { keysOf } from '../index.js'

import { expect, describe, it } from 'vitest'

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
                x
            )
        )
    })

    it('pickBy true x !== [ref] x', () => {
        forAll(record(unknown()), (x) => pickBy(x, () => true) !== x)
    })

    it('pickBy false x == {}', () => {
        forAll(record(unknown()), (x) =>
            equal(
                pickBy(x, () => false),
                {}
            )
        )
    })

    it('key filtered in both filtered and original', () => {
        forAll(record(unknown()), (x) => {
            const filtered = pickBy(x, (key) => deterministicBoolean(key))
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    it('key filtered if not picked', () => {
        forAll(record(unknown()), (x) => {
            const filtered = pickBy(x, ([k]) => deterministicBoolean(k))
            return all(keysOf(x), (k) => (deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x))
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
        forAll(record(unknown()), (x) => {
            const filtered = pick(x, keysOf(x).filter(deterministicBoolean))
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    it('key filtered if not picked', () => {
        forAll(record(unknown()), (x) => {
            const filtered = pick(x, keysOf(x).filter(deterministicBoolean))
            return all(keysOf(x), (k) => (deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x))
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
