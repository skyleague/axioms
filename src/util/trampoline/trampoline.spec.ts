import { trampoline } from '.'

test('non trampoline', () => {
    const sumBelow = (n: number, sum = 0): number => (n === 0 ? sum : sumBelow(n - 1, sum + n))
    expect(() => sumBelow(123456)).toThrow()
})

test('trampoline', () => {
    const sumBelowRec = (n: number, sum = 0) => (n === 0 ? sum : () => sumBelowRec(n - 1, sum + n))

    const sumBelow = trampoline(sumBelowRec)
    expect(sumBelow(123456)).toMatchInlineSnapshot(`7620753696`)
})
