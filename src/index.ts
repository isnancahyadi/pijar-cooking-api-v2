import * as dotenv from 'dotenv';
import createError from 'http-errors';
import express, { json, urlencoded, static as staticExpress, Application, Request, Response, NextFunction } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

dotenv.config();
const app: Application = express();
const port: number = process.env.PORT != null ? parseInt(process.env.PORT) : 4000

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(staticExpress(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Listening app on http://localhost:${port}`)
})

export default app;
