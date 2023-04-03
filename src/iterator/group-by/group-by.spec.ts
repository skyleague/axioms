import { groupBy } from './group-by.js'

test('simple', () => {
    expect(groupBy([1, 2, 3, 4, 5], (x) => (x % 2 === 0 ? 'even' : 'odd'))).toMatchInlineSnapshot(`
        {
          "even": [
            2,
            4,
          ],
          "odd": [
            1,
            3,
            5,
          ],
        }
    `)
})
