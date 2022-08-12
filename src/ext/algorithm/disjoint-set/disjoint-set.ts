import { isNothing, isJust } from '../../../guard'
import type { Maybe } from '../../../type'
import { Nothing } from '../../../type'

export type DisjointPartition<T> = {
    value: T
    rank: number
    parent: DisjointPartition<T>
}

export function disjointSet<T>(...values: T[]) {
    const partitions: Map<T, DisjointPartition<T>> = new Map<T, DisjointPartition<T>>()

    values.forEach((v) => partition(v))

    function partition(value: T): DisjointPartition<T> {
        const found = find(value)
        if (isNothing(found)) {
            const root = {
                value,
                rank: 0,
            } as DisjointPartition<T>
            root.parent = root
            partitions.set(value, root)
            return root
        }
        return found
    }

    function find(value: T): Maybe<DisjointPartition<T>> {
        const node = partitions.get(value)
        return node !== undefined ? findByNode(node) : Nothing
    }

    function findByNode(node: DisjointPartition<T>): DisjointPartition<T> {
        if (node.parent !== node) {
            // path compression
            node.parent = findByNode(node.parent)
        }
        return node.parent
    }

    function union(a: T, b: T) {
        const ra = find(a)
        const rb = find(b)
        if (ra !== rb && isJust(ra) && isJust(rb)) {
            if (ra.rank < rb.rank) {
                ra.parent = rb
            } else {
                rb.parent = ra
                if (ra.rank === rb.rank) {
                    ra.rank += 1
                }
            }
        }
    }

    return {
        partition,
        find,
        union,
        partitions,
    }
}
