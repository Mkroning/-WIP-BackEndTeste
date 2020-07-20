import express from 'express';
import { Index, Store, Delete, Update } from '../controllers/naverController';

import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

router.get('/naver', verifyAuth, Index);
router.post('/naver', verifyAuth, Store);
router.put('/naver/:naverID', verifyAuth, Update);
router.delete('/naver/:naverID', verifyAuth, Delete);

export default router;