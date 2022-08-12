import type { Nothing } from '../../type/maybe/maybe'
import { nothingSymbolStr } from '../../type/maybe/maybe'

export function isNothing(x: Nothing | unknown): x is Nothing {
    return typeof x === 'symbol' && Symbol.keyFor(x) === nothingSymbolStr
}
