const route = require('express').Router();
import { upload } from '../../middleware';
import { storage } from '../../controller';

route.route('/resources').post(upload, storage.upload).get(storage.list);
route.route('/:bucketname/:objectpath(*)/:filename').get(storage.read);
route.route('/:asset_id').delete(storage.delete);

module.exports = route;
