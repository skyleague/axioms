import { isObject } from '../../guard/is-object'
import type { Either } from '../../type/either'
import type { Maybe } from '../../type/maybe'
import { Nothing } from '../../type/maybe'

import type { Stats } from 'fs'
import { promises } from 'fs'

/**
 * Return the fstat results with improved edge case handling.
 *
 * ### Example
 * ```ts
 * await fstat("./non-existing")
 * // => { right: Nothing }
 *
 * await fstat("./existing")
 * // => { right: Stats }
 * ```
 *
 *
 * @param path - The path to normalize
 * @param options - Configure how the normalization should happen.
 * @param options.forceForwardSlash - Set to true if we need to replace all backwards slashes to forward. By default
 *                                    we check the separator used on the current OS, and only replace when needed.
 * @returns The normalized path.
 *
 * @experimental
 * @category Filesystem
 */
export async function fstat(file: string): Promise<Either<unknown, Maybe<Stats>>> {
    try {
        return { right: await promises.stat(file) }
    } catch (error) {
        if (!isObject(error) || !('code' in error) || error.code !== 'ENOENT') {
            return { left: error }
        }
    }
    return { right: Nothing }
}
