const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customer');
const usersRouter = require('./routes/users');
const sellerRouter = require('./routes/sellers');
const authRouter = require('./routes/auth');
const itemRouter = require('./routes/item');
const orderRoute = require('./routes/order');
const categoryRouter = require('./routes/category');
const swaggerDoc = require ('./api-docs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use('/', indexRouter);
app.use('/customers', customerRouter);
app.use('/users', usersRouter);
app.use('/sellers', sellerRouter);
app.use('/auth', authRouter);
app.use('/items', itemRouter);
app.use('/orders', orderRoute);
app.use('/categories', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;