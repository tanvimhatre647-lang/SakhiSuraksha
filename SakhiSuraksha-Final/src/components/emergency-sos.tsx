import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface EmergencySOSProps {
  language: string;
  onPanicMode: () => void;
  isInline?: boolean;
}

const translations = {
  en: {
    sos: "SOS",
    help: "HELP NOW",
    panic: "Panic Mode",
    connecting: "Connecting to emergency services...",
    location: "Location detected",
    nearby: "Finding nearby help centers..."
  },
  hi: {
    sos: "SOS",
    help: "अभी मदद चाहिए",
    panic: "पैनिक मोड",
    connecting: "आपातकालीन सेवाओं से जुड़ रहे हैं...",
    location: "स्थान का पता लगाया गया",
    nearby: "नजदीकी सहायता केंद्र खोज रहे हैं..."
  },
  ta: {
    sos: "SOS",
    help: "இப்போது உதவி",
    panic: "பீதி பயம் முறை",
    connecting: "அவசர சேவைகளுடன் இணைக்கிறது...",
    location: "இடம் கண்டறியப்பட்டது",
    nearby: "அருகிலுள்ள உதவி மையங்களைக் கண்டறிதல்..."
  },
  bn: {
    sos: "SOS",
    help: "এখনই সাহায্য",
    panic: "প্যানিক মোড",
    connecting: "জরুরি সেবার সাথে যোগাযোগ করা হচ্ছে...",
    location: "অবস্থান শনাক্ত করা হয়েছে",
    nearby: "কাছাকাছি সাহায্য কেন্দ্র খোঁজা হচ্ছে..."
  },
  mr: {
    sos: "SOS",
    help: "आता मदत",
    panic: "पॅनिक मोड",
    connecting: "आपत्कालीन सेवांशी जोडत आहे...",
    location: "स्थान शोधले गेले",
    nearby: "जवळचे मदत केंद्र शोधत आहे..."
  },
  gu: {
    sos: "SOS",
    help: "હવે મદદ",
    panic: "પેનિક મોડ",
    connecting: "કટોકટી સેવાઓ સાથે જોડાઈ રહ્યા છીએ...",
    location: "સ્થાન શોધાયું",
    nearby: "નજીકના મદદ કેન્દ્રો શોધી રહ્યા છીએ..."
  }
};

export function EmergencySOS({ language, onPanicMode, isInline = false }: EmergencySOSProps) {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const t = translations[language as keyof typeof translations] || translations.en;

  const handleEmergencyClick = () => {
    setIsEmergencyActive(true);
    // Simulate emergency call process
    setTimeout(() => {
      setIsEmergencyActive(false);
      alert('Emergency services have been notified. Help is on the way.');
    }, 3000);
  };

  return (
    <>
      {/* Conditional rendering based on inline mode */}
      {isInline ? (
        <div className="text-center space-y-4">
          <div>
            <h3 className="font-semibold text-destructive mb-2">Emergency Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Immediate help available at your fingertips</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg animate-pulse"
              onClick={handleEmergencyClick}
              disabled={isEmergencyActive}
            >
              <div className="text-center">
                <AlertTriangle className="w-6 h-6 mx-auto" />
                <span className="text-xs font-bold">{t.sos}</span>
              </div>
            </Button>

            <Button
              className="text-primary border-primary hover:bg-primary hover:text-white px-6 py-2"
              variant="outline"
              onClick={onPanicMode}
            >
              <Shield className="w-4 h-4 mr-2" />
              {t.panic}
            </Button>
          </div>
        </div>
      ) : (
        <div className="fixed top-28 right-4 z-40 flex flex-col gap-2">
          <Button
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg animate-pulse"
            onClick={handleEmergencyClick}
            disabled={isEmergencyActive}
          >
            <div className="text-center">
              <AlertTriangle className="w-6 h-6 mx-auto" />
              <span className="text-xs font-bold">{t.sos}</span>
            </div>
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur text-primary border-primary"
            onClick={onPanicMode}
          >
            <Shield className="w-4 h-4 mr-1" />
            {t.panic}
          </Button>
        </div>
      )}

      {/* Emergency Modal */}
      {isEmergencyActive && (
        <div className="fixed inset-0 bg-red-600/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 text-center max-w-md w-full">
            <div className="animate-spin w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">{t.help}</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-2 justify-center">
                <Phone className="w-5 h-5 text-red-600" />
                <span>{t.connecting}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>{t.location}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Shield className="w-5 h-5 text-red-600" />
                <span>{t.nearby}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}