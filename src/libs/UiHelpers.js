/**
 * Formulate BEM components class selectors
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

/**
 * Format date into something "prettier"
 *
 * @param {string} date string in ISO format
 * @returns {string}
 */
export function formatIsoDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${year}/${month}/${day} @ ${hours}:${minutes}`;

  return formattedDate;
}
