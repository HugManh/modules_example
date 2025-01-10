import { Router } from 'express';
import { storageCtrl } from '../../controller';

const route = Router();

route.route('/').post(storageCtrl.create).get(storageCtrl.read);
route
  .route('/:storage_id')
  .get(storageCtrl.readById)
  .put(storageCtrl.update)
  .delete(storageCtrl.delete);
route.route('/:cloud_storage/ping').post(storageCtrl.ping);

export default route;
