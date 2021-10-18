import webappRoute from './webapp.route';
import usersRoute from './users.route';
import loginRoute from './login.route';
import accountRoute from './account.route';
import txnRouter from './transcation.route';
import cardRouter from './card.route';

//Using the middleware app.use for routing the imported router from todo.routes.js
export default(app) =>{
  app.use('/rest/v1/users', usersRoute);
  app.use('/rest/v1/log', loginRoute);
  app.use('/rest/v1/account', accountRoute);
  app.use('/rest/v1/txn',txnRouter);
  app.use('/rest/v1/card',cardRouter);
  app.use('/', webappRoute);
}
