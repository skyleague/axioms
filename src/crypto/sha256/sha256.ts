import { createHash } from 'crypto'

/**
 * Calculate the sha256 hash of the given string input.
 *
 * ### Example
 * ```ts
 * sha256('hello world')
 * // => "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
 * ```
 *
 * @param x - The string to hash.
 *
 * @returns The sha256 hash.
 *
 * @group Crypto
 */
export function sha256(x: Buffer | string): string {
    return createHash('sha256').update(x.toString(), 'utf8').digest('hex')
}
