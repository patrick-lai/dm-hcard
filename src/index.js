/***
 * Simple server to pre-render Hcard html page
 */

require('dotenv').config({ silent: true });
import fs from 'fs';
import React from 'react';
import express from 'express';
import session from 'express-session';
import mustacheExpress from 'mustache-express';
import { renderToString } from 'react-dom/server';
import store from './_store';

// Set React as global as instructed
global.React = React;

// Default to 8080
const { PORT = 8080, SESSION_SECRET } = process.env;

if (!SESSION_SECRET) throw new Error('SESSION_SECRET is not in env');

// Cache the Hcard
const HCard = require('../assets/main.js').default;
const app = express();

// Use a template engine (NOTE - auto does template caching)
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// Use session middleware
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);

// Serves css and img assets
app.use('/', express.static('assets'));

app.post('/update', (req, res) => {
  console.log('UPDATE', req.session);
});

app.post('/submit', (req, res) => {
  console.log('SUBMIT', req.session);
});

app.get('/', (req, res) => {
  const hCardProps = {};

  // NOTE - renderToNodeStream is available in react-dom v16
  res.render('template', {
    hCardProps: JSON.stringify(hCardProps),
    html: renderToString(<HCard {...req.query} />)
  });
});

export default app.listen(PORT, () => {
  console.info(`Application served on port ${PORT}`);
});
