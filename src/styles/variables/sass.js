/**
 * @NOTE:
 * - This flattens js style variable object and exports for use in sass files
 */

const variables = require('./index.js');

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

module.exports = flatten(variables);
