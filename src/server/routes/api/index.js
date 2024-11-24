import { Router } from 'express';
const router = new Router();
// import resource from './resource';
import configure from './configure';
import connection from './connection';

router.use('/configure', configure);
router.use('/connection', connection);
// router.use('/resource', resource);

export default router;
