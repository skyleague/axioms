---
sidebar_position: 0
---

# Arbitraries

```ts
interface ArbitraryContext {
    rng: RandomGenerator
}

interface Arbitrary<T> {
    value: (context: ArbitraryContext) => Tree<T>
}
```


## Dependent

```ts
 interface Dependent<T> extends Arbitrary<T> {
    sample(context: ArbitraryContext): T
    random: (context?: ArbitraryContext) => T
}
```

## Integrated
```ts
interface Integrated<C, T> extends Arbitrary<T> {
    constraints: C
    value: (context: ArbitraryContext, x?: T) => Tree<T>
    random: (context?: ArbitraryContext) => T
    shrink: (x: T) => Tree<T>
}
```