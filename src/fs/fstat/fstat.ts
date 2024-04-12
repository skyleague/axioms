import { isObject } from '../../guard/is-object/index.js'
import type { Either } from '../../type/either/index.js'
import type { Maybe } from '../../type/maybe/index.js'
import { Nothing } from '../../type/maybe/index.js'

import type { Stats } from 'node:fs'
import { promises } from 'node:fs'

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
 * @param path - The file path.
 * @returns The fstat response.
 *
 * @experimental
 * @group Filesystem
 */
export async function fstat(file: string): Promise<Either<unknown, Maybe<Stats>>> {
    try {
        return { right: await promises.stat(file) }
    } catch (error: unknown) {
        if (!(isObject(error) && 'code' in error) || error.code !== 'ENOENT') {
            return { left: error }
        }
    }
    return { right: Nothing }
}
