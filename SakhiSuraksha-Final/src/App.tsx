import React, { useState, useEffect } from "react";
import { SplashScreen } from "./components/splash-screen";
import { LanguageSelector } from "./components/language-selector.js";
import { AuthChoice } from "./components/auth-choice.js";
import { SMSHelper } from "./components/sms-helper.js";
import { FakeShoppingApp } from "./components/fake-shopping-app.js";
import { Navbar } from "./components/navbar.js";
import { HeroSection } from "./components/hero-section.js";
import { EmergencyContacts } from "./components/emergency-contacts";
import { FeaturesSection } from "./components/features-section.js";
import { AuthForms } from "./components/auth-forms.js";
import { AboutSection } from "./components/about-section.js";
import { DemoSection } from "./components/demo-section.js";
import { ChatbotWidget } from "./components/chatbot-widget.js";
import { Footer } from "./components/footer";
import { useVoiceRecognition } from "./lib/useVoiceRecognition";
import { VoiceRecognitionPanel } from "./components/voice-recognition-panel";
import { UserDashboard } from "./components/user-dashboard.js";
import { API_BASE } from "./lib/api";

// 🔹 SOS Countdown Component
function SOSCountdown({
  onCancel,
  onTimeout,
}: {
  onCancel: () => void;
  onTimeout: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(20);
  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onTimeout]);

  return (
    <div className="fixed inset-0 bg-red-600 flex flex-col items-center justify-center text-white z-50">
      <h1 className="text-5xl font-bold mb-4">SOS!</h1>
      <p className="text-xl mb-4">
        Connecting to emergency services in {secondsLeft} seconds
      </p>
      <button
        onClick={onCancel}
        className="bg-white text-red-600 font-bold px-6 py-3 rounded shadow hover:bg-gray-200"
      >
        Cancel
      </button>
    </div>
  );
}

// 🔹 Get Location & Send SOS
const getLocation = () =>
  new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    if (!navigator.geolocation) return reject("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err)
    );
  });

