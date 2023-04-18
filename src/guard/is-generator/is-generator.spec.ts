import { isGenerator, isGeneratorFunction } from './index.js'

import { counter } from '../../generator/index.js'
import { forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('unknown is not a generator', () => {
    forAll(unknown(), (x) => !isGenerator(x))
})

it('counter is a generator', () => {
    expect(isGenerator(counter())).toBe(true)
})

it('unknown is not a isGeneratorFunction', () => {
    forAll(unknown(), (x) => !isGeneratorFunction(x))
})
