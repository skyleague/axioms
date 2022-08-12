import { trie } from '.'

import { equal } from '../../../iterator'
import { forAll, tuple, array, string, unknown, set } from '../../../random'
import { Nothing } from '../../../type'

test('simple', () => {
    const t = trie<number>()

    t.insert(['foo', 'bar'], 2)

    expect(t).toMatchInlineSnapshot(`
        Object {
          "find": [Function],
          "insert": [Function],
          "root": Object {
            "children": Object {
              "foo": Object {
                "children": Object {
                  "bar": Object {
                    "children": Object {},
                    "value": 2,
                  },
                },
                "value": Symbol(Axioms.Nothing),
              },
            },
            "value": Symbol(Axioms.Nothing),
          },
        }
    `)

    expect(t.find(['foo', 'bar'])).toEqual(2)
})

test('find', () => {
    const t = trie<number>()

    t.insert(['foo', 'bar'], 2)
    t.insert(['foo', 'bar/'], 3)

    expect(t.find(['foo', 'bar'])).toEqual(2)
    expect(t.find(['foo', 'bar/'])).toEqual(3)
    expect(t.find(['foo', 'baz'])).toEqual(Nothing)
})

test('double insert is immutable', () => {
    const t = trie<number>()

    t.insert(['foo', 'bar'], 2)
    t.insert(['foo', 'bar'], 3)

    expect(t.find(['foo', 'bar'])).toEqual(2)
})

test('performance', () => {
    const t = trie<number>()

    t.insert(['foo', 'bar'], 2)
    t.insert(['foo', 'bar/'], 3)

    for (let i = 0; i < 100000; ++i) {
        t.find(['foo', 'bar'])
        t.find(['foo', 'bar/'])
    }
})

test('find xs x == x', () => {
    forAll(tuple(array(string()), unknown()), ([xs, v]) => {
        const t = trie<unknown>()
        t.insert(xs, v)
        expect(t.find(xs)).toEqual(v)
    })
})

test('forall x of xs, find xs x == x - uniqueness', () => {
    forAll(set(tuple(array(string()), unknown()), { eq: ([as], [bs]) => equal(as, bs) }), (xss) => {
        const t = trie<unknown>()
        for (const [xs, v] of xss) {
            expect(t.insert(xs, v)).toBeTrue()
        }
        for (const [xs, v] of xss) {
            expect(t.find(xs)).toEqual(v)
        }
    })
})

test('does not throw on random retrieval', () => {
    forAll(tuple(array(string()), unknown(), array(array(string()))), ([xs, v, tests]) => {
        const t = trie<unknown>()
        expect(t.insert(xs, v)).toBeTrue()
        for (const test of tests) {
            t.find(test)
        }
    })
})
