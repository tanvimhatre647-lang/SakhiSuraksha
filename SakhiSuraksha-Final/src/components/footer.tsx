import React from 'react';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from './ui/button';

interface FooterProps {
  language: string;
}

const translations = {
  en: {
    emergency: "Emergency Helpline",
    emergencyNumber: "100 / 1090",
    email: "help@sakhisuraksha.org",
    address: "Safety Center, New Delhi, India",
    quickLinks: "Quick Links",
    links: [
      "Emergency Help",
      "Find Counselors",
      "Safety Resources",
      "Legal Aid"
    ],
    support: "Support",
    supportLinks: [
      "Contact Us",
      "Help Center",
      "Privacy Policy",
      "Terms of Service"
    ],
    followUs: "Follow Us",
    tagline: "Empowering victims, providing immediate help",
    copyright: "© 2024 Sakhi Suraksha. All rights reserved."
  },
  hi: {
    emergency: "आपातकालीन हेल्पलाइन",
    emergencyNumber: "100 / 1090",
    email: "help@sakhisuraksha.org",
    address: "सुरक्षा केंद्र, नई दिल्ली, भारत",
    quickLinks: "त्वरित लिंक",
    links: [
      "आपातकालीन सहायता",
      "परामर्शदाता खोजें",
      "सुरक्षा संसाधन",
      "कानूनी सहायता"
    ],
    support: "सहायता",
    supportLinks: [
      "संपर्क करें",
      "सहायता केंद्र",
      "गोपनीयता नीति",
      "सेवा की शर्तें"
    ],
    followUs: "हमें फॉलो करें",
    tagline: "पीड़ितों को सशक्त बनाना, तत्काल सहायता प्रदान करना",
    copyright: "© 2024 सखी सुरक्षा। सभी अधिकार सुरक्षित।"
  },
  ta: {
    emergency: "அவசர உதவி மையம்",
    emergencyNumber: "100 / 1090",
    email: "help@sakhisuraksha.org",
    address: "பாதுகாப்பு மையம், புது டில்லி, இந்தியா",
    quickLinks: "விரைவு இணைப்புகள்",
    links: [
      "அவசர உதவி",
      "ஆலோசகர்களைக் கண்டறியுங்கள்",
      "பாதுகாப்பு ஆதாரங்கள்",
      "சட்ட உதவி"
    ],
    support: "ஆதரவு",
    supportLinks: [
      "எங்களைத் தொடர்பு கொள்ளுங்கள்",
      "உதவி மையம்",
      "தனியுரிமைக் கொள்கை",
      "சேவை விதிமுறைகள்"
    ],
    followUs: "எங்களைப் பின்தொடருங்கள்",
    tagline: "பாதிக்கப்பட்டவர்களை மேம்படுத்துதல், உடனடி உதவி வழங்குதல்",
    copyright: "© 2024 சகி சுரக்ஷா. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
  },
  bn: {
    emergency: "জরুরি হেল্পলাইন",
    emergencyNumber: "100 / 1090",
    email: "help@sakhisuraksha.org",
    address: "নিরাপত্তা কেন্দ্র, নতুন দিল্লি, ভারত",
    quickLinks: "দ্রুত লিংক",
    links: [
      "জরুরি সাহায্য",
      "পরামর্শদাতা খুঁজুন",
      "নিরাপত্তা সংস্থান",
      "আইনি সহায়তা"
    ],
    support: "সহায়তা",
    supportLinks: [
      "যোগাযোগ করুন",
      "সাহায্য কেন্দ্র",
      "গোপনীয়তা নীতি",
      "সেবার শর্তাবলী"
    ],
    followUs: "আমাদের অনুসরণ করুন",
    tagline: "ভুক্তভোগীদের ক্ষমতায়ন, তাৎক্ষণিক সাহায্য প্রদান",
    copyright: "© ২০২৪ সখী সুরক্ষা। সমস্ত অধিকার সংরক্ষিত।"
  },
  mr: {
    emergency: "आपत्कालीन हेल्पलाइन",
    emergencyNumber: "100 / 1090",
    email: "help@sakhisuraksha.org",
    address: "सुरक्षा केंद्र, नवी दिल्ली, भारत",
    quickLinks: "द्रुत दुवे",
    links: [
      "आपत्कालीन मदत",
      "समुपदेशक शोधा",
      "सुरक्षा संसाधने",
      "कायदेशीर मदत"
    ],
    support: "समर्थन",
    supportLinks: [
      "संपर्क साधा",
      "मदत केंद्र",
      "गुप्तता धोरण",
      "सेवेच्या अटी"
    ],
    followUs: "आमचे अनुसरण करा",
    tagline: "पीडितांना सक्षम करणे, तत्काळ मदत प्रदान करणे",
    copyright: "© २०२४ सखी सुरक्षा. सर्व हक्क राखीव."
  },
  gu: {
    emergency: "કટોકટી હેલ્પલાઈન",
    emergencyNumber: "100 / 1090",
    email: "help@sakhisuraksha.org",
    address: "સુરક્ષા કેન્દ્ર, નવી દિલ્હી, ભારત",
    quickLinks: "ઝડપી લિંક્સ",
    links: [
      "કટોકટી સહાય",
      "સલાહકારો શોધો",
      "સુરક્ષા સંસાધનો",
      "કાનૂની સહાય"
    ],
    support: "સહાય",
    supportLinks: [
      "અમારો સંપર્ક કરો",
      "સહાય કેન્દ્ર",
      "ગોપનીયતા નીતિ",
      "સેવાની શરતો"
    ],
    followUs: "અમને ફોલો કરો",
    tagline: "પીડિતોને સશક્ત બનાવવા, તાત્કાલિક મદદ પ્રદાન કરવી",
    copyright: "© ૨૦૨૪ સખી સુરક્ષા. બધા અધિકારો આરક્ષિત."
  }
};

export function Footer({ language }: FooterProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-secondary" />
              <span className="text-2xl font-bold">Sakhi Suraksha</span>
            </div>
            <p className="text-gray-300">{t.tagline}</p>
            
            {/* Emergency Contact */}
            <div className="space-y-2">
              <h4 className="font-semibold text-secondary">{t.emergency}</h4>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-bold">{t.emergencyNumber}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary">{t.quickLinks}</h3>
            <ul className="space-y-2">
              {t.links.map((link, index) => (
                <li key={index}>
                  <button className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary">{t.support}</h3>
            <ul className="space-y-2">
              {t.supportLinks.map((link, index) => (
                <li key={index}>
                  <button className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-gray-300">{t.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-1" />
                <span className="text-gray-300">{t.address}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-secondary">{t.followUs}</h4>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-8 text-center">
          <p className="text-gray-400">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}