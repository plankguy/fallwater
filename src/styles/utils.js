/**
 * Returns readable value from a sass map value for font-family e.g. ('Helvetica Neue', Arial) -> 'Helvetica Neue', Arial
 * @param {string}
 * @return {string}
 */
export const formatFontFamilyMap = (mapVal) => mapVal.replace(/^\(|\)$/g, '');

/**
 * Checks if a string value is a valid w/ unit (int, px, em, vw, etc...) @NOTE: doesn't validate actual unit
 * @param {string/int}
 * @return {boolean}
 */
export const isValidUnit = (val, unit = '') => (typeof val === 'string' ? val.substr(-unit.length, unit.length) : '') === unit || !isNaN(val);

/**
 * Returns value w/ unit after performing passed operation
 * @param {string/int}
 * @param {string/int}
 * @param {string}
 * @param {string}
 * @return {string}
 */
export const unitOperation = (a, b, operation = '+', unit = 'px') => {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '*': (a, b) => a * b,
  };
  // Check unit/number validitiy
  if (isValidUnit(a, unit) && isValidUnit(b, unit)) {
    return `${operators[operation](parseFloat(a), parseFloat(b))}${unit}`;
  } else {
    console.warn('Attempting an operation on incompatible values');
    return NaN;
  }
}

/**
 * Returns added unit values
 * @param {string/int}
 * @param {string/int}
 * @return {string}
 */
export const addPx = (a, b) => unitOperation(a, b, '+', 'px');

/**
 * Returns subtracted unit values
 * @param {string/int}
 * @param {string/int}
 * @return {string}
 */
export const subtractPx = (a, b) => unitOperation(a, b, '-', 'px');

/**
 * Returns divided unit values
 * @param {string/int}
 * @param {string/int}
 * @return {string}
 */
export const dividePx = (a, b) => unitOperation(a, b, '/', 'px');

/**
 * Returns multiplied unit values
 * @param {string/int}
 * @param {string/int}
 * @return {string}
 */
export const multiplyPx = (a, b) => unitOperation(a, b, '*', 'px');
