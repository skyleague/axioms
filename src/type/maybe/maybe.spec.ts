import { Nothing } from '.'

test('Nothing is global', () => {
    expect(Symbol.keyFor(Nothing)).toEqual('Axioms.Nothing')
    expect(Nothing).toEqual(Symbol.for('Axioms.Nothing'))
})
