import type { Curried, CurriedVariadic } from '.'
import { curry, curryVariadic } from '.'

describe('curry', () => {
    test('simple', () => {
        const foo = (x: string, y: number, z: boolean) => z
        const f = curry(foo)('hello')(2)
        expect(f(true)).toMatchInlineSnapshot(`true`)
    })

    test('types', () => {
        function sum4(a: number, b: number, c: number, d: number) {
            return a + b + c + d
        }
        const curriedSum: Curried<[a: number, b: number, c: number, d: number], number> = curry(sum4)
        const curriedSum2: Curried<[b: number, c: number, d: number], number> = curriedSum(1)
        const curriedSum3: Curried<[d: number], number> = curriedSum2(2, 3)
        const result: number = curriedSum3(4)
        expect(result).toEqual(10)
    })

    test('add', () => {
        function sum3(a: number, b: number, c: number) {
            return a + b + c
        }

        const curriedSum = curry(sum3)
        expect(curriedSum(1, 2, 3)).toEqual(6)
        expect(curriedSum(1)(2, 3)).toEqual(6)
        expect(curriedSum(1, 2)(3)).toEqual(6)
    })
})

describe('curryVariadic', () => {
    test('simple', () => {
        const foo = (x: string, y: number, z: boolean) => z
        const f = curryVariadic(foo, 3)('hello')(2)
        expect(f(true)).toMatchInlineSnapshot(`true`)
    })

    test('types', () => {
        function sum4(a: number, b: number, c: number, d: number) {
            return a + b + c + d
        }
        const curriedSum: CurriedVariadic<[a: number, b: number, c: number, d: number], number, 4> = curryVariadic(sum4, 4)
        const curriedSum2: CurriedVariadic<[b: number, c: number, d: number], number, 3> = curriedSum(1)
        const curriedSum3: CurriedVariadic<[d: number], number, 1> = curriedSum2(2, 3)
        const result: number = curriedSum3(4)
        expect(result).toEqual(10)
    })

    test('types 2', () => {
        function sumAll(...xs: number[]): number {
            return xs.reduce((a, b) => a + b, 0)
        }
        const curriedSum: CurriedVariadic<number[], number, 4> = curryVariadic(sumAll, 4)
        const curriedSum2: CurriedVariadic<number[], number, 3> = curriedSum(1)
        const curriedSum3: CurriedVariadic<number[], number, 1> = curriedSum2(2, 3)
        const result: number = curriedSum3(4)
        expect(result).toEqual(10)
    })

    test('add', () => {
        function sum3(a: number, b: number, c: number) {
            return a + b + c
        }
        const curriedSum = curryVariadic(sum3, 3)
        expect(curriedSum(1, 2, 3)).toEqual(6)
        expect(curriedSum(1)(2, 3)).toEqual(6)
        expect(curriedSum(1, 2)(3)).toEqual(6)
    })

    test('add variadic', () => {
        function sumAll<T extends number[]>(...xs: [...T]): number {
            return xs.reduce((a, b) => a + b, 0)
        }
        const curriedSum = curryVariadic(sumAll, 3)
        expect(curriedSum(1, 2, 3)).toEqual(6)
        expect(curriedSum(1)(2, 3)).toEqual(6)
        expect(curriedSum(1, 2)(3)).toEqual(6)
    })

    test('add variadic - many arguments', () => {
        function sumAll<T extends number[]>(...xs: [...T]): number {
            return xs.reduce((a, b) => a + b, 0)
        }
        const curriedSum = curryVariadic(sumAll, 10)
        expect(curriedSum(1, 2, 3, 0, 0, 0, 0, 0, 0)(0)).toEqual(6)
        expect(curriedSum(1)(2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toEqual(6)
        expect(curriedSum(1, 2)(3, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toEqual(6)
    })

    test('add variadic - TS error on unsupported types', () => {
        function sumAll<T extends number[]>(...xs: [...T]): number {
            return xs.reduce((a, b) => a + b, 0)
        }
        const curriedSum = curryVariadic(sumAll, 2)
        expect(curriedSum(1, 1)).toEqual(2)
        expect(curriedSum(1)(2)).toEqual(3)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        expect(curriedSum(1, true)).toEqual(2)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        expect(curriedSum(1)('2')).toEqual('12')
    })
})
