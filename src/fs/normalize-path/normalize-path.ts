import { sep } from 'path'

const isBackwardSlash = sep === '\\'

/**
 * Normalize the given path to always use forward slashes, no matter the underlying OS.
 *
 * ### Example
 * ```ts
 * // On windows
 * normalizePath("foo\\bar")
 * // => "foo/bar"
 *
 * // On unix
 * normalizePath("foo/bar")
 * // => "foo/bar"
 * ```
 *
 *
 * @param path - The path to normalize.
 * @param options - Configure how the normalization should happen.
 * @param options.forceForwardSlash - Set to true if we need to replace all backwards slashes to forward. By default
 *                                    we check the separator used on the current OS, and only replace when needed.
 * @returns The normalized path.
 *
 * @category Filesystem
 */
export function normalizePath(path: string, options: { forceForwardSlash?: boolean } = {}): string {
    const { forceForwardSlash = isBackwardSlash } = options
    return forceForwardSlash ? path.replace(/\\/g, '/') : path
}
