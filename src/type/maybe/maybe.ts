export type Maybe<T> = Nothing | T
export type Just<T> = T
export const nothingSymbolStr = 'Axioms.Nothing'
export const Nothing = Symbol.for(nothingSymbolStr)
export type Nothing = typeof Nothing
