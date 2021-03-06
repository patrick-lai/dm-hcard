/***
 * Validation on routes
 * With more routes this will have to expand into a cleaner structure but for now its good enough
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
    // TODO - add more validations like name,phone etc etc
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
    // TODO - add more validations like name,phone etc etc
    next();
  }
};
