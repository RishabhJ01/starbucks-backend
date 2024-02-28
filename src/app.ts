import express, {Request, Response, NextFunction} from 'express';
import createError from "http-errors";
import logger from 'morgan';
import cookieParser from "cookie-parser";
import { resolve } from 'path';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';

dotenv.config();
const port = 8081;
const host = "0.0.0.0";

import indexRouter from "./routes/index";
import healthcheckRouter from "./routes/healthcheck";
import apiRouter from "./routes/api/routes";

const app = express();

app.set('views', resolve('./views'));
app.set('view engine', 'ejs');
const MONGO_URI:string = process.env.MONGO_URI || ""
mongoose.connect(MONGO_URI).then(() => {
  console.log("database connected!");
}).catch((err: Error) => {
  throw err;
});

app.use(logger('dev'));
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', indexRouter);
app.use('/', healthcheckRouter);
app.use('/', apiRouter);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404));
})

app.use((err: Error, _req: Request, _res: Response) => {
  _res.locals.message = err.message;
  _res.locals.error = _req.app.get('env') === 'development' ? err : {};
  _res.status(500);
  _res.render('error');
})
app.listen(port, host, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});