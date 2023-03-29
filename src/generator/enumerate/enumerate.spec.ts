import { enumerate } from './index.js'

import { collect, zip } from '../../array/index.js'
import { allEqual, map } from '../../iterator/index.js'
import { forAll, array, unknown } from '../../random/index.js'
import { counter, range } from '../index.js'

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

test('simple', () => {
    expect(collect(enumerate(range(10, 14)))).toMatchInlineSnapshot(`
        [
          [
            0,
            10,
          ],
          [
            1,
            11,
          ],
          [
            2,
            12,
          ],
          [
            3,
            13,
          ],
        ]
    `)
})
