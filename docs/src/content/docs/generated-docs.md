---
title: Axioms
---  
 One of the design goals of Axioms is to patch some missing gaps in existing libraries, or in the core languages - but more _importantly_ without getting in your way. This means that any function of the Axioms should be easily replaceable with other implementations from other libraries, or preferably with the implementation of ECMAScript definitions.

## FP Trap

Axioms exposes some concepts that are seen more commonly in functional programming, such as:

1. Either
2. Maybe
3. Try
4. Property Testing
5. Iterators

There are loads of implementations that can be found for any of these concepts in javascript/typescript. And the conceptual models are becoming more and more mainstream. Languages like Scala, Rust, C++ and even javascript are implementing more of these concepts as part of the standard language. While we will not go out of our way to look into their definitions and implementation - it is good to know that there is growing mainstream support for the conceptual models.

An often made _mistake_ (in our opinion) is to force these concepts in your application/library code by implementation specific parts. This means that your library will take over the core concepts of the programming languages by introducing a new DSL.

Lets take [Rambda](https://ramdajs.com/docs/#ifElse) (an otherwise excellent high quality library) as example:

```ts
const incCount = R.ifElse(R.has('count'), R.over(R.lensProp('count'), R.inc), R.assoc('count', 1))
incCount({ count: 1 }) //=> { count: 2 }
incCount({}) //=> { count: 1 }
```

By defining everything as a full monad on top of the javascript language, we:

1. Become extremely coupled by the implementation.
2. Have to learn a new DSL to properly read this.
3. Loose sight of where the boundaries of FP are helpful.

## Practical approach

In Axioms we decided to go in a different route. We don't define full monads, or try to take over your code completely. We gain readability, debuggability and familiarity, at the cost of some correctness and purity (and we accept that not everyone will like this tradeoff).

How do we do this? Simple! We define such simple types that you don't even need to import them from Axioms. Want to define a Left? Just define it as `{left: <value>}`. Want to have a Just? Simple, just use the value as `<value>`, `Nothing` is it's own symbol.

But if these types are as simple as we just defined - why would we need Axioms? - The honest answer is you don't :). We took a lot of care defining the concepts in this library and making sure they are practically useful. And while we define lots of functions that you might need in daily practice, there are always a few alternatives. 
 ## Algorithm 
  
  
- #### [Tree](/api/interfaces/tree/)
  

A type that represents a tree with an enumerable amount of children.

 
- #### [cacheResolver](/api/functions/cacheresolver/)
  

> **cacheResolver**\<`Fn`\>(): `Resolver`\<`Fn`\>

Caches the value until it is explicitly cleared.

 
```ts
let i = 0
const mem = memoize(() => i++, cacheResolver())
mem()
// => 0

mem()
// => 0

mem.clear()
mem()
// => 1
```


- #### [filterTree](/api/functions/filtertree/)
  

> **filterTree**\<`T`\>(`x`, `f`): [`Tree`](/api/interfaces/tree/)\<`T`\>

Filter children out of a tree by a given predicate.

This function is fully lazy, meaning that we do not evaluate children
until they are iterated on. Iteration of the children modify the iterators.

 
```ts
const t = filterTree(tree(1, [tree(2, tree(5)), tree(3)]), (x) => x < 4)
showTree(t)
// => └─ 1
//       ├─ 2
//       └─ 3

showTree(t)
// => └─ 1
```


- #### [mapTree](/api/functions/maptree/)
  

> **mapTree**\<`T`, `U`\>(`x`, `f`): [`Tree`](/api/interfaces/tree/)\<`U`\>

Map a function over the tree starting with the root node, and mapping
the children recursively.

This function is fully lazy, meaning that we do not evaluate children
until they are iterated on. Iteration of the children modify the iterators.

 
```ts
const t = mapTree(tree(1, [tree(2), tree(3)]), (x) => x + 1)
showTree(t)
// => └─ 2
//       ├─ 3
//       └─ 4

showTree(t)
// => └─ 2
```


- #### [memoize](/api/functions/memoize/)
  

 
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

#
- #### [tree](/api/functions/tree/)
  

> **tree**\<`T`\>(`x`, `children`?): [`Tree`](/api/interfaces/tree/)\<`T`\>

Helper function to build a tree node.

 
- #### [ttlCacheResolver](/api/functions/ttlcacheresolver/)
  

> **ttlCacheResolver**\<`Fn`\>(`ttl`): `Resolver`\<`Fn`\>

Caches the value until the value expires.

 
```ts
let i = 0
const mem = memoize(() => i++, ttlCacheResolver(1000))
mem()
// => 0

mem()
// => 0

mem.clear()
mem()
// => 1
```



## Arbitrary 
 The best way to get started with property testing is to get your hands dirty. We'll use some examples to show you how property testing can help you find bugs and simplify the process of writing tests!

#### Sorting Numbers

We've all been here before. You've gotten a list of numbers, and need to get it sorted in order. Luckily, you remember that there is a built in function to take care of this for you. And you start writing down the implementation:

```ts
function sort(xs: number[]): number[] {
    return xs.sort()
}
```

Looks good right? Normally we'd test this function by putting down some simple test:

```ts
test('sorts the numbers', () => {
    expect(sort([1, 2, 3])).toEqual([1, 2, 3])
})
```

Everything looks good! Let's try to test the same function with property testing. We first have to define the arbitrary we are going to use. Fortunately this one is easily defined as we only need to have an array of numbers: `array(integer())`.

With this arbitrary we can start testing the function on arbitrary numbers. The second part we need for property testing is to test a specific property of the function. For sorting this can easily be done by writing a function that checks if the output is actually sorted:

```ts
function isSorted(xs: number[]): boolean {
    for (let i = 1; i < xs.length; ++i) {
        if (xs[i - 1] > xs[i]) {
            return false
        }
    }
    return true
}
```

Now we can write the same test, but set it up as a property test. We use the `forAll` primitive, which automatically generates (by default) 100 tests for us with different characteristics, and when the test fails it is going to automatically find the smallest case that fails:

```ts
test('sorts the numbers', () => {
    forAll(array(integer()), (xs) => isSorted(sort(xs)))
})
```

If we run this test we are going to get this output:

``` 
    FalsifiedError: Counter example found after 8 tests (seed: 543856071451n) 
    Shrunk 127 time(s) 
    Counter example: 
     
    [ 10, 2 ] 
```

We're onto something! If we look at the documentation of the [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function, we'll see the following line:

> The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

This means that it is lexicographically sorting the numbers. So our implemented `sort` will return `[10, 2]` instead of `[2, 10]`. We fix our sorting function with this new information:

```ts
function sort(xs: number[]): number[] {
    return xs.sort((a, z) => a - z)
}
```

And now the tests succeeds! With property testing we can test all the assumptions we'd normally put in writing the implementation in the first place - without us requiring any extra effort. It does however take some practice to get used to setting up tests this way.

#### Contains

As a nice comparison with the excellent [fast-check](https://github.com/dubzzz/fast-check#getting-started) library, we also include the string contains example:

```ts
describe('contains', () => {
    const contains = (text: string, pattern: string) => text.includes(pattern)

    test('should always contain itself', () => {
        forAll(string(), (text) => contains(text, text))
    })

    test('should always contain its substrings', () => {
        forAll(tuple(string(), string(), string()), ([a, b, c]) => {
            return contains(`${a}${b}${c}`, b)
        })
    })
})
```
 
 #### Functions 
- #### [ArrayGenerator](/api/interfaces/arraygenerator/)
  

Describes how arrays are allowed to be generated.

 
- #### [CharGenerator](/api/interfaces/chargenerator/)
  

Describes how characters are allowed to be generated.

 
- #### [DatetimeGenerator](/api/interfaces/datetimegenerator/)
  

Describes how datetimes are allowed to be generated.

 
- #### [FloatGenerator](/api/interfaces/floatgenerator/)
  

Describes how floats are allowed to be generated.

 
- #### [IntegerGenerator](/api/interfaces/integergenerator/)
  

Describes how integers are allowed to be generated.

 
- #### [JsonGenerator](/api/interfaces/jsongenerator/)
  

Describes how json values are allowed to be generated.

 
- #### [NaturalConstraints](/api/interfaces/naturalconstraints/)
  

Describes how natural numbers are allowed to be generated.

 
- #### [PrimitiveGenerator](/api/interfaces/primitivegenerator/)
  

Describes how primitive values are allowed to be generated.

 
- #### [PropertyKeyGenerator](/api/interfaces/propertykeygenerator/)
  

Describes how property key values are allowed to be generated.

 
- #### [UnknownGenerator](/api/type-aliases/unknowngenerator/)
  

> **UnknownGenerator**: [`PrimitiveGenerator`](/api/interfaces/primitivegenerator/) & `object`

Describes how unknown values are allowed to be generated.

 
- #### [allOf](/api/functions/allof/)
  

> **allOf**\<`T`\>(...`arbitraries`): [`Dependent`](/api/interfaces/dependent/)\<`UnionToIntersection`\<`TypeOfArbitraries`\<`T`\>\>\>

It takes an arbitrary number of arbitraries, and returns an arbitrary that generates objects that
are the result of merging all the objects generated by the input arbitraries.

 
```ts
random(allOf(object({foo: string()}), object({bar: string()})))
// => {foo: "bar", bar: "foo"}
```


- #### [alpha](/api/functions/alpha/)
  

> **alpha**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid alpha (a-zA-Z) string arbitrary.

 
```ts
random(alpha())
// => "Bab"
```


- #### [alphaChar](/api/functions/alphachar/)
  

> **alphaChar**(`extra`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid alpha (a-zA-Z) character arbitrary.

 
```ts
random(alphaChar())
// => "B"
```


- #### [alphaNumeric](/api/functions/alphanumeric/)
  

> **alphaNumeric**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid alpha numeric (a-zA-Z0-9) string arbitrary.

 
```ts
random(alphaNumeric())
// => "9ab10"
```


- #### [alphaNumericChar](/api/functions/alphanumericchar/)
  

> **alphaNumericChar**(`extra`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid alpha numeric (a-zA-Z0-9) character arbitrary.

 
```ts
random(alphaNumericChar())
// => "9"
```


- #### [array](/api/functions/array/)
  

> **array**\<`T`, `Min`\>(`arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`ArrayOf`\<`T`, `Min`\>\>

It generates an array of arbitrary values, with a length between `minLength` and `maxLength`, and
with unique items if `uniqueItems` is true.

 
```ts
random(array(integer()))
// => [1, 3, 4]
```


- #### [ascii](/api/functions/ascii/)
  

> **ascii**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a string from the ascii alphabet arbitrary.

 
```ts
random(ascii())
// => "cab"
```


- #### [asciiChar](/api/functions/asciichar/)
  

> **asciiChar**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a character from the ascii alphabet arbitrary.

 
```ts
random(asciiChar())
// => "c"
```


- #### [base64](/api/functions/base64/)
  

> **base64**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid base64 (a-zA-Z0-9+/) string arbitrary. And adds the padding
as required.

 
```ts
random(base64())
// => "abc="
```


- #### [base64Char](/api/functions/base64char/)
  

> **base64Char**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid base64 (a-zA-Z0-9+/) character arbitrary.

 
```ts
random(base64Char())
// => "A"
```


- #### [boolean](/api/functions/boolean/)
  

> **boolean**(): [`Integrated`](/api/interfaces/integrated/)\<`undefined`, `boolean`\>

It returns an arbitrary that generates a boolean value.

 
```ts
random(boolean())
// => true
```


- #### [char](/api/functions/char/)
  

> **char**(`options`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a character arbitrary.

 
```ts
random(char())
// => "-"
```


- #### [constant](/api/functions/constant/)
  

> **constant**\<`T`\>(`x`): [`Dependent`](/api/interfaces/dependent/)\<`T`\>

It takes a constant value and creates an arbitrary out of it.

 
```ts
random(constant("foobar"))
// => "foobar"

random(constant(1))
// => 1
```


- #### [constants](/api/functions/constants/)
  

> **constants**\<`T`\>(...`consts`): [`Dependent`](/api/interfaces/dependent/)\<`T`\[`number`\]\>

A function that generates a dependent type for a given set of enumerated values.

 
```ts
random(constants("foo", "bar"))
// => "foo"
```


- #### [date](/api/functions/date/)
  

> **date**(`constraints`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates an ISO08501 date value.

 
```ts
random(date())
// => "1991-01-18"
```


- #### [datetime](/api/functions/datetime/)
  

> **datetime**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`Date`\>

It returns an arbitrary that generates a datetime value of type Date.

 
```ts
random(datetime())
// => new Date("1991-01-18T15:33:11.000Z")

random(datetime({precision: 'days'}))
// => new Date("1991-01-17T23:00:00.000Z")
```


- #### [domain](/api/functions/domain/)
  

> **domain**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid domains according to https://www.ietf.org/rfc/rfc1034.txt

 
```ts
random(domain())
// => "xt8x57fyxl3r.pq11p"
```


- #### [element](/api/functions/element/)
  

> **element**\<`T`\>(`elements`): [`Dependent`](/api/interfaces/dependent/)\<`T` *extends* `string` ? `string` : `T`\[`number`\]\>

It returns an arbitrary that takes a random element from the array.

 
```ts
random(element("abc"))
// => "b"

random(element("abc"))
// => "c"

random(element([1, 2, 3]))
// => 3
```


- #### [email](/api/functions/email/)
  

> **email**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid email addresses according to https://datatracker.ietf.org/doc/html/rfc5322

 
```ts
random(email())
// => "xt8x57fyxl3r.pq11p"
```


- #### [float](/api/functions/float/)
  

> **float**(`constraints`): [`Integrated`](/api/interfaces/integrated/)\<`FloatConstraints`, `number`\>

It returns an arbitrary that generates a random floating point number between -2,147,483,648 and
2,147,483,647.

 
```ts
random(float())
// => 3.158

random(float())
// => 552579827.575685
```


- #### [hex](/api/functions/hex/)
  

> **hex**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a hexidecimal (0-9a-f) string arbitrary.

 
```ts
random(hex())
// => "deadbeef"
```


- #### [hexChar](/api/functions/hexchar/)
  

> **hexChar**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a hexidecimal (0-9a-f) character arbitrary.

 
```ts
random(hexChar())
// => "d"
```


- #### [integer](/api/functions/integer/)
  

> **integer**(`constraints`): [`Integrated`](/api/interfaces/integrated/)\<`IntegerConstraints`, `number`\>

It returns an arbitrary that generates integers between -2^31 and 2^31.

 
```ts
random(integer())
// => 123
```


- #### [ipv4](/api/functions/ipv4/)
  

> **ipv4**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid ipv4s

 
```ts
random(ipv4())
// => "192.168.1.1"
```


- #### [ipv6](/api/functions/ipv6/)
  

> **ipv6**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid ipv6s

 
```ts
random(ipv6())
// => "192.168.1.1"
```


- #### [json](/api/functions/json/)
  

> **json**(`constraints`): [`Dependent`](/api/interfaces/dependent/)\<`JsonValue`\>

It returns an arbitrary that generates valid json.

 
```ts
random(json())
// => {}

random(json())
// => {"i|": false}

random(json({type: 'array'}))
// => [false]
```


- #### [lowerAlpha](/api/functions/loweralpha/)
  

> **lowerAlpha**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid lower case alpha (a-z) string arbitrary.

 
```ts
random(lowerAlpha())
// => "bab"
```


- #### [lowerAlphaChar](/api/functions/loweralphachar/)
  

> **lowerAlphaChar**(`extra`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid lower case alpha (a-z) character arbitrary.

 
```ts
random(lowerAlphaChar())
// => "b"
```


- #### [lowerAlphaNumeric](/api/functions/loweralphanumeric/)
  

> **lowerAlphaNumeric**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid lower case alpha numeric (a-z0-9) string arbitrary.

 
```ts
random(lowerAlphaNumericChar())
// => "b"
```


- #### [lowerAlphaNumericChar](/api/functions/loweralphanumericchar/)
  

> **lowerAlphaNumericChar**(`extra`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid lower case alpha numeric (a-z0-9) character arbitrary.

 
```ts
random(lowerAlphaNumericChar())
// => "b"
```


- #### [natural](/api/functions/natural/)
  

> **natural**(`constraints`): [`Integrated`](/api/interfaces/integrated/)\<[`NaturalConstraints`](/api/interfaces/naturalconstraints/), `number`\>

It returns an arbitrary that generates natural numbers between 0 and 2^31.

 
```ts
random(natural())
// => 123
```


- #### [nullable](/api/functions/nullable/)
  

> **nullable**\<`T`\>(`a`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`T` \| `null`\>

It takes an arbitrary and returns a new arbitrary that can generate null values.

 
```ts
random(nullable(integer()))
// => null

random(nullable(integer()))
// => 1234

random(nullable(integer({symbol: Nothing})))
// => Nothing
```


- #### [object](/api/functions/object/)
  

> **object**\<`T`\>(`properties`): [`Dependent`](/api/interfaces/dependent/)\<`{ [K in keyof T]: T[K] extends { value: any } ? Value : never }`\>

It takes an object of arbitraries and returns an arbitrary of an object of values.

 
```ts
random(object({foo: integer()}))
// => {foo: 921604357}

random(object({foo: integer()}))
// => {foo: 511147728}
```


- #### [oneOf](/api/functions/oneof/)
  

> **oneOf**\<`T`\>(...`arbitraries`): [`Dependent`](/api/interfaces/dependent/)\<`TypeOfArbitraries`\<`T`\>\>

It generates an integer between 0 and the number of arbitraries passed in, and then generates a
value from the corresponding arbitrary.

 
```ts
random(oneOf(object({foo: string()}), object({bar: string()})))
// => {foo: "bar"}

random(oneOf(object({foo: string()}), object({bar: string()})))
// => {bar: "foo"}
```


- #### [oneOfWeighted](/api/functions/oneofweighted/)
  

> **oneOfWeighted**\<`T`\>(...`arbitraries`): [`Dependent`](/api/interfaces/dependent/)\<`ReturnType`\<[`...T`]\[`number`\]\[`1`\]\[`"value"`\]\>\[`"value"`\]\>

It generates an integer between 0 and the number of arbitraries passed in, and then generates a
weighted value from the corresponding arbitrary.

 
```ts
random(oneOf([2, object({foo: string()})], [1, object({bar: string()})]))
// => {foo: "bar"}

random(oneOf([2, object({foo: string()})], [1, object({bar: string()})]))
// => {foo: "bar"}

random(oneOf([2, object({foo: string()})], [1, object({bar: string()})]))
// => {bar: "foo"}
```


- #### [optional](/api/functions/optional/)
  

> **optional**\<`T`, `O`\>(`arbitrary`, `constraints`): [`Nothing`](/api/type-aliases/nothing/) *extends* `O` ? [`Dependent`](/api/interfaces/dependent/)\<[`Maybe`](/api/type-aliases/maybe/)\<`T`\>\> : [`Dependent`](/api/interfaces/dependent/)\<`O` \| `T`\>

`optional` takes an arbitrary and returns an arbitrary that is either the original arbitrary or the
optional symbol

 
```ts
random(optional(integer()))
// => Nothing

random(optional(integer()))
// => 1234

random(optional(integer({symbol: undefined})))
// => undefined
```


- #### [pattern](/api/functions/pattern/)
  

> **pattern**\<`S`\>(`patternStr`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generates a string based on a pattern string.

 
```ts
random(pattern('A#*a'))
// => e.g. 'B5xq'
```

The pattern string can contain the following characters:
- `*`: any alphanumeric character
- `#`: any digit (0-9)
- `A`: any uppercase or lowercase alphabetical character
- `a`: any lowercase alphabetical character
- `i`: any alphabetical character (uppercase or lowercase)


- #### [primitive](/api/functions/primitive/)
  

 
```ts
random(primitive())
// => null

random(primitive())
// => Symbol(4EM)
```

#
- #### [propertyKey](/api/functions/propertykey/)
  

> **propertyKey**(`constraints`): [`Dependent`](/api/interfaces/dependent/)\<`PropertyKey`\>

It returns an arbitrary that generates an object property key.

 
```ts
random(propertyKey())
// => ""

random(propertyKey())
// => "MWxUWO93"
```


- #### [random](/api/functions/random/)
  

> **random**\<`T`\>(`arbitrary`, `ctx`): `T`

It takes an arbitrary and a context, and returns a random value of the type that arbitrary generates

 
```ts
random(integer())
// => 123
```


- #### [record](/api/functions/record/)
  

> **record**\<`T`, `K`\>(`keyValue`, `context`): [`Dependent`](/api/interfaces/dependent/)\<`Record`\<`string`, `T`\>\>

It returns an arbitrary that generates a dictionary (string key) value.

 
```ts
random(dict())
// => {"&o(l%": ""}
```


- #### [set](/api/functions/set/)
  

> **set**\<`T`, `Min`\>(`arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`SetOf`\<`T`, `Min`\>\>

Generate an array of values where each value is unique.

 
```ts
random(set(integer()))
// => [1, 2, 3]
```


- #### [string](/api/functions/string/)
  

> **string**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a string arbitrary.
q
 
```ts
random(string())
// => "-abc"
```


- #### [subdomain](/api/functions/subdomain/)
  

> **subdomain**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid subdomains.

 
```ts
random(domain())
// => "ntcc"
```


- #### [subsuper](/api/functions/subsuper/)
  

> **subsuper**\<`T`\>(`arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<[`T`[], `T`[], `T`[]]\>

It generates a pair of sets, and returns the first set, the union of the two sets, and the
difference between the union and the first set

 
```ts
random(subsuper(integer({ min: 0, max: 100 })))
// => [[1, 2], [1, 2, 4, 5], [4, 5]]
```


- #### [symbol](/api/functions/symbol/)
  

> **symbol**(): [`Dependent`](/api/interfaces/dependent/)\<`symbol`\>

It returns an arbitrary that generates a symbol.

 
```ts
random(symbol())
// => Symbol(enMgMCe)

random(symbol())
// => Symbol(wmDI78Hci)
```


- #### [tuple](/api/functions/tuple/)
  

> **tuple**\<`T`\>(...`xs`): [`Dependent`](/api/interfaces/dependent/)\<`{ [K in keyof T]: TypeOfArbitrary<T[K]> }`\>

It takes an arbitrary number of arbitraries and returns a new arbitrary that generates tuples of the
values generated by the input arbitraries.

 
```ts
random(tuple(integer(), integer()))
// => [921604357, 511147728]

random(tuple(integer(), integer()))
// => [922310816, 522685001]
```


- #### [ulidArbitrary](/api/functions/ulidarbitrary/)
  

> **ulidArbitrary**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid ulids

 
```ts
random(ulid())
// => "
```


- #### [unknown](/api/functions/unknown/)
  

 
```ts
random(unknown())
// => [false, false, 123]

random(unknown())
// => ""
```

#
- #### [uri](/api/functions/uri/)
  

> **uri**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid uris according to https://datatracker.ietf.org/doc/html/rfc3986

 
```ts
random(uri())
// => "https://example.com:8080/abc/def"
```


- #### [utf16](/api/functions/utf16/)
  

> **utf16**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate an utf16 string arbitrary.

 
```ts
random(utf16())
// => "cab"
```


- #### [utf16Char](/api/functions/utf16char/)
  

> **utf16Char**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate an utf16 character arbitrary.

 
```ts
random(utf16Char())
// => "c"
```


- #### [utf16Surrogate](/api/functions/utf16surrogate/)
  

> **utf16Surrogate**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate an utf16 string (including surrogate) arbitrary.

 
```ts
random(utf16Surrogate())
// => "c"
```


- #### [utf16SurrogateChar](/api/functions/utf16surrogatechar/)
  

> **utf16SurrogateChar**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate an utf16 character (including surrogate) arbitrary.

 
```ts
random(utf16SurrogateChar())
// => "c"
```


- #### [uuidv4Arbitrary](/api/functions/uuidv4arbitrary/)
  

> **uuidv4Arbitrary**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid uuids

 
```ts
random(uuid())
// => "01234567-89ab-cdef-0123-456789abcdef"
```



## Async 
  
  
- #### [asyncChunk](/api/functions/asyncchunk/)
  

> **asyncChunk**\<`T`\>(`xs`, `size`): `AsyncIterable`\<`T`[]\>

Creates an async generator that splits the given AsyncIterable into chunks of the required size. If
no even chunks can be created, the last chunk will have fewer elements.

 
```ts
await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 1))
// => [[1], [2], [3], [4], [5]]

await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 3))
// => [[1, 2, 3], [4, 5]]

await asyncCollect(asyncChunk([1, 2, 3], 0))
// => [[1], [2], [3]]
```


- #### [asyncCollect](/api/functions/asynccollect/)
  

> **asyncCollect**\<`T`\>(`xs`): `Promise`\<`T`[]\>

Collect the values from an AsyncIterable and return them as an array.

 
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

#
- #### [asyncMap](/api/functions/asyncmap/)
  

> **asyncMap**\<`I`, `O`\>(`xs`, `mapper`): `AsyncIterable`\<`O`\>

Map over an AsyncIterable, and give the results back as an AsyncIterable generator.

 
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

#
- #### [parallelLimit](/api/functions/parallellimit/)
  

> **parallelLimit**(`maxConcurrency`): \<`T`\>(`task`) => `Promise`\<`T`\>

Creates a limit function that allows you to schedule promises that execute
with a maximum concurrency.

 
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

#
- #### [sleep](/api/functions/sleep/)
  

> **sleep**(`ms`): `Promise`\<`void`\>

Sleeps the cothread for the specified number of millisecond.

 
```ts
await sleep(1_000)
// => sleeps for 1 second
```



## Classes 
  
  
- #### [FalsifiedError](/api/classes/falsifiederror/)
  

 

## Combinators 
 A very useful construct in writing complex error handling is the `Try` monad. In Axioms we simply define it as the union of a type with `Error`. If the value becomes an `Error` in itself, we accept that it collapses to a `Failure`. (Most functions will do this for us anyway). We explicitly don't try to define the type of the `Failure`, and just use the javascript standard library here:

```ts
type Success<T> = T
type Failure = Error
type Try<T> = Failure | Success<T>
```

This definition will start to make a lot of sense when we give you an example.

#### JSON parsing

At the heart of the Try concept we define `mapTry` that will take a `Try<T>` value and map the given function when the value is a Success. If the function call fails for whatever reason, we'll return a Failure instead.

```ts
function handleRequest(str: string): { status: number; body: string } {
    const parsed = mapTry(str, JSON.parse) // Failure,  {<value>}
    const response = mapTry(parsed, (request) => handle(request)) // Failure, {<response>}
    return transformTry(
        response,
        (success) => ({
            status: 200,
            body: JSON.stringify(success),
        }),
        (failure) => ({#
            status: 500,
            body: failure.message,
        })
    )
}
```
 
 #### Functions 
- #### [asMaybe](/api/functions/asmaybe/)
  

> **asMaybe**\<`T`, `N`\>(`x`, `nothingValue`?): [`N`] *extends* [`T`] ? `IsEqual`\<`T`, `N`\> *extends* `true` ? [`Nothing`](/api/type-aliases/nothing/) : [`Maybe`](/api/type-aliases/maybe/)\<`Exclude`\<`T`, `N`\>\> : `Exclude`\<`T`, `N`\>

Creates a Maybe from the given value.

 
```ts
asMaybe("foobar")
// => "foobar"

asMaybe("foobar", "foobar")
// => Nothing

asMaybe("foobar", "barfoo")
// => "foobar"
```


- #### [asTry](/api/functions/astry/)
  

> **asTry**\<`T`\>(`x`): `AsTry`\<`T`\>

Take an expression and evaluate it. When the expression throws it will be converted to
a `Try` `Failure`.

 
```ts
asTry("foobar")
// => "foobar"

asTry(() => "foobar")
// => "foobar"

asTry(async () => "foobar")
// => Promise<"foobar">
```


- #### [eitherAsValue](/api/functions/eitherasvalue/)
  

> **eitherAsValue**\<`E`\>(`x`): `E` *extends* [`Left`](/api/interfaces/left/)\<infer L\> ? `E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `L` \| `R` : `L` : `E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `R` : `never`

Extracts and returns the value from an Either type, whether it is a Left or a Right.
This function discriminates between Left and Right and returns the contained value directly.

 
```ts
eitherAsValue({left: "foo"})
// => "foo"

eitherAsValue({right: "bar"})
// => "bar"
```


- #### [eitherToError](/api/functions/eithertoerror/)
  

> **eitherToError**\<`E`\>(`x`): `E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? `R` : `R` : `never`

Returns [right](../../../../../../api/functions/right) when `x` is a [Right](../../../../../../api/interfaces/right) type, otherwise
throw [left](../../../../../../api/functions/left).

 
```ts
eitherToError({ right: 'foo' })
// => 'foo'

eitherToError({ left: new MyError('my-message') })
// => throw new MyError('my-message')
```


- #### [failure](/api/functions/failure/)
  

> **failure**\<`T`\>(`f`): [`Failure`](/api/type-aliases/failure/)

Converts the value to a `Failure`. The function as as an identity function on a failure.

 
```ts
failure("foobar")
// => Error("foobar")

failure(new Error("foobar"))
// => Error("foobar")
```


- #### [just](/api/functions/just/)
  

> **just**\<`T`\>(`x`): `T`

Creates a Just from the given value.

 
```ts
just("foobar")
// => "foobar"
```


- #### [left](/api/functions/left/)
  

> **left**\<`L`\>(`x`): [`Left`](/api/interfaces/left/)\<`L`\>

Creates a [Right](../../../../../../api/interfaces/right) from the given input.

 
```ts
right("foobar")
// => {right: "foobar"}
```


- #### [leftToMaybe](/api/functions/lefttomaybe/)
  

> **leftToMaybe**\<`T`\>(`x`): `T` *extends* [`Left`](/api/interfaces/left/)\<infer L\> ? `T` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? [`Maybe`](/api/type-aliases/maybe/)\<`L`\> : `L` : [`Nothing`](/api/type-aliases/nothing/)

Converts a `Left` type from an `Either` into a `Maybe`. If the input is a `Left`, the value is returned as a `Just`.
Otherwise, if the input is a `Right`, `Nothing` is returned.

 
```ts
leftToMaybe({left: "error"})
// => "error"

leftToMaybe({right: 42})
// => Nothing
```


- #### [mapLeft](/api/functions/mapleft/)
  

> **mapLeft**\<`E`, `T`\>(`x`, `f`): `E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? [`Left`](/api/interfaces/left/)\<`T`\> : `E`

If the given Either is a Right, return it, otherwise return a new Left with the result of applying
the given function to the Left value.

 
```ts
mapLeft({ left: 'bar' }, (x) => `${x}${x}`)
// => { left: "barbar" }

mapLeft({ right: 'bar' }, (x) => `${x}${x}`)
// => { right: "bar" }
```


- #### [mapLefts](/api/functions/maplefts/)
  

> **mapLefts**\<`Xs`, `T`\>(`xs`, `f`): `ArgLefts`\<`Xs`\> *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> : `ArgRights`\<`Xs`\>\[`number`\] *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`T`\> : [`Left`](/api/interfaces/left/)\<`T`\> \| [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\>

`mapLefts` takes a tuple of `Either`s and a function that takes the left values of the `Either`s and
returns a new `Either` with the left value being the result of the function and the right value
being the right value of the first `Either` in the tuple.

 
```ts
mapLefts([{ left: 'foo' }, { left: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
// => { left: "foobar" }

mapLefts([{ right: 'bar' }, { left: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
// => { right: "bar" }
```


- #### [mapRight](/api/functions/mapright/)
  

> **mapRight**\<`E`, `T`\>(`x`, `f`): `E` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? [`Right`](/api/interfaces/right/)\<`T`\> : `E`

Applies a transformation function to the `Right` value of an `Either` type, if present.
If the input is a `Left`, it remains unchanged.

 
```ts
mapRight({ right: 'bar' }, (x) => `${x}${x}`)
// => { right: "barbar" }

mapRight({ left: 'bar' }, (x) => `${x}${x}`)
// => { left: "bar" }
```


- #### [mapRights](/api/functions/maprights/)
  

> **mapRights**\<`Xs`, `T`\>(`xs`, `f`): `ArgRights`\<`Xs`\> *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> : `ArgLefts`\<`Xs`\>\[`number`\] *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`T`\> : [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> \| [`Right`](/api/interfaces/right/)\<`T`\>

`mapRights` takes a tuple of `Either`s and a function that takes the right values of the `Either`s
and returns a new `Either` that is either the left value of the first `Either` in the tuple or the
result of the function

 
```ts
mapRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
// => { right: "foobar" }

mapRights([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
// => { left: "bar" }
```


- #### [mapTry](/api/functions/maptry/)
  

> **mapTry**\<`U`, `T`\>(`x`, `fn`): `AsTry`\<`U`\>

Map the value of the `Try` when it is a `Success`.

 
```ts
mapTry("foobar", s => `${s}${s}`)
// => "foobarfoobar"

mapTry(new Error("foobar"), s => `${s}${s}`)
// => Error("foobar")
```


- #### [maybeAsValue](/api/functions/maybeasvalue/)
  

> **maybeAsValue**\<`T`\>(`x`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `undefined` : [`Just`](/api/type-aliases/just/)\<`T`\> \| `undefined` : [`Just`](/api/type-aliases/just/)\<`T`\>

This function checks if the provided Maybe value is a Just and returns the contained value.
If the value is Nothing, it returns undefined, effectively handling optional values in your code.

 
```ts
maybeAsValue("foobar")
// => "foobar"

maybeAsValue(Nothing)
// => undefined
```


- #### [maybeToLeft](/api/functions/maybetoleft/)
  

> **maybeToLeft**\<`T`, `R`\>(`x`, `right`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? [`Right`](/api/interfaces/right/)\<`R`\> : [`Either`](/api/type-aliases/either/)\<[`Just`](/api/type-aliases/just/)\<`T`\>, `R`\> : [`Left`](/api/interfaces/left/)\<`T`\>

Transforms a Maybe value into an Either type, returning a Left containing the Just value.
If the Maybe is Nothing, it returns a Right with a specified default value.

 
```ts
maybeToLeft("foo", "fallback")
// => {left: "foo"}

maybeToLeft(Nothing, "fallback")
// => {right: "fallback"}
```


- #### [maybeToRight](/api/functions/maybetoright/)
  

> **maybeToRight**\<`L`, `T`\>(`x`, `left`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? [`Left`](/api/interfaces/left/)\<`L`\> : [`Either`](/api/type-aliases/either/)\<`L`, [`Just`](/api/type-aliases/just/)\<`T`\>\> : [`Right`](/api/interfaces/right/)\<`T`\>

Converts a Maybe value to an Either type. If the input is a Just, it returns the value as a Right.
If the input is Nothing, it returns a specified default value as a Left.

 
```ts
maybeToRight("foo", "foobar")
// => {right: "foo"}

maybeToRight(Nothing, "foobar")
// => {left: "foobar"}
```


- #### [recoverTry](/api/functions/recovertry/)
  

> **recoverTry**\<`U`, `T`\>(`x`, `recover`): `AsTry`\<`U`\> \| `T`

Map the value of the `Try` when it is a `Failure`.

 
```ts
recoverTry("foobar", s => `${s}${s}`)
// => "foobar"

recoverTry(new Error("foobar"), s => "bar")
// => "bar"
```


- #### [right](/api/functions/right/)
  

> **right**\<`R`\>(`x`): [`Right`](/api/interfaces/right/)\<`R`\>

Creates a [Right](../../../../../../api/interfaces/right) from the given input.

 
```ts
right("foobar")
// => {right: "foobar"}
```


- #### [rightToMaybe](/api/functions/righttomaybe/)
  

> **rightToMaybe**\<`T`\>(`x`): `T` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `T` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? [`Maybe`](/api/type-aliases/maybe/)\<`R`\> : `R` : [`Nothing`](/api/type-aliases/nothing/)

Converts a Right value from an Either type to a Just type, or returns Nothing if the value is Left.

 
```ts
rightToMaybe({right: "foo"})
// => "foo"

rightToMaybe({left: "bar"})
// => Nothing
```


- #### [swapEither](/api/functions/swapeither/)
  

> **swapEither**\<`L`, `R`\>(`x`): [`Either`](/api/type-aliases/either/)\<`R`, `L`\>

If the input is a Left, return a Right with the same value, otherwise return a Left with the same
value.

 
```ts
swapEither({left: "foobar"})
// => {right: "foobar"}

swapEither({right: "foobar"})
// => {left: "foobar"}
```


- #### [transformTry](/api/functions/transformtry/)
  

> **transformTry**\<`T`, `U`\>(`x`, `s`, `f`): `TryPromise`\<`U`\> *extends* `Promise`\<[`Try`](/api/type-aliases/try/)\<`_P`\>\> ? `Promise`\<[`Try`](/api/type-aliases/try/)\<`_P`\>\> : `TryPromise`\<`U`\> *extends* [`Try`](/api/type-aliases/try/)\<`_V`\> ? [`Try`](/api/type-aliases/try/)\<`_V`\> : [`Try`](/api/type-aliases/try/)\<`TryPromise`\<`U`\>\>

This transform takes a function for either a `Success` or a `Failure` value. Depending
on the state of the `Try`, it will apply the correct transformation and give back the result.

Any thrown exceptions during the transformation will be caught and set as `Failure` value.

 
```ts
transformTry("foobar", s => `${s}${s}`, f => `failure`)
// => "foobarfoobar"

transformTry(new Error("foobar"), s => `${s}${s}`, f => `failure`)
// => "failure"
```


- #### [tryAsValue](/api/functions/tryasvalue/)
  

> **tryAsValue**\<`T`\>(`x`): `T` *extends* [`Failure`](/api/type-aliases/failure/) ? `undefined` : [`Success`](/api/type-aliases/success/)\<`T`\>

Convert the `Try` to a value, where `Success` is converted to the value, and
`Failure` is converted to `undefined`.

 
```ts
tryAsValue("foobar")
// => "foobar"

tryAsValue(new Error("foobar"))
// => undefined
```


- #### [tryFromEither](/api/functions/tryfromeither/)
  

> **tryFromEither**\<`L`, `R`\>(`x`): [`Try`](/api/type-aliases/try/)\<`R`\>

Convert the `Either` to a `Try`, where `Right` is converted to `Success`, and
`Left` is converted to `Failure`.

 
```ts
tryFromEither({right: "foobar"})
// => "foobar"

tryFromEither({left: new Error("foobar")})
// => Error("foobar")
```


- #### [tryToEither](/api/functions/trytoeither/)
  

> **tryToEither**\<`T`\>(`x`): [`Either`](/api/type-aliases/either/)\<[`Failure`](/api/type-aliases/failure/), [`Success`](/api/type-aliases/success/)\<`T`\>\>

Convert the `Try` to an `Either`, where `Success` is converted to `Right`, and
`Failure` is converted to `Left`.

 
```ts
tryToEither("foobar")
// => {right: "foobar"}

tryToEither(new Error("foobar"))
// => {left: Error("foobar")}
```


- #### [tryToError](/api/functions/trytoerror/)
  

> **tryToError**\<`T`\>(`x`): `T` *extends* [`Failure`](/api/type-aliases/failure/) ? `never` : [`Success`](/api/type-aliases/success/)\<`T`\>

Convert the `Try` to a its value, where `Success` is converted to the value, and
`Failure` is thrown`.

 
```ts
tryToError("foobar")
// => "foobar"

tryToError(new Error("foobar"))
// => throw Error("foobar")
```


- #### [tryToMaybe](/api/functions/trytomaybe/)
  

> **tryToMaybe**\<`T`\>(`x`): `T` *extends* [`Failure`](/api/type-aliases/failure/) ? [`Nothing`](/api/type-aliases/nothing/) : [`Success`](/api/type-aliases/success/)\<`T`\>

Convert the `Try` to a `Maybe`, where `Success` is converted to `Just`, and
`Failure` is converted to `Nothing`.

 
```ts
tryToMaybe("foobar")
// => "foobar"

tryToMaybe(new Error("foobar"))
// => Nothing
```


- #### [whenJust](/api/functions/whenjust/)
  

> **whenJust**\<`T`, `M`\>(`x`, `f`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `T` : [`Maybe`](/api/type-aliases/maybe/)\<`M`\> : `M`

Applies a transformation function to the value inside a Just, or returns Nothing if the value is Nothing.
This function is used to manipulate the data within a Just, allowing for operations like transformations or computations,
while safely handling cases where there is no value (i.e., Nothing).

 
```ts
whenJust(5, x => x * 2)
// => 10

whenJust(Nothing, (x) => `${x}${x}`)
// => Nothing
```


- #### [whenJusts](/api/functions/whenjusts/)
  

> **whenJusts**\<`Xs`, `M`\>(`xs`, `f`): `ArgJust`\<`Xs`\> *extends* `never`[] ? [`Nothing`](/api/type-aliases/nothing/) : [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`Xs`\[`number`\]] ? [`Nothing`](/api/type-aliases/nothing/) \| `M` : `M`

`whenJusts` takes a tuple of `Maybe`s and a function that takes the values of the `Just`s and
returns a `Maybe` of the result of the function.

 
```ts
whenJusts([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
// => "foobar"

whenJusts([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
// => { left: "bar" }
```


- #### [whenLeft](/api/functions/whenleft/)
  

> **whenLeft**\<`E`, `T`\>(`x`, `f`): `E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? `T` : `E`

If the given Either is a Left, apply the given function to the Left value and return the result.
Otherwise, return the given Either.

 
```ts
whenLeft({ left: 'foo' }, (x) => `${x}${x}`)
// => "foofoo"

whenLeft({ right: 'bar' }, (x) => `${x}${x}`)
// => { right: "bar" }
```


- #### [whenLefts](/api/functions/whenlefts/)
  

> **whenLefts**\<`Xs`, `T`\>(`xs`, `f`): `ArgLefts`\<`Xs`\> *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> : `ArgRights`\<`Xs`\>\[`number`\] *extends* `never`[] ? `T` : [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> \| `T`

`whenLefts` takes an array of `Either`s and a function that takes the left values of the `Either`s
and returns a value. If any of the `Either`s are `Right`s, then the first `Right` is returned.
Otherwise, the function is called with the left values and its return value is returned.

 
```ts
whenLefts([{ left: 'foo' }, { left: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
// => "foobar"

whenLefts([{ right: 'bar' }, { left: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
// => { right: "bar" }
```


- #### [whenNothing](/api/functions/whennothing/)
  

> **whenNothing**\<`T`, `M`\>(`x`, `f`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `M` : `M` \| [`Just`](/api/type-aliases/just/)\<`T`\> : `T`

If the given Maybe is a Nothing, then return the result of the given function, otherwise return the
given Maybe.

 
```ts
whenNothing(Nothing, () => `foobar`)
// => "foobar"

whenNothing(0, () => `foobar`)
// => 0
```


- #### [whenRight](/api/functions/whenright/)
  

> **whenRight**\<`E`, `T`\>(`x`, `f`): `E` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? `T` : `E`

If the given Either is a Left, return it, otherwise apply the given function to the Right value and
return the result.

 
```ts
whenRight({ right: 'foo' }, (x) => `${x}${x}`)
// => "foofoo"

whenRight({ left: 'bar' }, (x) => `${x}${x}`)
// => { left: "bar" }
```


- #### [whenRights](/api/functions/whenrights/)
  

> **whenRights**\<`Xs`, `T`\>(`xs`, `f`): `ArgRights`\<`Xs`\> *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> : `ArgLefts`\<`Xs`\>\[`number`\] *extends* `never`[] ? `T` : [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> \| `T`

`whenRights` takes an array of `Either`s and a function that takes the `right`s of the `Either`s as
arguments and returns a `Left` if any of the `Either`s are `Left`s or the result of the function if
all of the `Either`s are `Right`s.

 
```ts
whenRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => ({right: `${x0}${x1}`}))
// => { right: "foobar"}

whenRights([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => ({right: `${x0}${x1}`}))
// => { left: "bar" }
```



## Crypto 
  
  
- #### [sha256](/api/functions/sha256/)
  

> **sha256**(`x`): `string`

Calculate the sha256 hash of the given string input.

 
```ts
sha256('hello world')
// => "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
```



## Either 
 Usually, error handling is done using the `try`, `catch`, and `throw` primitives. We've all experienced how these primitives can make writing deterministic code harder than it needs to be since it decouples the error handling from the context in which the error was initially thrown.

Luckily, functional programming has given us better ways to deal with error handling. And some of these methods are more widespread in their use. One such method is the `Either` type.

#### Definition

We define the `Either` type as:

```ts
type Either<Left, Right> = { left: Left } | { right: Right }
```

The `Either` type is a container for one of two values. It is similar to the `Maybe` type in that it represents a value that may have one of two states: `Left` or `Right`. However, unlike the Maybe type, which represents an arbitrary value, the Either type has two distinct arbitrary values; Left and Right.

The `Either` data structure is useful when you need to distinguish between success and failure, and you want to differentiate through data rather than through code. Typically a `Left` value indicates failure, while a `Right` value indicates success. But this is not mandated by the data structure; it is just a convention.

Instead of defining the `Either` type as a true monad but rather simply as a discriminated union, we obtain simplicity.

#### Error Handling

The true power of the `Either` monad comes from its ability to force correct error handling. There's no simple `get` method to get the value from the object; you _explicitly_ need to choose either `left` or `right`.

The nice thing about the `left` and `right` distinction is that both are treated as equally important values. Lets take a simple example like an `attempt` function:

```ts
export function attempt<F, T>(fn: () => T, fallback: F): Either<F, T> {
    try {
        return { right: fn() }
    } catch (err: unknown) {
        return { left: fallback }
    }
}
```

We see that the fallback value is defined as the `left` and the normal function output as `right`. Lets say that we need to parse some JSON that we don't necessarily trust to be correct. We'd be able to parse the string like:

```ts
const parsed = attempt(() => ({ value: JSON.parse(str) }), { value: 'nothing found' })
```

Where the `parsed` variable need to be explicitly handled for both the `left` and the `right` case to properly use it. This forces you to write out the complete error handling logic.
 
 #### Functions 
- #### [Either](/api/type-aliases/either/)
  

> **Either**\<`L`, `R`\>: [`Left`](/api/interfaces/left/)\<`L`\> \| [`Right`](/api/interfaces/right/)\<`R`\>

 
- #### [isEither](/api/functions/iseither/)
  

> **isEither**\<`L`, `R`\>(`x`): `x is Either<L, R>`

Check whether given `x` is of type [Either](../../../../../../api/type-aliases/either).

 
```ts
isEither({left: 123})
// => true

isEither({right: 456})
// => true

isEither("foobar")
// => false
```


- #### [isLeft](/api/functions/isleft/)
  

> **isLeft**\<`L`\>(`x`): `x is Left<L>`

Check whether given `x` is of type [Left](../../../../../../api/interfaces/left).

 
```ts
isLeft({left: 123})
// => true

isLeft({right: 456})
// => false

isLeft({left: 1234} as Either<number, string>)
// => x is Left<number>
```


- #### [isRight](/api/functions/isright/)
  

> **isRight**\<`R`\>(`x`): `x is Right<R>`

Check whether given `x` is of type [Right](../../../../../../api/interfaces/right).

 
```ts
isRight({right: 123})
// => true

isRight({left: 456})
// => false

isRight({right: "foobar"} as Either<number, string>)
// => x is Right<string>
```



## Functions 
  
  
- #### [arbitraryContext](/api/functions/arbitrarycontext/)
  

> **arbitraryContext**(`__namedParameters`): [`ArbitraryContext`](/api/interfaces/arbitrarycontext/)

 
- #### [arrayWith](/api/functions/arraywith/)
  

> **arrayWith**\<`T`, `Min`\>(`predicate`, `arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`ArrayOf`\<`T`, `Min`\>\>

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

 
- #### [asyncForAll](/api/functions/asyncforall/)
  

> **asyncForAll**\<`T`\>(`arbitrary`, `predicate`, `__namedParameters`): `Promise`\<`void`\>

 
- #### [bfs](/api/functions/bfs/)
  

> **bfs**\<`T`\>(`node`): `IteratorObject`\<`T`, `void`\>

 
- #### [defer](/api/functions/defer/)
  

> **defer**\<`T`, `Err`\>(): [`Deferred`](/api/interfaces/deferred/)\<`T`, `Err`\>

Creates a Deferred Promise that can be resolved or rejected elsewhere in the code.

:::caution[Deprecated]
Use `Promise.withResolvers()` instead.
:::

 
- #### [dfsPostOrder](/api/functions/dfspostorder/)
  

> **dfsPostOrder**\<`T`\>(`node`): `IteratorObject`\<`T`, `void`\>

 
- #### [dfsPreOrder](/api/functions/dfspreorder/)
  

> **dfsPreOrder**\<`T`\>(`node`): `IteratorObject`\<`T`, `void`\>

 
- #### [evaluate](/api/functions/evaluate/)
  

> **evaluate**\<`T`\>(`maybeEvaluate`): `T`

Takes a value or a function that returns a value, and returns the value.

 
```ts
evaluate("foobar")
// => "foobar"

evaluate(() => "foobar"))
// => "foobar"
```


- #### [evaluateTree](/api/functions/evaluatetree/)
  

> **evaluateTree**\<`T`\>(`x`): [`Tree`](/api/interfaces/tree/)\<`T`\>

 
- #### [expandTree](/api/functions/expandtree/)
  

> **expandTree**\<`T`\>(`f`, `x`): [`Tree`](/api/interfaces/tree/)\<`T`\>

 
- #### [forAll](/api/functions/forall/)
  

> **forAll**\<`T`\>(`arbitrary`, `predicate`, `__namedParameters`): `void`

 
- #### [func](/api/functions/func/)
  

> **func**\<`T`\>(`arbitrary`): [`Dependent`](/api/interfaces/dependent/)\<(...`args`) => `T`\>

 
- #### [isObject](/api/functions/isobject/)
  

> **isObject**\<`T`\>(`obj`): `obj is Record<PropertyKey, T>`

 
- #### [iterable](/api/functions/iterable/)
  

> **iterable**\<`T`\>(`arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`Iterable`\<`T`\>\>

 
- #### [iterableFunc](/api/functions/iterablefunc/)
  

> **iterableFunc**(): [`Dependent`](/api/interfaces/dependent/)\<\<`T`\>(`xs`) => `Iterable`\<`T`\>\>

 
- #### [itrampoline](/api/functions/itrampoline/)
  

> **itrampoline**\<`T`, `R`\>(`f`): (...`args`) => `Generator`\<`R`, `R`, `unknown`\>

 
- #### [memoizeArbitrary](/api/functions/memoizearbitrary/)
  

> **memoizeArbitrary**\<`T`\>(`arb`): [`Dependent`](/api/interfaces/dependent/)\<`T`\>

 
- #### [omitUndefined](/api/functions/omitundefined/)
  

> **omitUndefined**\<`T`\>(`obj`): `OmitUndefined`\<`T`\>

 
- #### [showTree](/api/functions/showtree/)
  

> **showTree**\<`T`\>(`t`, `__namedParameters`): `string`

 
- #### [sortStrings](/api/functions/sortstrings/)
  

> **sortStrings**(`str`, `__namedParameters`): `string`[]

:::caution[Deprecated]
Use `str.sort((a, b) => a.localeCompare(b))` instead
:::

 
- #### [thrown](/api/functions/thrown/)
  

> **thrown**\<`T`\>(`x`): `T` & `object`

 
- #### [trampoline](/api/functions/trampoline/)
  

> **trampoline**\<`T`, `R`\>(`f`): (...`args`) => `R`

 
- #### [unfoldTree](/api/functions/unfoldtree/)
  

> **unfoldTree**\<`T`\>(`f`, `x`): [`Tree`](/api/interfaces/tree/)\<`T`\>

 
- #### [weightedChoice](/api/functions/weightedchoice/)
  

> **weightedChoice**\<`T`\>(`choices`): (`pick`?) => `T`

 
- #### [zip](/api/functions/zip/)
  

> **zip**\<`T`\>(...`xs`): `IteratorObject`\<`Zip`\<`T`\>\>

Take the Iterables and return a Iterable of tuples.

The function evaluates the Iterables and converts them into arrays.

 
```ts
collect(zip([1, 2, 3], [1, 2, 3]))
// => [[1, 1], [2, 2], [3, 3]]
```


- #### [zipWith](/api/functions/zipwith/)
  

> **zipWith**\<`T`, `R`\>(`f`, ...`xs`): `Generator`\<`R`, `void`, `unknown`\>

:::caution[Deprecated]
This API is no longer supported and may be removed in a future release.
:::

 

## Generators 
  
  
- #### [queue](/api/functions/queue/)
  

> **queue**\<`T`\>(`initialize`): [`QueueGenerator`](/api/interfaces/queuegenerator/)\<`T`\>

Creates a generator that acts as a LIFO queue.

 
```ts
collect(queue([1,2,3]))
// => [1, 2, 3]
```

:::caution[Alpha]
This API should not be used in production and may be trimmed from a public release.
:::


- #### [stack](/api/functions/stack/)
  

> **stack**\<`T`\>(`initialize`): [`StackGenerator`](/api/interfaces/stackgenerator/)\<`T`\>

Creates a generator that acts as a FIFO stack.

 
```ts
collect(stack([1,2,3]))
// => [1, 2, 3]
```

:::caution[Alpha]
This API should not be used in production and may be trimmed from a public release.
:::



## Guards 
  
  
- #### [asArray](/api/functions/asarray/)
  

> **asArray**\<`T`\>(`x`): `T`[]

Returns `x` as array if it is not an array type.

 
```ts
asArray(1)
// => [1]

asArray([2, 3, 4])
// => [2, 3, 4]
```

#
- #### [isAlpha](/api/functions/isalpha/)
  

> **isAlpha**(`str`, `extra`?): `boolean`

Check whether given `str` is alphabetic string.

The allowed characters are A-Z, and a-z.

 
```ts
isAlpha("foobar")
// => true

isAlpha("foobar123")
// => false

isAlpha("foobar123", "123")
// => true
```


- #### [isAlphaNumeric](/api/functions/isalphanumeric/)
  

> **isAlphaNumeric**(`str`, `extra`?): `boolean`

Check whether given `str` is alphanumeric string.

The allowed characters are A-Z, and a-z.

 
```ts
isAlphaNumeric("foobar")
// => true

isAlphaNumeric("foobar123")
// => true

isAlphaNumeric("foobar")
// => false

isAlphaNumeric("foobar$", "$")
// => true
```


- #### [isArray](/api/functions/isarray/)
  

> **isArray**\<`I`\>(`xs`): `xs is I[]`

Checks if `xs` is classified as Array.

 
```ts
asArray(1)
// => [1]

asArray([2, 3, 4])
// => [2, 3, 4]
```

#
- #### [isBoolean](/api/functions/isboolean/)
  

> **isBoolean**(`x`): `x is boolean`

Checks if `x` is a boolean primitive.

 
```ts
isBoolean(true)
// => true

isBoolean("foobar")
// => false
```

#
- #### [isDefined](/api/functions/isdefined/)
  

> **isDefined**\<`T`\>(`x`): `x is T`

Checks if `x` is not `null` or `undefined`.

 
```ts
isDefined(true)
// => true

isDefined("1234")
// => true

isDefined(undefined)
// => false

isDefined(null)
// => false
```


- #### [isDigits](/api/functions/isdigits/)
  

> **isDigits**(`xs`): `boolean`

Checks if `xs` contains only digits.

 
```ts
isDigits("1234")
// => true

isDigits("1234foobar")
// => false

isDigits("123.45")
// => false
```


- #### [isEither](/api/functions/iseither/)
  

> **isEither**\<`L`, `R`\>(`x`): `x is Either<L, R>`

Check whether given `x` is of type [Either](../../../../../../api/type-aliases/either).

 
```ts
isEither({left: 123})
// => true

isEither({right: 456})
// => true

isEither("foobar")
// => false
```


- #### [isError](/api/functions/iserror/)
  

> **isError**(`x`): `x is Error`

Checks if `x` is classified as Error.

 
```ts
isError(new Error("this is an error"))
// => true

isError("foobar")
// => false
```

#
- #### [isFailure](/api/functions/isfailure/)
  

> **isFailure**(`x`): `x is Error`

Checks if `x` is a [Failure](../../../../../../api/type-aliases/failure).

 
```ts
isFailure("foobar")
// => false

isFailure(new Error())
// => true
```


- #### [isFunction](/api/functions/isfunction/)
  

> **isFunction**\<`T`\>(`f`): `f is T`

Checks if `f` is classified as Function.

 
```ts
isFunction(() => true))
// => true

isFunction("foobar")
// => false
```

#
- #### [isInteger](/api/functions/isinteger/)
  

> **isInteger**(`x`): `x is number`

Checks if `x` is an integer.

 
```ts
isInteger(1234)
// => true

isInteger(12.34)
// => false

isInteger("foobar")
// => false
```

#
- #### [isJust](/api/functions/isjust/)
  

> **isJust**\<`T`\>(`x`): `x is Just<T>`

Checks if `x` is not [Nothing](../../../../../../api/type-aliases/nothing).

 
```ts
isJust(1234)
// => true

isJust("foobar")
// => true

isJust(Nothing)
// => false
```


- #### [isLeft](/api/functions/isleft/)
  

> **isLeft**\<`L`\>(`x`): `x is Left<L>`

Check whether given `x` is of type [Left](../../../../../../api/interfaces/left).

 
```ts
isLeft({left: 123})
// => true

isLeft({right: 456})
// => false

isLeft({left: 1234} as Either<number, string>)
// => x is Left<number>
```


- #### [isNothing](/api/functions/isnothing/)
  

> **isNothing**(`x`): `x is typeof Nothing`

Checks if `x` is [Nothing](../../../../../../api/variables/nothing).

 
```ts
isNothing(Nothing)
// => true

isNothing(1234)
// => false

isNothing("foobar")
// => false
```


- #### [isNumber](/api/functions/isnumber/)
  

> **isNumber**(`x`): `x is number`

Checks if `x` is a number primitive.

 
```ts
isNumber(1234)
// => true

isNumber(12.34)
// => true

isNumber("foobar")
// => false
```

#
- #### [isPromise](/api/functions/ispromise/)
  

> **isPromise**\<`T`\>(`x`): `x is Promise<T>`

Checks if `x` is a `Promise`.

 
```ts
isPromise(Promise.resolve(1))
// => true

isPromise("foo")
// => false
```


- #### [isRight](/api/functions/isright/)
  

> **isRight**\<`R`\>(`x`): `x is Right<R>`

Check whether given `x` is of type [Right](../../../../../../api/interfaces/right).

 
```ts
isRight({right: 123})
// => true

isRight({left: 456})
// => false

isRight({right: "foobar"} as Either<number, string>)
// => x is Right<string>
```


- #### [isString](/api/functions/isstring/)
  

> **isString**(`x`): `x is string`

Checks if `x` is a [string](../../../../../../api/functions/string).

 
```ts
isString("foobar")
// => true

isString(1234)
// => false

isString({})
// => false
```


- #### [isSuccess](/api/functions/issuccess/)
  

> **isSuccess**\<`T`\>(`x`): `x is Success<T>`

Checks if `x` is a [Success](../../../../../../api/type-aliases/success).

 
```ts
isSuccess("foobar")
// => true

isSuccess(new Error())
// => false
```


- #### [isThrown](/api/functions/isthrown/)
  

> **isThrown**\<`T`\>(`x`): `x is T & { [Thrown]?: true }`

Checks if `x` was tagged as thrown.

 
- #### [isUndefined](/api/functions/isundefined/)
  

> **isUndefined**(`a`): `a is undefined`

Checks if `x` is `undefined`.

 
```ts
isUndefined(undefined)
// => true

isUndefined(true)
// => false

isUndefined("1234")
// => false

isUndefined(null)
// => false
```

#

## Interfaces 
  
  
- #### [AlphaGenerator](/api/interfaces/alphagenerator/)
  

 
- #### [AlphaNumericGenerator](/api/interfaces/alphanumericgenerator/)
  

 
- #### [Arbitrary](/api/interfaces/arbitrary/)
  

 
- #### [ArbitraryContext](/api/interfaces/arbitrarycontext/)
  

 
- #### [DateGenerator](/api/interfaces/dategenerator/)
  

 
- #### [Deferred](/api/interfaces/deferred/)
  

A Deferred Promise that can be resolved or rejected elsewhere in the code.

 
- #### [Dependent](/api/interfaces/dependent/)
  

 
- #### [Falsified](/api/interfaces/falsified/)
  

 
- #### [FalsifyOptions](/api/interfaces/falsifyoptions/)
  

 
- #### [ForallOptions](/api/interfaces/foralloptions/)
  

 
- #### [Integrated](/api/interfaces/integrated/)
  

 
- #### [Left](/api/interfaces/left/)
  

 
- #### [Mulberry32Generator](/api/interfaces/mulberry32generator/)
  

 
- #### [OptionalGenerator](/api/interfaces/optionalgenerator/)
  

 
- #### [QueueGenerator](/api/interfaces/queuegenerator/)
  

A queue generator type.

 
- #### [RandomGenerator](/api/interfaces/randomgenerator/)
  

 
- #### [RecordGenerator](/api/interfaces/recordgenerator/)
  

 
- #### [Right](/api/interfaces/right/)
  

 
- #### [StackGenerator](/api/interfaces/stackgenerator/)
  

A stack generator type.

 
- #### [StringConstraints](/api/interfaces/stringconstraints/)
  

 
- #### [Xoroshiro128plusGenerator](/api/interfaces/xoroshiro128plusgenerator/)
  

 

## Iterators 
  
  
- #### [applicative](/api/functions/applicative/)
  

> **applicative**\<`T`\>(`xs`): `Iterable`\<`T`\>

It takes a traversable and returns a traversable that buffers the values of the original traversable.

 
```ts
const xs = applicative([1, 2, 3])
collect(xs)
// => [1, 2, 3]

const ys = applicative(take(cycle([1, 2]), 4))
collect(ys)
// => [1, 2, 1, 2]
collect(ys)
// => [1, 2, 1, 2]

```


- #### [chunk](/api/functions/chunk/)
  

> **chunk**\<`T`\>(`xs`, `size`): `Generator`\<`T`[], `void`\>

Creates a generator that splits the given Iterable into chunks of the required size. If
no even chunks can be created, the last chunk will have fewer elements.

 
```ts
collect(chunk([1, 2, 3, 4, 5], 1))
// => [[1], [2], [3], [4], [5]]

collect(chunk([1, 2, 3, 4, 5], 3))
// => [[1, 2, 3], [4, 5]]

collect(chunk([1, 2, 3], 0))
// => [[1], [2], [3]]
```

#
- #### [concat](/api/functions/concat/)
  

 
```ts
collect(concat([1, 2], [3, 4], [5]))
// => [1, 2, 3, 4, 5]
```

#
- #### [equal](/api/functions/equal/)
  

> **equal**(`a`, `b`): `boolean`

It returns true if the two arguments are deeply equal, and false otherwise.

This function is a wrapper around [fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal).

 
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

#
- #### [max](/api/functions/max/)
  

> **max**\<`T`\>(`xs`): `T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

Calculate the maximum value of the given items.

 
```ts
max([1, 2, 3])
// => 3
```

#
- #### [maxBy](/api/functions/maxby/)
  

> **maxBy**\<`T`\>(`xs`, `f`): `T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

Calculate the maximum value of the given items by applying the function.

 
```ts
maxBy([{ 'n': 1 }, { 'n': 2 }], x => x.n)
// => {n: 2}
```

#
- #### [min](/api/functions/min/)
  

> **min**\<`T`\>(`xs`): `T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

Calculate the minimum value of the given items.

 
```ts
min([1, 2, 3])
// => 1
```

#
- #### [minBy](/api/functions/minby/)
  

> **minBy**\<`T`\>(`xs`, `f`): `T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

Calculate the minimum value of the given items by applying the function.

 
```ts
minBy([{ 'n': 1 }, { 'n': 2 }], x => x.n)
// => {n: 1}
```

#
- #### [partition](/api/functions/partition/)
  

 
```ts
partition([1, 'a'], isString)
// => [['a'], [1]]
```

#
- #### [span](/api/functions/span/)
  

> **span**\<`T`, `R`\>(`xs`, `predicate`): [`T`[], `IteratorObject`\<`T`, `R`\>]

Returns a tuple where first element is longest prefix of `xs` of elements
that satisfy the predicate and second element is the remainder of the Iterable.

 
```ts
const [init, rest] = span([1, 2, 3, 4], (x) => x < 3)
init
// => [1, 2]

collect(rest)
// => [3, 4]
```


- #### [unique](/api/functions/unique/)
  

> **unique**\<`T`\>(`xs`, `eq`): `IteratorObject`\<`T`\>

Take the Iterable and remove all items that are duplicated. Duplications
are detected by applying the `eq` operator.

 
```ts
collect(unique([1, 2, 3]))
// => [1, 2, 3]

collect(unique([1, 2, 1, 2, 3]))
// => [1, 2, 3]

function* foobar() {
    yield 'foo'
    yield 'bar'
}
collect(unique(foobar()))
// => ["foo", "bar"]

collect(unique([]))
// => []
```



## Maybe 
 The maybe type is used to represent a value that may exist or not. It is often used instead of throwing an error or returning undefined data.

The Nothing type represents the absence of a value. It is often used to represent the result of an operation which returns something or throws an error like undefined and null. It is a value that is not anything at all.

In Axioms we define the Maybe type as such:

```ts
type Just<T> = T

const Nothing = Symbol.for('(Nothing)')
type Nothing = typeof Nothing

type Maybe<T> = Nothing | Just<T>
```

#### Why not `undefined` or `null`?

In the case of `null` or `undefined`, which has the same semantic meaning as `Nothing`, it is typically used to represent errors like “Operation failed”.

With `Nothing`, we have introduced a third way of expressing this logic. The reason for this is simple, although not very satisfying. Due to historical reasons, both `null` and `undefined` has gotten use as value next to their semantics of meaning nothing,

##### Null

Null is an allowed value in a json type, meaning that it can be communicated with other services. This allows for expression of logic through data, something which some libraries make use of.

##### Undefined

Undefined is a bit more complex. An object type can have a key-value pair that is not present in the object at all - meaning the value is `undefined`. Or, the actual value on the key is present, but is set to `undefined`. For example:

```ts
const omittedKey = {}
const hasKey = { foo: undefined }
```

Both objects here have the value `undefined` for key `foo`, although morphologically they look very different.

##### Nothing

We define the `Nothing` type as a symbol. This removes the possibility to communicate it over json directly as it won't serialize.

```ts
JSON.stringify({
    nothing: Nothing,
    undefined: undefined,
    null: null,
})
// => "{ null: null }"
```

Another nice property of Nothing is that it holds absolutely no value between different libraries. In fact, most interfaces will outright throw a compiler error if you try to use it in the wrong places. Because `undefined` and `null` have been around for such a long time, their use have been sunk in all over the place.

The Nothing type should be very transient, and shouldn't be used in places where it might be serialized or interfaced with different applications. It's main use is to represent the lack of value as conceptual logic - not to communicate it.
 
 #### Functions 
- #### [isJust](/api/functions/isjust/)
  

> **isJust**\<`T`\>(`x`): `x is Just<T>`

Checks if `x` is not [Nothing](../../../../../../api/type-aliases/nothing).

 
```ts
isJust(1234)
// => true

isJust("foobar")
// => true

isJust(Nothing)
// => false
```


- #### [isNothing](/api/functions/isnothing/)
  

> **isNothing**(`x`): `x is typeof Nothing`

Checks if `x` is [Nothing](../../../../../../api/variables/nothing).

 
```ts
isNothing(Nothing)
// => true

isNothing(1234)
// => false

isNothing("foobar")
// => false
```



## Object 
  
  
- #### [entriesOf](/api/functions/entriesof/)
  

> **entriesOf**\<`T`\>(`obj`): `T` *extends* `UnknownArray` ? [`string`, `ArrayValues`\<`T`\>][] : `{ [K in keyof T]: [K, T[K]] }`\[keyof `T`\][]

Returns an array of key/values of the enumerable properties of an object.

 
```ts
entriesOf({foo: "bar"})
// => [["foo", "bar"]]

entriesOf({})
// => []
```

#
- #### [fromEntries](/api/functions/fromentries/)
  

> **fromEntries**\<`T`\>(`entries`): `{ [K in T[number] as K[0]]: K[1] }`

Returns an object created by key-value entries for properties and methods.

 
```ts
fromEntries([["foo", "bar"]])
// => {foo: "bar"}

fromEntries([])
// => {}
```

#
- #### [keysOf](/api/functions/keysof/)
  

> **keysOf**\<`T`\>(`obj`): `KeysOf`\<`T`\>

Returns the names of the enumerable string properties and methods of an object.

 
```ts
keysOf({foo: "bar"})
// => ["foo"]

keysOf({})
// => []
```

#
- #### [mapValues](/api/functions/mapvalues/)
  

> **mapValues**\<`T`, `Mapper`\>(`obj`, `mapper`): `{ [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never }`

Returns an object with same keys, where the original values are converted using a mapper.

 
```ts
mapValues({ foo: 0, bar: 2 }, (x) => x + 1)
// => { foo: 1, bar: 3 }
```

#
- #### [omit](/api/functions/omit/)
  

> **omit**\<`T`, `K`\>(`obj`, `keys`): `Simplify`\<`Except`\<`T`, `K`, \{ `requireExactProps`: `true`; \}\>\>

It takes an object and an array of keys, and returns a new object with those keys excluded.

 
```ts
omit({foo: "bar", bar: "foo"}, ["foo"])
// => {bar: "foo"}

omit({foo: "bar", bar: "foo"}, [])
// => {foo: "bar", bar: "foo"}
```

#
- #### [omitBy](/api/functions/omitby/)
  

> **omitBy**\<`T`, `Predicate`\>(`obj`, `predicate`): `Partial`\<`T`\>

Create a new object with all the properties excluded for which the predicate hold true.

 
```ts
omitBy({foo: 1, bar: "foo"}, ([, v]) => isNumber(v))
// => {bar: "foo"}
```

#
- #### [pick](/api/functions/pick/)
  

> **pick**\<`T`, `K`\>(`obj`, `keys`): `Simplify`\<`Pick`\<`T`, `K`\>\>

It takes an object and an array of keys, and returns a new object with only those keys.

 
```ts
pick({foo: "bar", bar: "foo"}, ["foo"])
// => {foo: "bar"}

pick({foo: "bar", bar: "foo"}, [])
// => {}
```

#
- #### [pickBy](/api/functions/pickby/)
  

> **pickBy**\<`T`, `Predicate`\>(`obj`, `predicate`): `Partial`\<`T`\>

Create a new object with all the properties for which the predicate hold true.

 
```ts
pickBy({foo: 1, bar: "foo"}, ([, v]) => isNumber(v))
// => {foo: 1}
```

#
- #### [valuesOf](/api/functions/valuesof/)
  

> **valuesOf**\<`T`\>(`obj`): `ValuesOf`\<`T`\>

Returns an array of values of the enumerable properties of an object.

 
```ts
valuesOf({foo: "bar"})
// => ["bar"]

valuesOf({})
// => []
```

#

## Random 
  
  
- #### [mulberry32](/api/functions/mulberry32/)
  

> **mulberry32**(`seed`): [`Mulberry32Generator`](/api/interfaces/mulberry32generator/)

A mulberry32 implementation to generate values between 0 and 1.

 
```ts
sha256('hello world')
// => "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
```


- #### [shuffle](/api/functions/shuffle/)
  

> **shuffle**\<`T`\>(`xs`, `random`): `T`[]

It takes a traversable and returns a new array with the same elements in a random order.

 
```ts
shuffle([1, 2, 3])
// => [2, 3, 1]

shuffle([1, 2, 3])
// => [2, 1, 3]
```


- #### [xoroshiro128plus](/api/functions/xoroshiro128plus/)
  

> **xoroshiro128plus**(`seed`): [`Xoroshiro128plusGenerator`](/api/interfaces/xoroshiro128plusgenerator/)

A xoroshiro128plus implementation to generate random values.

Inspired by:
http://prng.di.unimi.it/xoroshiro128plus.c

 

## Type Aliases 
  
  
- #### [ArbitrarySize](/api/type-aliases/arbitrarysize/)
   
- #### [BiasedArbitraryContext](/api/type-aliases/biasedarbitrarycontext/)
  

> **BiasedArbitraryContext**: [`ArbitraryContext`](/api/interfaces/arbitrarycontext/) & `object`

 
- #### [ComparablePrimitive](/api/type-aliases/comparableprimitive/)
   
- #### [Failure](/api/type-aliases/failure/)
   
- #### [Just](/api/type-aliases/just/)
  

> **Just**\<`T`\>: `Exclude`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\>

 
- #### [Maybe](/api/type-aliases/maybe/)
  

> **Maybe**\<`T`\>: [`Nothing`](/api/type-aliases/nothing/) \| `T`

 
- #### [MaybePartial](/api/type-aliases/maybepartial/)
  

> **MaybePartial**\<`T`\>: `{ [P in keyof T]?: T[P] }`

 
- #### [Memoized](/api/type-aliases/memoized/)
  

> **Memoized**\<`Fn`\>: `Fn` & `object`

A memoized function.

 
- #### [Nothing](/api/type-aliases/nothing/)
   
- #### [RecurrentGenerator](/api/type-aliases/recurrentgenerator/)
  

> **RecurrentGenerator**\<`R`\>: readonly [`R`, () => [`RecurrentGenerator`](/api/type-aliases/recurrentgenerator/)\<`R`\> \| `undefined`]

 
- #### [Success](/api/type-aliases/success/)
  

> **Success**\<`T`\>: `Exclude`\<`T`, [`Failure`](/api/type-aliases/failure/)\>

 
- #### [Try](/api/type-aliases/try/)
  

> **Try**\<`T`\>: [`Failure`](/api/type-aliases/failure/) \| `T`

 

## Types 
  
  
- #### [AsyncConstExpr](/api/type-aliases/asyncconstexpr/)
  

> **AsyncConstExpr**\<`T`\>: `Promise`\<`T`\> \| `T` \| () => `Promise`\<`T`\> \| () => `T`

A type that represents either a constant or a constant function.

 
- #### [ConstExpr](/api/type-aliases/constexpr/)
  

> **ConstExpr**\<`T`\>: `T` \| () => `T`

A type that represents either a constant or a constant function.

 
