import express from 'express';
var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: '(Abdulazeez) Kudade Senior Lead Developer Assessment' });
});

export default indexRouter;
