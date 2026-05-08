import fetch from 'node-fetch';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';

dotenv.config();

const SARVAM_API_KEY = process.env.SARVAM_API_KEY;

export class VoiceService {
  static async speechToText(audioPath, languageCode = 'hi-IN') {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(audioPath));
    formData.append('model', 'saaras:v1');
    formData.append('language_code', languageCode);

    try {
      const response = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SARVAM_API_KEY}`,
          ...formData.getHeaders()
        },
        body: formData
      });

      if (!response.ok) throw new Error(`STT API error: ${response.status}`);
      const data = await response.json();
      return data.transcript;
    } catch (error) {
      console.error('STT Service Error:', error);
      throw error;
    }
  }

  static async textToSpeech(text, targetLanguageCode = 'hi-IN', speaker = 'meera') {
    try {
      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SARVAM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: [text],
          target_language_code: targetLanguageCode,
          speaker: speaker,
          pitch: 0,
          pace: 1.1,
          loudness: 1.5,
          speech_sample_rate: 22050,
          enable_preprocessing: true,
          model: 'bulbul:v1'
        })
      });

      if (!response.ok) throw new Error(`TTS API error: ${response.status}`);
      const data = await response.json();
      // Sarvam usually returns base64 in audios field
      return data.audios[0]; 
    } catch (error) {
      console.error('TTS Service Error:', error);
      throw error;
    }
  }
}
