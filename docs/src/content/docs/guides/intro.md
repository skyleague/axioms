---
title: Intro

---


> The art of doing mathematics consists in finding that special case which contains all the germs of generality.
>
> -   David Hilbert


Writing typesafe code shouldn't be hard. However, writing generic functions to do so _is_. Axioms do the hard work for you. The library is entirely tree shakeable and small as we can make it.

## Installation

Install Axioms using [`npm`](https://www.npmjs.com/):

```console
 $ npm install @skyleague/axioms
```

## Alternative projects

In no particular order, the following libraries try to solve similar problems (albeit very different):

-   [`Lodash`](https://github.com/lodash/lodash); works very well but defines a more polymorphic interface than we'd like. Also, tree-shaking is difficult without using different versions of this library.
-   [`Rambda`](https://ramdajs.com/)
-   The list goes on...

PR's are very welcome if you think your project is missing here.

