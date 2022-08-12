import { queue } from '../../../algorithm/queue'
import { stack } from '../../../algorithm/stack'
import { map } from '../../../iterator'
import type { Maybe, Traversable } from '../../../type'
import { Nothing } from '../../../type'
import { disjointSet } from '../disjoint-set'

export interface GraphNode<T> {
    name: string
    value: Maybe<T>
}

export interface GraphEdge<T, E> {
    value: E
    from: GraphNode<T>
    to: GraphNode<T>
}

export type GraphNodeName = number | string

interface DiscoveryMarker<T> {
    add(value: GraphNode<T>): this
    has(value: GraphNode<T>): boolean
}

export class Graph<T, E = never> {
    private readonly _nodes: Record<GraphNodeName, GraphNode<T>> = {} as Record<GraphNodeName, GraphNode<T>>
    private readonly _fromToAdjacency: Record<GraphNodeName, Record<GraphNodeName, GraphEdge<T, E>>> = {} as Record<
        GraphNodeName,
        Record<GraphNodeName, GraphEdge<T, E>>
    >
    private readonly _edges: WeakMap<GraphNode<T>, WeakSet<GraphEdge<T, E>>> = new WeakMap()

    public addNode(name: GraphNodeName, value: Maybe<T> = Nothing): GraphNode<T> {
        const node = {
            name,
            value,
        } as GraphNode<T>
        if (!(name in this._nodes)) {
            this._nodes[name] = node
            this._fromToAdjacency[name] = {} as Record<GraphNodeName, GraphEdge<T, E>>
            this._edges.set(node, new WeakSet<GraphEdge<T, E>>())
        }
        return this._nodes[name]
    }

    public setEdge(a: GraphNodeName, b: GraphNodeName, ...value: [E] extends [never] ? [undefined?] : [E]): void
    public setEdge(a: GraphNodeName, b: GraphNodeName, value?: E): void {
        this._fromToAdjacency[a][b] = { value: value as E, from: this._nodes[a], to: this._nodes[b] }
    }

    public nodes(): Traversable<GraphNode<T>> {
        return Object.values(this._nodes)
    }

    public edges(): GraphEdge<T, E>[] {
        return Object.values(this._fromToAdjacency)
            .map((a) => Object.values(a))
            .flat()
    }

    public *dfs(node: GraphNode<T>, visited: DiscoveryMarker<T> = new WeakSet()): Traversable<GraphNode<T>, void> {
        const nodes = queue([node])
        for (const x of nodes) {
            if (!visited.has(x)) {
                yield x
                nodes.enqueue(map(Object.keys(this._fromToAdjacency[x.name]), (n) => this._nodes[n]))
                visited.add(x)
            } else {
                // cyclic
            }
        }
    }

    public *bfs(node: GraphNode<T>, visited: DiscoveryMarker<T> = new WeakSet()): Traversable<GraphNode<T>, void> {
        const nodes = stack([node])
        for (const x of nodes) {
            if (!visited.has(x)) {
                yield x
                nodes.push(map(Object.keys(this._fromToAdjacency[x.name]), (n) => this._nodes[n]))
                visited.add(x)
            } else {
                // cyclic
            }
        }
    }
}

export type WeightedEdge = { weight: number }
export type WeightSortFunction<T, E> = (a: GraphEdge<T, E>, b: GraphEdge<T, E>) => number

function defaultWeightSort<T>(a: GraphEdge<T, WeightedEdge>, z: GraphEdge<T, WeightedEdge>) {
    return a.value.weight - z.value.weight
}

export function* kruskal<T, E = WeightedEdge>(
    G: Graph<T, E>,
    sortBy: WeightSortFunction<T, E> = defaultWeightSort as unknown as WeightSortFunction<T, E>
): Traversable<GraphEdge<T, E>, void> {
    const set = disjointSet()
    for (const v of G.nodes()) {
        set.partition(v)
    }
    for (const [f, t, e] of G.edges()
        .sort(sortBy)
        .map((edge) => [edge.from, edge.to, edge] as const)) {
        if (set.find(f) !== set.find(t)) {
            yield e
            set.union(f, t)
        }
    }
}

export function* topologicalSort<T, E>(G: Graph<T, E>): Generator<GraphNode<T>, void, void> {
    const visited: WeakSet<GraphNode<T>> = new WeakSet()
    for (const node of G.nodes()) {
        if (!visited.has(node)) {
            yield* G.dfs(node, visited)
        }
    }
}
