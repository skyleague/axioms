import { attempt } from './index.js'

import { isLeft, isRight } from '../../guard/index.js'
import { forAll, tuple, unknown } from '../../random/index.js'

test('failure is left', () => {
    forAll(tuple(unknown(), unknown()), (x, fallback) => {
        const maybe = attempt(() => {
            throw x
        }, fallback)
        return isLeft(maybe) && maybe.left === fallback
    })
})

test('value is right', () => {
    forAll(tuple(unknown(), unknown()), (x, fallback) => {
        const maybe = attempt(() => x, fallback)
        return isRight(maybe) && maybe.right === x
    })
})
