import { Graph, topologicalSort } from '.'

test('simple', () => {
    const G = new Graph<number, number>()
    G.addNode('a', 1)
    G.addNode('b', 2)
    G.addNode('c', 3)
    G.addNode('d', 4)
    G.addNode('e', 5)

    G.addNode('z', 6)

    G.setEdge('a', 'b', 1)
    G.setEdge('a', 'c', 2)

    G.setEdge('b', 'd', 3)
    G.setEdge('c', 'd', 4)

    G.setEdge('d', 'e', 5)

    expect([...topologicalSort(G)]).toMatchInlineSnapshot(`
        Array [
          Object {
            "name": "a",
            "value": 1,
          },
          Object {
            "name": "b",
            "value": 2,
          },
          Object {
            "name": "c",
            "value": 3,
          },
          Object {
            "name": "d",
            "value": 4,
          },
          Object {
            "name": "e",
            "value": 5,
          },
          Object {
            "name": "z",
            "value": 6,
          },
        ]
    `)
})
