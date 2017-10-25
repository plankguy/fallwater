/**
 * Formulate components class selectors
 *
 * @param {string} base class selector of element
 * @param {string} parent class selector of element
 * @param {array} additional class selectors of element
 * @returns {string}
 */
export function bemClasses(baseClass, parentClass = '', additionalClasses = []) {
  const classes = [
    baseClass,
    parentClass === '' ? '' : `${parentClass}__${baseClass}`,
    ...additionalClasses,
  ];

  return classes.join(' ');
}
