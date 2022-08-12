import { all } from '../../iterator/all'
import type { KeyOf, RequireKeys } from '../../type/keys'
import { asArray } from '../as-array'

export function hasPropertiesDefined<T, K extends KeyOf<T>>(keys: K[] | string[] | string) {
    return (obj: RequireKeys<T, K> | T): obj is RequireKeys<T, K> => {
        return all(asArray(keys as K | K[]), (key) => (obj as Record<K, unknown>)[key] !== undefined)
    }
}
