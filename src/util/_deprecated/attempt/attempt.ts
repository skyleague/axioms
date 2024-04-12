import type { Either } from '../../../type/index.js'

/**
 * @deprecated
 */
export function attempt<F, T>(fn: () => T, fallback: F): Either<F, T> {
    try {
        return { right: fn() }
    } catch (_err: unknown) {
        return { left: fallback }
    }
}
