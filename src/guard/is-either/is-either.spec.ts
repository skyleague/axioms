import { isEither } from '.'

import { forAll, unknown } from '../../random'

test('unknown is not either', () => {
    forAll(unknown(), (x) => !isEither(x))
})

test('left property is either', () => {
    expect(isEither({ left: 'foo' })).toBeTrue()
})

test('right property is either', () => {
    expect(isEither({ right: 'foo' })).toBeTrue()
})
