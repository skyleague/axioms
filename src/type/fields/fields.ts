/**
 * @deprecated
 */
export type NoUndefinedFields<T> = {
    [P in keyof T]-?: Exclude<T[P], undefined>
}

/**
 * @deprecated
 */
export type NoNullableFields<T> = {
    [P in keyof T]-?: Exclude<T[P], null>
}

/**
 * @deprecated
 */
export type UndefinedFields<T> = {
    [P in keyof T]?: T[P] | undefined
}

/**
 * @deprecated
 */
export type NullableFields<T> = {
    [P in keyof T]?: T[P] | null
}
