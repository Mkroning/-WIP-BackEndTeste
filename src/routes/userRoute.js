import express from 'express';

import { createUser, singUp } from '../controllers/usersController';

const router = express.Router();

router.post('/auth/signup', createUser);
router.post('/auth/signin', singUp);

export default router;