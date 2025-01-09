import { Router } from 'express';
const router = Router();
import resource from './resource';
import configure from './configure';
import connection from './connection';

router.use('/configure', configure);
router.use('/connection', connection);
router.use('/resources', resource);

export default router;
