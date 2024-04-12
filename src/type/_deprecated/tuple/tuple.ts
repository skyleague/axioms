/**
 * @deprecated
 */
export type BuildTuple<L extends number, S = unknown, T extends unknown[] = []> = T extends { length: L }
    ? T
    : BuildTuple<L, S, [...T, S]>
