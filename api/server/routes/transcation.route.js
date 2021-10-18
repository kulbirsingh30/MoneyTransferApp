import express from 'express';
import txnController from '../controllers/transcation.controller';

import jwtUtils from '../utils/jwt';
const txnRouter = express.Router();

/* This route is used to create new transaction */
txnRouter.route('/in') 
.post(jwtUtils.authenticateToken,txnController.createNewTransaction);
// This route is to get transaction by users
txnRouter.route('/in/getTxn')
.post(jwtUtils.authenticateToken,txnController.getTransactionsByUser);


export default txnRouter;
