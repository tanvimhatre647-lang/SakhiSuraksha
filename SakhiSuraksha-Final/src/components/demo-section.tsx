import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button.js';

interface DemoSectionProps {
  language?: string;
}

const translations = {
  en: {
    title: "See How Sakhi Suraksha Works",
    subtitle: "Empowering women with smart, real-time safety features",
    downloadTitle: "Download Our App",
    downloadSubtitle: "Available for Android and iOS devices",
    downloadApp: "Download App",
    comingSoon: "Coming Soon",
    features: [
      "Voice recognition for distress detection",
      "Instant connection to help centers",
      "Location sharing with trusted contacts",
      "Anonymous counseling sessions",
    ],
  },
  hi: {
    title: "देखें कि सखी सुरक्षा कैसे काम करती है",
    subtitle: "स्मार्ट, रीयल-टाइम सुरक्षा सुविधाओं के साथ महिलाओं को सशक्त बनाना",
    downloadTitle: "हमारा ऐप डाउनलोड करें",
    downloadSubtitle: "Android और iOS डिवाइसेस के लिए उपलब्ध",
    downloadApp: "ऐप डाउनलोड करें",
    comingSoon: "जल्द आ रहा है",
    features: [
      "परेशानी की पहचान के लिए आवाज़ पहचान",
      "सहायता केंद्रों से तत्काल कनेक्शन",
      "विश्वसनीय संपर्कों के साथ स्थान साझाकरण",
      "गुमनाम परामर्श सत्र",
    ],
  },
  mr: {
    title: "सखी सुरक्षा कशी कार्य करते ते पहा",
    subtitle: "स्मार्ट, रिअल-टाइम सुरक्षा वैशिष्ट्यांसह महिलांना सशक्त करणे",
    downloadTitle: "आमचे अॅप डाउनलोड करा",
    downloadSubtitle: "Android आणि iOS उपकरणांसाठी उपलब्ध",
    downloadApp: "अॅप डाउनलोड करा",
    comingSoon: "लवकरच येत आहे",
    features: [
      "त्रास ओळखण्यासाठी आवाज ओळख",
      "मदत केंद्रांशी तत्काळ कनेक्शन",
      "विश्वासार्ह संपर्कांसह स्थान सामायिकरण",
      "अनामिक सल्लामसलत सत्रे",
    ],
  },
  ta: {
    title: "சகி சுரக்ஷா எப்படி வேலை செய்கிறது",
    subtitle: "ஸ்மார்ட் மற்றும் நிகழ்நேர பாதுகாப்பு அம்சங்களுடன் பெண்களை மேம்படுத்துகிறது",
    downloadTitle: "எங்கள் ஆப்ஸை டவுன்லோட் செய்யுங்கள்",
    downloadSubtitle: "Android மற்றும் iOS சாதனங்களுக்கு கிடைக்கும்",
    downloadApp: "ஆப்ஸ் டவுன்லோட் செய்யுங்கள்",
    comingSoon: "விரைவில் வருகிறது",
    features: [
      "துன்பத்தைக் கண்டறிய குரல் அங்கீகாரம்",
      "உதவி மையங்களுடன் உடனடி இணைப்பு",
      "நம்பகமான தொடர்புகளுடன் இடப் பகிர்வு",
      "அநாமதேய ஆலோசனை அமர்வுகள்",
    ],
  },
  bn: {
    title: "দেখুন সখী সুরক্ষা কীভাবে কাজ করে",
    subtitle: "স্মার্ট, রিয়েল-টাইম নিরাপত্তা বৈশিষ্ট্য দিয়ে মহিলাদের ক্ষমতায়ন",
    downloadTitle: "আমাদের অ্যাপ ডাউনলোড করুন",
    downloadSubtitle: "Android এবং iOS ডিভাইসের জন্য উপলব্ধ",
    downloadApp: "অ্যাপ ডাউনলোড",
    comingSoon: "শীঘ্রই আসছে",
    features: [
      "দুর্দশা সনাক্তকরণের জন্য ভয়েস স্বীকৃতি",
      "সাহায্য কেন্দ্রগুলির সাথে তাৎক্ষণিক সংযোগ",
      "বিশ্বস্ত পরিচিতিদের সাথে অবস্থান ভাগাভাগি",
      "বেনামী পরামর্শ সেশন",
    ],
  },
  gu: {
    title: "જુઓ કે સખી સુરક્ષા કેવી રીતે કામ કરે છે",
    subtitle: "સ્માર્ટ, રીઅલ-ટાઇમ સુરક્ષા સુવિધાઓ સાથે મહિલાઓને સશક્ત બનાવવી",
    downloadTitle: "અમારી એપ ડાઉનલોડ કરો",
    downloadSubtitle: "Android અને iOS ઉપકરણો માટે ઉપલબ્ધ",
    downloadApp: "એપ ડાઉનલોડ કરો",
    comingSoon: "ટૂંક સમયમાં આવે છે",
    features: [
      "તકલીફ શોધવા માટે અવાજ ઓળખ",
      "મદદ કેન્દ્રો સાથે તાત્કાલિક જોડાણ",
      "વિશ્વસનીય સંપર્કો સાથે સ્થાન શેરિંગ",
      "અનામી પરામર્શ સત્રો",
    ],
  },
};

export function DemoSection({ language = "en" }: DemoSectionProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <section
      id="demo"
      style={{
        padding: "5rem 1.5rem",
        background: "linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(219,39,119,0.04) 100%)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 800,
              margin: "0 0 0.75rem",
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.title}
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#6b7280", maxWidth: 520, margin: "0 auto" }}>
            {t.subtitle}
          </p>
        </div>

        {/* Two-column card layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Features card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "2rem",
              boxShadow: "0 4px 24px rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.12)",
            }}
          >
            <h3
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "#1e1b4b",
                marginBottom: "1.25rem",
              }}
            >
              ✨ Key Features
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {t.features.map((feature: string, i: number) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                  <CheckCircle2
                    size={18}
                    style={{ color: "#7c3aed", marginTop: 2, flexShrink: 0 }}
                  />
                  <span style={{ fontSize: "0.95rem", color: "#374151", lineHeight: 1.5 }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download card */}
          <div
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              borderRadius: 20,
              padding: "2rem",
              boxShadow: "0 8px 32px rgba(124,58,237,0.3)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Download size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.4rem" }}>
                {t.downloadTitle}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                {t.downloadSubtitle}
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {/* Android badge */}
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  borderRadius: 12,
                  padding: "0.5rem 1.1rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                🤖 Android — {t.comingSoon}
              </div>
              {/* iOS badge */}
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  borderRadius: 12,
                  padding: "0.5rem 1.1rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                🍎 iOS — {t.comingSoon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}