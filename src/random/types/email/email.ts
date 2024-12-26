import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/array.js'
import { domain } from '../domain/domain.js'
import { lowerAlphaNumeric } from '../string/index.js'
import { tuple } from '../tuple/index.js'

/**
 * Options for email address generation
 */
export interface EmailOptions {
    /**
     * Whether to use full RFC 5322 format or a more restricted set of characters
     * - 'full': Allows all RFC 5322 special characters
     * - 'restricted': Allows only alphanumeric characters and common punctuation
     */
    format: 'full' | 'restricted'
}

/**
 * Generates valid email addresses according to RFC 5322
 *
 * The local part (before @) is a dot-atom (e.g., "user.name")
 *
 * @param options Configuration options for email generation
 * @returns A dependent arbitrary that generates valid email addresses
 */
export function email({ format = 'full' }: Partial<EmailOptions> = {}): Dependent<string> {
    if (format === 'full') {
        const extra = '!#$%&*+-/=^_`{|}~'
        // Generate a regular atom (unquoted part)
        const atom = lowerAlphaNumeric({ extra, minLength: 1, maxLength: 64 })

        // Generate local part (before @)
        const localPart = array(atom, { minLength: 1, maxLength: 32 })
            .map((xs) => xs.join('.'))
            .filter((str) => !str.startsWith('.') && !str.endsWith('.') && !str.includes('..'))

        return tuple(localPart, domain({ format })).map(([local, dom]) => `${local}@${dom}`)
    }

    const extra = '_+-.'
    const localPart = lowerAlphaNumeric({ extra, minLength: 1, maxLength: 64 }).filter(
        (str) =>
            // Must not start with a dot
            !str.startsWith('.') &&
            // Must not have consecutive dots
            !str.includes('..') &&
            // Must end with alphanumeric or + or -
            /[A-Za-z0-9_+-]$/.test(str),
    )

    return tuple(localPart, domain({ format })).map(([local, dom]) => `${local}@${dom}`)
}
