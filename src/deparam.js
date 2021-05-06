import isNumber from 'is-number';

// Vars
const isBrowser = typeof window !== 'undefined';

// Shorthand for built-ins
const isArr = Array.isArray;

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Checks if key is a true object
 * @param {*} key Any type of value
 */
function isObject(key) {
  return typeof key === 'object' && key !== null && !isArr(key);
}

/**
 * Checks if query parameter key is a complex notation
 * @param {string} q
 */
function ifComplex(q) {
  return /\[/.test(q);
}

/**
 * Converts query string to JavaScript object
 * @param {string} qs query string argument (defaults to url query string)
 */
function deparam(qs = isBrowser ? location.search : '', coerce = false) {
  qs = qs.substring(qs.charAt(0) === '?');
  const queryParamList = qs.split('&');
  const queryObject = {};
  if (qs) {
    queryParamList.forEach((qq) => {
      const qArr = qq.split('=').map((part) => decodeURIComponent(part));
      if (ifComplex(qArr[0])) {
        complex.apply(this, [].concat(qArr).concat([queryObject, coerce]));
      } else {
        simple.apply(this, [qArr, queryObject, false, coerce]);
      }
    });
  }
  return queryObject;
}

/**
 * Converts an array to an object
 * @param {array} arr
 */
function toObject(arr) {
  var convertedObj = Object.create(null);
  if (isArr(arr)) {
    arr.forEach((value, index) => {
      convertedObj[index] = value;
    });
  }
  return convertedObj;
}

/**
 * Resolves an array to object if required
 * @param {array} ob An array object
 * @param {boolean} isNumber flag to test if next key is number
 */
function resolve(ob, isNextNumber) {
  if (typeof ob === 'undefined') return isNextNumber ? [] : Object.create(null);
  return isNextNumber ? ob : toObject(ob);
}

/**
 * Resolves the target object for next iteration
 * @param {Object} ob current reference object
 * @param {string} nextProp reference property in current object
 */
function resolveObj(ob, nextProp) {
  if (isObject(ob)) return { ob };
  if (isArr(ob) || typeof ob === 'undefined')
    return { ob: resolve(ob, isNumber(nextProp)) };
  return { ob: [ob], push: ob !== null };
}

/**
 * Handles complex query parameters
 * @param {string} key
 * @param {string} value
 * @param {Object} obj
 */
function complex(key, value, obj, doCoerce) {
  const match = key.match(/([^\[]+)\[([^\[]*)\]/) || [];
  if (match.length === 3) {
    let prop = match[1];
    let nextProp = match[2];
    key = key.replace(/\[([^\[]*)\]/, '');
    if (ifComplex(key)) {
      if (nextProp === '') nextProp = '0';
      key = key.replace(/[^\[]+/, nextProp);
      complex(
        key,
        value,
        (obj[prop] = resolveObj(obj[prop], nextProp).ob),
        doCoerce
      );
    } else if (nextProp) {
      const { ob, push } = resolveObj(obj[prop], nextProp);
      obj[prop] = ob;
      const nextOb = push ? {} : obj[prop];
      nextOb[nextProp] = coerce(value, !doCoerce);
      if (push) {
        obj[prop].push(nextOb);
      }
    } else {
      simple([match[1], value], obj, true, doCoerce);
    }
  }
}

/**
 * Handles simple query
 * @param {array} qArr
 * @param {Object} queryObject
 * @param {boolean} toArray
 */
function simple(qArr, queryObject, toArray, doCoerce) {
  let key = qArr[0];
  let value = qArr[1];
  value = coerce(value, !doCoerce);
  if (hasOwn(queryObject, key)) {
    queryObject[key] = isArr(queryObject[key])
      ? queryObject[key]
      : [queryObject[key]];
    queryObject[key].push(value);
  } else {
    queryObject[key] = toArray ? [value] : value;
  }
}

/**
 * Restores values to their original type
 * @param {string} value undefined or string value
 */
function coerce(value, skip) {
  if (value == null) return '';
  if (skip || typeof value !== 'string') return value;
  value = value.trim();
  if (isNumber(value)) return +value;
  switch (value) {
    case 'null':
      return null;
    case 'undefined':
      return undefined;
    case 'true':
      return true;
    case 'false':
      return false;
    case 'NaN':
      return NaN;
    default:
      return value;
  }
}

// Library encapsulation
function lib() {
  return deparam.apply(this, arguments);
}

export default lib;
