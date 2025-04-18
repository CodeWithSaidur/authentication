// user.route.js
//Import all controllers from controllers
import express from 'express';
import { registerUser, verifyUser } from '../controllers/user.controller.js';

export const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyUser);
