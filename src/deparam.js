import isNumber from 'is-number';

// Definition of undefined
const UNDEF = void 0; // Results to undefined

// Typeof undefined
const TYPEOF_UNDEF = typeof UNDEF;

// Typeof string
const TYPEOF_STR = typeof '';

// Vars
const isBrowser = typeof window !== TYPEOF_UNDEF;

// location var
const loc = isBrowser ? window.location : null;

// Shorthand for built-ins
const isArr = Array.isArray;

/**
 * Shorthand for Object.prototype.hasOwnProperty
 * @param {any} obj Any object
 * @param {string} key key
 * @returns {boolean} true or false if object has the property
 */
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Returns true of input is an object and not an array
 * @param {any} key Checks if input is an object and not an array
 * @returns {boolean} true or false
 */
function isObject(key) {
  return typeof key === 'object' && key !== null && !isArr(key);
}

/**
 * Returns true of input query string is complex
 * @param {string} q Query string
 * @returns {boolean} true or false
 */
function ifComplex(q) {
  return /\[/.test(q);
}

/**
 * Returns an object without a prototype
 * @returns {{[key in string|number]: any}} Object without __proto__
 */
function obNull() {
  return Object.create(null);
}

/**
 * Returns a parsed query object
 * @param {string} qs Query string
 * @param {boolean} coerce Coerce values
 * @returns {{[key in string|number]: any}} Query object
 */
function lib(qs, coerce) {
  if (isBrowser && typeof qs !== TYPEOF_STR) {
    qs = loc.search;
  }
  qs = qs.substring(qs.charAt(0) === '?');
  const queryParamList = qs.split('&');
  const queryObject = obNull();
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
 * Converts an array to equivalent object
 * @param {any[]} arr Any array
 * @returns {any} Any object
 */
function toObject(arr) {
  var convertedObj = obNull();
  if (isArr(arr)) {
    arr.forEach((value, index) => {
      convertedObj[index] = value;
    });
  }
  return convertedObj;
}

/**
 * Converts array to an object if required
 * @param {any} ob Any object
 * @param {booleab} isNextNumber Test for next key
 * @returns {any} Any object
 */
function resolve(ob, isNextNumber) {
  if (typeof ob === TYPEOF_UNDEF) return isNextNumber ? [] : obNull();
  return isNextNumber ? ob : toObject(ob);
}

/**
 * Resolves the target object for next iteration
 * @param {any} ob current reference object
 * @param {string} nextProp reference property in current object
 * @returns {any} Resolved object for next iteration
 */
function resolveObj(ob, nextProp) {
  if (isObject(ob)) return { ob };
  if (isArr(ob) || typeof ob === TYPEOF_UNDEF)
    return { ob: resolve(ob, isNumber(nextProp)) };
  return { ob: [ob], push: ob !== null };
}

/**
 * Handles complex query parameters
 * @param {string} key Query key
 * @param {string} value Query value
 * @param {Object} obj Query object
 * @returns {void}
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
      const nextOb = push ? obNull() : obj[prop];
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
 * @param {array} qArr Query list
 * @param {Object} queryObject Query object
 * @param {boolean} toArray Test for conversion to array
 * @returns {void}
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
 * Converts input value to their appropriate types
 * @param {any} value Input value
 * @param {boolean} skip Test for skipping coercion
 * @returns {any} Coerced value
 */
function coerce(value, skip) {
  if (value == null) return '';
  if (skip || typeof value !== TYPEOF_STR) return value;
  value = value.trim();
  if (isNumber(value)) return +value;
  switch (value) {
    case 'null':
      return null;
    case TYPEOF_UNDEF:
      return UNDEF;
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

export default lib;
