import express from 'express';
import webappController from '../controllers/webapp.controller';

const webappRouter = express.Router();

/* GET users listing. */
webappRouter.route('/*') 
.get(webappController.resource)

export default webappRouter;
