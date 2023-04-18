import { normalizePath } from './normalize-path.js'

import { forAll, string } from '../../index.js'

import { it } from 'vitest'

it('fix all backward slashes', () => {
    forAll(string(), (s) => !normalizePath(s, { forceForwardSlash: true }).includes('\\'))
})
