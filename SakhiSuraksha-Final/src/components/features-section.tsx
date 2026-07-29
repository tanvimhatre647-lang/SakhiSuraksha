import React from 'react';
import { Mic, Phone, MapPin, Lock, Bot, Globe } from 'lucide-react';
import { Card } from './ui/card';

interface FeaturesSectionProps {
  language: string;
}

const translations = {
  en: {
    title: "How Sakhi Suraksha Works",
    subtitle: "AI-powered features designed to keep you safe",
    features: [
      {
        icon: Mic,
        title: "AI Voice Analysis",
        description: "Advanced AI detects distress in voice and text messages automatically"
      },
      {
        icon: Phone,
        title: "Instant Helpline",
        description: "24/7 counseling and emergency services with trained professionals"
      },
      {
        icon: MapPin,
        title: "Location-Based Help",
        description: "Find nearest police stations, NGOs, and safe shelter homes"
      },
      {
        icon: Lock,
        title: "Secure & Private",
        description: "Your data is encrypted and completely confidential"
      },
      {
        icon: Bot,
        title: "24/7 AI Chatbot",
        description: "Immediate support and guidance whenever you need it"
      },
      {
        icon: Globe,
        title: "Multilingual Support",
        description: "Available in Hindi, English, Tamil, Bengali, Marathi & more"
      }
    ]
  },
  hi: {
    title: "सखी सुरक्षा कैसे काम करती है",
    subtitle: "आपकी सुरक्षा के लिए डिज़ाइन की गई AI-संचालित सुविधाएं",
    features: [
      {
        icon: Mic,
        title: "AI आवाज़ विश्लेषण",
        description: "उन्नत AI आवाज़ और टेक्स्ट संदेशों में परेशानी का स्वचालित रूप से पता लगाता है"
      },
      {
        icon: Phone,
        title: "तत्काल हेल्पलाइन",
        description: "प्रशिक्षित पेशेवरों के साथ 24/7 परामर्श और आपातकालीन सेवाएं"
      },
      {
        icon: MapPin,
        title: "स्थान-आधारित सहायता",
        description: "निकटतम पुलिस स्टेशन, NGO और सुरक्षित आश्रय घर खोजें"
      },
      {
        icon: Lock,
        title: "सुरक्षित और निजी",
        description: "आपका डेटा एन्क्रिप्टेड और पूर्णतः गोपनीय है"
      },
      {
        icon: Bot,
        title: "24/7 AI चैटबॉट",
        description: "जब भी आपको जरूरत हो तत्काल सहारा और मार्गदर्शन"
      },
      {
        icon: Globe,
        title: "बहुभाषी सहायता",
        description: "हिंदी, अंग्रेजी, तमिल, बंगाली, मराठी और अन्य भाषाओं में उपलब्ध"
      }
    ]
  },
  ta: {
    title: "சகி சுரக்ஷா எப்படி வேலை செய்கிறது",
    subtitle: "உங்கள் பாதுகாப்பிற்காக வடிவமைக்கப்பட்ட AI-இயங்கும் அம்சங்கள்",
    features: [
      {
        icon: Mic,
        title: "AI குரல் பகுப்பாய்வு",
        description: "மேம்பட்ட AI குரல் மற்றும் உரை செய்திகளில் துன்பத்தை தானாகவே கண்டறிகிறது"
      },
      {
        icon: Phone,
        title: "உடனடி உதவி மையம்",
        description: "பயிற்சி பெற்ற வல்லுநர்களுடன் 24/7 ஆலோசனை மற்றும் அவசர சேவைகள்"
      },
      {
        icon: MapPin,
        title: "இடம் அடிப்படையிலான உதவி",
        description: "அருகிலுள்ள காவல் நிலையங்கள், NGOகள் மற்றும் பாதுகாப்பான தங்குமிடங்களைக் கண்டறியுங்கள்"
      },
      {
        icon: Lock,
        title: "பாதுகாப்பான மற்றும் தனிப்பட்ட",
        description: "உங்கள் தரவு குறியாக்கம் செய்யப்பட்டு முற்றிலும் ரகசியமானது"
      },
      {
        icon: Bot,
        title: "24/7 AI சாட்பாட்",
        description: "உங்களுக்கு தேவைப்படும் போதெல்லாம் உடனடி ஆதரவு மற்றும் வழிகாட்டுதல்"
      },
      {
        icon: Globe,
        title: "பல மொழி ஆதரவு",
        description: "ஹிந்தி, ஆங்கிலம், தமிழ், பெங்காலி, மராத்தி மற்றும் பிற மொழிகளில் கிடைக்கும்"
      }
    ]
  },
  bn: {
    title: "সখী সুরক্ষা কীভাবে কাজ করে",
    subtitle: "আপনার নিরাপত্তার জন্য ডিজাইন করা AI-চালিত বৈশিষ্ট্য",
    features: [
      {
        icon: Mic,
        title: "AI ভয়েস বিশ্লেষণ",
        description: "উন্নত AI স্বয়ংক্রিয়ভাবে কণ্ঠস্বর এবং টেক্সট বার্তায় দুর্দশা সনাক্ত করে"
      },
      {
        icon: Phone,
        title: "তাৎক্ষণিক হেল্পলাইন",
        description: "প্রশিক্ষিত পেশাদারদের সাথে ২৪/৭ পরামর্শ এবং জরুরি সেবা"
      },
      {
        icon: MapPin,
        title: "অবস্থান-ভিত্তিক সাহায্য",
        description: "নিকটতম পুলিশ স্টেশন, এনজিও এবং নিরাপদ আশ্রয়স্থল খুঁজে নিন"
      },
      {
        icon: Lock,
        title: "নিরাপদ এবং ব্যক্তিগত",
        description: "আপনার ডেটা এনক্রিপ্ট করা এবং সম্পূর্ণ গোপনীয়"
      },
      {
        icon: Bot,
        title: "২৪/৭ AI চ্যাটবট",
        description: "যখনই আপনার প্রয়োজন তাৎক্ষণিক সহায়তা এবং নির্দেশনা"
      },
      {
        icon: Globe,
        title: "বহুভাষিক সহায়তা",
        description: "হিন্দি, ইংরেজি, তামিল, বাংলা, মারাঠি এবং আরও ভাষায় উপলব্ধ"
      }
    ]
  },
  mr: {
    title: "सखी सुरक्षा कशी कार्य करते",
    subtitle: "तुमच्या सुरक्षेसाठी डिझाइन केलेली AI-चालित वैशिष्ट्ये",
    features: [
      {
        icon: Mic,
        title: "AI आवाज विश्लेषण",
        description: "प्रगत AI आवाज आणि मजकूर संदेशांमध्ये त्रास आपोआप ओळखते"
      },
      {
        icon: Phone,
        title: "तत्काळ हेल्पलाइन",
        description: "प्रशिक्षित व्यावसायिकांसह २४/७ सल्ला आणि आपत्कालीन सेवा"
      },
      {
        icon: MapPin,
        title: "स्थान-आधारित मदत",
        description: "जवळचे पोलिस स्टेशन, NGO आणि सुरक्षित निवारा शोधा"
      },
      {
        icon: Lock,
        title: "सुरक्षित आणि खाजगी",
        description: "तुमचा डेटा एन्क्रिप्टेड आणि पूर्णपणे गुप्त आहे"
      },
      {
        icon: Bot,
        title: "२४/७ AI चॅटबॉट",
        description: "जेव्हा तुम्हाला गरज असेल तेव्हा तत्काळ समर्थन आणि मार्गदर्शन"
      },
      {
        icon: Globe,
        title: "बहुभाषिक समर्थन",
        description: "हिंदी, इंग्रजी, तमिळ, बंगाली, मराठी आणि इतर भाषांमध्ये उपलब्ध"
      }
    ]
  },
  gu: {
    title: "સખી સુરક્ષા કેવી રીતે કામ કરે છે",
    subtitle: "તમારી સુરક્ષા માટે ડિઝાઇન કરેલ AI-સંચાલિત સુવિધાઓ",
    features: [
      {
        icon: Mic,
        title: "AI અવાજ વિશ્લેષણ",
        description: "ઉન્નત AI આપોઆપ અવાજ અને ટેક્સ્ટ સંદેશાઓમાં તકલીફ શોધે છે"
      },
      {
        icon: Phone,
        title: "તાત્કાલિક હેલ્પલાઇન",
        description: "પ્રશિક્ષિત વ્યાવસાયિકો સાથે ૨૪/૭ પરામર્શ અને કટોકટી સેવાઓ"
      },
      {
        icon: MapPin,
        title: "સ્થાન-આધારિત મદદ",
        description: "નજીકના પોલીસ સ્ટેશન, NGO અને સુરક્ષિત આશ્રયસ્થાન શોધો"
      },
      {
        icon: Lock,
        title: "સુરક્ષિત અને ખાનગી",
        description: "તમારો ડેટા એન્ક્રિપ્ટેડ અને સંપૂર્ણપણે ગુપ્ત છે"
      },
      {
        icon: Bot,
        title: "૨૪/૭ AI ચેટબોટ",
        description: "જ્યારે પણ તમને જરૂર હોય ત્યારે તાત્કાલિક સહાય અને માર્ગદર્શન"
      },
      {
        icon: Globe,
        title: "બહુભાષી સહાય",
        description: "હિંદી, અંગ્રેજી, તમિલ, બંગાળી, મરાઠી અને વધુ ભાષાઓમાં ઉપલબ્ધ"
      }
    ]
  }
};

export function FeaturesSection({ language }: FeaturesSectionProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">{t.title}</h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-secondary/50">
              <div className="flex items-start gap-4">
                <div className="bg-accent p-3 rounded-lg shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}