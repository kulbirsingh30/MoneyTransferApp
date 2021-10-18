import express from 'express';
import loginController from '../controllers/login.controller';

const loginRouter = express.Router();

/* This route is for login*/ 
loginRouter.route('/in') 
.post(loginController.login);

loginRouter.route('/in/reset')
.get(loginController.emailReset);
/* This route if for login of admin*/
loginRouter.route('/in/admin')
.post(loginController.postAdmin);
// This route is used to change the password
loginRouter.route(`/in/:email`) 
.put(loginController.changePass);


export default loginRouter;
