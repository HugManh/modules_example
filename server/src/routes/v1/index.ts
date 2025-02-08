import { Router } from 'express';
const router = Router();
import auth from './auth';
import storage from './storage';
import resource from './resource';

router.use('/auth', auth);
router.use('/storages', storage);
router.use('/resources', resource);

export default router;
