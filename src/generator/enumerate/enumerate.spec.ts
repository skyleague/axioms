import { enumerate } from '.'

import { counter, range } from '..'
import { zip } from '../../array'
import { allEqual, map } from '../../iterator'
import { forAll, array, unknown } from '../../random'

test('enumerate == zip counter()', () => {
    forAll(array(unknown()), (xs) => allEqual(enumerate(xs), zip(counter(), xs)))
})

test('map first enumerate == range', () => {
    forAll(array(unknown()), (xs) =>
        allEqual(
            map(enumerate(xs), (x) => x[0]),
            range(xs.length)
        )
    )
})

test('map second enumerate == identity', () => {
    forAll(array(unknown()), (xs) =>
        allEqual(
            map(enumerate(xs), (x) => x[1]),
            xs
        )
    )
})
