/**
 * Deparam plugin
 * Converts a querystring to a JavaScript object
 * @project      Deparam plugin
 * @date         2018-06-24
 * @author       Sachin Singh <ssingh.300889@gmail.com>
 * @version      1.0.0
 */

/**
 * Converts query string to JavaScript object
 * @param {string} qs query string argument (defaults to url query string)
 */
function deparam(qs = window.location.search) {
    qs = decodeURIComponent(qs).replace("?", "").trim();
    if (qs === "") return {};
    const queryParamList = qs.split("&"),
        queryObject = {};
    queryParamList.forEach((qq) => {
        const qArr = qq.split("=");
        if (_isComplex(...qArr)) {
            _handleComplexQuery(...qArr, queryObject);
        } else {
            _handleSimpleQuery(qArr, queryObject);
        }
    });
    return queryObject;
}

/**
 * Checks if input is a number
 * @param {*} key 
 */
function isNumber(key) {
    if (key == null || typeof key === 'boolean') return false;
    if (!key.toString().trim()) return false;
    return !isNaN(Number(key));
}

/**
 * Checks if query parameter key is a complex notation
 * @param {string} q 
 */
function _isComplex(q) {
    return (/\[/.test(q));
}

/**
 * Resolves the target object for next iteration
 * @param {Object} ob current reference object
 * @param {string} nextProp reference property in current object
 */
function _resolveTargetObject(ob, nextProp) {
    // handle null value
    if (ob === null) return { ob: [null] };
    // Check if object
    if (typeof ob === 'object') return { ob };
    // Check if array
    if (Array.isArray(ob) && !isNumber(nextProp)) return { ob: _convertToObject(ob) };
    // Check if undefined
    if (typeof ob === "undefined") return { ob: (isNumber(nextProp) ? [] : {}) };
    return { ob: [ob], push: true };
}

/**
 * Handles complex query parameters
 * @param {string} key 
 * @param {string} value 
 * @param {Object} obj 
 */
function _handleComplexQuery(key, value, obj) {
    const match = key.match(/([^\[]+)\[([^\[]*)\]/);
    if (match && match.length === 3) {
        let [, prop, nextProp] = match;
        key = key.replace(/\[([^\[]*)\]/, "");
        if (_isComplex(key)) {
            if (nextProp === "") nextProp = "0";
            key = key.replace(/[^\[]+/, nextProp);
            _handleComplexQuery(key, value, obj[prop] = _resolveTargetObject(obj[prop], nextProp).ob);
        } else {
            if (nextProp) {
                const { ob, push } = _resolveTargetObject(obj[prop], nextProp);
                obj[prop] = ob;
                if (push) {
                    obj[prop].push({
                        [nextProp]: _val(value)
                    });
                } else {
                    obj[prop][nextProp] = _val(value);
                }
            } else {
                _handleSimpleQuery([match[1], value], obj, true);
            }
        }
    }
}

/**
 * Handles simple query
 * @param {array} qArr 
 * @param {Object} queryObject 
 * @param {boolean} convertToArray 
 */
function _handleSimpleQuery(qArr, queryObject, convertToArray) {
    let [key, value] = qArr;
    // Convert to appropriate type
    value = _val(value);
    if (key in queryObject) {
        queryObject[key] = Array.isArray(queryObject[key]) ? queryObject[key] : [queryObject[key]];
        queryObject[key].push(value);
    } else {
        queryObject[key] = convertToArray ? [value] : value;
    }
}

/**
 * Restores values to their original type
 * @param {string} value 
 */
function _val(value) {
    if (value == null) return "";
    value = value.toString().trim();
    if (value === "undefined") return;
    if (value === "null") return null;
    if (value === "NaN") return NaN;
    if (!isNaN(+value)) return +value;
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
    return value;
}

/**
 * Converts an array to an object
 * @param {array} arr 
 */
function _convertToObject(arr) {
    var convertedObj = {};
    if (Array.isArray(arr)) {
        arr.forEach((value, index) => {
            convertedObj[index] = value;
        });
        return convertedObj;
    }
    return {};
}

// Check if global jQuery object exists, then plug-in deparam function as a static method
if (typeof window !== "undefined" && window.jQuery) {
    window.jQuery.deparam = deparam;
}

export default deparam;