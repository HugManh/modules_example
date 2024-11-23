import { Router } from 'express';
const router = new Router();
import resource from './resource'

router.use('/resource', resource);

export default router
