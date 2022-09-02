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
        [
          {
            "name": "a",
            "value": 1,
          },
          {
            "name": "b",
            "value": 2,
          },
          {
            "name": "c",
            "value": 3,
          },
          {
            "name": "d",
            "value": 4,
          },
          {
            "name": "e",
            "value": 5,
          },
          {
            "name": "z",
            "value": 6,
          },
        ]
    `)
})
