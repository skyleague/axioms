import type { NoUndefinedFields } from '../../type'

export function ensureValues<T extends {}>(x: T): NoUndefinedFields<T> {
    return new Proxy(x as NoUndefinedFields<T>, {
        get: (t, k) => {
            const v = t[k as never]
            if (v === undefined) {
                throw new Error(`Trying to get "${k.toString()}", but got "undefined"`)
            }
            return v
        },
    })
}
