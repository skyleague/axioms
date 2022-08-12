import { isIterator } from '.'

import { forAll, unknown } from '../../random'

test('unknown is not iterator', () => {
    forAll(unknown(), (xs) => !isIterator(xs))
})

test('next function is iterator', () => {
    expect(isIterator({ next: () => false })).toBeTrue()
})
