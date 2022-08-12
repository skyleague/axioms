import type { Maybe } from '../../type/maybe'
import type { Nothing } from '../../type/maybe/maybe'
import { nothingSymbolStr } from '../../type/maybe/maybe'

export function isJust<T>(x: Maybe<T>): x is Exclude<Maybe<T>, Nothing> {
    return typeof x !== 'symbol' || Symbol.keyFor(x) !== nothingSymbolStr
}
