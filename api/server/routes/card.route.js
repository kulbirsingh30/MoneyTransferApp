import express from 'express';
import cardController from '../controllers/card.controller';
import jwtUtils from '../utils/jwt';
const cardRouter = express.Router();

// This is used to add new card to the route
cardRouter.route('/add')
    .post(jwtUtils.authenticateToken,cardController.newCard);

// This is used to get card of the user
cardRouter.route('/getUserCard')
    .post(jwtUtils.authenticateToken,cardController.getCardByUser);

cardRouter.route('/deleteCard')
    .delete(jwtUtils.authenticateToken,cardController.deleteUserCard);

export default cardRouter;