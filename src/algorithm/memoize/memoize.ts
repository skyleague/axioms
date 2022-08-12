import { evaluate } from '../../function/evaluate'
import { isDefined } from '../../guard/is-defined'
import { isLeft } from '../../guard/is-left'
import { unique } from '../../iterator/unique'
import { mapValues } from '../../object/map-values'
import type { Dict } from '../../type/dict'
import type { Either } from '../../type/either'
import { Nothing } from '../../type/maybe'

export interface Memoized<T> {
    (): T
    clear: () => void
}

export function memoize<T>(getter: T | (() => T)): Memoized<T> {
    let value: Either<unknown, T> = { left: Nothing }
    const memoized: Memoized<T> = () => {
        if (isLeft(value)) {
            value = { right: evaluate(getter) }
        }
        return value.right
    }

    memoized.clear = () => {
        value = { left: Nothing }
    }
    return memoized
}

export type MemoizeAttributes<T extends Dict<() => unknown>> = { [K in keyof T]: Memoized<T[K]> }
export function memoizeAttributes<T extends Dict<() => unknown>>(x: T): MemoizeAttributes<T> {
    return mapValues(x, memoize) as MemoizeAttributes<T>
}

export function memoizeGetters<T>(x: T & { clear?: never }): Omit<T, 'clear'> & { clear: (k: keyof T) => void } {
    const memoized = [...unique([...Object.keys(x), ...Object.getOwnPropertyNames(x)])].reduce<Partial<Omit<T, 'clear'>>>(
        (y, k) => {
            const prop = Object.getOwnPropertyDescriptor(x, k)
            if (isDefined(prop)) {
                Object.defineProperty(y, k, 'get' in prop ? { ...prop, get: memoize(() => prop?.get?.() as unknown) } : prop)
            }
            return y
        },
        {}
    ) as Omit<T, 'clear'> & { clear: (k: keyof T) => void }
    memoized.clear = (k: keyof T) => {
        const prop = Object.getOwnPropertyDescriptor(memoized, k)
        ;(prop?.get as Memoized<unknown>)?.clear?.()
    }

    return memoized
}
