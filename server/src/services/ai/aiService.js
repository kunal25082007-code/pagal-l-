import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const SARVAM_API_KEY = process.env.SARVAM_API_KEY;

export class AIService {
  static async getChatResponse(message, lang = 'en', history = []) {
    const languageNames = {
      en: 'English', hi: 'Hindi', mr: 'Marathi', kn: 'Kannada', 
      ta: 'Tamil', te: 'Telugu', bn: 'Bengali', gu: 'Gujarati'
    };
    
    const languageName = languageNames[lang] || 'English';

    const systemPrompt = `You are Sakhi, a warm and empathetic health companion for adolescent girls in India. 
    Respond in natural ${languageName}. Keep answers concise and sisterly. 
    Focus on menstrual health, nutrition, and hygiene. 
    For emergencies, advise consulting a doctor. 
    Do NOT include internal reasoning or thinking blocks.`;

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: message }
      ];

      const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SARVAM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sarvam-30b',
          messages,
          temperature: 0.5,
          max_completion_tokens: 500
        })
      });

      if (!response.ok) throw new Error(`Sarvam API error: ${response.status}`);
      const data = await response.json();
      let content = data.choices[0].message.content;
      return content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    } catch (error) {
      console.error('AIService Error:', error);
      throw error;
    }
  }
}
