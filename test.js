var whatsCircular = require('.')

describe('whats-circular', function () {
  it('should return undefined if passed a non-object', function () {
    expect(whatsCircular(2)).toEqual(undefined)
  })

  it('should return path for circular objects', function () {
    var x = {}
    x.cyclic = { a: 1, x: x }
    expect(whatsCircular(x)).toEqual([['cyclic', 'x']])
  })

  it('should return path for circular objects', function () {
    var x = {}
    x.cyclic = { a: {}, x: x }
    expect(whatsCircular(x)).toEqual([['cyclic', 'x']])

  })

  it('should return path for circular objects', function () {
    var x = {}
    x.cyclic = { a: {}, indirect: { x: x } }
    expect(whatsCircular(x)).toEqual([['cyclic', 'indirect', 'x']])
  })

  it('should return path for circular objects', function () {
    a = {
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

    expect(whatsCircular(a)).toEqual([['b', 'c', 'd', 'e']])
  })

  it('should return paths for circular objects', function () {
    a = {
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

    expect(whatsCircular(a)).toEqual([['b', 'c', 'd', 'e'],['b', 'c', 'f']])
  })

  it('should return path for circular objects', function () {
    var x = {
      a: [
        {
          a: 'b',
          b: 'c'
        },
        {
          a: 'b',
          b: 'c'
        }
      ],
      b: [
        'a',
        'b'
      ]
    }

    x.c = {
      x
    }

    expect(whatsCircular(x)).toEqual([['c', 'x']])
  })

  it('should return path for circular objects in arrays', function () {
    var x = {
      a: [
        {
          a: 'b',
          b: 'c'
        },
        {
          a: 'b',
          b: 'c'
        }
      ],
      b: [
        'a',
        'b'
      ]
    }

    x.a[2] = x

    expect(whatsCircular(x)).toEqual([['a', '2']])
  })

  it('should return undefined for non-circular objects', function () {
    var x = {}
    x.cyclic = { a: 1, b: 2 }
    expect(whatsCircular(x)).toEqual(undefined)
  })

  it('should return undefined for non-circular objects', function () {
    var x = {
      a: [
        {
          a: 'b',
          b: 'c'
        },
        {
          a: 'b',
          b: 'c'
        }
      ],
      b: [
        'a',
        'b'
      ]
    }
    expect(whatsCircular(x)).toEqual(undefined)
  })

  it('should return undefined for non-circular objects', function () {
    var x = {}
    var y = {}
    x.cyclic = { a: y, b: y }
    expect(whatsCircular(x)).toEqual(undefined)
  })

  it('detects circular objects and returns path', function() {
    var obj1 = {}
    obj1.x = obj1
    expect(whatsCircular(obj1)).toEqual([['x']])

    var obj2 = {}
    obj2.x = {y: obj2}
    expect(whatsCircular(obj2)).toEqual([['x', 'y']])
  })

  it('detects circular arrays and returns path', function() {
    var obj1 = []
    obj1.push(obj1)
    expect(whatsCircular(obj1)).toEqual([['0']])
  })

  it('detects non-circular objects and returns undefined', function() {
    var obj1 = {}
    obj1.x = {y: 4}
    expect(whatsCircular(obj1)).toBeUndefined()

    expect(whatsCircular({})).toBeUndefined()
  })

  it('detects non-circular arrays and returns undefined', function() {
    var obj1 = []
    obj1.push([])
    expect(whatsCircular(obj1)).toBeUndefined()
  })

  it('returns undefined for non-objects', function() {
    expect(whatsCircular(undefined)).toBeUndefined()
    expect(whatsCircular(null)).toBeUndefined()
    expect(whatsCircular('hi')).toBeUndefined()
    expect(whatsCircular(false)).toBeUndefined()
    expect(whatsCircular(/a/)).toBeUndefined()
  })

  it('returns undefined for non-circular functions', function() {
    expect(whatsCircular(function() {})).toBeUndefined()
  })

  it('returns path for circular functions', function() {
    let f = function() {}
    f.x = {
      y: {
        f
      }
    }
    expect(whatsCircular(f)).toEqual([['x', 'y', 'f']])
  })
})
