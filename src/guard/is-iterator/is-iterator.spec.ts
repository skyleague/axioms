import { isIterator } from './index.js'

import { forAll, unknown } from '../../random/index.js'

test('unknown is not iterator', () => {
    forAll(unknown(), (xs) => !isIterator(xs))
})

test('next function is iterator', () => {
    expect(isIterator({ next: () => false })).toBeTrue()
})
