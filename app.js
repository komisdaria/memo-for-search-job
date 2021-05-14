const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const dbConnect = require('./db/dbConnect');
const indexRouter = require('./routes/index');
const registrationRouter = require('./routes/registration/registration');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const editRouter = require('./routes/edit');
const calendarRouter = require('./routes/calendar');

const mongoUrl = process.env.DATABASE_STRING;

const app = express();

const PORT = process.env.PORT ?? 3003;

app.set('views', path.join(process.env.PWD, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // __dirname замена на process.env.PWD,
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const options = {
  store: MongoStore.create({ mongoUrl }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 100000 * 60 * 10,
  },
};

const sessionMiddleware = session(options);
app.use(sessionMiddleware);

// Добавляем юзера во все hbs
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

// app.use((req, res, next) => {
//     console.log(req.body);
//     next();
// });

// Add routers
app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/edit', editRouter);
app.use('/calendar', calendarRouter);

// Если HTTP-запрос дошёл до этой строчки,
// значит ни один из ранее встречаемых рутов не ответил на запрос.
//  Это значит, что искомого раздела просто нет на сайте.
//  Для таких ситуаций используется код ошибки 404.
//  Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use((err, req, res, next) => {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку.
  //  В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные,
  //  доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть.
  // В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
});

app.listen(PORT, () => {
  dbConnect();
  console.log('Server has been started on PORT ', PORT);
});

// идентификатор проекта
// 800846002693-klfba1bl1aagbdkep5qmocftrn06c0kb.apps.googleusercontent.com
// secret
// i-BqNC0UwTLjLiHNKbxEJDRP
