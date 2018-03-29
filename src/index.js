/***
 * Simple server to pre-render Hcard html page
 */

require('dotenv').config({ silent: true });
import _ from 'lodash';
import fs from 'fs';
import React from 'react';
import express from 'express';
import store from './_store';
import logger from './logger';
import ExpressError from './_ExpressError';
import validations from './validations';

import { applyMiddleware, errorHandler } from './middlewares';
import { renderToString } from 'react-dom/server';

// Init globals
// Set React as global as instructed
global.React = React;
// Make this global so it's used like Error which is global anyway
global.ExpressError = ExpressError;

// Default to 8080
const { PORT = 8080 } = process.env;
// NOTE - The UI doesnt seem to post withCredentials... the spec is unclear if this is session based
const STATIC_SESSION_ID = 'xi120rhjt129r1';

// Cache the Hcard
const HCard = require('../assets/main.js').default;
const app = express();

// Apply middlewares
applyMiddleware(app);

// Serves mina.js, css and img assets
app.use('/', express.static('assets'));

app.post('/update', validations.update, async (req, res) => {
  try {
    // TODO - replace STATIC_SESSION_ID with req.session.id
    await store.save(STATIC_SESSION_ID, req.body);
    res.end();
  } catch (e) {
    next(e);
  }
});

app.post('/submit', validations.submit, async (req, res, next) => {
  try {
    // TODO - replace STATIC_SESSION_ID with req.session.id
    await store.set(STATIC_SESSION_ID, req.body);
    res.redirect('/');
  } catch (e) {
    next(e);
  }
});

app.get('/', async (req, res) => {
  try {
    // TODO - replace STATIC_SESSION_ID with req.session.id
    const hCardProps = await store.get(STATIC_SESSION_ID);
    // NOTE - renderToNodeStream is available in react-dom v16
    res.render('template', {
      hCardProps: JSON.stringify(hCardProps),
      html: renderToString(<HCard {...req.query} />)
    });
  } catch (e) {
    next(e);
  }
});

// NOTE - This must be HERE AT THE BOTTOM, dont move this
app.use(errorHandler);

export default app.listen(PORT, () => {
  logger.trace(
    `\n\nApplication served on port ${PORT}.\nGo to https://localhost:${PORT}/ to see the Hcard`
  );
});
