import { type Curried, curry } from './curry.js'

import { expect, it } from 'vitest'

it('simple', () => {
    const foo = (_x: string, _y: number, z: boolean) => z
    const f = curry(foo)('hello')(2)
    expect(f(true)).toMatchInlineSnapshot('true')
})

it('types', () => {
    function sum4(a: number, b: number, c: number, d: number) {
        return a + b + c + d
    }
    const curriedSum: Curried<[a: number, b: number, c: number, d: number], number> = curry(sum4)
    const curriedSum2: Curried<[b: number, c: number, d: number], number> = curriedSum(1)
    const curriedSum3: Curried<[d: number], number> = curriedSum2(2, 3)
    const result: number = curriedSum3(4)
    expect(result).toEqual(10)
})

it('add', () => {
    function sum3(a: number, b: number, c: number) {
        return a + b + c
    }

    const curriedSum = curry(sum3)
    expect(curriedSum(1, 2, 3)).toEqual(6)
    expect(curriedSum(1)(2, 3)).toEqual(6)
    expect(curriedSum(1, 2)(3)).toEqual(6)
})
