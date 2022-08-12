import { isLeft } from '.'

import { forAll, unknown } from '../../random'

test('unknown is not left', () => {
    forAll(unknown(), (x) => !isLeft(x))
})

test('left property is left', () => {
    expect(isLeft({ left: 'foo' })).toBeTrue()
})
