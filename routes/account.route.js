import express from 'express';
import { signin, updateAccount } from '../controllers/account.controller.js';
import auth from '../middlewares/auth.js';
const accountRouter = express.Router();

accountRouter.put('/account', auth, updateAccount);

accountRouter.post('/signin', signin);

export default accountRouter;