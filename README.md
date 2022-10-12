# Axioms _(@skyleague/axioms)_

<p>
  <img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/skyleague/axioms">
  <img alt="Version" src="https://img.shields.io/github/package-json/v/skyleague/axioms" />
  <img alt="LGTM Grade" src="https://img.shields.io/lgtm/grade/javascript/github/skyleague/axioms">
  <img src="https://img.shields.io/badge/node-%3E%3D16-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> The art of doing mathematics consists in finding that special case which contains all the germs of generality.
>
> -   David Hilbert

Axioms is a library of *small* composable functions, providing functional programming functionality to regular typescript code.

Writing typesafe code shouldn't be hard. However, writing generic functions to do so *is*. Axioms do the hard work for you. The library is entirely tree shakeable and small as we can make it.

## Table of Contents

<!-- toc -->

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Alternative projects](#alternative-projects)
- [When not to use Axioms?](#when-not-to-use-axioms)
- [License](#license)

<!-- tocstop -->

## Install

Install Axioms using [`npm`](https://www.npmjs.com/):

```console
 $ npm install @skyleague/axioms
```

## Alternative projects

In no particular order, the following libraries try to solve similar problems (albeit very different):

- [`Lodash`](https://github.com/lodash/lodash); works very well but defines a more polymorphic interface than we'd like. Also, tree-shaking is difficult without using different versions of this library.
- [`Rambda`](https://ramdajs.com/)
- The list goes on...

PR's are very welcome if you think your project is missing here.

## When not to use Axioms?

Axioms define a very opinionated interface and aren't shy about it. Not everyone will like this.
Although the library is tested, picking a more used alternative will provide more stability.
The current implementation is a WIP; interfaces might change. Functions may get removed if they do not provide enough use. We aim to make every function to be replaceable by a lot of alternatives readily available, but we cannot guarantee this.

## Support

SkyLeague provides Enterprise Support on this open-source library package at clients across industries. Please get in touch via [`https://skyleague.io`](https://skyleague.io).

If you are not under Enterprise Support, feel free to raise an issue and we'll take a look at it on a best-effort basis!

## License & Copyright

This library is licensed under the MIT License (see [LICENSE.md](./LICENSE.md) for details).

If you using this SDK without Enterprise Support, please note this (partial) MIT license clause:

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND

Copyright (c) 2022, SkyLeague Technologies B.V..
'SkyLeague' and the astronaut logo are trademarks of SkyLeague Technologies, registered at Chamber of Commerce in The Netherlands under number 86650564.

All product names, logos, brands, trademarks and registered trademarks are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, trademarks and brands does not imply endorsement.
