import { trie } from './index.js'

import { equal } from '../../../iterator/index.js'
import { forAll, tuple, array, string, unknown, set } from '../../../random/index.js'
import { Nothing } from '../../../type/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    const t = trie<number>()

    t.insert(['foo', 'bar'], 2)

    expect(t).toMatchInlineSnapshot(`
        {
          "find": [Function],
          "insert": [Function],
          "root": {
            "children": {
              "foo": {
                "children": {
                  "bar": {
                    "children": {},
                    "value": 2,
                  },
                },
                "value": Symbol((Nothing)),
              },
            },
            "value": Symbol((Nothing)),
          },
        }
    `)

    expect(t.find(['foo', 'bar'])).toEqual(2)
})

it('find', () => {
    const t = trie<number>()

    t.insert(['foo', 'bar'], 2)
    t.insert(['foo', 'bar/'], 3)

    expect(t.find(['foo', 'bar'])).toEqual(2)
    expect(t.find(['foo', 'bar/'])).toEqual(3)
    expect(t.find(['foo', 'baz'])).toEqual(Nothing)
})

it('double insert is immutable', () => {
    const t = trie<number>()

    t.insert(['foo', 'bar'], 2)
    t.insert(['foo', 'bar'], 3)

    expect(t.find(['foo', 'bar'])).toEqual(2)
})

it('performance', () => {
    const t = trie<number>()

    t.insert(['foo', 'bar'], 2)
    t.insert(['foo', 'bar/'], 3)

    for (let i = 0; i < 100000; ++i) {
        t.find(['foo', 'bar'])
        t.find(['foo', 'bar/'])
    }
})

it('find xs x == x', () => {
    forAll(tuple(array(string()), unknown()), ([xs, v]) => {
        const t = trie<unknown>()
        t.insert(xs, v)
        expect(t.find(xs)).toEqual(v)
    })
})

it('forall x of xs, find xs x == x - uniqueness', () => {
    forAll(set(tuple(array(string()), unknown()), { eq: ([as], [bs]) => equal(as, bs) }), (xss) => {
        const t = trie<unknown>()
        for (const [xs, v] of xss) {
            expect(t.insert(xs, v)).toBe(true)
        }
        for (const [xs, v] of xss) {
            expect(t.find(xs)).toEqual(v)
        }
    })
})

it('does not throw on random retrieval', () => {
    forAll(tuple(array(string()), unknown(), array(array(string()))), ([xs, v, tests]) => {
        const t = trie<unknown>()
        expect(t.insert(xs, v)).toBe(true)
        for (const test of tests) {
            t.find(test)
        }
    })
})
