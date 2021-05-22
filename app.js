const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// 미들웨어
const { Exception } = require('./middlewares/Exception');
const { Protocol } = require('./middlewares/Protocol');
// 라우터
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use(Exception);

module.exports = app;
