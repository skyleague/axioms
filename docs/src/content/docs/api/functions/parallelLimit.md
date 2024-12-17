---
editUrl: false
next: false
prev: false
title: "parallelLimit"
---

> **parallelLimit**(`maxConcurrency`): \<`T`\>(`task`) => `Promise`\<`T`\>

Creates a limit function that allows you to schedule promises that execute
with a maximum concurrency.

### Example
```ts
const limit = parallelLimit(2)
const tasks = [
  limit(async () => {
      await sleep(100)
      return 1
  }),
  limit(() => 2),
  limit(() => 3),
]
await Promise.all(tasks)
// => [1, 2, 3]
```

### Alternatives
- [p-limit](https://github.com/sindresorhus/p-limit)

## Parameters

### maxConcurrency

`number`

## Returns

`Function`

A limit function.

### Type Parameters

• **T**

### Parameters

#### task

() => `T` \| `Promise`\<`T`\>

### Returns

`Promise`\<`T`\>

## Defined in

[src/async/parallel-limit/parallel-limit.ts:29](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/async/parallel-limit/parallel-limit.ts#L29)
