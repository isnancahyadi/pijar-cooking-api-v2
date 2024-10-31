import '../../config/winston';
import express, {
  urlencoded,
  static as staticExpress,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';

const appMiddleware = express();

appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

appMiddleware.options('*', cors());
appMiddleware.use(express.json());
appMiddleware.use(urlencoded({ extended: false }));
appMiddleware.use(cookieParser());
appMiddleware.use(staticExpress(join(__dirname, 'public')));

// TODO: add the main routes

// catch 404 and forward to error handler
appMiddleware.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
appMiddleware.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  },
);

export default appMiddleware;
