import { isRight } from '.'

import { forAll, unknown } from '../../random'

test('unknown is not right', () => {
    forAll(unknown(), (x) => !isRight(x))
})

test('right property is right', () => {
    expect(isRight({ right: 'foo' })).toBeTrue()
})
