import { Router } from 'express';
import { upload } from '../../middleware';
import { resource } from '../../controller';

const route = Router();

route.route('/').get(resource.read);
route.route('/:storage_id').post(upload, resource.upload);
route.route('/:resource_id').get(resource.readByID).delete(resource.delete);
// route.route('/:bucketname/:objectpath(*)/:filename').get(storage.read);
// route.route('/:asset_id').delete(storage.delete);

export default route;
