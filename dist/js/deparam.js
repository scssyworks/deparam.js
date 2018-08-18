(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("deparam", [], factory);
	else if(typeof exports === 'object')
		exports["deparam"] = factory();
	else
		root["deparam"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function () {
    return deparam.apply(this, arguments);
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Deparam plugin
 * Converts a querystring to a JavaScript object
 * @project      Deparam plugin
 * @date         2018-06-24
 * @author       Sachin Singh <ssingh.300889@gmail.com>
 * @version      1.0.0
 */

// Vars
var isBrowser = typeof window !== "undefined";

// Built-in shorthands
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
    return (/\[/.test(q)
    );
}

/**
 * Converts query string to JavaScript object
 * @param {string} qs query string argument (defaults to url query string)
 */
function deparam() {
    var qs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isBrowser ? window.location.search : "";

    qs = decodeURIComponent(qs).replace("?", "").trim();
    var queryParamList = qs.split("&");
    var queryObject = {};
    if (qs) {
        queryParamList.forEach(function (qq) {
            var qArr = qq.split("=");
            if (ifComplex.apply(undefined, _toConsumableArray(qArr))) {
                complex.apply(undefined, _toConsumableArray(qArr).concat([queryObject]));
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
    if (isObject(ob)) return { ob: ob };
    if (isArr(ob) || typeof ob === "undefined") return { ob: resolve(ob, isNumber(nextProp)) };
    return { ob: [ob], push: ob !== null };
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
        value = _qArr[1];
    // Convert to appropriate type


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

// Check if global jQuery object exists, then plug-in deparam function as a static method
if (isBrowser && window.jQuery) {
    window.jQuery.deparam = deparam;
}
;

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=deparam.js.map