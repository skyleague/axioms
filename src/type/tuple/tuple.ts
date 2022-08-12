export type BuildTuple<L extends number, S = any, T extends any[] = []> = T extends { length: L }
    ? T
    : BuildTuple<L, S, [...T, S]>
