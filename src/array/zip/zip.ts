import { next } from '../../generator/next'
import { isRight } from '../../guard/is-right'
import { toTraverser } from '../../type/traversable'
import type { Traversable } from '../../type/traversable'

type ZipItem<Arr> = Arr extends Generator<infer G> ? G : Arr extends Array<infer I> ? I : never
type Zip<T> = { [K in keyof T]: ZipItem<T[K]> }
type Unzip<T> = {
    [K in keyof T]: readonly T[K][]
}

export function* zip<T extends readonly [...Traversable<unknown>[]]>(...xs: [...T]) {
    if (xs.length === 0) {
        return
    }
    const traversers = xs.map(toTraverser)
    for (let vals = traversers.map(next); vals.every(isRight); vals = traversers.map(next)) {
        yield vals.map((x) => x.right) as unknown as Zip<T>
    }
}

export function* zipWith<T extends readonly [...unknown[]], R>(f: (...args: [...T]) => R, ...xs: Unzip<[...T]>) {
    if (xs.length === 0) {
        return
    }
    const traversers = xs.map(toTraverser)
    for (let vals = traversers.map(next); vals.every(isRight); vals = traversers.map(next)) {
        yield f(...(vals.map((x) => x.right) as [...T]))
    }
}
