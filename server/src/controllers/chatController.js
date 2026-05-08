import { AIService } from '../services/ai/aiService.js';
import { VoiceService } from '../services/voice/voiceService.js';
import { supabase } from '../services/supabase.js';

export class ChatController {
  static async handleTextChat(req, res) {
    const { message, lang, userId } = req.body;

    try {
      // 1. Get Response from AI
      const aiResponse = await AIService.getChatResponse(message, lang);

      // 2. Generate Audio (Read-Aloud)
      const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', kn: 'kn-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };
      const audioBase64 = await VoiceService.textToSpeech(aiResponse, langMap[lang] || 'hi-IN');

      // 3. Store in History (if userId exists)
      if (userId) {
        await supabase.from('chat_history').insert([
          { user_id: userId, message, response: aiResponse, language: lang }
        ]);
      }

      res.json({
        response: aiResponse,
        audio: audioBase64,
        language: lang
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async handleVoiceToText(req, res) {
    if (!req.file) return res.status(400).json({ error: 'No audio file uploaded' });
    const { lang } = req.body;
    const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', kn: 'kn-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };

    try {
      const transcript = await VoiceService.speechToText(req.file.path, langMap[lang] || 'hi-IN');
      res.json({ transcript });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async handleTextToSpeech(req, res) {
    const { text, lang } = req.body;
    const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', kn: 'kn-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };

    try {
      const audioBase64 = await VoiceService.textToSpeech(text, langMap[lang] || 'hi-IN');
      res.json({ audio: audioBase64 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getVisualization(req, res) {
    const { topic } = req.query;
    
    const models = {
      'menstrual cycle': { model: 'cycle.glb', description: 'Visualization of the 28-day menstrual cycle phases' },
      'reproductive system': { model: 'reproductive.glb', description: '3D model of the female reproductive system' },
      'health education': { model: 'anatomy.glb', description: 'Interactive health education model' }
    };

    const result = models[topic.toLowerCase()] || { model: 'default.glb', description: 'General health visualization' };
    res.json(result);
  }
}
