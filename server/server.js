import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getChatbotResponse } from './chatbot.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sehat Saheli Backend is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, lang } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await getChatbotResponse(message, lang);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
