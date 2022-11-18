import type { Failure, Success } from '../../type/try'
import { isError } from '../is-error'

export function isSuccess<T, O = unknown>(x: Failure | O | Success<T>): x is Success<T> {
    return !isError(x)
}
