import { disjointSet } from '.'

import { maybeAsValue } from '../../../function/maybe/maybe'
import { range } from '../../../generator'
import { isJust } from '../../../guard'
import { forAll, set, string, natural } from '../../../random'

test('disjointSet x == find x', () => {
    forAll(set(string()), (xs) => {
        const xss = disjointSet<string>(...xs)
        for (const x of xs) {
            expect(x).toEqual(maybeAsValue(xss.find(x))?.value)
        }
    })
})

test('root x == find x', () => {
    forAll(set(string()), (xs) => {
        const xss = disjointSet<string>()
        for (const x of xs) {
            const root = xss.partition(x)
            expect(root).toEqual(xss.find(x))
        }
    })
})

test('intersect disjoint even/uneven === null', () => {
    const size = 1000
    forAll(set(natural({ min: 2, max: size })), (xs) => {
        const xss = disjointSet<number>(...[0, 1], ...xs)
        for (const x of range(1, size / 2)) {
            xss.union(0, x * 2)
            xss.union(1, x * 2 + 1)
        }
        const root0 = xss.find(0)
        const root1 = xss.find(1)
        for (const x of range(1, size / 2)) {
            const even = xss.find(2 * x)
            if (isJust(even)) {
                expect(even).toBe(root0)
            }
        }
        for (const x of range(1, size / 2)) {
            const odd = xss.find(2 * x + 1)
            if (isJust(odd)) {
                expect(odd).toBe(root1)
            }
        }
        expect(root0).not.toBe(root1)
        expect(root0).toEqual({ parent: root0, rank: xs.filter((x) => x % 2 === 0).length > 0 ? 1 : 0, value: 0 })
        expect(root1).toEqual({ parent: root1, rank: xs.filter((x) => x % 2 === 1).length > 0 ? 1 : 0, value: 1 })
    })
})

test('union xs as - 1', () => {
    const size = 1000
    forAll(
        set(natural({ min: 2, max: size })),
        (xs) => {
            const xss = disjointSet<number>(...[0, 1], ...xs)
            for (const x of range(1, size / 2)) {
                xss.union(0, x * 2)
                xss.union(1, x * 2 + 1)
            }
            xss.union(0, 1)
            const root0 = xss.find(0)
            const root1 = xss.find(1)
            expect(root0).toEqual(root1)
            const even = xs.filter((x) => x % 2 === 0).length > 0 ? 1 : 0
            const odd = xs.filter((x) => x % 2 === 1).length > 0 ? 1 : 0
            expect(root0).toEqual({ parent: root0, rank: Math.max(1, odd + even), value: odd && !even ? 1 : 0 })
        },
        { seed: 39n }
    )
})
