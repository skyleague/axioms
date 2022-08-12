import type { BuildTuple } from '../tuple'

export type Subtract<A extends number, B extends number> = BuildTuple<A> extends [...infer R, ...BuildTuple<B>] ? R['length'] : 0

export type Add<A extends number, B extends number> = [...BuildTuple<A>, ...BuildTuple<B>]['length']
