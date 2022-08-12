import { parameterTrie } from '.'

import { isDefined } from '../../../guard'
import { forAll, tuple, array, string, unknown, boolean } from '../../../random'
import { Nothing } from '../../../type'

test('insert', () => {
    const trie = parameterTrie<number>()

    trie.insert([{ right: 'foo' }, { right: 'bar' }], 2)
    trie.insert([{ right: 'foo' }, { right: 'bar/' }], 3)
    trie.insert([{ right: 'foo' }, { left: 'bar' }], 4)
    trie.insert([{ right: 'foo' }, { left: 'bar' }, { right: 'bar' }], 5)
    trie.insert([{ left: 'bar' }], 6)
    trie.insert([{ left: 'bar' }, { right: 'foo' }, { right: 'bar' }], 7)

    expect(trie).toMatchInlineSnapshot(`
        Object {
          "find": [Function],
          "insert": [Function],
          "root": Object {
            "children": Object {
              "foo": Object {
                "children": Object {
                  "bar": Object {
                    "children": Object {},
                    "parameter": Symbol(Axioms.Nothing),
                    "value": Object {
                      "right": 2,
                    },
                  },
                  "bar/": Object {
                    "children": Object {},
                    "parameter": Symbol(Axioms.Nothing),
                    "value": Object {
                      "right": 3,
                    },
                  },
                  Symbol(Axioms.Nothing): Object {
                    "children": Object {
                      "bar": Object {
                        "children": Object {},
                        "parameter": Symbol(Axioms.Nothing),
                        "value": Object {
                          "right": 5,
                        },
                      },
                    },
                    "parameter": "bar",
                    "value": Object {
                      "right": 4,
                    },
                  },
                },
                "parameter": Symbol(Axioms.Nothing),
                "value": Object {
                  "left": Symbol(Axioms.Nothing),
                },
              },
              Symbol(Axioms.Nothing): Object {
                "children": Object {
                  "foo": Object {
                    "children": Object {
                      "bar": Object {
                        "children": Object {},
                        "parameter": Symbol(Axioms.Nothing),
                        "value": Object {
                          "right": 7,
                        },
                      },
                    },
                    "parameter": Symbol(Axioms.Nothing),
                    "value": Object {
                      "left": Symbol(Axioms.Nothing),
                    },
                  },
                },
                "parameter": "bar",
                "value": Object {
                  "right": 6,
                },
              },
            },
            "parameter": Symbol(Axioms.Nothing),
            "value": Object {
              "left": Symbol(Axioms.Nothing),
            },
          },
        }
    `)
})

test('simple', () => {
    const trie = parameterTrie<number>()

    trie.insert([{ right: 'foo' }, { right: 'bar' }], 2)

    expect(trie).toMatchInlineSnapshot(`
        Object {
          "find": [Function],
          "insert": [Function],
          "root": Object {
            "children": Object {
              "foo": Object {
                "children": Object {
                  "bar": Object {
                    "children": Object {},
                    "parameter": Symbol(Axioms.Nothing),
                    "value": Object {
                      "right": 2,
                    },
                  },
                },
                "parameter": Symbol(Axioms.Nothing),
                "value": Object {
                  "left": Symbol(Axioms.Nothing),
                },
              },
            },
            "parameter": Symbol(Axioms.Nothing),
            "value": Object {
              "left": Symbol(Axioms.Nothing),
            },
          },
        }
    `)

    expect(trie.find(['foo', 'bar'])).toEqual([2, []])
})

test('find', () => {
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

test('double insert is immutable', () => {
    const trie = parameterTrie<number>()

    trie.insert([{ right: 'foo' }, { right: 'bar' }], 2)
    trie.insert([{ right: 'foo' }, { right: 'bar' }], 3)

    expect(trie.find(['foo', 'bar'])).toEqual([2, []])
})

test('performance', () => {
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

test('find xs x == x', () => {
    forAll(tuple(array(string()), unknown()), ([xs, v]) => {
        const trie = parameterTrie<unknown>()
        trie.insert(
            xs.map((x) => ({ right: x })),
            v
        )
        expect(trie.find(xs)).toEqual([v, []])
    })
})

test('parametrized find xs x == x', () => {
    forAll(tuple(array(tuple(boolean(), string(), string())), unknown()), ([xs, value]) => {
        const trie = parameterTrie<unknown>()
        trie.insert(
            xs.map(([param, k, v]) => (param ? { left: k } : { right: v })),
            value
        )
        expect(trie.find(xs.map(([, , v]) => v))).toEqual([
            value,
            xs.map(([param, k, v]) => (param ? [k, v] : undefined))?.filter(isDefined),
        ])
    })
})

test('does not throw on random retrieval', () => {
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
