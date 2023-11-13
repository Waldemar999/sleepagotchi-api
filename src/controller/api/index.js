import { Router } from 'express';
import DatabaseRepositiry from '../../repository/index.js';
import user from './user.js';

const router = Router();

router.use('/user', user);

export default router;
