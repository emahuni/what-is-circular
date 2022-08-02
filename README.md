# whats-circular [![Build Status](https://travis-ci.org/emahuni/whats-circular.svg?branch=master)](https://travis-ci.org/emahuni/whats-circular)

Like [`what-is-circular`](https://github.com/emahuni/whats-circular), but returns the paths to the all circular references found, and directly to the offending key.

# Installation

`npm install whats-circular`

# Usage

## `whatsCircular(obj)`

Returns an array that contains the path to the first circular reference found, or `undefined` if no circular reference is found.

# Example

```js
var whatsCircular = require('whats-circular')

var circularObj = {
  foo: 1,
  bar: 2
}
// qux.baz is the circular reference
circularObj.qux = {
  baz: circularObj
}

whatsCircular(circularObj) // [['qux', 'baz']]

// multiple circular references
var a = {
  a: false,
  b: {
    a: false,
    c: {
      a: false,
      d: {
        e: {
          a: false
        }
      }
    }
  }
}

a.b.c.d.e = a
a.b.c.f = a.b.c

whatsCircular(a) //[['b', 'c', 'd', 'e'],['b', 'c', 'f']]

var obj = {
  foo: 1,
  bar: 2,
  qux: 3
}

whatsCircular(obj) // undefined
```

# License
MIT

# Thanks

Thanks to @flotwig's [`https://github.com/flotwig/what-is-circular/`](https://github.com/flotwig/what-is-circular/) for the base project implementation.

Thanks to @tjmehta's [`is-circular`](https://github.com/tjmehta/is-circular/) for providing the tests and README for this project.

Thanks to @angus-c's [`just-is-circular`](https://github.com/angus-c/just/) for contributing additional tests.
