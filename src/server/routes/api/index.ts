import { Router } from 'express';
const router = Router();
import resource from './resource';
import storage from './storage';

router.use('/storages', storage);
router.use('/resources', resource);

export default router;
