import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { UserPlus, LogIn, MessageSquare, Shield } from 'lucide-react';

interface AuthChoiceProps {
  language: string;
  onLogin: () => void;
  onRegister: () => void;
  onSMS: () => void;
}

const translations = {
  en: {
    welcome: "Welcome to",
    appName: "Sakhi Suraksha",
    subtitle: "Your trusted companion for safety and support",
    login: "Login",
    loginDesc: "Access your secure account",
    register: "Create Account", 
    registerDesc: "Join our safe community",
    smsHelp: "Send Offline SMS",
    smsDesc: "Send emergency message when internet is unavailable",
    safetyNote: "Your privacy and safety are our top priority",
    encrypted: "End-to-end encrypted"
  },
  hi: {
    welcome: "आपका स्वागत है",
    appName: "सखी सुरक्षा",
    subtitle: "सुरक्षा और सहायता के लिए आपका विश्वसनीय साथी",
    login: "लॉगिन",
    loginDesc: "अपने सुरक्षित खाते में प्रवेश करें",
    register: "खाता बनाएं",
    registerDesc: "हमारे सुरक्षित समुदाय में शामिल हों",
    smsHelp: "ऑफलाइन एसएमएस भेजें",
    smsDesc: "इंटरनेट उपलब्ध न होने पर आपातकालीन संदेश भेजें",
    safetyNote: "आपकी गोपनीयता और सुरक्षा हमारी सर्वोच्च प्राथमिकता है",
    encrypted: "एंड-टू-एंड एन्क्रिप्टेड"
  },
  ta: {
    welcome: "வரவேற்கிறோம்",
    appName: "சகி சுரக்ஷா",
    subtitle: "பாதுகாப்பு மற்றும் ஆதரவுக்கான உங்கள் நம்பகமான தோழன்",
    login: "உள்நுழைவு",
    loginDesc: "உங்கள் பாதுகாப்பான கணக்கை அணுகவும்",
    register: "கணக்கு உருவாக்கவும்",
    registerDesc: "எங்கள் பாதுகாப்பான சமூகத்தில் சேரவும்",
    smsHelp: "ஆஃப்லைன் SMS அனுப்பவும்",
    smsDesc: "இணையம் இல்லாதபோது அவசர செய்தி அனுப்பவும்",
    safetyNote: "உங்கள் தனியுரிமை மற்றும் பாதுகாப்பு எங்கள் முதன்மை முன்னுரிமை",
    encrypted: "முடிவு முதல் முடிவு வரை குறியாக்கம்"
  },
  bn: {
    welcome: "স্বাগতম",
    appName: "সখী সুরক্ষা",
    subtitle: "নিরাপত্তা এবং সহায়তার জন্য আপনার বিশ্বস্ত সঙ্গী",
    login: "লগইন",
    loginDesc: "আপনার নিরাপদ অ্যাকাউন্ট অ্যাক্সেস করুন",
    register: "অ্যাকাউন্ট তৈরি করুন",
    registerDesc: "আমাদের নিরাপদ সম্প্রদায়ে যোগ দিন",
    smsHelp: "অফলাইন SMS পাঠান",
    smsDesc: "ইন্টারনেট না থাকলে জরুরি বার্তা পাঠান",
    safetyNote: "আপনার গোপনীয়তা এবং নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার",
    encrypted: "এন্ড-টু-এন্ড এনক্রিপ্টেড"
  },
  mr: {
    welcome: "स्वागत आहे",
    appName: "सखी सुरक्षा",
    subtitle: "सुरक्षा आणि समर्थनासाठी तुमचा विश्वसनीय साथी",
    login: "लॉगिन",
    loginDesc: "तुमच्या सुरक्षित खात्यात प्रवेश करा",
    register: "खाते तयार करा",
    registerDesc: "आमच्या सुरक्षित समुदायात सामील व्हा",
    smsHelp: "ऑफलाइन SMS पाठवा",
    smsDesc: "इंटरनेट उपलब्ध नसताना आपत्कालीन संदेश पाठवा",
    safetyNote: "तुमची गोपनीयता आणि सुरक्षा ही आमची सर्वोच्च प्राथमिकता आहे",
    encrypted: "एंड-टू-एंड एन्क्रिप्टेड"
  },
  gu: {
    welcome: "સ્વાગત છે",
    appName: "સખી સુરક્ષા",
    subtitle: "સુરક્ષા અને સહાયતા માટે તમારો વિશ્વસનીય સાથી",
    login: "લૉગિન",
    loginDesc: "તમારા સુરક્ષિત ખાતામાં પ્રવેશ કરો",
    register: "ખાતું બનાવો",
    registerDesc: "અમારા સુરક્ષિત સમુદાયમાં જોડાઓ",
    smsHelp: "ઓફલાઇન SMS મોકલો",
    smsDesc: "ઇન્ટરનેટ ઉપલબ્ધ ન હોય ત્યારે કટોકટીનો સંદેશો મોકલો",
    safetyNote: "તમારી ગોપનીયતા અને સુરક્ષા અમારી સર્વોચ્ચ પ્રાથમિકતા છે",
    encrypted: "એન્ડ-ટુ-એન્ડ એન્ક્રિપ્ટેડ"
  }
};

export function AuthChoice({ language, onLogin, onRegister, onSMS }: AuthChoiceProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2">
            <span className="text-muted-foreground">{t.welcome}</span><br />
            <span className="text-primary">{t.appName}</span>
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Auth Options */}
        <div className="space-y-4 mb-6">
          {/* Login Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary"
                onClick={onLogin}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <LogIn className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-1">{t.login}</h3>
                <p className="text-muted-foreground">{t.loginDesc}</p>
              </div>
            </div>
          </Card>

          {/* Register Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-accent"
                onClick={onRegister}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-accent mb-1">{t.register}</h3>
                <p className="text-muted-foreground">{t.registerDesc}</p>
              </div>
            </div>
          </Card>

          {/* SMS Option Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-secondary"
                onClick={onSMS}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-secondary mb-1">{t.smsHelp}</h3>
                <p className="text-muted-foreground">{t.smsDesc}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Safety Note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary">{t.encrypted}</span>
          </div>
          <p className="text-muted-foreground mt-2">{t.safetyNote}</p>
        </div>
      </div>
    </div>
  );
}