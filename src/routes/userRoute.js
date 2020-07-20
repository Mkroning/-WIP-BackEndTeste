import express from 'express';

import { createUser, singUp } from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', createUser);
router.post('/auth/signin', singUp);

export default router;