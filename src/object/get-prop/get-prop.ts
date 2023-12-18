/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Nothing, isObject } from '../../index.js'

type Path<T, Key extends keyof T = keyof T> = Key extends string
    ? T[Key] extends Record<string, any>
        ? Key | `${Key}.${Path<T[Key], keyof T[Key]>}`
        : Key
    : never

type PathValue<T, P extends Path<T> | string> = P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
        ? Rest extends Path<T[Key]>
            ? PathValue<T[Key], Rest>
            : Nothing
        : Nothing
    : P extends keyof T
      ? T[P]
      : Nothing

export function getProp<T, P extends Path<T> | string>(obj: T, path: P): P extends Path<T> ? PathValue<T, P> : Nothing {
    let current: any = obj
    const keys = path.split('.')
    for (const key of keys) {
        if (!isObject(current) || !(key in current)) {
            return Nothing as P extends Path<T> ? PathValue<T, P> : Nothing
        }
        current = current[key]
    }
    return current
}
