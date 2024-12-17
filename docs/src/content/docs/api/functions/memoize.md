---
editUrl: false
next: false
prev: false
title: "memoize"
---

## Call Signature

> **memoize**\<`Fn`\>(`getter`): [`Memoized`](/api/type-aliases/memoized/)\<`Fn`\>

Memoizes a constant or a constant function output. Subsequent calls to the function will
not evaluate the given constant function, but uses a cached value instead.

### Example
```ts
let i = 0
const mem = memoize(() => i++)
mem()
// => 0

mem()
// => 0

mem.clear()
mem()
// => 1
```

### Alternatives
- [Lodash - memoize](https://lodash.com/docs/4.17.15#memoize)

### Type Parameters

• **Fn** *extends* () => `any`

### Parameters

#### getter

`Fn`

The constant or constant function.

### Returns

[`Memoized`](/api/type-aliases/memoized/)\<`Fn`\>

The memoized function to the constant.

### Defined in

[src/algorithm/memoize/memoize.ts:49](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/algorithm/memoize/memoize.ts#L49)

## Call Signature

> **memoize**\<`Fn`\>(`getter`, `resolver`): [`Memoized`](/api/type-aliases/memoized/)\<`Fn`\>

Memoizes a constant or a constant function output. Subsequent calls to the function will
not evaluate the given constant function, but uses a cached value instead.

### Example
```ts
let i = 0
const mem = memoize(() => i++)
mem()
// => 0

mem()
// => 0

mem.clear()
mem()
// => 1
```

### Alternatives
- [Lodash - memoize](https://lodash.com/docs/4.17.15#memoize)

### Type Parameters

• **Fn** *extends* (...`args`) => `any`

### Parameters

#### getter

`Fn`

The constant or constant function.

#### resolver

`Resolver`\<`Fn`\>

The resolver that defines how the constant function should be retrieved.

### Returns

[`Memoized`](/api/type-aliases/memoized/)\<`Fn`\>

The memoized function to the constant.

### Defined in

[src/algorithm/memoize/memoize.ts:51](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/algorithm/memoize/memoize.ts#L51)
