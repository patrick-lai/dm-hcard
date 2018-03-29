import fs from 'fs';
import React from 'react';
import express from 'express';
import mustacheExpress from 'mustache-express';
import { renderToString } from 'react-dom/server';

// Set React as global as instructed
global.React = React;

// Default to 8080
const { PORT = 8080 } = process.env;

// Cache the Hcard
const HCard = require('../assets/main.js').default;
const app = express();

// Use a template engine (NOTE - auto does template caching)
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// Serves css and img assets
app.use('/css', express.static('assets/css'));
app.use('/img', express.static('assets/img'));

app.get('/', (req, res) => {
  res.render('template', { html: renderToString(<HCard {...req.query} />) });
});

export default app.listen(PORT, () => {
  console.info(`Application served on port ${PORT}`);
});
