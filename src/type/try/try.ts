export type Try<T> = Failure | T
export type Failure = Error
export type Success<T> = Exclude<T, Failure>
