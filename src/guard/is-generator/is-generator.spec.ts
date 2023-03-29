import { isGenerator, isGeneratorFunction } from './index.js'

import { counter } from '../../generator/index.js'
import { forAll, unknown } from '../../random/index.js'

test('unknown is not a generator', () => {
    forAll(unknown(), (x) => !isGenerator(x))
})

test('counter is a generator', () => {
    expect(isGenerator(counter())).toBeTrue()
})

test('unknown is not a isGeneratorFunction', () => {
    forAll(unknown(), (x) => !isGeneratorFunction(x))
})
