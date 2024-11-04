import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { static as staticExpress, urlencoded } from 'express';
import { join } from 'path';
import '../../config/winston';

dotenv.config();
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

export default appMiddleware;
