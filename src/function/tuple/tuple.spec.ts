import { curryTuple } from '.'

test('tuple', () => {
    expect(curryTuple(1)(1)).toMatchInlineSnapshot(`
        Array [
          1,
        ]
    `)
    expect(curryTuple(3)(1)(2)(3)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
    expect(curryTuple(3)(1)).toMatchInlineSnapshot(`[Function]`)
})
