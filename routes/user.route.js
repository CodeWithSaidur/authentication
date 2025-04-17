//Import all controllers from controllers
import express from 'express';
import { registerUser } from '../controllers/user.controller.js';

export const router = express.Router();

router.get('/user', registerUser);
