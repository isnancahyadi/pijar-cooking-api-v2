import * as dotenv from 'dotenv';
import express, { Application } from 'express';

import appMiddleware from './middleware/App';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

dotenv.config();
const app: Application = express();
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 4000;

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(appMiddleware);

app.listen(port, () => {
  console.log(`Listening app on http://localhost:${port}`);
});

export default app;
