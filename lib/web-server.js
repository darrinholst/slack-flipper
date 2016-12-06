const bodyParser = require('body-parser');
const express = require('express');
const log = require('debug')('bot');
const morgan = require('morgan');

const handle = require('./command-handler');

module.exports = start;

function start() {
  const app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.post('/', function (req, res) {
    return handle(req.body.command, req.body.text, req.body.response_url).then(res.send.bind(res));
  });

  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (error, req, res, next) { //eslint-disable-line
    log('Uncaught error: %j', error);
    res.status(error.status || 500).json({});
  });

  return app;
}
