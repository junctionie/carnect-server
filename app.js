const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// 미들웨어
const { Exception } = require('./middlewares/Exception');
const { authenticate, passport } = require('./middlewares/Authentication');

// 라우터
const indexRouter = require('./routes/index');
const reservationsRouter = require('./routes/reservations');
const participationRouter = require('./routes/participations');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(authenticate);
// app.use('/oauth', indexRouter);
app.use('/reservations', reservationsRouter);
app.use('/participations', participationRouter);
// error handler
app.use(Exception);

module.exports = app;
