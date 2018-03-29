/***
 * Validation on routes
 */

import _ from 'lodash';
import logger from './logger';
export default {
  update: (req, res, next) => {
    const { body } = req;
    if (!_.isObject(body) || Array.isArray(body)) {
      logger.warn('Update route hit with invalid object', typeof body);
      next(
        new ExpressError('Update method only accepts non array objects', 403)
      );
      return;
    }
    next();
  },
  submit: (req, res, next) => {
    const { body } = req;
    if (!_.isObject(body) || Array.isArray(body)) {
      logger.warn('Submit route hit with invalid object', typeof body);
      next(
        new ExpressError('Submit method only accepts non array objects', 403)
      );
      return;
    }
    next();
  }
};
