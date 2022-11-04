export type Maybe<T> = Nothing | T
export type Just<T> = Exclude<T, Nothing>

export const Nothing = Object.freeze(
    new (class {
        public ['(Nothing)'] = true
        public toString() {
            return '(Nothing)'
        }
    })()
) as unknown as Nothing

export type Nothing = symbol
