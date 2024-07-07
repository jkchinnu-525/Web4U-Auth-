import express from 'express';
import { test } from '../controllers/userctr.js';

const router = express.Router();
router.get('/', test);
router.post('/', test);
export default router;