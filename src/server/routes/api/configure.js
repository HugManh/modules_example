import { Router } from 'express';
import { configure } from '../../controller';

const route = new Router();

route.route('/:cloud_storage/:storage_name')
    .post(configure.save);

module.exports = route;
