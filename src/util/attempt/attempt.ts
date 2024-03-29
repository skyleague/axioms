import type { Either } from '../../type/index.js'

export function attempt<F, T>(fn: () => T, fallback: F): Either<F, T> {
    try {
        return { right: fn() }
    } catch (err: unknown) {
        return { left: fallback }
    }
}
