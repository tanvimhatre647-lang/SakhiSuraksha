import React from 'react';
import { Shield, Phone, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EmergencySOS } from './emergency-sos';

interface HeroSectionProps {
  language: string;
  isLoggedIn: boolean;
  onGetHelp: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onPanicMode: () => void;
}

const translations = {
  en: {
    title: "Sakhi Suraksha",
    subtitle: "Empowering victims, providing immediate help",
    description: "AI-powered assistance for domestic violence victims. Get immediate help, counseling, and support in your preferred language.",
    getHelp: "Get Help Now",
    login: "Login",
    register: "Register",
    available: "Available 24/7"
  },
  hi: {
    title: "सखी सुरक्षा",
    subtitle: "पीड़ितों को सशक्त बनाना, तत्काल सहायता प्रदान करना",
    description: "घरेलू हिंसा पीड़ितों के लिए AI-आधारित सहायता। तुरंत मदद, परामर्श, और आपकी पसंदीदा भाषा में सहारा पाएं।",
    getHelp: "अभी मदद पाएं",
    login: "लॉगिन",
    register: "रजिस्टर करें",
    available: "24/7 उपलब्ध"
  },
  ta: {
    title: "சகி சுரக்ஷா",
    subtitle: "பாதிக்கப்பட்டவர்களை மேம்படுத்துதல், உடனடி உதவி வழங்குதல்",
    description: "குடும்ப வнமுறை பாதிக்கப்பட்டவர்களுக்கு AI-அடிப்படையிலான உதவி। உடனடி உதவி, ஆலோசனை மற்றும் உங்கள் விருப்பமான மொழியில் ஆதரவு பெறுங்கள்।",
    getHelp: "இப்போது உதவி பெறுங்கள்",
    login: "உள்நுழைவு",
    register: "பதிவு செய்யுங்கள்",
    available: "24/7 கிடைக்கும்"
  },
  bn: {
    title: "সখী সুরক্ষা",
    subtitle: "ভুক্তভোগীদের ক্ষমতায়ন, তাৎক্ষণিক সাহায্য প্রদান",
    description: "গার্হস্থ্য সহিংসতার শিকারদের জন্য AI-চালিত সহায়তা। তাৎক্ষণিক সাহায্য, পরামর্শ এবং আপনার পছন্দের ভাষায় সহায়তা পান।",
    getHelp: "এখনই সাহায্য নিন",
    login: "লগইন",
    register: "নিবন্ধন করুন",
    available: "২৪/৭ উপলব্ধ"
  },
  mr: {
    title: "सखी सुरक्षा",
    subtitle: "पीडितांना सक्षम करणे, तत्काळ मदत प्रदान करणे",
    description: "कौटुंबिक हिंसाचाराच्या पीडितांसाठी AI-आधारित सहाय्य. तत्काळ मदत, सल्लामसलत आणि तुमच्या आवडत्या भाषेत समर्थन मिळवा.",
    getHelp: "आता मदत घ्या",
    login: "लॉगिन",
    register: "नोंदणी करा",
    available: "२४/७ उपलब्ध"
  },
  gu: {
    title: "સખી સુરક્ષા",
    subtitle: "પીડિતોને સશક્ત બનાવવું, તાત્કાલિક મદદ પ્રદાન કરવી",
    description: "ઘરેલું હિંસાના પીડિતો માટે AI-આધારિત સહાય. તાત્કાલિક મદદ, સલાહ અને તમારી પસંદગીની ભાષામાં સહારો મેળવો.",
    getHelp: "હવે મદદ મેળવો",
    login: "લોગિન",
    register: "નોંધણી કરો",
    available: "24/7 ઉપલબ્ધ"
  }
};

export function HeroSection({ language, isLoggedIn, onGetHelp, onLogin, onRegister, onPanicMode }: HeroSectionProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="relative bg-gradient-to-r from-secondary/20 to-accent/20 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary p-3 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary">{t.title}</h1>
            </div>
            
            <div className="space-y-4">
              <p className="text-xl text-accent">{t.subtitle}</p>
              <p className="text-lg text-muted-foreground">{t.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-destructive hover:bg-destructive/90 text-white px-8 py-3"
                onClick={onGetHelp}
              >
                <Phone className="w-5 h-5 mr-2" />
                {t.getHelp}
              </Button>
              
              {!isLoggedIn && (
                <>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
                    onClick={onLogin}
                  >
                    {t.login}
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-3"
                    onClick={onRegister}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    {t.register}
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-primary mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>{t.available}</span>
            </div>

            {/* Emergency SOS Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-lg">
              <EmergencySOS 
                language={language}
                onPanicMode={onPanicMode}
                isInline={true}
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.pexels.com/photos/13062464/pexels-photo-13062464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Women empowerment and safety"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}