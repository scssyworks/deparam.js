/**!
 * Deparam plugin
 * Converts a querystring to a JavaScript object
 * @project      Deparam plugin
 * @date         2019-05-06
 * @author       Sachin Singh <ssingh.300889@gmail.com>
 * @version      1.1.5
 */

import $ from 'jquery';

// Vars
const isBrowser = typeof window !== "undefined";

// Shorthand for built-ins
const isArr = Array.isArray;

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
    return (key != null && !isArr(key) && key.toString() === "[object Object]");
}

/**
 * Checks if query parameter key is a complex notation
 * @param {string} q 
 */
function ifComplex(q) {
    return (/\[/.test(q));
}

/**
 * Converts query string to JavaScript object
 * @param {string} qs query string argument (defaults to url query string)
 */
function deparam(qs = (
    (isBrowser
        ? window.location.search
        : "")
)) {
    qs = qs.trim();
    if (qs.charAt(0) === "?") {
        qs = qs.replace("?", "");
    }
    const queryParamList = qs.split("&");
    const queryObject = {};
    if (qs) {
        queryParamList.forEach((qq) => {
            const qArr = qq.split("=");
            if (qArr[1]) {
                qArr[1] = decodeURIComponent(qArr[1]);
            }
            if (ifComplex(...qArr)) {
                complex(...qArr, queryObject);
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
    if (typeof ob === "undefined") return isNextNumber ? [] : {};
    return isNextNumber ? ob : toObject(ob);
}

/**
 * Resolves the target object for next iteration
 * @param {Object} ob current reference object
 * @param {string} nextProp reference property in current object
 */
function resolveObj(ob, nextProp) {
    if (isObject(ob)) return { ob };
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
    const match = key.match(/([^\[]+)\[([^\[]*)\]/) || [];
    if (match.length === 3) {
        let [, prop, nextProp] = match;
        key = key.replace(/\[([^\[]*)\]/, "");
        if (ifComplex(key)) {
            if (nextProp === "") nextProp = "0";
            key = key.replace(/[^\[]+/, nextProp);
            complex(key, value, obj[prop] = resolveObj(obj[prop], nextProp).ob);
        } else if (nextProp) {
            const { ob, push } = resolveObj(obj[prop], nextProp);
            obj[prop] = ob;
            if (push) {
                obj[prop].push({
                    [nextProp]: coerce(value)
                });
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
    let [key, value] = qArr;
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
        case "null": return null;
        case "undefined": return undefined;
        case "true": return true;
        case "false": return false;
        case "NaN": return NaN;
        default: return value;
    }
}

function lib() {
    return deparam.apply(this, arguments);
}

// Add as jQuery plugin
if (typeof $ === 'function') {
    $.deparam = lib;
}

export default lib;