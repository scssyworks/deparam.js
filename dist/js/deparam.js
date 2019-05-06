(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.deparam = factory(global.jQuery));
}(this, (function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var isBrowser = typeof window !== "undefined"; // Shorthand for built-ins

  var isArr = Array.isArray;
  /**
   * Checks if input is a number
   * @param {*} key 
   */

  function isNumber(key) {
    key = (key + "").trim();
    if (['null', 'undefined', ''].indexOf(key) > -1) return false;
    return !isNaN(Number(key));
  }
  /**
   * Checks if key is a true object
   * @param {*} key Any type of value
   */


  function isObject(key) {
    return key != null && !isArr(key) && key.toString() === "[object Object]";
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
    var qs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isBrowser ? window.location.search : "";
    qs = qs.trim();

    if (qs.charAt(0) === "?") {
      qs = qs.replace("?", "");
    }

    var queryParamList = qs.split("&");
    var queryObject = {};

    if (qs) {
      queryParamList.forEach(function (qq) {
        var qArr = qq.split("=");

        if (qArr[1]) {
          qArr[1] = decodeURIComponent(qArr[1]);
        }

        if (ifComplex.apply(void 0, _toConsumableArray(qArr))) {
          complex.apply(void 0, _toConsumableArray(qArr).concat([queryObject]));
        } else {
          simple(qArr, queryObject);
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
    if (typeof ob === "undefined") return isNextNumber ? [] : {};
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
    if (isArr(ob) || typeof ob === "undefined") return {
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


  function complex(key, value, obj) {
    var match = key.match(/([^\[]+)\[([^\[]*)\]/) || [];

    if (match.length === 3) {
      var _match = _slicedToArray(match, 3),
          prop = _match[1],
          nextProp = _match[2];

      key = key.replace(/\[([^\[]*)\]/, "");

      if (ifComplex(key)) {
        if (nextProp === "") nextProp = "0";
        key = key.replace(/[^\[]+/, nextProp);
        complex(key, value, obj[prop] = resolveObj(obj[prop], nextProp).ob);
      } else if (nextProp) {
        var _resolveObj = resolveObj(obj[prop], nextProp),
            ob = _resolveObj.ob,
            push = _resolveObj.push;

        obj[prop] = ob;

        if (push) {
          obj[prop].push(_defineProperty({}, nextProp, coerce(value)));
        } else {
          obj[prop][nextProp] = coerce(value);
        }
      } else {
        simple([match[1], value], obj, true);
      }
    }
  }
  /**
   * Handles simple query
   * @param {array} qArr 
   * @param {Object} queryObject 
   * @param {boolean} toArray 
   */


  function simple(qArr, queryObject, toArray) {
    var _qArr = _slicedToArray(qArr, 2),
        key = _qArr[0],
        value = _qArr[1]; // Convert to appropriate type


    value = coerce(value);

    if (key in queryObject) {
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


  function coerce(value) {
    if (value == null) return "";
    if (typeof value !== "string") return value;
    value = value.trim();
    if (isNumber(value)) return +value;

    switch (value) {
      case "null":
        return null;

      case "undefined":
        return undefined;

      case "true":
        return true;

      case "false":
        return false;

      case "NaN":
        return NaN;

      default:
        return value;
    }
  }

  function lib() {
    return deparam.apply(this, arguments);
  } // Add as jQuery plugin


  if (typeof $ === 'function') {
    $.deparam = lib;
  }

  return lib;

})));
//# sourceMappingURL=deparam.js.map
