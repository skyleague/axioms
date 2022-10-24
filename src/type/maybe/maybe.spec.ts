import { Nothing } from '.'

test('Nothing is global', () => {
    expect(Symbol.keyFor(Nothing)).toEqual('Axioms.Nothing')
    expect(Nothing).toEqual(Symbol.for('Axioms.Nothing'))
})

test('nothing serializes', () => {
    expect(JSON.stringify({ nothing: Nothing, undefined: undefined, null: null })).toMatchInlineSnapshot(`"{"null":null}"`)
})
