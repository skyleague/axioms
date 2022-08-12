import { normalizePath } from './normalize-path'

import { forAll, string } from '../..'

test('fix all backward slashes', () => {
    forAll(string(), (s) => !normalizePath(s, { forceForwardSlash: true }).includes('\\'))
})
