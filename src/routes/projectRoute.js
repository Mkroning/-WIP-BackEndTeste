import express from 'express';
import {
  Index, Show, Store, Update, Delete
} from '../controllers/projectController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

router.get('/project', verifyAuth, Index);
router.get('/project/:projectId', verifyAuth, Show);
router.post('/project', verifyAuth, Store);
router.put('/project/:projectId', verifyAuth, Update);
router.delete('/project/:projectId', verifyAuth, Delete);

export default router;