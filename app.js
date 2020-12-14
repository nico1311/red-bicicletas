const createError = require('http-errors'),
  cookieParser = require('cookie-parser'),
  dotenv = require('dotenv'),
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  mongoose = require('mongoose');

dotenv.config();

const indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  bicicletasRouter = require('./routes/bicicletas'),
  bicicletasApiRouter = require('./routes/api/bicicletas'),
  usuariosApiRouter = require('./routes/api/usuarios');

var app = express();

mongoose.connect(process.env.MONGODB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

db.once('open', () => {
  console.log('[MongoDB] Connected!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletasApiRouter);
app.use('/api/usuarios', usuariosApiRouter);

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
