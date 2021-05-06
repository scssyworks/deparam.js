/*!
 * Deparam plugin converts query string to a valid JavaScript object
 * Released under MIT license
 * @name Deparam.js
 * @author Sachin Singh <https://github.com/scssyworks/deparam.js>
 * @version 2.1.4
 * @license MIT
 */
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

var isNumber = function(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

var isBrowser = typeof window !== 'undefined'; // Shorthand for built-ins

var isArr = Array.isArray;

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
/**
 * Checks if key is a true object
 * @param {*} key Any type of value
 */


function isObject(key) {
  return _typeof(key) === 'object' && key !== null && !isArr(key);
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


function deparam() {
  var _this = this;

  var qs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isBrowser ? location.search : '';
  var coerce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  qs = qs.substring(qs.charAt(0) === '?');
  var queryParamList = qs.split('&');
  var queryObject = {};

  if (qs) {
    queryParamList.forEach(function (qq) {
      var qArr = qq.split('=').map(function (part) {
        return decodeURIComponent(part);
      });

      if (ifComplex(qArr[0])) {
        complex.apply(_this, [].concat(qArr).concat([queryObject, coerce]));
      } else {
        simple.apply(_this, [qArr, queryObject, false, coerce]);
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
  var convertedObj = {};

  if (isArr(arr)) {
    arr.forEach(function (value, index) {
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
  if (typeof ob === 'undefined') return isNextNumber ? [] : {};
  return isNextNumber ? ob : toObject(ob);
}
/**
 * Resolves the target object for next iteration
 * @param {Object} ob current reference object
 * @param {string} nextProp reference property in current object
 */


function resolveObj(ob, nextProp) {
  if (isObject(ob)) return {
    ob: ob
  };
  if (isArr(ob) || typeof ob === 'undefined') return {
    ob: resolve(ob, isNumber(nextProp))
  };
  return {
    ob: [ob],
    push: ob !== null
  };
}
/**
 * Handles complex query parameters
 * @param {string} key
 * @param {string} value
 * @param {Object} obj
 */


function complex(key, value, obj, doCoerce) {
  var match = key.match(/([^\[]+)\[([^\[]*)\]/) || [];

  if (match.length === 3) {
    var prop = match[1];
    var nextProp = match[2];
    key = key.replace(/\[([^\[]*)\]/, '');

    if (ifComplex(key)) {
      if (nextProp === '') nextProp = '0';
      key = key.replace(/[^\[]+/, nextProp);
      complex(key, value, obj[prop] = resolveObj(obj[prop], nextProp).ob, doCoerce);
    } else if (nextProp) {
      var _resolveObj = resolveObj(obj[prop], nextProp),
          ob = _resolveObj.ob,
          push = _resolveObj.push;

      obj[prop] = ob;
      var nextOb = push ? {} : obj[prop];
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
  var key = qArr[0];
  var value = qArr[1];
  value = coerce(value, !doCoerce);

  if (hasOwn(queryObject, key)) {
    queryObject[key] = isArr(queryObject[key]) ? queryObject[key] : [queryObject[key]];
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
} // Library encapsulation


function lib() {
  return deparam.apply(this, arguments);
}

export default lib;
//# sourceMappingURL=deparam.esm.js.map
