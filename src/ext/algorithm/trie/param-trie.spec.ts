import { parameterTrie } from './index.js'

import { isDefined } from '../../../guard/index.js'
import { forAll, tuple, array, string, unknown, boolean } from '../../../random/index.js'
import { Nothing } from '../../../type/index.js'

import { expect, it } from 'vitest'

it('insert', () => {
    const trie = parameterTrie<number>()

    trie.insert([{ right: 'foo' }, { right: 'bar' }], 2)
    trie.insert([{ right: 'foo' }, { right: 'bar/' }], 3)
    trie.insert([{ right: 'foo' }, { left: 'bar' }], 4)
    trie.insert([{ right: 'foo' }, { left: 'bar' }, { right: 'bar' }], 5)
    trie.insert([{ left: 'bar' }], 6)
    trie.insert([{ left: 'bar' }, { right: 'foo' }, { right: 'bar' }], 7)

    expect(trie).toMatchInlineSnapshot(`
        {
          "find": [Function],
          "insert": [Function],
          "root": {
            "children": {
              "foo": {
                "children": {
                  "bar": {
                    "children": {},
                    "parameter": Symbol((Nothing)),
                    "value": {
                      "right": 2,
                    },
                  },
                  "bar/": {
                    "children": {},
                    "parameter": Symbol((Nothing)),
                    "value": {
                      "right": 3,
                    },
                  },
                  Symbol((Nothing)): {
                    "children": {
                      "bar": {
                        "children": {},
                        "parameter": Symbol((Nothing)),
                        "value": {
                          "right": 5,
                        },
                      },
                    },
                    "parameter": "bar",
                    "value": {
                      "right": 4,
                    },
                  },
                },
                "parameter": Symbol((Nothing)),
                "value": {
                  "left": Symbol((Nothing)),
                },
              },
              Symbol((Nothing)): {
                "children": {
                  "foo": {
                    "children": {
                      "bar": {
                        "children": {},
                        "parameter": Symbol((Nothing)),
                        "value": {
                          "right": 7,
                        },
                      },
                    },
                    "parameter": Symbol((Nothing)),
                    "value": {
                      "left": Symbol((Nothing)),
                    },
                  },
                },
                "parameter": "bar",
                "value": {
                  "right": 6,
                },
              },
            },
            "parameter": Symbol((Nothing)),
            "value": {
              "left": Symbol((Nothing)),
            },
          },
        }
    `)
})

it('simple', () => {
    const trie = parameterTrie<number>()

    trie.insert([{ right: 'foo' }, { right: 'bar' }], 2)

    expect(trie).toMatchInlineSnapshot(`
        {
          "find": [Function],
          "insert": [Function],
          "root": {
            "children": {
              "foo": {
                "children": {
                  "bar": {
                    "children": {},
                    "parameter": Symbol((Nothing)),
                    "value": {
                      "right": 2,
                    },
                  },
                },
                "parameter": Symbol((Nothing)),
                "value": {
                  "left": Symbol((Nothing)),
                },
              },
            },
            "parameter": Symbol((Nothing)),
            "value": {
              "left": Symbol((Nothing)),
            },
          },
        }
    `)

    expect(trie.find(['foo', 'bar'])).toEqual([2, []])
})

it('find', () => {
    const trie = parameterTrie<number>()

    trie.insert([{ right: 'foo' }, { right: 'bar' }], 2)
    trie.insert([{ right: 'foo' }, { right: 'bar/' }], 3)
    trie.insert([{ right: 'foo' }, { left: 'bar' }], 4)
    trie.insert([{ right: 'foo' }, { left: 'bar' }, { right: 'bar' }], 5)
    trie.insert([{ left: 'bar' }], 6)
    trie.insert([{ left: 'bar' }, { right: 'foo' }, { right: 'bar' }], 7)

    expect(trie.find(['foo', 'bar'])).toEqual([2, []])
    expect(trie.find(['foo', 'bar/'])).toEqual([3, []])
    expect(trie.find(['foo', 'barparam'])).toEqual([4, [['bar', 'barparam']]])
    expect(trie.find(['foo', 'barparam', 'bar'])).toEqual([5, [['bar', 'barparam']]])
    expect(trie.find(['foobar'])).toEqual([6, [['bar', 'foobar']]])
    expect(trie.find(['foobar', 'foo', 'bar'])).toEqual([7, [['bar', 'foobar']]])
    expect(trie.find(['foobar', 'fooz', 'bar'])).toEqual(Nothing)
    expect(trie.find(['foobar', 'foo', 'baf'])).toEqual(Nothing)
})

it('double insert is immutable', () => {
    const trie = parameterTrie<number>()

    trie.insert([{ right: 'foo' }, { right: 'bar' }], 2)
    trie.insert([{ right: 'foo' }, { right: 'bar' }], 3)

    expect(trie.find(['foo', 'bar'])).toEqual([2, []])
})

it('performance', () => {
    const trie = parameterTrie<number>()

    trie.insert([{ right: 'foo' }, { right: 'bar' }], 2)
    trie.insert([{ right: 'foo' }, { right: 'bar/' }], 3)
    trie.insert([{ right: 'foo' }, { left: 'bar' }], 4)
    trie.insert([{ right: 'foo' }, { left: 'bar' }, { right: 'bar' }], 5)
    trie.insert([{ left: 'bar' }], 6)
    trie.insert([{ left: 'bar' }, { right: 'foo' }, { right: 'bar' }], 7)

    for (let i = 0; i < 10000; ++i) {
        trie.find(['foo', 'bar'])
        trie.find(['foo', 'bar/'])
        trie.find(['foo', 'barparam'])
        trie.find(['foo', 'barparam', 'bar'])
        trie.find(['foobar'])
        trie.find(['foobar', 'foo', 'bar'])
    }
})

it('find xs x == x', () => {
    forAll(tuple(array(string()), unknown()), ([xs, v]) => {
        const trie = parameterTrie<unknown>()
        trie.insert(
            xs.map((x) => ({ right: x })),
            v
        )
        expect(trie.find(xs)).toEqual([v, []])
    })
})

it('parametrized find xs x == x', () => {
    forAll(tuple(array(tuple(boolean(), string(), string())), unknown()), ([xs, value]) => {
        const trie = parameterTrie<unknown>()
        trie.insert(
            xs.map(([param, k, v]) => (param ? { left: k } : { right: v })),
            value
        )
        expect(trie.find(xs.map(([, , v]) => v))).toEqual([
            value,
            xs.map(([param, k, v]) => (param ? [k, v] : undefined)).filter(isDefined),
        ])
    })
})

it('does not throw on random retrieval', () => {
    forAll(tuple(array(tuple(boolean(), string(), string())), unknown(), array(array(string()))), ([xs, value, tests]) => {
        const trie = parameterTrie<unknown>()
        trie.insert(
            xs.map(([param, k, v]) => (param ? { left: k } : { right: v })),
            value
        )
        for (const test of tests) {
            trie.find(test)
        }
    })
})