const sendSOS = async () => {
  let location = null;
  try {
    location = await getLocation();
  } catch (err) {
    console.warn("Failed to get geolocation:", err);
  }

  try {
    let contacts = [];
    const localContacts = localStorage.getItem("userContacts");
    if (localContacts) {
      contacts = JSON.parse(localContacts);
    }

    // Fallback: Fetch contacts dynamically from DB if localContacts is empty
    const token = localStorage.getItem("token");
    if ((!contacts || contacts.length === 0) && token) {
      try {
        const contactsRes = await fetch(`${API_BASE}/api/contacts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (contactsRes.ok) {
          const dbContacts = await contactsRes.json();
          contacts = dbContacts.map((c: any) => ({ number: c.phone, name: c.name }));
          localStorage.setItem("userContacts", JSON.stringify(contacts));
        }
      } catch (fetchErr) {
        console.warn("Failed to fetch contacts dynamically in sendSOS:", fetchErr);
      }
    }
    
    // Attempt fetch to SOS backend
    const res = await fetch(`${API_BASE}/api/sos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: localStorage.getItem("userName") || "User",
        location,
        contacts,
      }),
    });

    if (!res.ok) throw new Error("Server returned an error");

    // Open WhatsApp Web/App pre-filled message for the primary emergency contact
    if (contacts && contacts.length > 0) {
      const primaryContact = contacts[0];
      const rawPhone = primaryContact.number || primaryContact.phone || "";
      if (rawPhone) {
        // Clean phone format: digits only, remove leading 0, prepend 91 if 10 digits
        let cleanPhone = rawPhone.replace(/\D/g, "");
        if (cleanPhone.startsWith("0")) {
          cleanPhone = cleanPhone.slice(1);
        }
        if (cleanPhone.length === 10) {
          cleanPhone = "91" + cleanPhone;
        }

        const userName = localStorage.getItem("userName") || "User";
        let mapsLink = "";
        if (location) {
          mapsLink = `\nMy Location: https://maps.google.com/?q=${location.lat},${location.lng}`;
        }
        const messageText = `🚨 SOS EMERGENCY ALERT from Sakhi Suraksha!\nThis is ${userName}. I am in distress and need urgent help.${mapsLink}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(messageText)}`;
        
        // Try opening in new tab, fallback to same tab if blocked by browser's popup blocker
        const newWindow = window.open(whatsappUrl, "_blank");
        if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
          window.location.href = whatsappUrl;
        }
      }
    }
    
    if (!location) {
      alert("SOS Sent! (Warning: GPS location was unavailable)");
    } else {
      alert("SOS Sent!");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to send SOS. Please check backend connection.");
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<
    | "splash"
    | "language"
    | "authChoice"
    | "auth"
    | "sms"
    | "codeword"
    | "home"
    | "panic"
    | "contacts"
    | "dashboard"
  >("splash");
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("selectedLanguage") || "en"
  );
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [codeword, setCodeword] = useState(localStorage.getItem("userCodeword") || "");
  const [isSOS, setIsSOS] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Always-on background voice recognition for codeword detection
  const { start: startBgVoice, stop: stopBgVoice } = useVoiceRecognition({
    lang: "en-US",
    continuous: true,
    interimResults: true,
    onCodewordDetected: () => setIsSOS(true),
  });

  // ─── Auto-login: Validate JWT token on startup ───
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_BASE}/api/auth/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(res => {
        if (res.ok) {
          setIsLoggedIn(true);
          setCurrentView("home");
        } else {
          // Token invalid/expired
          handleLogout();
        }
      })
      .catch(err => {
        console.warn("Auth verify request offline, using cache session:", err);
        setIsLoggedIn(true);
        setCurrentView("home");
      });
    }
  }, []);

  // ─── Pre-fetch emergency contacts on login/startup ───
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${API_BASE}/api/contacts`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error("Failed to pre-fetch contacts");
        })
        .then(data => {
          if (data && Array.isArray(data)) {
            localStorage.setItem("userContacts", JSON.stringify(data.map((c: any) => ({ number: c.phone, name: c.name }))));
            console.log("[App] Pre-fetched emergency contacts successfully.");
          }
        })
        .catch(err => console.warn("[App] Error pre-fetching contacts:", err));
      }
    }
  }, [isLoggedIn]);

  // ─── Start/Stop background voice recognition with home view ───
  useEffect(() => {
    if (currentView === "home") {
      startBgVoice();
    } else {
      stopBgVoice();
    }
    return () => stopBgVoice();
  }, [currentView, startBgVoice, stopBgVoice]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userCodeword");
    setIsLoggedIn(false);
    
    // Open auth forms directly in login mode after logging out
    setAuthMode("login");
    setCurrentView("auth");
  };

  // ─── Splash Screen ───
  if (currentView === "splash") {
    // If token exists, skip splash/language and check auth directly
    if (localStorage.getItem("token")) {
      return <div className="min-h-screen bg-background flex items-center justify-center">Loading Sakhi Suraksha...</div>;
    }
    return <SplashScreen onComplete={() => setCurrentView("language")} />;
  }

  // ─── Language Selector ───
  if (currentView === "language") {
    return (
      <LanguageSelector
        isOpen={true}
        onLanguageSelect={(language) => {
          setSelectedLanguage(language);
          localStorage.setItem("selectedLanguage", language);
          setCurrentView("authChoice");
        }}
      />
    );
  }

  // ─── SMS Helper ───
  if (currentView === "sms") {
    return <SMSHelper language={selectedLanguage} onBack={() => setCurrentView("authChoice")} />;
  }

  // ─── Auth Choice ───
  if (currentView === "authChoice") {
    return (
      <AuthChoice
        language={selectedLanguage}
        onLogin={() => {
          setAuthMode("login");
          setCurrentView("auth");
        }}
        onRegister={() => {
          setAuthMode("register");
          setCurrentView("auth");
        }}
        onSMS={() => setCurrentView("sms")}
      />
    );
  }

  // ─── Auth Forms ───
  if (currentView === "auth") {
    return (
      <div className="min-h-screen bg-background">
        <AuthForms
          language={selectedLanguage}
          isOpen={true}
          mode={authMode}
          onClose={() => {
            if (isLoggedIn) {
              setCurrentView("home");
            } else {
              setCurrentView("authChoice");
            }
          }}
          onSwitchMode={setAuthMode}
          onSuccess={() => {
            setIsLoggedIn(true);
            const userCodeword = localStorage.getItem("userCodeword") || "";
            setCodeword(userCodeword);
            setCurrentView("home");
          }}
          isInitialRegistration={false}
        />
      </div>
    );
  }

  // ─── Codeword Setup (not used if codeword is created during registration) ───
  if (currentView === "codeword" && !codeword) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Choose Your Codeword</h2>
          <input
            type="text"
            placeholder="Enter codeword"
            value={codeword}
            onChange={(e) => setCodeword(e.target.value)}
            className="border p-2 rounded mb-4 text-black w-full"
          />
          <button
            onClick={() => {
              if (codeword.trim() !== "") {
                localStorage.setItem("userCodeword", codeword.toLowerCase());
                setCurrentView("home");
              }
            }}
            className="bg-gray-200 text-black px-4 py-2 rounded shadow hover:bg-gray-300 w-full"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  // ─── Panic Mode ───
  if (currentView === "panic")
    return <FakeShoppingApp onExitPanic={() => setCurrentView("home")} />;

  // ─── Emergency Contacts ───
  if (currentView === "contacts")
    return (
      <EmergencyContacts 
        language={selectedLanguage} 
        onBack={() => setCurrentView("home")} 
        onAddCustomClick={() => setCurrentView("dashboard")}
      />
    );

  // ─── User Dashboard ───
  if (currentView === "dashboard") {
    console.log("[App] Rendering UserDashboard. language:", selectedLanguage);
    return (
      <UserDashboard 
        language={selectedLanguage}
        onBack={() => {
          console.log("[App] Dashboard back clicked, routing home");
          setCurrentView("home");
        }}
        onLogout={() => {
          console.log("[App] Dashboard logout clicked");
          handleLogout();
        }}
      />
    );
  }

  // ─── Home Page ───
  return (
    <div className="min-h-screen bg-background">
      {/* SOS Overlay */}
      {isSOS && (
        <SOSCountdown
          onCancel={() => setIsSOS(false)}
          onTimeout={() => {
            setIsSOS(false);
            sendSOS();
            setCurrentView("panic");
          }}
        />
      )}

      {/* Navbar */}
      <Navbar
        language={selectedLanguage}
        isLoggedIn={isLoggedIn}
        onLogin={() => {
          setAuthMode("login");
          setCurrentView("auth");
        }}
        onRegister={() => {
          setAuthMode("register");
          setCurrentView("auth");
        }}
        onPanicMode={() => setCurrentView("panic")}
        onChangeLanguage={() => {
          setCurrentView("language");
          setSelectedLanguage("");
        }}
        onEmergencyContacts={() => setCurrentView("contacts")}
        onDashboard={() => {
          console.log("[App] onDashboard callback triggered. Setting view to dashboard");
          setCurrentView("dashboard");
        }}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main>
        <HeroSection
          language={selectedLanguage}
          isLoggedIn={isLoggedIn}
          onGetHelp={() => setIsSOS(true)}
          onLogin={() => {
            setAuthMode("login");
            setCurrentView("auth");
          }}
          onRegister={() => {
            setAuthMode("register");
            setCurrentView("auth");
          }}
          onPanicMode={() => setCurrentView("panic")}
        />

        <section id="features">
          <FeaturesSection language={selectedLanguage} />
        </section>
        <section id="about">
          <AboutSection language={selectedLanguage} />
        </section>
        <section id="demo">
          <DemoSection language={selectedLanguage} />
        </section>
      </main>

      <Footer language={selectedLanguage} />
      <ChatbotWidget language={selectedLanguage} />
    </div>
  );
}
