import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const translations = {
  en: {
    appName: "Sehat Saheli", tagline: "Your preventive healthcare companion",
    language: "Language", chatbotTitle: "Sakhi Chatbot", chatbotSub: "Ask health questions privately",
    statusOnline: "Online", statusThinking: "Thinking...", placeholder: "Type here...", send: "Send",
    menuTitle: "Menu", 
    welcome: "Hello! I am Sakhi, your health companion. How can I help you?",
    adviceTitle: "Quick Advice", adviceSub: "Daily wellness tips",
    learningTitle: "Learning", learningSub: "Understand your body",
    quizTitle: "Quiz", quizSub: "Test your knowledge",
    trackerTitle: "Tracker", trackerSub: "Track your cycle",
    helpTitle: "Help", helpSub: "Emergency Helplines",
    sections: { home: "Home", tracker: "Tracker", advice: "Advice", learning: "Learning", quizzes: "Quizzes", help: "Help" },
    adviceContent: [
      { title: "Managing Cramps", text: "Apply warm compress to lower abdomen.", icon: "✨" },
      { title: "Hygiene", text: "Change pad every 4-6 hours.", icon: "🧼" },
      { title: "Iron Food", text: "Eat spinach and beetroot.", icon: "🍎" }
    ],
    learningContent: {
      cycleTitle: "Menstrual Cycle", cycleText: "A natural monthly process (21-35 days).",
      productTitle: "Sanitary Products", productText: "Pads and cups are healthy options."
    },
    quizContent: [
      { q: "How often change pad?", options: ["Once", "4-6 hrs", "Full"], answer: 1 },
      { q: "Iron rich food?", options: ["Chips", "Spinach", "Bread"], answer: 1 }
    ]
  },
  hi: {
    appName: "सेहत सहेली", tagline: "आपकी स्वास्थ्य देखभाल साथी",
    language: "भाषा", chatbotTitle: "सखी चैटबॉट", chatbotSub: "निजी तौर पर प्रश्न पूछें",
    statusOnline: "ऑनलाइन", statusThinking: "सोच रही हूँ...", placeholder: "यहाँ लिखें...", send: "भेजें",
    menuTitle: "मेनू", 
    welcome: "नमस्ते! मैं सखी हूँ। मैं आपकी कैसे मदद कर सकती हूँ?",
    adviceTitle: "त्वरित सलाह", adviceSub: "दैनिक कल्याण सुझाव",
    learningTitle: "सीखना", learningSub: "अपने शरीर को समझें",
    quizTitle: "प्रश्नोत्तरी", quizSub: "ज्ञान परखें",
    trackerTitle: "ट्रैकर", trackerSub: "चक्र ट्रैक करें",
    helpTitle: "सहायता", helpSub: "आपातकालीन हेल्पलाइन",
    sections: { home: "होम", tracker: "ट्रैकर", advice: "सलाह", learning: "सीखना", quizzes: "प्रश्नोत्तरी", help: "सहायता" },
    adviceContent: [
      { title: "दर्द प्रबंधन", text: "पेट के निचले हिस्से पर गर्म सेक लगाएं।", icon: "✨" },
      { title: "स्वच्छता", text: "हर 4-6 घंटे में पैड बदलें।", icon: "🧼" },
      { title: "आयरन भोजन", text: "पालक और चुकंदर खाएं।", icon: "🍎" }
    ],
    learningContent: {
      cycleTitle: "मासिक धर्म चक्र", cycleText: "एक प्राकृतिक मासिक प्रक्रिया (21-35 दिन)।",
      productTitle: "उत्पाद", productText: "पैड और कप सुरक्षित विकल्प हैं।"
    },
    quizContent: [
      { q: "पैड कब बदलें?", options: ["एक बार", "4-6 घंटे", "भरने पर"], answer: 1 },
      { q: "आयरन भोजन?", options: ["चिप्स", "पालक", "ब्रेड"], answer: 1 }
    ]
  },
  mr: {
    appName: "सेहत सहेली", tagline: "तुमची आरोग्य सोबती",
    language: "भाषा", chatbotTitle: "सखी चॅटबॉट", chatbotSub: "प्रश्न विचारा",
    statusOnline: "ऑनलाइन", statusThinking: "विचार करत आहे...", placeholder: "येथे लिहा...", send: "पाठवा",
    menuTitle: "मेनू", 
    welcome: "नमस्कार! मी सखी. मी तुम्हाला कशी मदत करू शकते?",
    adviceTitle: "त्वरित सल्ला", adviceSub: "कल्याण टिप्स",
    learningTitle: "शिक्षण", learningSub: "शरीर समजा",
    quizTitle: "क्विझ", quizSub: "चाचणी",
    trackerTitle: "ट्रॅकर", trackerSub: "मागोवा घ्या",
    helpTitle: "मदत", helpSub: "हेल्पलाइन",
    sections: { home: "होम", tracker: "ट्रॅकर", advice: "सल्ला", learning: "शिक्षण", quizzes: "क्विझ", help: "मदत" },
    adviceContent: [
      { title: "वेदना कमी करा", text: "पोटावर गरम शेक द्या.", icon: "✨" },
      { title: "स्वच्छता", text: "दर ४-६ तासांनी पॅड बदला.", icon: "🧼" },
      { title: "लोह आहार", text: "पालक आणि बीट खा.", icon: "🍎" }
    ],
    learningContent: {
      cycleTitle: "मासिक पाळी", cycleText: "एक नैसर्गिक प्रक्रिया (२१-३५ दिवस).",
      productTitle: "उत्पादने", productText: "पॅड आणि कप चांगले पर्याय आहेत."
    },
    quizContent: [
      { q: "पॅड कधी बदलावा?", options: ["एकदा", "४-६ तास", "भरल्यावर"], answer: 1 }
    ]
  },
  kn: {
    appName: "ಸೇಹತ್ ಸಖಿ", tagline: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಂಗಾತಿ",
    language: "ಭಾಷೆ", chatbotTitle: "ಸಖಿ ಚಾಟ್‌ಬಾಟ್", chatbotSub: "ಪ್ರಶ್ನೆ ಕೇಳಿ",
    statusOnline: "ಆನ್‌ಲೈನ್", statusThinking: "ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...", placeholder: "ಇಲ್ಲಿ ಬರೆಯಿರಿ...", send: "ಕಳುಹಿಸಿ",
    menuTitle: "ಮೆನು", 
    welcome: "ನಮಸ್ಕಾರ! ನಾನು ಸಖಿ. ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    adviceTitle: "ತ್ವರಿತ ಸಲಹೆ", adviceSub: "ಕ್ಷೇಮ ಸಲಹೆಗಳು",
    learningTitle: "ಕಲಿಕೆ", learningSub: "ದೇಹವನ್ನು ತಿಳಿಯಿರಿ",
    quizTitle: "ರಸಪ್ರಶ್ನೆ", quizSub: "ಜ್ಞಾನ ಪರೀಕ್ಷೆ",
    trackerTitle: "ಟ್ರ್ಯಾಕರ್", trackerSub: "ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    helpTitle: "ಸಹಾಯ", helpSub: "ಸಹಾಯವಾಣಿಗಳು",
    sections: { home: "ಹೋಮ್", tracker: "ಟ್ರ್ಯಾಕರ್", advice: "ಸಲಹೆ", learning: "ಕಲಿಕೆ", quizzes: "ರಸಪ್ರಶ್ನೆ", help: "ಸಹಾಯ" },
    adviceContent: [
      { title: "ನೋವು ನಿರ್ವಹಣೆ", text: "ಬಿಸಿ ಶಾಖ ನೀಡಿ.", icon: "✨" },
      { title: "ನೈರ್ಮಲ್ಯ", text: "ಪ್ರತಿ 4-6 ಗಂಟೆಗೊಮ್ಮೆ ಪ್ಯಾಡ್ ಬದಲಿಸಿ.", icon: "🧼" },
      { title: "ಕಬ್ಬಿಣದ ಆಹಾರ", text: "ಪಾಲಕ್ ಸೇವಿಸಿ.", icon: "🍎" }
    ],
    learningContent: {
      cycleTitle: "ಋತುಚಕ್ರ", cycleText: "ನೈಸರ್ಗಿಕ ಪ್ರಕ್ರಿಯೆ (21-35 ದಿನಗಳು).",
      productTitle: "ಉತ್ಪನ್ನಗಳು", productText: "ಪ್ಯಾಡ್‌ಗಳು ಉತ್ತಮ ಆಯ್ಕೆ."
    },
    quizContent: [
      { q: "ಪ್ಯಾಡ್ ಯಾವಾಗ ಬದಲಿಸಬೇಕು?", options: ["ಒಮ್ಮೆ", "4-6 ಗಂಟೆ", "ತುಂಬಿದಾಗ"], answer: 1 }
    ]
  },
  ta: {
    appName: "சேஹத் சகி", tagline: "உங்கள் சுகாதார துணை",
    language: "மொழி", chatbotTitle: "சகி சாட்பாட்", chatbotSub: "கேள்வி கேளுங்கள்",
    statusOnline: "ஆன்லைன்", statusThinking: "யோசிக்கிறேன்...", placeholder: "தட்டச்சு செய்யவும்...", send: "அனுப்பு",
    menuTitle: "பட்டியல்", 
    welcome: "வணக்கம்! நான் சகி. உங்களுக்கு எப்படி உதவ முடியும்?",
    adviceTitle: "ஆலோசனை", adviceSub: "நலக் குறிப்புகள்",
    learningTitle: "கற்றல்", learningSub: "உடலைப் புரிந்து கொள்ளுங்கள்",
    quizTitle: "வினாடி வினா", quizSub: "அறிவுத் தேர்வு",
    trackerTitle: "டிராக்கர்", trackerSub: "கண்காணிக்கவும்",
    helpTitle: "உதவி", helpSub: "உதவி எண்கள்",
    sections: { home: "முகப்பு", tracker: "டிராக்கர்", advice: "ஆலோசனை", learning: "கற்றல்", quizzes: "வினாடி வினா", help: "உதவி" },
    adviceContent: [
      { title: "வலி மேலாண்மை", text: "வெந்நீர் ஒத்தடம் கொடுக்கவும்.", icon: "✨" },
      { title: "சுகாதாரம்", text: "4-6 மணிநேரத்திற்கு ஒருமுறை மாற்றவும்.", icon: "🧼" },
      { title: "இரும்புச்சத்து", text: "கீரை சாப்பிடவும்.", icon: "🍎" }
    ],
    learningContent: {
      cycleTitle: "மாதவிடாய் சுழற்சி", cycleText: "இயற்கையான செயல்முறை (21-35 நாட்கள்).",
      productTitle: "தயாரிப்புகள்", productText: "பேட்கள் சிறந்த வழி."
    },
    quizContent: [
      { q: "எப்போது மாற்ற வேண்டும்?", options: ["ஒருமுறை", "4-6 மணி", "நிறைந்த"], answer: 1 }
    ]
  },
  te: {
    appName: "సేహత్ సఖి", tagline: "మీ ఆరోగ్య సహచరుడు",
    language: "భాష", chatbotTitle: "సఖి చాట్‌బాట్", chatbotSub: "ప్రశ్న అడగండి",
    statusOnline: "ఆన్ లైన్", statusThinking: "ఆలోచిస్తున్నాను...", placeholder: "టైప్ చేయండి...", send: "పంపండి",
    menuTitle: "మెనూ", 
    welcome: "నమస్కారం! నేను సఖిని. మీకు ఎలా సహాయపడగలను?",
    adviceTitle: "సలహా", adviceSub: "చిట్కాలు",
    learningTitle: "అభ్యాసం", learningSub: "శరీరాన్ని తెలుసుకోండి",
    quizTitle: "క్విజ్", quizSub: "జ్ఞాన పరీక్ష",
    trackerTitle: "ట్రాకర్", trackerSub: "ట్రాక్ చేయండి",
    helpTitle: "సహాయం", helpSub: "సహాయం కోసం",
    sections: { home: "హోమ్", tracker: "ట్రాకర్", advice: "సలహా", learning: "అభ్యాసం", quizzes: "క్విజ్", help: "సహాయం" },
    adviceContent: [
      { title: "నొప్పి నివారణ", text: "వేడి కాపడం పెట్టండి.", icon: "✨" },
      { title: "శుభ్రత", text: "ప్రతి 4-6 గంటలకు మార్చండి.", icon: "🧼" },
      { title: "ఐరన్ ఆహారం", text: "పాలకూర తినండి.", icon: "🍎" }
    ],
    learningContent: {
      cycleTitle: "ఋతు చక్రం", cycleText: "సహజ ప్రక్రియ (21-35 రోజులు).",
      productTitle: "ఉత్పత్తులు", productText: "ప్యాడ్‌లు మంచి ఎంపిక."
    },
    quizContent: [
      { q: "ఎప్పుడు మార్చాలి?", options: ["ఒకసారి", "4-6 గం", "నిండిన"], answer: 1 }
    ]
  },
  bn: {
    appName: "সেহত সখী", tagline: "আপনার স্বাস্থ্য সঙ্গী",
    language: "ভাষা", chatbotTitle: "সখী চ্যাটবট", chatbotSub: "প্রশ্ন জিজ্ঞাসা করুন",
    statusOnline: "অনলাইন", statusThinking: "ভাবছি...", placeholder: "টাইপ করুন...", send: "পাঠান",
    menuTitle: "মেনু", 
    welcome: "হ্যালো! আমি সখী। আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    adviceTitle: "পরামর্শ", adviceSub: "সুস্থ থাকার টিপস",
    learningTitle: "শিক্ষা", learningSub: "শরীর বুঝুন",
    quizTitle: "কুইজ", quizSub: "জ্ঞান পরীক্ষা",
    trackerTitle: "ট্র্যাকার", trackerSub: "ট্র্যাক করুন",
    helpTitle: "সাহায্য", helpSub: "হেল্পলাইন",
    sections: { home: "হোম", tracker: "ট্র্যাকার", advice: "পরামর্শ", learning: "শিক্ষা", quizzes: "কুইজ", help: "সাহায্য" },
    adviceContent: [
      { title: "ব্যথা উপশম", text: "গরম সেঁক দিন।", icon: "✨" },
      { title: "পরিচ্ছন্নতা", text: "প্রতি ৪-৬ ঘণ্টায় প্যাড পাল্টান।", icon: "🧼" },
      { title: "আয়রন খাবার", text: "পালং শাক খান।", icon: "🍎" }
    ],
    learningContent: {
      cycleTitle: "মাসিক চক্র", cycleText: "প্রাকৃতিক মাসিক প্রক্রিয়া (২১-৩৫ দিন)।",
      productTitle: "পণ্য", productText: "প্যাড একটি ভালো বিকল্প।"
    },
    quizContent: [
      { q: "কখন প্যাড পাল্টাবেন?", options: ["একবার", "৪-৬ ঘণ্টা", "ভর্তি"], answer: 1 }
    ]
  },
  gu: {
    appName: "સેહત સખી", tagline: "તમારા સ્વાસ્થ્ય સાથી",
    language: "ભાષા", chatbotTitle: "સખી ચેટબોટ", chatbotSub: "પ્રશ્ન પૂછો",
    statusOnline: "ઓનલાઇન", statusThinking: "વિચારી રહી છું...", placeholder: "ટાઇપ કરો...", send: "મોકલો",
    menuTitle: "મેનુ", 
    welcome: "નમસ્તે! હું સખી છું. હું તમને કેવી રીતે મદદ કરી શકું?",
    adviceTitle: "સલાહ", adviceSub: "ટિપ્સ",
    learningTitle: "શિક્ષણ", learningSub: "શરીર સમજો",
    quizTitle: "ક્વિઝ", quizSub: "જ્ઞાન કસોટી",
    trackerTitle: "ટ્રેકર", trackerSub: "ટ્રેક કરો",
    helpTitle: "સહાય", helpSub: "હેલ્પલાઇન",
    sections: { home: "હોમ", tracker: "ટ્રેકર", advice: "સલાહ", learning: "શિક્ષણ", quizzes: "ક્વિઝ", help: "સહાય" },
    adviceContent: [
      { title: "દુખાવો ઘટાડો", text: "ગરમ શેક કરો.", icon: "✨" },
      { title: "સ્વચ્છતા", text: "દર 4-6 કલાકે પેડ બદલો.", icon: "🧼" },
      { title: "આયર્ન ખોરાક", text: "પાલક ખાઓ.", icon: "🍎" }
    ],
    learningContent: {
      cycleTitle: "માસિક ચક્ર", cycleText: "કુદરતી પ્રક્રિયા (21-35 દિવસ).",
      productTitle: "ઉત્પાદનો", productText: "પેડ સારો વિકલ્પ છે."
    },
    quizContent: [
      { q: "પેડ ક્યારે બદલવું?", options: ["એકવાર", "4-6 કલાક", "ભરાય"], answer: 1 }
    ]
  }
};

