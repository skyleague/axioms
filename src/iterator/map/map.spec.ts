import { map } from './index.js'

import { forAll, array, string, integer, oneOf } from '../../random/index.js'

test('map f x === [f x for x in xs]', () => {
    forAll(array(oneOf(string(), integer())), (xs: (number | string)[]) => {
        expect([...map(xs, (x) => `${x}foo`)]).toEqual([...xs].map((x) => `${x as string}foo`))
    })
})
