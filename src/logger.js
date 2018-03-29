/*istanbul ignore next*/
/***
 * Mock logger
 * Intention is this is replaced with a real logger
 */
export default {
  trace: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
};
