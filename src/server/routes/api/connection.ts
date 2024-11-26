import { Router } from 'express';
import { connection } from '../../controller';

const route = Router();

route.route('/:storage_name/ping').post(connection.ping);

export default route;
