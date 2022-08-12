import { isFunction } from '../../guard/is-function'
import type { Lambda } from '../../type/lambda'

type MaybeEvaluated<T> = T extends Lambda ? never : T
export function evaluate<T>(maybeEvaluate: T | (() => T)): MaybeEvaluated<T> {
    return (isFunction(maybeEvaluate) ? maybeEvaluate() : maybeEvaluate) as MaybeEvaluated<T>
}
