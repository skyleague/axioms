import type { Subtract } from '../../type/index.js'

type UnconsArgsHelper<T extends unknown[], L extends number, I extends unknown[] = [], F = (...a: T) => void> = number extends L
    ? UnconsArgsHelper<T, 10, I>
    : [
          { init: I; tail: T },
          ...(F extends (a: infer A, ...z: infer Z) => void
              ? L extends 0
                  ? { init: T; tail: [] }[]
                  : UnconsArgsHelper<Z, Subtract<L, 1>, [...I, A]>
              : { init: T; tail: [] }[]),
      ]
export type UnconsArgs<T extends unknown[], L extends number> = UnconsArgsHelper<T, L>[L]

export type Curried<A extends unknown[], R> = <L extends UnconsArgs<A, number>['init']>(
    ...args: L
) => 0 extends L['length']
    ? never
    : 0 extends UnconsArgs<A, L['length']>['tail']['length']
      ? R
      : Curried<UnconsArgs<A, L['length']>['tail'], R>

export function curry<T extends unknown[], R>(f: (...args: T) => R): Curried<T, R> {
    return function curried(this: unknown, ...args: unknown[]) {
        if (args.length >= f.length) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
            return f.apply(this, args as any)
        } else {
            return function (this: unknown, ...args2: unknown[]) {
                return curried.apply(this, args.concat(args2))
            }
        }
    } as Curried<T, R>
}
