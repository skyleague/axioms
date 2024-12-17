---
editUrl: false
next: false
prev: false
title: "equal"
---

> **equal**(`a`, `b`): `boolean`

It returns true if the two arguments are deeply equal, and false otherwise.

This function is a wrapper around [fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal).

### Example
```ts
equal({foo: "bar"}, {foo: "bar"})
// => true

equal([1, 2, 3], [1, 2, 3])
// => true

equal([1, 2, 3], [1, 2])
// => false

equal([{foo: "bar"}], [{bar: "foo"}])
// => false
```

### Alternatives
- [fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal)
- [Lodash - isEqual](https://lodash.com/docs/4.17.15#isEqual)

## Parameters

### a

`unknown`

unknown

### b

`unknown`

unknown

## Returns

`boolean`

A function that takes two arguments and returns a boolean.

## Defined in

[src/iterator/equal/equal.ts:34](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/equal/equal.ts#L34)
