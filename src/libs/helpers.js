/**
 * Gets a random string
 * @param {string}
 * @return {string}
 */
export const randomString = (len) => Math.random().toString(36).substr(2, len);
