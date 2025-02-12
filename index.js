const isObject = require('lodash.isobject')
const includes = require('lodash.includes')
const isEmpty = require('lodash.isempty')

function whatIsCircular (obj) {
  if (!isObject(obj)) {
    return
  }

  return _dfs(obj)
}

function _dfs (obj, parents = [], parentKeys = []) {
  parents.push(obj)
  let circular = []
  // recurse depth-first until we hit something we've seen before
  for (const key in obj) {
    const val = obj[key]

    if (isObject(val)) {
      if (includes(parents, val)) {
        circular.push(parentKeys.concat([key]))
        continue
      }

      const path = _dfs(val, parents.concat([val]), parentKeys.concat([key]))

      if (path) circular = circular.concat (path)
    }
  }
  if(!isEmpty(circular)) return circular
}

module.exports = whatIsCircular
