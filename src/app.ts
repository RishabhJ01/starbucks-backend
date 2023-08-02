import express, {Request, Response, NextFunction} from 'express';
import path from "path";
import createError from "http-errors";
import logger from 'morgan';
import cookieParser from "cookie-parser";
import { resolve } from 'path';
const port = 3000;
const host = "0.0.0.0";


import indexRouter from "./routes/index";

const app = express();

app.set('views', resolve('./views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', indexRouter);

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