# swan-lake

_Elegant TypeScript extensions_

![GitHub CI](https://github.com/giancosta86/swan-lake/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fswan-lake.svg)](https://badge.fury.io/js/@giancosta86%2Fswan-lake)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**swan-lake** is a library providing useful and minimalist extensions for the TypeScript language.

## Installation

The package on NPM is:

> @giancosta86/swan-lake

The public API entirely resides in the root package index, so one shouldn't reference specific modules.

## Usage

- `ImmediateOrPromise<T>` - can be assigned a `T` or a `Promise<T>`

- `AnyClass` is an alias for `Function` - to express a class, even ones having a `private` constructor

- `HasEquals` is an interface having an `equals(other): boolean` method, where `other` belongs to the same type or a structurally compatible one

- `None` is declared as `undefined | null`

- `Option` is a namespace including:

  - `map` - returns the source value itself should it be `null` or `undefined`, but applies the given mapper otherwise

  - `equals` - this function returns `true` if:

    - both `left` and `right` are either `undefined` or `null`

    - `left` and `right` are both defined **and** `left.equals(right)` returns `true`

    **Please, note**: this function does **not** check whether the two operands belong to the same type - according to TypeScript's structural equality; should you have such specific requirement, you'll need to perform a dedicated check.
