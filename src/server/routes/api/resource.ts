import { Router } from 'express';
import {upload} from "../../middleware";
import {resource} from "../../controller";

const route =  Router();

route.route('/:cloud_storage').post(upload, resource.upload);
// route.route('/:bucketname/:objectpath(*)/:filename').get(storage.read);
// route.route('/:asset_id').delete(storage.delete);

export default  route;
