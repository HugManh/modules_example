import { Router } from 'express';
import { connection } from '../../controller';

const route = new Router();

route.route('/:storage_name/ping').get(connection.ping);

module.exports = route;
