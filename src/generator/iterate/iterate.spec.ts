import { iterate } from '.'

import { counter } from '..'
import { allEqual, take } from '../../iterator'
import { forAll, float } from '../../random'

test('iterate x + 1 === counter x', () => {
    forAll(float(), (x) =>
        allEqual(
            take(
                iterate(x, (y) => y + 1),
                100
            ),
            take(counter(x), 100)
        )
    )
})
