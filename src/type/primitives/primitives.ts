export type ComparablePrimitive = bigint | number | string
export type Primitive = ComparablePrimitive | PropertyKey | boolean | null | undefined
// eslint-disable-next-line @typescript-eslint/ban-types
export type BuiltinType = Date | Error | Function | Primitive | RegExp
