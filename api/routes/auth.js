import express from "express";
import { signin, signup } from "../controllers/authctr.js";

const router = express.Router();

router.get('/signup', signup);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;