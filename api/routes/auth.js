import express from "express";
import { signup } from "../controllers/authctr.js";

const router = express.Router();

router.get('/signup', signup);

export default router;