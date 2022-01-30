require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { errorHandler, notFoundHandler } = require('./middleware');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
require('./config/mongoose')();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error for unsupported routes (which we dont want to handle)
app.use(notFoundHandler);
app.use(errorHandler);
module.exports = app;
