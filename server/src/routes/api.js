import express from 'express';
import multer from 'multer';
import { ChatController } from '../controllers/chatController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Text Chat
router.post('/chat', ChatController.handleTextChat);

// Speech to Text
router.post('/voice-to-text', upload.single('audio'), ChatController.handleVoiceToText);

// Text to Speech
router.post('/text-to-speech', ChatController.handleTextToSpeech);

// 3D Visualization
router.get('/visualization', ChatController.getVisualization);

export default router;
