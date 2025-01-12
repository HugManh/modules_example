import { Router } from 'express';
import { auth } from '../../controller';

const route = Router();

route.route('/register').get(auth.register);
// route.route('/login').get(auth.login);
// route.route('/forgot-password').get(auth.forgotPassword);

export default route;