function App() {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const t = translations[language] || translations['en'];

  const [messages, setMessages] = useState([{ text: t.welcome, sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [lastDate, setLastDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [prediction, setPrediction] = useState(null);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', kn: 'kn-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };
    const langNames = { en: 'English', hi: 'Hindi', mr: 'Marathi', kn: 'Kannada', ta: 'Tamil', te: 'Telugu', bn: 'Bengali', gu: 'Gujarati' };
    const targetLang = langMap[language] || 'en-IN';
    const targetName = langNames[language] || 'English';
    utterance.lang = targetLang;
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find(v => v.lang.replace('_', '-').startsWith(targetLang));
    if (!voice) voice = voices.find(v => v.name.toLowerCase().includes(targetName.toLowerCase()));
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported.");
    const recognition = new SpeechRecognition();
    const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', kn: 'kn-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };
    recognition.lang = langMap[language] || 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => { 
      const text = event.results[0][0].transcript;
      setInput(text); handleSendMessage(text); 
    };
    recognition.start();
  };

  useEffect(() => {
    if (window.speechSynthesis) window.speechSynthesis.getVoices();
  }, []);

  const scrollToBottom = () => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { if (currentSection === 'home') scrollToBottom(); }, [messages, currentSection]);
  useEffect(() => { 
    setMessages([{ text: t.welcome, sender: 'bot' }]);
    speak(t.welcome);
  }, [language]);

  const handleSendMessage = async (textToSend = input) => {
    const message = textToSend.trim();
    if (!message) return;
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, lang: language }),
      });
      const data = await response.json();
      const botRes = data.response || "Error...";
      setMessages(prev => [...prev, { text: botRes, sender: 'bot' }]);
      speak(botRes);
    } catch (e) { setMessages(prev => [...prev, { text: "Offline...", sender: 'bot' }]); } finally { setIsLoading(false); }
  };

  const calculateTracker = () => {
    if (!lastDate) return;
    const date = new Date(lastDate);
    date.setDate(date.getDate() + parseInt(cycleLength));
    setPrediction(date.toDateString());
    speak(t.trackerTitle + ": " + date.toDateString());
  };

  const renderHome = () => (
    <div className="glass-card rounded-[40px] shadow-2xl flex flex-col min-h-[600px] animate-slide-in">
      <div className="p-8 pb-4 flex items-center justify-between border-b border-pink-50">
        <div><h2 className="text-3xl font-black text-[#f06292]">{t.chatbotTitle}</h2><p className="text-gray-400 font-medium">{t.chatbotSub}</p></div>
        <div className="flex items-center gap-2 bg-pink-50 px-5 py-2 rounded-full"><span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse"></span><span className="text-[#f06292] font-bold text-sm uppercase">{isLoading ? t.statusThinking : t.statusOnline}</span></div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-6 max-h-[500px]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-[80%] p-5 rounded-3xl group ${msg.sender === 'user' ? 'bg-[#f06292] text-white rounded-tr-sm shadow-md' : 'bg-[#fce4ec] text-gray-700 rounded-tl-sm'}`}>
              <p className="text-lg font-medium leading-relaxed">{msg.text}</p>
              {msg.sender === 'bot' && <button onClick={() => speak(msg.text)} className="absolute -right-10 top-1/2 -translate-y-1/2 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zM5 8a1 1 0 011 1v2a1 1 0 11-2 0V9a1 1 0 011-1zM17 8a1 1 0 011 1v2a1 1 0 11-2 0V9a1 1 0 011-1z"/></svg></button>}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-8 pt-4">
        <div className="relative flex gap-4">
          <div className="flex-1 relative">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={t.placeholder} className="w-full bg-white border-2 border-transparent focus:border-pink-200 rounded-3xl px-8 py-5 text-lg font-medium outline-none shadow-inner" />
            <button onClick={startListening} className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl ${isListening ? 'bg-pink-500 text-white animate-bounce' : 'text-pink-400'}`}><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg></button>
          </div>
          <button onClick={() => handleSendMessage()} className="bg-[#f06292] text-white px-10 rounded-3xl text-xl font-bold shadow-lg hover:bg-pink-600 active:scale-95 transition-all">{isLoading ? '...' : t.send}</button>
        </div>
      </div>
    </div>
  );

  const renderTracker = () => (
    <div className="glass-card p-10 rounded-[50px] shadow-2xl animate-slide-in max-w-2xl mx-auto">
      <h2 className="text-4xl font-black text-[#f06292] mb-6">{t.trackerTitle}</h2>
      <div className="space-y-8">
        <div><label className="block text-sm font-black text-gray-400 uppercase mb-4">Last Period Date</label><input type="date" value={lastDate} onChange={(e) => setLastDate(e.target.value)} className="w-full bg-white rounded-3xl p-6 text-xl outline-none border-2 focus:border-pink-200" /></div>
        <button onClick={calculateTracker} className="w-full bg-[#f06292] text-white py-6 rounded-3xl text-2xl font-black shadow-xl">Predict Next Cycle</button>
        {prediction && <div className="bg-pink-50 p-8 rounded-[40px] text-center"><p className="text-[#f06292] font-bold uppercase mb-2">Predicted Date</p><p className="text-4xl font-black text-[#880e4f]">{prediction}</p></div>}
      </div>
    </div>
  );

  const renderAdvice = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in">
      {t.adviceContent.map((item, idx) => (
        <div key={idx} className="glass-card p-8 rounded-[40px] glass-card-hover transition-all">
          <div className="text-4xl mb-6">{item.icon}</div>
          <h3 className="text-xl font-bold text-[#f06292] mb-3">{item.title}</h3><p className="text-gray-600 font-medium">{item.text}</p>
        </div>
      ))}
    </div>
  );

  const renderLearning = () => (
    <div className="space-y-12 animate-slide-in">
      <div className="glass-card p-10 rounded-[50px] flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 text-center md:text-left"><h3 className="text-4xl font-black text-[#f06292] mb-6">{t.learningContent.cycleTitle}</h3><p className="text-xl text-gray-600 font-medium">{t.learningContent.cycleText}</p></div>
        <div className="flex-1 bg-pink-50 p-10 rounded-[40px] text-center text-5xl">🧬</div>
      </div>
      <div className="bg-[#f06292] text-white p-8 md:p-12 rounded-[50px] shadow-2xl">
        <h3 className="text-4xl font-black mb-6">{t.learningContent.productTitle}</h3><p className="text-xl font-medium opacity-90">{t.learningContent.productText}</p>
      </div>
    </div>
  );

  const renderQuizzes = () => {
    const q = t.quizContent[quizIndex] || t.quizContent[0];
    return (
      <div className="glass-card p-10 md:p-12 rounded-[50px] max-w-3xl mx-auto animate-slide-in">
        <div className="flex justify-between items-center mb-12"><h2 className="text-3xl font-black text-[#f06292]">{t.quizTitle}</h2><span className="bg-pink-50 text-[#f06292] px-6 py-2 rounded-full font-bold">Q {quizIndex + 1}</span></div>
        <p className="text-2xl font-bold text-gray-800 mb-10">{q.q}</p>
        <div className="grid grid-cols-1 gap-4">{q.options.map((opt, idx) => (<button key={idx} onClick={() => setQuizIndex((quizIndex + 1) % t.quizContent.length)} className="w-full text-left p-6 rounded-3xl border-2 border-gray-100 hover:border-pink-300 hover:bg-pink-50 transition-all text-xl font-medium">{opt}</button>))}</div>
      </div>
    );
  };

  const renderHelp = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-in">
      <div className="glass-card p-10 rounded-[50px] shadow-xl"><h3 className="text-3xl font-black text-[#f06292] mb-6">Women Helpline</h3><p className="text-5xl font-black text-pink-600 mb-4">1091</p><p className="text-gray-500 font-bold">24/7 help in India.</p></div>
      <div className="glass-card p-10 rounded-[50px] shadow-xl"><h3 className="text-3xl font-black text-blue-500 mb-6">Child Helpline</h3><p className="text-5xl font-black text-blue-600 mb-4">1098</p><p className="text-gray-500 font-bold">Safe support.</p></div>
    </div>
  );

  const languages = [
    { code: 'en', name: 'English' }, { code: 'hi', name: 'हिन्दी' }, { code: 'mr', name: 'मराठी' }, { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ta', name: 'தமிழ்' }, { code: 'te', name: 'తెలుగు' }, { code: 'bn', name: 'বাংলা' }, { code: 'gu', name: 'ગુજરાતી' }
  ];

  const sectionKeys = ['home', 'tracker', 'advice', 'learning', 'quizzes', 'help'];

  return (
    <div className="min-h-screen relative font-sans text-gray-700 pb-20 overflow-x-hidden">
      <div className="bg-mesh" />
      <div className={`fixed inset-y-0 left-0 w-72 bg-[#f06292] z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 shadow-2xl`}>
        <div className="p-8 flex flex-col h-full"><button onClick={() => setIsMenuOpen(false)} className="text-white self-end mb-12"><svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
          <ul className="space-y-4 flex-1">{sectionKeys.map((key) => (<li key={key} onClick={() => { setCurrentSection(key); setIsMenuOpen(false); }} className={`text-2xl font-bold p-5 rounded-2xl cursor-pointer transition-all ${currentSection === key ? 'bg-white text-[#f06292] shadow-lg' : 'text-white hover:bg-white/10'}`}>{t.sections[key]}</li>))}</ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row gap-6 mb-12 items-center">
          <button onClick={() => setIsMenuOpen(true)} className="glass-card p-4 rounded-2xl shadow-sm hover:scale-110 transition-transform"><svg className="h-8 w-8 text-[#f06292]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
          <div className="flex-1 glass-card rounded-[40px] p-8 text-center md:text-left"><h1 className="text-5xl font-black text-[#f06292]">{t.appName}</h1><p className="text-pink-400 font-bold tracking-widest uppercase">{t.tagline}</p></div>
          <div className="glass-card p-4 rounded-3xl"><select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-transparent text-xl font-bold outline-none cursor-pointer">{languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}</select></div>
        </header>
        <main>
          {currentSection === 'home' && renderHome()}
          {currentSection === 'tracker' && renderTracker()}
          {currentSection === 'advice' && renderAdvice()}
          {currentSection === 'learning' && renderLearning()}
          {currentSection === 'quizzes' && renderQuizzes()}
          {currentSection === 'help' && renderHelp()}
        </main>
      </div>
    </div>
  );
}

export default App;