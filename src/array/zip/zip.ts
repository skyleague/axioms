import { next } from '../../generator/next/index.js'
import { isRight } from '../../guard/is-right/index.js'
import { toTraverser } from '../../type/traversable/index.js'
import type { Traversable } from '../../type/traversable/index.js'

type ZipItem<Arr> = Arr extends Generator<infer G> ? G : Arr extends (infer I)[] ? I : never
type Zip<T> = { [K in keyof T]: ZipItem<T[K]> }
type Unzip<T> = {
    [K in keyof T]: readonly T[K][]
}

export function* zip<T extends readonly [...Traversable<unknown>[]]>(...xs: [...T]): Traversable<Zip<T>> {
    if (xs.length === 0) {
        return
    }
    const traversers = xs.map(toTraverser)
    for (let vals = traversers.map(next); vals.every(isRight); vals = traversers.map(next)) {
        yield vals.map((x) => x.right) as unknown as Zip<T>
    }
    return
}

export function* zipWith<T extends readonly [...unknown[]], R>(f: (...args: [...T]) => R, ...xs: Unzip<[...T]>) {
    if (xs.length === 0) {
        return
    }
    const traversers = xs.map(toTraverser)
    for (let vals = traversers.map(next); vals.every(isRight); vals = traversers.map(next)) {
        yield f(...(vals.map((x) => x.right) as [...T]))
    }
    return
}
