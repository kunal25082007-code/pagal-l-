import dotenv from 'dotenv';
dotenv.config();

const SARVAM_API_KEY = process.env.SARVAM_API_KEY;
const SARVAM_API_URL = 'https://api.sarvam.ai/v1/chat/completions';

const languageMap = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  kn: 'Kannada',
  ta: 'Tamil',
  te: 'Telugu',
  bn: 'Bengali',
  gu: 'Gujarati'
};

const getChatbotResponse = async (message, lang = 'en') => {
  const languageName = languageMap[lang] || 'English';

  const systemPrompt = `You are Sakhi, a warm, empathetic, and knowledgeable health companion for adolescent girls in India.

IMPORTANT RULES:
1. ALWAYS respond in grammatically correct, natural ${languageName}. Your grammar and sentence structure must be perfect.
2. Use a friendly, elder-sisterly tone — like a caring older sister talking to a younger one.
3. Keep answers concise (3-5 sentences max) and easy to understand.
4. Focus on menstrual health, nutrition (especially anemia prevention), hygiene, and general wellness.
5. If a user mentions a serious medical condition or emergency, advise them to consult a doctor or a trusted adult immediately.
6. Do NOT provide medical prescriptions or dosages.
7. Always focus on preventive care, healthy habits, and awareness.
8. Do NOT include any internal reasoning, XML tags, or thinking blocks in your response.
9. Use simple, everyday language — avoid complex medical jargon.
10. Be encouraging and supportive. Never be judgmental.

You must respond ONLY in ${languageName}. Do not mix languages.`;

  try {
    const response = await fetch(SARVAM_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SARVAM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sarvam-30b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.5,
        max_completion_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Sarvam AI API Error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    // Strip <think>...</think> reasoning blocks from the response
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    return content;

  } catch (error) {
    console.error('Error fetching from Sarvam AI:', error);
    // Fallback response in case of API failure
    return getFallbackResponse(message, lang);
  }
};

// Fallback logic in case API is down
const getFallbackResponse = (message, lang) => {
  const fallbacks = {
    en: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment!",
    hi: "क्षमा करें, मुझे अभी जुड़ने में समस्या हो रही है। कृपया कुछ देर बाद पुनः प्रयास करें!",
    mr: "क्षमस्व, मला आता कनेक्ट करण्यात अडચણ येत आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा!",
    kn: "ಕ್ಷಮಿಸಿ, ಸಂಪರ್ಕಿಸಲು ನನಗೆ ತೊಂದರೆಯಾಗುತ್ತಿದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!",
    ta: "மன்னிக்கவும், இப்போது இணைப்பதில் எனக்கு சிக்கல் உள்ளது. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்!",
    te: "క్షమించండి, ప్రస్తుతం కనెక్ట్ చేయడంలో నాకు సమస్య ఉంది. దಯವಿಟ್ಟು కాసేపటి తర్వాత మళ్ళీ ప్రయత్నించండి!",
    bn: "দুঃখিত, সংযোগ করতে আমার সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পরে আবার চেষ্টা করুন!",
    gu: "ક્ષમા કરશો, મને અત્યારે કનેક્ટ કરવામાં સમસ્યા આવી રહી છે. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો!"
  };
  return fallbacks[lang] || fallbacks['en'];
};

export { getChatbotResponse };
