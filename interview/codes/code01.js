/**
 * (3).add(5).minus(2)`结果为`6`
 */

// #region snippet1
~function(){
  function check(n) {
    n = Number(n)
    return isNaN(n) ? 0 : n
  }
  function add(x) {
    x = check(x) 
    return this + x
  }
  function minus(y) {
    y = check(y)
    return this - y
  }

  [add, minus].forEach((fn) => Number.prototype[fn.name] = fn)
}()

(5).add(3).minus(2) // 6
// #endregion snippet1

// #region snippet2
function revertStr(str) {
  return str.split('').map(e => {
    if(e.charCodeAt() >= 97) {
      return e.toUpperCase()
    } else {
      return e.toLowerCase()
    }
  }).join('')
}
// #endregion snippet2

//#region snippet3
function revertStr2(str) {  // 'AbC'
  const newStr = str.toUpperCase()  // 'ABC'
  let result = ''
  for(let i = 0; i < str.length; i ++) {
    if(str[i] === newStr[i]) {
      result += newStr[i].toLowerCase()
    } else {
      result += newStr[i]
    }
  }
  return result
}
//#endregion snippet3