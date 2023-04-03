import { isEither } from './index.js'

import { forAll, unknown } from '../../random/index.js'

test('unknown is not either', () => {
    forAll(unknown(), (x) => !isEither(x))
})

test('left property is either', () => {
    expect(isEither({ left: 'foo' })).toBeTrue()
})

test('right property is either', () => {
    expect(isEither({ right: 'foo' })).toBeTrue()
})
