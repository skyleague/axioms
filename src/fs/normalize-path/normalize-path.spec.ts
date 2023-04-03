import { normalizePath } from './normalize-path.js'

import { forAll, string } from '../../index.js'

test('fix all backward slashes', () => {
    forAll(string(), (s) => !normalizePath(s, { forceForwardSlash: true }).includes('\\'))
})
