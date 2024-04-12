export type MaybePartial<T> = {
    [P in keyof T]?: T[P] | undefined
}
