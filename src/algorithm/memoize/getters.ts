import type { Memoized } from './memoize.js'
import { memoize } from './memoize.js'

import { isDefined } from '../../guard/is-defined/index.js'
import { unique } from '../../iterator/unique/index.js'

/**
 * @experimental
 */
export function memoizeGetters<T>(x: T & { clear?: never }): Omit<T, 'clear'> & { clear: (k: keyof T) => void } {
    const memoized = [...unique([...Object.keys(x), ...Object.getOwnPropertyNames(x)])].reduce<Partial<Omit<T, 'clear'>>>(
        (y, k) => {
            const prop = Object.getOwnPropertyDescriptor(x, k)
            if (isDefined(prop)) {
                Object.defineProperty(y, k, 'get' in prop ? { ...prop, get: memoize(() => prop.get?.() as unknown) } : prop)
            }
            return y
        },
        {}
    ) as Omit<T, 'clear'> & { clear: (k: keyof T) => void }
    memoized.clear = (k: keyof T) => {
        const prop = Object.getOwnPropertyDescriptor(memoized, k)
        ;(prop?.get as Memoized<unknown>).clear()
    }

    return memoized
}
