export type Try<T> = Failure | Success<T>
export type Failure = Error
export type Success<T> = T
