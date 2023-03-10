import express from 'express';
import { updateAccount } from '../controllers/account.controller.js';
import auth from '../middlewares/auth.js';
const accountRouter = express.Router();

accountRouter.put('/account', auth, updateAccount);

export default accountRouter;