require('dotenv').config();
const debug = require('debug')('app:main');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const { errorHandler, notFoundHandler } = require('./middleware');
const pinRouter = require('./routes/pins');

const app = express();
require('./config/mongoose')();

const corsOptions = {
  origin: process.env.CLIENT_URL ?? '*',
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
debug(process.env.CLIENT_URL);
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pin', pinRouter);

// error for unsupported routes (which we dont want to handle)
app.use(notFoundHandler);
app.use(errorHandler);
module.exports = app;
