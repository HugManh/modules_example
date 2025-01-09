import { Router } from 'express';
import { configure } from '../../controller';

const route = Router();


route
  .route('/:cloud_storage/:storage_name')
  .post(configure.create)
  .get(configure.read);
route
  .route('/:cloud_storage/:id')
  .put(configure.update)
  .delete(configure.delete);

export default route;
