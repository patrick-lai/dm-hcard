/***
 *  An Express error so we can throw things with status codes more easily around the app
 */

/*istanbul ignore next*/
export default class ExpressError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status || 500;
    this.data = data;
    Object.setPrototypeOf(this, ExpressError.prototype);
  }
}
