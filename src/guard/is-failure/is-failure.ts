import type { Failure, Try } from '../../type/try'
import { isError } from '../is-error'

export function isFailure(x: Try<unknown> | unknown): x is Failure {
    return isError(x)
}
