const theme = require('./index.js');

/**
 * Compiles theme object values into unit values for sass
 * @param {object}
 * @return {object}
 */
const complileThemeValues = (obj) =>
  Object.keys(obj).reduce((newObj, key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      if (obj[key].hasOwnProperty('val') && obj[key].hasOwnProperty('unit')) {
        return {...newObj, [`${key}`]: `${obj[key].val}${obj[key].unit || ''}`}; // return value compiled
      } else {
        return {...newObj, [`${key}`]: complileThemeValues(obj[key])};  // recurse
      }
    } else {
      return {...newObj, [`${key}`]: obj[key]}; // just return value
    }
  }, {});

/**
 * Flattens object to single depth object
 * @param {object}
 * @param {string}
 * @param {string}
 * @return {object}
 */
const flatten = (object, prefix = '', delim = '--') => {
  return Object.keys(object).reduce((prev, element) => {
    return typeof object[element] == 'object'
      ? {
        ...prev,
        ...flatten(object[element], `${prefix}${element}${delim}`)
      } : {
        ...prev,
        ...{ [`${prefix}${element}`]: object[element] }
      };
  }, {})
};

module.exports = flatten(complileThemeValues(theme));
