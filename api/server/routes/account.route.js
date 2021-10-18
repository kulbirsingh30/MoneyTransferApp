import express from 'express';
import accountController from '../controllers/account.controller';
import jwtUtils from '../utils/jwt';

const accountRouter = express.Router();

/* GET users listing. */
accountRouter.route('/') 
.get(jwtUtils.authenticateToken, accountController.get);

export default accountRouter;
