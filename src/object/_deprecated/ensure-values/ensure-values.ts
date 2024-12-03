import type { SetNonNullable } from '../../../types.js'

/**
 *
 * @param x
 * @returns
 * @experimental
 * @deprecated The usecase for this function is removed as event horizon handles these cases natively now.
 */
export function ensureValues<T extends {}>(x: T): SetNonNullable<T> {
    return new Proxy(x as SetNonNullable<T>, {
        get: (t, k) => {
            const v = t[k as keyof T]
            if (v === undefined || v === null) {
                throw new Error(`Trying to get "${k.toString()}", but got "undefined"`)
            }
            return v
        },
    })
}
