---
editUrl: false
next: false
prev: false
title: "asyncCollect"
---

> **asyncCollect**\<`T`\>(`xs`): `Promise`\<`T`[]\>

Collect the values from an AsyncIterable and return them as an array.

### Example
```ts
await asyncCollect([1, 2, 3])
// => [2, 3, 4]

await asyncCollect([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
// => [2, 3, 4]

await asyncCollect(asyncMap([1, 2, 3], (x) => x + 1))
// => [2, 3, 4]

const asyncFn = <T>(x: T) => Promise.resolve(x)
async function* foobar() {
  yield await asyncFn('foo')
  yield await asyncFn('Bar')
}
await asyncCollect(asyncMap(foobar(), asyncFn))
// => ["foo", "bar"]
```

### Alternatives
- [p-all](https://github.com/sindresorhus/p-all)

### Proposals
- [`Array.prototype.fromAsync`](https://github.com/tc39/proposal-array-from-async)
- [`AsyncIterator.prototype.toArray`](https://github.com/tc39/proposal-async-iterator-helpers)

## Type Parameters

• **T**

The element type.

## Parameters

### xs

The values to map over.

`AsyncIterable`\<`T`, `any`, `any`\> | `Iterable`\<`T`, `any`, `any`\>

## Returns

`Promise`\<`T`[]\>

An array with the values from the async generator.

## Defined in

[src/async/async-collect/async-collect.ts:40](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/async/async-collect/async-collect.ts#L40)
