---
editUrl: false
next: false
prev: false
title: "asyncMap"
---

> **asyncMap**\<`I`, `O`\>(`xs`, `mapper`): `AsyncIterable`\<`O`\>

Map over an AsyncIterable, and give the results back as an AsyncIterable generator.

### Example
```ts
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
- [p-map-series](https://github.com/sindresorhus/p-map-series)
- [`AsyncIterator.prototype.map`](https://github.com/tc39/proposal-async-iterator-helpers)

## Type Parameters

• **I**

• **O**

The mapped output type.

## Parameters

### xs

The values to map over.

`AsyncIterable`\<`I`, `any`, `any`\> | `Iterable`\<`I`, `any`, `any`\>

### mapper

(`x`, `index`) => `O` \| `Promise`\<`O`\>

## Returns

`AsyncIterable`\<`O`\>

An async map generator.

## Defined in

[src/async/async-map/async-map.ts:31](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/async/async-map/async-map.ts#L31)
