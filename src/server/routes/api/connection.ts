import { Router } from 'express';
import { connection } from '../../controller';

const route = Router();

route.route('/:cloud_storage/ping').post(connection.ping);

export default route;
