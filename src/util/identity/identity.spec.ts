import { identity } from '.'

import { forAll, unknown } from '../../random'

test('self', () => {
    expect(identity(1)).toEqual(1)
    expect(identity('1')).toEqual('1')
    expect(identity({ '1': 2 })).toEqual({ '1': 2 })
})

test('identity x === x', () => {
    forAll(unknown(), (x) => identity(x) === x)
})
