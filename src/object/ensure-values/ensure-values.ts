import type { NoUndefinedFields } from '../../type'

/**
 *
 * @param x
 * @returns
 * @experimental
 */
export function ensureValues<T extends {}>(x: T): NoUndefinedFields<T> {
    return new Proxy(x as NoUndefinedFields<T>, {
        get: (t, k) => {
            const v = t[k as never]
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (v === undefined) {
                throw new Error(`Trying to get "${k.toString()}", but got "undefined"`)
            }
            return v
        },
    })
}
