import { Router } from 'express';
import { auth } from '../../controller';

const route = Router();

route.route('/register').post(auth.register);
route.route('/login').post(auth.login);
// route.route('/forgot-password').get(auth.forgotPassword);

export default route;
