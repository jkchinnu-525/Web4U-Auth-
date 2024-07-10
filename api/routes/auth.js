import express from "express";
import { google, signin, signup } from "../controllers/authctr.js";

const router = express.Router();

router.get('/signup', signup);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google',google);

export default router;