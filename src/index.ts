import express, { Application } from 'express';

import appMiddleware from './middleware/App';
import MainRouter from './routes';

const app: Application = express();
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 4000;

app.use(appMiddleware);

app.use('/api', MainRouter);

app.listen(port, () => {
  console.log(`Listening app on http://localhost:${port}`);
});

export default app;
