import { mapLefts, mapRights, whenLefts, whenRights } from './either'

test('mapRights', () => {
    expect(mapRights([{ left: 0 }, { right: 'a' }], (x0, x1) => x1)).toMatchInlineSnapshot(`
        {
          "left": 0,
        }
    `)
    expect(whenRights([{ right: 0 }, { right: 'a' }], (x0, x1) => [x0, x1])).toMatchInlineSnapshot(`
        [
          0,
          "a",
        ]
    `)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(whenRights([{ right: 0 }, { right: 'a' }], (x0, x1, x2) => [x0, x1, x2])).toMatchInlineSnapshot(`
        [
          0,
          "a",
          undefined,
        ]
    `)
})

test('mapLefts', () => {
    expect(mapLefts([{ left: 0 }, { right: 'a' }], (x0, x1) => x1)).toMatchInlineSnapshot(`
        {
          "right": "a",
        }
    `)
    expect(whenLefts([{ left: 0 }, { left: 'a' }], (x0, x1) => [x0, x1])).toMatchInlineSnapshot(`
        [
          0,
          "a",
        ]
    `)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(whenLefts([{ left: 0 }, { left: 'a' }], (x0, x1, x2) => [x0, x1, x2])).toMatchInlineSnapshot(`
        [
          0,
          "a",
          undefined,
        ]
    `)
})
