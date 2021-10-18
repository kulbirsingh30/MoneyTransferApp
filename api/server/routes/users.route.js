import express from 'express';
import userController from './../controllers/users.controller';
import jwtUtils from '../utils/jwt';
const userRouter = express.Router();

/* GET users listing. */
userRouter.route('/') 
.get(userController.getAll)
.post(userController.saveUser);

    
userRouter.route('/approve')
.get(userController.getPendingUser)
.put(userController.approveUser); 

userRouter.route('/finduser')
.post(userController.findUserByEmail);

userRouter.route('/edituser')
.put(userController.updateUserByEmail);

userRouter.route('/*')
.delete(userController.deleteUser)
// userRouter.route('/:id')

export default userRouter;
