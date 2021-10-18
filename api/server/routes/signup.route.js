import express from 'express';
import signupController from './../controllers/signup.controller';

const router = express.Router();

/* GET users listing. */
router.route('/signups') 
.get(signupController.index)
.post(signupController.create);

router.route('/signups/:id')
    .get(signupController.get)
    .put(signupController.update)
    .delete(signupController.remove);

export default router;
