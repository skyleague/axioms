import { isGenerator, isGeneratorFunction } from '.'

import { counter } from '../../generator'
import { forAll, unknown } from '../../random'

test('unknown is not a generator', () => {
    forAll(unknown(), (x) => !isGenerator(x))
})

test('counter is a generator', () => {
    expect(isGenerator(counter())).toBeTrue()
})

test('unknown is not a isGeneratorFunction', () => {
    forAll(unknown(), (x) => !isGeneratorFunction(x))
})
