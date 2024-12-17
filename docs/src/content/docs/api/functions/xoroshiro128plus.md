---
editUrl: false
next: false
prev: false
title: "xoroshiro128plus"
---

> **xoroshiro128plus**(`seed`): [`Xoroshiro128plusGenerator`](/api/interfaces/xoroshiro128plusgenerator/)

A xoroshiro128plus implementation to generate random values.

Inspired by:
http://prng.di.unimi.it/xoroshiro128plus.c

## Parameters

### seed

The seed for the random number generator.

`bigint` | [`bigint`, `bigint`]

## Returns

[`Xoroshiro128plusGenerator`](/api/interfaces/xoroshiro128plusgenerator/)

A generator function that returns a random number.

## Defined in

[src/random/rng/xoroshiro128plus/xoroshiro128plus.ts:23](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/rng/xoroshiro128plus/xoroshiro128plus.ts#L23)
