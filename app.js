import express from 'express';
import path from'path';
import cookieParser from'cookie-parser';
import logger from'morgan';
import cors from'cors';

import dbCon from './db/connection.js'
import accountRouter from './routes/account.route.js';
import indexRouter from'./routes/index.js';
import orderItemsRouter from'./routes/order_items.route.js';
import { fileURLToPath } from 'url';

var app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dbCon(app);
app.use('/public', express.static('public'));
app.use('/', indexRouter);
app.use('/order_items', orderItemsRouter);
app.use('/', accountRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;