import express from 'express';
const router = express.Router();
import { authController, postController, devAIController } from '../controllers/index.js';

// Login Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

//Post Controller
router.post('/post', postController.savePost);
router.get('/post/:id', postController.getUserPost);

//DevAI Controller
router.post('/devai', devAIController.generateImage);


export default router;
