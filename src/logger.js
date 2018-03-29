/***
 * Mock logger
 * Intention is this is replaced with a real logger
 */

/*istanbul ignore next*/
export default {
  trace: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
};
