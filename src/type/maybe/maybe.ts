export type Maybe<T> = Nothing | T
export type Just<T> = Exclude<T, Nothing>

export const nothingSymbol = '(Nothing)'
export const Nothing = /* @__PURE__ */ (() => Symbol.for(nothingSymbol))()
export type Nothing = typeof Nothing
