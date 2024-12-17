---
editUrl: false
next: false
prev: false
title: "sleep"
---

> **sleep**(`ms`): `Promise`\<`void`\>

Sleeps the cothread for the specified number of millisecond.

### Example
```ts
await sleep(1_000)
// => sleeps for 1 second
```

## Parameters

### ms

`number`

The amount of milliseconds to sleep.

## Returns

`Promise`\<`void`\>

A promise that resolves when the sleep has ended.

## Defined in

[src/async/sleep/sleep.ts:16](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/async/sleep/sleep.ts#L16)
