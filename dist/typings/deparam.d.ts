export default lib;
/**
 * Returns a parsed query object
 * @param {string} qs Query string
 * @param {boolean} coerce Coerce values
 * @returns {{[key in string|number]: any}} Query object
 */
declare function lib(qs: string, coerce: boolean): {
    [x: string]: any;
    [x: number]: any;
};
