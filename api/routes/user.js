import express from 'express';
import { test, updateUser, deleteUser } from '../controllers/userctr.js';
import { verifytoken } from '../utils/verifyuser.js';

const router = express.Router();
router.get('/', test);
router.post('/update/:id', verifytoken, updateUser);
router.delete('/delete/:id', verifytoken, deleteUser);
export default router;