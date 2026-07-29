import React from 'react';
import { Shield, Heart, Users, Lock } from 'lucide-react';
import { Card } from './ui/card';

interface AboutSectionProps {
  language: string;
}

const translations = {
  en: {
    title: "About Sakhi Suraksha",
    subtitle: "Empowering women through technology and compassion",
    description: "AI-based voice/text analysis detects distress. Multilingual support (Hindi, English, Marathi). Immediate helpline and counseling available.",
    mission: "Our Mission",
    missionText: "To provide immediate, accessible, and confidential support to domestic violence victims through cutting-edge AI technology.",
    values: [
      {
        icon: Shield,
        title: "Safety First",
        description: "Your safety and security are our top priorities"
      },
      {
        icon: Heart,
        title: "Compassionate Care",
        description: "Trained professionals provide empathetic support"
      },
      {
        icon: Users,
        title: "Community Support",
        description: "Building a network of help and solidarity"
      },
      {
        icon: Lock,
        title: "Complete Privacy",
        description: "Your data is encrypted and completely confidential"
      }
    ],
    stats: [
      { number: "24/7", label: "Available Support" },
      { number: "6+", label: "Languages Supported" },
      { number: "100%", label: "Data Security" },
      { number: "∞", label: "Lives We Can Help" }
    ]
  },
  hi: {
    title: "सखी सुरक्षा के बारे में",
    subtitle: "प्रौद्योगिकी और करुणा के माध्यम से महिलाओं को सशक्त बनाना",
    description: "AI-आधारित आवाज़/टेक्स्ट विश्लेषण परेशानी का पता लगाता है। बहुभाषी सहायता (हिंदी, अंग्रेजी, मराठी)। तत्काल हेल्पलाइन और परामर्श उपलब्ध।",
    mission: "हमारा मिशन",
    missionText: "अत्याधुनिक AI तकनीक के माध्यम से घरेलू हिंसा पीड़ितों को तत्काल, सुलभ और गोपनीय सहायता प्रदान करना।",
    values: [
      {
        icon: Shield,
        title: "सुरक्षा सबसे पहले",
        description: "आपकी सुरक्षा और संरक्षा हमारी सर्वोच्च प्राथमिकताएं हैं"
      },
      {
        icon: Heart,
        title: "दयालु देखभाल",
        description: "प्रशिक्षित पेशेवर सहानुभूतिपूर्ण सहायता प्रदान करते हैं"
      },
      {
        icon: Users,
        title: "सामुदायिक सहारा",
        description: "सहायता और एकजुटता का नेटवर्क बनाना"
      },
      {
        icon: Lock,
        title: "पूर्ण गोपनीयता",
        description: "आपका डेटा एन्क्रिप्टेड और पूर्णतः गोपनीय है"
      }
    ],
    stats: [
      { number: "24/7", label: "उपलब्ध सहायता" },
      { number: "6+", label: "समर्थित भाषाएं" },
      { number: "100%", label: "डेटा सुरक्षा" },
      { number: "∞", label: "जिंदगियां जिनकी हम मदद कर सकते हैं" }
    ]
  },
  ta: {
    title: "சகி சுரக்ஷாவைப் பற்றி",
    subtitle: "தொழில்நுட்பம் மற்றும் கருணை மூலம் பெண்களை மேம்படுத்துதல்",
    description: "AI-அடிப்படையிலான குரல்/உரை பகுப்பாய்வு துன்பத்தைக் கண்டறிகிறது। பலமொழி ஆதரவு (ஹிந்தி, ஆங்கிலம், மராத்தி). உடனடி உதவி மையம் மற்றும் ஆலோசனை கிடைக்கும்.",
    mission: "எங்கள் நோக்கம்",
    missionText: "அதிநவீன AI தொழில்நுட்பத்தின் மூலம் குடும்ப வன்முறை பாதிக்கப்பட்டவர்களுக்கு உடனடி, அணுகக்கூடிய மற்றும் ரகசியமான ஆதரவை வழங்குவது.",
    values: [
      {
        icon: Shield,
        title: "பாதுகாப்பு முதலில்",
        description: "உங்கள் பாதுகாப்பு மற்றும் பாதுகாப்பு எங்கள் முதன்மை முன்னுரிமைகள்"
      },
      {
        icon: Heart,
        title: "அன்பான பராமரிப்பு",
        description: "பயிற்சி பெற்ற வல்லுநர்கள் அனுதாபமான ஆதரவை வழங்குகிறார்கள்"
      },
      {
        icon: Users,
        title: "சமூக ஆதரவு",
        description: "உதவி மற்றும் ஒற்றுமையின் வலையமைப்பை உருவாக்குதல்"
      },
      {
        icon: Lock,
        title: "முழுமையான தனியுரிமை",
        description: "உங்கள் தரவு குறியாக்கம் செய்யப்பட்டு முற்றிலும் ரகசியமானது"
      }
    ],
    stats: [
      { number: "24/7", label: "கிடைக்கும் ஆதரவு" },
      { number: "6+", label: "ஆதரிக்கப்படும் மொழிகள்" },
      { number: "100%", label: "தரவு பாதுகாப்பு" },
      { number: "∞", label: "நாம் உதவக்கூடிய வாழ்க்கைகள்" }
    ]
  },
  bn: {
    title: "সখী সুরক্ষা সম্পর্কে",
    subtitle: "প্রযুক্তি এবং সহানুভূতির মাধ্যমে নারীদের ক্ষমতায়ন",
    description: "AI-ভিত্তিক ভয়েস/টেক্সট বিশ্লেষণ দুর্দশা সনাক্ত করে। বহুভাষিক সহায়তা (হিন্দি, ইংরেজি, মারাঠি)। তাৎক্ষণিক হেল্পলাইন এবং পরামর্শ উপলব্ধ।",
    mission: "আমাদের লক্ষ্য",
    missionText: "অত্যাধুনিক AI প্রযুক্তির মাধ্যমে গার্হস্থ্য সহিংসতার শিকারদের তাৎক্ষণিক, অ্যাক্সেসযোগ্য এবং গোপনীয় সহায়তা প্রদান করা।",
    values: [
      {
        icon: Shield,
        title: "নিরাপত্তা প্রথম",
        description: "আপনার নিরাপত্তা এবং সুরক্ষা আমাদের শীর্ষ অগ্রাধিকার"
      },
      {
        icon: Heart,
        title: "সহানুভূতিশীল যত্ন",
        description: "প্রশিক্ষিত পেশাদাররা সহানুভূতিশীল সহায়তা প্রদান করেন"
      },
      {
        icon: Users,
        title: "সম্প্রদায়ের সহায়তা",
        description: "সাহায্য এবং সংহতির নেটওয়ার্ক তৈরি করা"
      },
      {
        icon: Lock,
        title: "সম্পূর্ণ গোপনীয়তা",
        description: "আপনার ডেটা এনক্রিপ্ট করা এবং সম্পূর্ণ গোপনীয়"
      }
    ],
    stats: [
      { number: "24/7", label: "উপলব্ধ সহায়তা" },
      { number: "6+", label: "সমর্থিত ভাষা" },
      { number: "100%", label: "ডেটা নিরাপত্তা" },
      { number: "∞", label: "জীবন যাদের আমরা সাহায্য করতে পারি" }
    ]
  },
  mr: {
    title: "सखी सुरक्षेबद्दल",
    subtitle: "तंत्रज्ञान आणि करुणेद्वारे महिलांना सक्षम करणे",
    description: "AI-आधारित आवाज/मजकूर विश्लेषण त्रास ओळखते. बहुभाषिक समर्थन (हिंदी, इंग्रजी, मराठी). तत्काळ हेल्पलाइन आणि सल्लामसलत उपलब्ध.",
    mission: "आमचे ध्येय",
    missionText: "अत्याधुनिक AI तंत्रज्ञानाद्वारे कौटुंबिक हिंसाचाराच्या पीडितांना तत्काळ, प्रवेशयोग्य आणि गुप्त समर्थन प्रदान करणे.",
    values: [
      {
        icon: Shield,
        title: "सुरक्षा प्रथम",
        description: "तुमची सुरक्षा आणि संरक्षा आमची सर्वोच्च प्राथमिकता आहे"
      },
      {
        icon: Heart,
        title: "दयाळू काळजी",
        description: "प्रशिक्षित व्यावसायिक सहानुभूतीपूर्ण समर्थन प्रदान करतात"
      },
      {
        icon: Users,
        title: "समुदायिक समर्थन",
        description: "मदत आणि एकजुटीचे नेटवर्क तयार करणे"
      },
      {
        icon: Lock,
        title: "संपूर्ण गुप्तता",
        description: "तुमचा डेटा एन्क्रिप्टेड आणि पूर्णपणे गुप्त आहे"
      }
    ],
    stats: [
      { number: "24/7", label: "उपलब्ध समर्थन" },
      { number: "6+", label: "समर्थित भाषा" },
      { number: "100%", label: "डेटा सुरक्षा" },
      { number: "∞", label: "आम्ही मदत करू शकतो अशी जीवने" }
    ]
  },
  gu: {
    title: "સખી સુરક્ષા વિશે",
    subtitle: "ટેક્નોલોજી અને કરુણા દ્વારા મહિલાઓને સશક્ત બનાવવી",
    description: "AI-આધારિત અવાજ/ટેક્સ્ટ વિશ્લેષણ તકલીફ શોધે છે. બહુભાષી આધાર (હિંદી, અંગ્રેજી, મરાઠી)। તાત્કાલિક હેલ્પલાઇન અને સલાહ ઉપલબ્ધ.",
    mission: "અમારું મિશન",
    missionText: "અત્યાધુનિક AI ટેક્નોલોજી દ્વારા ઘરેલું હિંસાના પીડિતોને તાત્કાલિક, સુલભ અને ગુપ્ત સહાય પ્રદાન કરવી.",
    values: [
      {
        icon: Shield,
        title: "સુરક્ષા પ્રથમ",
        description: "તમારી સુરક્ષા અને રક્ષણ અમારી ટોચની પ્રાથમિકતાઓ છે"
      },
      {
        icon: Heart,
        title: "કરુણાભરી સંભાળ",
        description: "પ્રશિક્ષિત વ્યાવસાયિકો સહાનુભૂતિપૂર્ણ સહાય પ્રદાન કરે છે"
      },
      {
        icon: Users,
        title: "સમુદાયિક સહાય",
        description: "મદદ અને એકતાનું નેટવર્ક બનાવવું"
      },
      {
        icon: Lock,
        title: "સંપૂર્ણ ગોપનીયતા",
        description: "તમારો ડેટા એન્ક્રિપ્ટેડ અને સંપૂર્ણપણે ગુપ્ત છે"
      }
    ],
    stats: [
      { number: "24/7", label: "ઉપલબ્ધ સહાય" },
      { number: "6+", label: "સપોર્ટેડ ભાષાઓ" },
      { number: "100%", label: "ડેટા સુરક્ષા" },
      { number: "∞", label: "જીવન જેની અમે મદદ કરી શકીએ" }
    ]
  }
};

export function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">{t.title}</h2>
          <p className="text-xl text-muted-foreground mb-8">{t.subtitle}</p>
          <p className="text-lg text-accent max-w-4xl mx-auto">{t.description}</p>
        </div>

        {/* Mission */}
        <Card className="p-8 mb-16 bg-gradient-to-r from-secondary/10 to-accent/10 border-2 border-secondary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">{t.mission}</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t.missionText}</p>
          </div>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {t.values.map((value, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-primary mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {t.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}