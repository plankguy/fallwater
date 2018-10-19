const UNIT_REGEX = /(px|in|cm|mm|pt|pc|ex|em|rem|%|vw|vh|vmin|vmax|ch)$/g;

/**
 * Returns readable value from a sass map value for font-family e.g. ('Helvetica Neue', Arial) -> 'Helvetica Neue', Arial
 * @param {string}
 * @return {string}
 */
export const formatFontFamilyMap = (mapVal) => mapVal.replace(/^\(|\)$/g, '');

/**
 * Checks if a string value is a valid w/ unit (int, px, em, vw, etc...)
 * @param {string/int}
 * @return {boolean}
 */
export const isValidUnit = (val, unit = '') => {
  return (typeof val === 'string' && val.search(UNIT_REGEX) !== -1 ? val.substr(-unit.length, unit.length) : '') === unit || !isNaN(val);
};

/**
 * Checks if a theme value object is valid
 * @param {object}
 * @return {boolean}
 */
const validateValStructure = (value) => {
	if (typeof value === 'object') {
		if (value.hasOwnProperty('val') && value.hasOwnProperty('unit')) {
  	  return true;
    }
  }
  console.warn(`Theme value ${JSON.stringify(value)} must be an object with "val" and "unit" properties`);
  return false;
}

/**
 * Strips units from string value, returns number value
 * @param {string/int}
 * @return {int}
 */
export const stripUnit = (val) => {
  if (typeof val === 'string') {
    return parseFloat(val.replace(UNIT_REGEX, ''));
  } else {
    return val;
  }
};

/**
 * Gets unit from string
 * @param {string}
 * @return {string}
 */
export const getUnit = (val) => (typeof val === 'string') ? val.match(UNIT_REGEX) : null;

/**
 * Converts value to percent string
 * @param {int}
 * @return {string}
 */
export const intToPercent = (val) => `${val * 100}%`;

/**
 * Returns value w/ unit after performing passed operation
 * @param {int}
 * @param {int}
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
 * @param {string/int} a
 * @param {string/int} b
 * @return {string}
 */
export const multiplyPx = (a, b) => unitOperation(a, b, '*', 'px');

/**
 * Adds value objects
 * @param {object} values
 * @return {string}
 */
export const add = (values) => operate(values, (a, b) => a + b);

/**
 * Subtracts value objects
 * @param {object} values
 * @return {string}
 */
export const subtract = (values) => operate(values, (a, b) => a - b);

/**
 * Perform operation on array of values
 * @param {array} values
 * @param {function} op
 * @return {string}
 */
const operate = (values, op) => {
  let unit;
  const value = values.reduce((computedVal, val) => {
  	if (validateValStructure(val)) {
      if (unit !== val.unit && typeof unit !== 'undefined') {
      	console.warn(`Unit mismatch between ${unit} and ${val.unit}, ${val.unit} will be used`);
      }
    	unit = val.unit;
      return op(val.val, computedVal);
    } else {
    	return val;
    }
  }, 0);
  return `${value}${unit || ''}`;
};

/**
 * Return concated value w/ unit
 * @param {object|string} value
 * @return {string}
 */
const val = (value) => {
  let val;
  if (typeof value === 'number' || typeof value === 'string') {
    val = value;
  } else if (validateValStructure(value)) {
    val = `${value.val}${value.unit || ''}`;
  } else {
    val = null;
  }
  return val;
};

export default val;
