import express, {Request, Response, NextFunction} from 'express';
import createError from "http-errors";
import logger from 'morgan';
import cookieParser from "cookie-parser";
import { resolve } from 'path';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const port = 8080;
const host = "0.0.0.0";

import indexRouter from "./routes/index";
import healthcheckRouter from "./routes/healthcheck";
import apiRouter from "./routes/api/routes";

const app = express();

app.set('views', resolve('./views'));
app.set('view engine', 'ejs');
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("database connected!");
}).catch((err: Error) => {
  throw err;
});

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', indexRouter);
app.use('/', healthcheckRouter);
app.use('/', apiRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(500);
  res.render('error');
})
app.listen(port, host, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});