import { expect, expectTypeOf, it } from 'vitest'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import type { Dependent } from '../../arbitrary/dependent/dependent.js'
import { forAll, random } from '../../arbitrary/index.js'
import { object } from '../object/index.js'
import { string } from '../string/index.js'
import { tuple } from '../tuple/index.js'
import { constants } from './constants.js'

it('simple', () => {
    const aFoo = object({ foo: string() })
    const aBar = object({ bar: string() })
    forAll(tuple(aFoo, aBar), ([a, b]) => {
        const c = constants(a, b)
        const x = random(c)
        return x === a || x === b
    })
})

it('has the correct types', () => {
    expectTypeOf(constants('foo', 'bar')).toEqualTypeOf<Dependent<'foo' | 'bar'>>()
})

it('cardinality', () => {
    expect(constants('foo', 'bar').supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('2')
})
