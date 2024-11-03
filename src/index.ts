import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import mysql, { PoolOptions } from 'mysql2';

import appMiddleware from './middleware/App';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

dotenv.config();
const app: Application = express();
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 4000;

const dbPool: PoolOptions = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pijar_cooking',
};

const dbConnect = mysql.createPool(dbPool);

app.use(appMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', (req, res) => {
  dbConnect.execute('SELECT * FROM recipes', (err, rows) => {
    if (err) {
      res.json({
        message: 'connection failed!',
      });
    }
    res.json({
      message: 'connection success',
      data: rows,
    });
  });
});

app.listen(port, () => {
  console.log(`Listening app on http://localhost:${port}`);
});

export default app;
