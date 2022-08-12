export type Traverser<T, R = unknown> = Iterator<T, R, void>
export type Traversable<T, R = unknown> = {
    [Symbol.iterator](): Iterator<T, R, void>
}
export type Mappable<T, R = unknown> = Traversable<T, R> | Traverser<T, R> | (() => Generator<T, R, void>)

export type ToTraverser<Xs extends Mappable<unknown, unknown>> = Xs extends Mappable<infer T, infer R> ? Traverser<T, R> : never
export function toTraverser<Xs extends Mappable<unknown, unknown>>(xs: Xs): ToTraverser<Xs> {
    //return isIterable(xs) ? xs[Symbol.iterator]() : isGeneratorFunction(xs) ? xs() : xs
    // inlined
    if (typeof xs === 'string' || Symbol.iterator in xs) {
        return (xs as Traversable<unknown, unknown>)[Symbol.iterator]() as ToTraverser<Xs>
    } else if (typeof xs === 'function' && xs.constructor !== null && xs.constructor.name === 'GeneratorFunction') {
        return xs() as unknown as ToTraverser<Xs>
    }
    return xs as unknown as ToTraverser<Xs>
}

export type ToTraversable<Xs extends Mappable<unknown, unknown>> = Xs extends Mappable<infer T, infer R>
    ? Traversable<T, R>
    : never
export function toTraversable<Xs extends Mappable<unknown, unknown>>(xs: Xs): ToTraversable<Xs> {
    //return isIterable(xs) ? xs : isGeneratorFunction(xs) ? xs() : { [Symbol.iterator]: () => xs }
    // inlined
    if (typeof xs === 'string' || Symbol.iterator in xs) {
        return xs as unknown as ToTraversable<Xs>
    } else if (typeof xs === 'function' && xs.constructor !== null && xs.constructor.name === 'GeneratorFunction') {
        return xs() as unknown as ToTraversable<Xs>
    }
    return { [Symbol.iterator]: () => xs } as ToTraversable<Xs>
}

export function lazy<Xs extends Traversable<unknown, unknown>>(xs: () => Xs): Xs {
    return { [Symbol.iterator]: () => toTraverser(xs()) } as unknown as Xs
}

export type ToGenerator<Xs extends Mappable<unknown, unknown>, R> = Xs extends Mappable<infer T> ? Traversable<T, R> : never
export function toGenerator<Xs extends Mappable<unknown, unknown>, R = unknown>(xs: Xs, returnValue?: R): ToGenerator<Xs, R>
export function* toGenerator<Xs extends Mappable<unknown, unknown>, R = unknown>(xs: Xs, returnValue?: R) {
    yield* toTraversable(xs)
    return returnValue as R
}
