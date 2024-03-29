import { ensureValues } from './ensure-values.js'

import { constant, dict, forAll, oneOf, unknown } from '../../random/index.js'

import { it } from 'vitest'

it('ensure-values', () => {
    forAll(dict(oneOf(constant(undefined), unknown({ undefined: false }))), (x) => {
        const config = ensureValues(x)
        for (const k of [...Object.keys(x), ...Object.getOwnPropertySymbols(x)] as (keyof typeof x)[]) {
            if (x[k] === undefined) {
                try {
                    void config[k]
                    return false
                } catch (err) {
                    //
                }
            } else if (config[k] !== x[k]) {
                return false
            }
        }
        return true
    })
})
