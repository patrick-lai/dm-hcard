/***
 * House all the middlewares for express app
 */

require('dotenv').config({ silent: true });

import session from 'express-session';
import cookieParser from 'cookie-parser';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import logger from './logger';

const { SESSION_SECRET } = process.env;

if (!SESSION_SECRET) throw new Error('SESSION_SECRET is not in env');

// Sets up our express middleware stack
export const applyMiddleware = app => {
  if (!app) throw new Error('Cannot apply middleware to empty app');
  // Use a template engine (NOTE - automatically does template caching)
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: SESSION_SECRET,
      cookie: { path: '/', secure: false }
    })
  );
};

// Error handler
export const errorHandler = (err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({
    message: err.message || JSON.stringify(err),
    data: err.data
  });
  next();
};
