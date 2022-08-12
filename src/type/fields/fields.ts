// @todo: names maybe something with stricten/relax
export type NoUndefinedFields<T> = {
    [P in keyof T]-?: Exclude<T[P], undefined>
}

export type NoNullableFields<T> = {
    [P in keyof T]-?: Exclude<T[P], null>
}

export type UndefinedFields<T> = {
    [P in keyof T]?: T[P] | undefined
}

export type NullableFields<T> = {
    [P in keyof T]?: T[P] | null
}
