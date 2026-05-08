import { AIService } from '../services/ai/aiService.js';
import { VoiceService } from '../services/voice/voiceService.js';

export const setupWebSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('user_message', async (data) => {
      const { message, lang, userId } = data;
      
      try {
        // 1. Get Text Response
        const aiResponse = await AIService.getChatResponse(message, lang);
        socket.emit('bot_response', { text: aiResponse });

        // 2. Generate and Stream Audio
        const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', kn: 'kn-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };
        const audioBase64 = await VoiceService.textToSpeech(aiResponse, langMap[lang] || 'hi-IN');
        socket.emit('audio_stream', { audio: audioBase64 });

      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
