require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

var app = express();

app.use(cors())
mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DataBase Connected...");
    })
    .catch((err) => {
      console.log(err);
    });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// const userssRouter = require('./routes/users');
// app.use('/users',userssRouter);

const userRouter = require('./routes/user');
app.use('/user',userRouter);

const categoryRouter = require('./routes/category');
app.use('/category',categoryRouter);

const coursrRoutet = require('./routes/course')
app.use('/courses',coursrRoutet)

const courseContentRouter = require('./routes/courseContent')
app.use('/course',courseContentRouter);

const enrollmentRouter = require('./routes/enrollment')
app.use('/enroll',enrollmentRouter);


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
  res.setHeader('content-type','application/json')
  res.send({
      status:err.status,
      error:err.message,
      stack:err.stack
  });
});

module.exports = app;
