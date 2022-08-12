import { isDefined, isFunction } from '../../guard'

export type RecurrentGenerator<R> = readonly [R, (() => RecurrentGenerator<R>) | undefined]
export function itrampoline<T extends readonly unknown[], R>(f: (...args: [...T]) => RecurrentGenerator<R>) {
    return function* (...args: [...T]) {
        let [result, cont] = f(...args)
        while (isDefined(cont)) {
            yield result
            ;[result, cont] = cont()
        }
        return result
    }
}

export function trampoline<T extends readonly unknown[], R>(f: (...args: [...T]) => R | (() => R)) {
    return (...args: [...T]) => {
        let result = f(...args)
        while (isFunction(result)) {
            result = result()
        }
        return result
    }
}
