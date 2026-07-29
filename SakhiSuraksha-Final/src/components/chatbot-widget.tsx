import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Loader2, ShieldAlert } from 'lucide-react';
import { API_BASE } from "../lib/api";

interface ChatbotWidgetProps {
  language: string;
}

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// ── Labels ────────────────────────────────────────────────────────────────────
const translations: Record<string, any> = {
  en: {
    title: "Sakhi AI",
    subtitle: "Your safety companion",
    placeholder: "Type a message...",
    emergency: "🚨 Emergency — Call 112",
    quickResponses: ["I need immediate help", "I feel unsafe right now", "Find nearest help center", "What are my rights?"],
    welcome: "Hello! I'm **Sakhi**, your safety companion 💜\n\nI'm here to listen and help — you are not alone. What's on your mind?",
    errorMsg: "I'm having trouble reaching the server right now. For immediate help, please call **112** or the Women's Helpline **1091**.",
    thinking: "Sakhi is thinking...",
  },
  hi: {
    title: "साखी AI", subtitle: "आपकी सुरक्षा साथी", placeholder: "संदेश टाइप करें...",
    emergency: "🚨 आपात — 112 कॉल करें",
    quickResponses: ["मुझे तुरंत मदद चाहिए", "मैं असुरक्षित हूं", "सहायता केंद्र खोजें", "मेरे अधिकार क्या हैं?"],
    welcome: "नमस्ते! मैं **साखी** हूं 💜\n\nमैं यहां आपकी बात सुनने और मदद करने के लिए हूं — आप अकेली नहीं हैं।",
    errorMsg: "सर्वर से कनेक्ट करने में समस्या है। कृपया **112** या महिला हेल्पलाइन **1091** पर कॉल करें।",
    thinking: "साखी सोच रही है...",
  },
  mr: {
    title: "साखी AI", subtitle: "तुमची सुरक्षा साथी", placeholder: "संदेश टाइप करा...",
    emergency: "🚨 आपत्काल — 112 कॉल करा",
    quickResponses: ["मला तातडीने मदत हवी", "मला असुरक्षित वाटतंय", "मदत केंद्र शोधा", "माझे हक्क काय?"],
    welcome: "नमस्कार! मी **साखी** आहे 💜\n\nमी येथे तुमची मदत करण्यासाठी आहे — तुम्ही एकट्या नाही.",
    errorMsg: "सर्व्हरशी कनेक्ट करण्यात समस्या. **112** किंवा **1091** वर कॉल करा.",
    thinking: "साखी विचार करत आहे...",
  },
  ta: {
    title: "சகி AI", subtitle: "பாதுகாப்பு தோழி", placeholder: "செய்தி தட்டச்சு செய்யுங்கள்...",
    emergency: "🚨 அவசரம் — 112 அழைக்கவும்",
    quickResponses: ["உடனடி உதவி தேவை", "நான் பாதுகாப்பற்றதாக உணர்கிறேன்", "உதவி மையம் கண்டறி", "என் உரிமைகள் என்ன?"],
    welcome: "வணக்கம்! நான் **சகி** 💜\n\nநான் உங்களுக்கு உதவ இங்கே இருக்கிறேன் — நீங்கள் தனியாக இல்லை.",
    errorMsg: "சேவையகத்துடன் இணைப்பில் சிக்கல். **112** அல்லது **1091** ஐ அழைக்கவும்.",
    thinking: "சகி யோசிக்கிறார்...",
  },
  bn: {
    title: "সখী AI", subtitle: "নিরাপত্তা সঙ্গী", placeholder: "বার্তা টাইপ করুন...",
    emergency: "🚨 জরুরি — 112 কল করুন",
    quickResponses: ["তাৎক্ষণিক সাহায্য দরকার", "আমি অনিরাপদ", "সাহায্য কেন্দ্র খুঁজুন", "আমার অধিকার কী?"],
    welcome: "হ্যালো! আমি **সখী** 💜\n\nআমি আপনার কথা শুনতে এখানে আছি — আপনি একা নন।",
    errorMsg: "সার্ভারে সংযোগ সমস্যা। **112** বা **1091** নম্বরে কল করুন।",
    thinking: "সখী ভাবছে...",
  },
};

// ── Render text with bold **...** support ─────────────────────────────────────
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part.split("\n").map((line, j, arr) => (
              <React.Fragment key={`${i}-${j}`}>
                {line}{j < arr.length - 1 && <br />}
              </React.Fragment>
            ))
      )}
    </>
  );
}

// ── Typing dots ───────────────────────────────────────────────────────────────
function TypingDots({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg,#7c3aed,#db2777)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, color: "#fff", fontWeight: 700, alignSelf: "flex-end",
      }}>S</div>
      <div style={{
        background: "#fff", border: "1px solid #ede9fe",
        borderRadius: "6px 16px 16px 16px",
        padding: "10px 16px", display: "flex", alignItems: "center", gap: 6,
        boxShadow: "0 1px 6px rgba(124,58,237,0.08)",
      }}>
        <span style={{ fontSize: 12, color: "#8b5cf6", marginRight: 4 }}>{label}</span>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 7, height: 7, borderRadius: "50%", background: "#8b5cf6",
            display: "inline-block",
            animation: `tdot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
      <style>{`@keyframes tdot{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-5px);opacity:1}}`}</style>
    </div>
  );
}

// ── API call for AI Reply ─────────────────────────────────────────────────────
async function fetchBotReply(message: string, language: string, history: { role: string; text: string }[]) {
  const res = await fetch(`${API_BASE}/api/chatbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language, history, userId: localStorage.getItem("userId") || null }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.reply as string;
}

// ── Bot Message Bubble ────────────────────────────────────────────────────────
function BotBubble({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, maxWidth: "88%" }}>
      <div style={{
        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg,#7c3aed,#db2777)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, color: "#fff", fontWeight: 800, letterSpacing: "-0.5px",
      }}>S</div>
      <div style={{
        background: "#fff",
        border: "1px solid #ede9fe",
        borderRadius: "6px 16px 16px 16px",
        padding: "11px 15px",
        fontSize: 14,
        color: "#1e1b4b",
        lineHeight: 1.6,
        boxShadow: "0 2px 8px rgba(124,58,237,0.07)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", left: 0, top: 8, bottom: 8,
          width: 3, borderRadius: "0 2px 2px 0",
          background: "linear-gradient(to bottom,#7c3aed,#db2777)",
        }} />
        <div style={{ paddingLeft: 6 }}>
          <RichText text={text} />
        </div>
      </div>
    </div>
  );
}

// ── User Message Bubble ───────────────────────────────────────────────────────
function UserBubble({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{
        maxWidth: "78%",
        background: "linear-gradient(135deg,#7c3aed,#9333ea)",
        borderRadius: "16px 6px 16px 16px",
        padding: "11px 15px",
        fontSize: 14,
        color: "#fff",
        lineHeight: 1.6,
        fontWeight: 500,
        boxShadow: "0 3px 12px rgba(124,58,237,0.35)",
        letterSpacing: "0.01em",
      }}>
        {text}
      </div>
    </div>
  );
}

export function ChatbotWidget({ language }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ready, setReady]       = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lang = (language || "en").slice(0, 2).toLowerCase();
  const t    = translations[lang] || translations.en;

  const token = localStorage.getItem('token');

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  // Load chat history or welcome message on open
  useEffect(() => {
    if (isOpen && !ready) {
      setReady(true);
      
      const loadHistory = async () => {
        if (token) {
          try {
             const res = await fetch(`${API_BASE}/api/chat-history`, {
              headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              if (data && data.length > 0) {
                const formatted = data.map((m: any) => ({
                  text: m.text,
                  isBot: m.role === "bot",
                  timestamp: new Date(m.createdAt)
                }));
                setMessages(formatted);
                return;
              }
            }
          } catch (e) {
            console.error("Failed to load chat history", e);
          }
        }
        
        // Fallback to welcome message if no history loaded
        setMessages([{ text: t.welcome, isBot: true, timestamp: new Date() }]);
      };

      loadHistory();
    }
  }, [isOpen, ready, t.welcome, token]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isTyping) return;

    // Display user message instantly
    const userMsgObj = { text: msg, isBot: false, timestamp: new Date() };
    setMessages(p => [...p, userMsgObj]);
    setInput('');
    setIsTyping(true);

    // Save user message to database in background
    if (token) {
      fetch(`${API_BASE}/api/chat-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ role: "user", text: msg })
      }).catch(err => console.error("Error saving user chat log:", err));
    }

    try {
      const history = messages.map(m => ({ role: m.isBot ? "bot" : "user", text: m.text }));
      const reply = await fetchBotReply(msg, lang, history);

      // Display bot response
      const botMsgObj = { text: reply, isBot: true, timestamp: new Date() };
      setMessages(p => [...p, botMsgObj]);

      // Save bot response to database in background
      if (token) {
        fetch(`${API_BASE}/api/chat-history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ role: "bot", text: reply })
        }).catch(err => console.error("Error saving bot chat log:", err));
      }
    } catch {
      setMessages(p => [...p, { text: t.errorMsg, isBot: true, timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button id="chatbot-open-btn" onClick={() => setIsOpen(true)} aria-label="Open Sakhi AI"
          style={{
            position:"fixed", bottom:24, right:24, zIndex:9999,
            width:56, height:56, borderRadius:"50%", border:"none",
            background:"linear-gradient(135deg,#7c3aed,#db2777)",
            color:"#fff", cursor:"pointer", boxShadow:"0 4px 20px rgba(124,58,237,0.5)",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform="scale(1.12)"}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        >
          <MessageCircle size={24}/>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div id="chatbot-window" style={{
          position:"fixed", bottom:24, right:24, zIndex:9999,
          width:360, maxHeight:"min(540px,calc(100vh - 48px))",
          display:"flex", flexDirection:"column",
          borderRadius:18, overflow:"hidden",
          boxShadow:"0 24px 64px rgba(0,0,0,0.2), 0 0 0 1px rgba(124,58,237,0.15)",
          background:"#f8f5ff",
          fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",
        }}>

          {/* ── Header ── */}
          <div style={{
            padding:"14px 16px", flexShrink:0,
            background:"linear-gradient(135deg,#7c3aed,#db2777)",
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
              <div style={{
                width:40, height:40, borderRadius:"50%",
                background:"rgba(255,255,255,0.2)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:18, fontWeight:800, color:"#fff",
              }}>S</div>
              <div>
                <div style={{fontWeight:700, color:"#fff", fontSize:15}}>{t.title}</div>
                <div style={{fontSize:11, color:"rgba(255,255,255,0.85)", marginTop:1}}>
                  <span style={{display:"inline-block", width:7, height:7, borderRadius:"50%",
                    background:"#4ade80", marginRight:5, verticalAlign:"middle"}}/>
                  {t.subtitle}
                </div>
              </div>
            </div>
            <button id="chatbot-close-btn" onClick={() => setIsOpen(false)} aria-label="Close"
              style={{
                width:36, height:36, borderRadius:"50%",
                border:"2px solid rgba(255,255,255,0.7)",
                background:"rgba(255,255,255,0.18)", color:"#fff", cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:18, fontWeight:700, lineHeight:1, flexShrink:0,
                transition:"background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.35)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.18)"}
            >✕</button>
          </div>

          {/* ── Messages ── */}
          <div style={{
            flex:1, overflowY:"auto", padding:"16px 14px 8px",
            display:"flex", flexDirection:"column", gap:14,
          }}>
            {messages.map((msg, i) =>
              msg.isBot
                ? <BotBubble key={i} text={msg.text} />
                : <UserBubble key={i} text={msg.text} />
            )}

            {/* Quick chips — only after welcome */}
            {messages.length === 1 && !isTyping && (
              <div style={{display:"flex", flexDirection:"column", gap:7, paddingLeft:40}}>
                {t.quickResponses.map((qr: string, i: number) => (
                  <button key={i} onClick={() => send(qr)} style={{
                    textAlign:"left", background:"#fff",
                    border:"1.5px solid #ddd6fe", borderRadius:12,
                    padding:"8px 14px", fontSize:13, color:"#5b21b6",
                    cursor:"pointer", fontWeight:500,
                    transition:"all 0.15s", boxShadow:"0 1px 4px rgba(124,58,237,0.06)",
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background="#ede9fe";
                      e.currentTarget.style.borderColor="#7c3aed";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background="#fff";
                      e.currentTarget.style.borderColor="#ddd6fe";
                    }}
                  >{qr}</button>
                ))}
              </div>
            )}

            {isTyping && <TypingDots label={t.thinking}/>}
            <div ref={bottomRef}/>
          </div>

          {/* ── Emergency button ── */}
          <div style={{padding:"8px 14px 4px", background:"#fff", flexShrink:0, borderTop:"1px solid #ede9fe"}}>
            <button id="chatbot-emergency-btn" onClick={() => window.open("tel:112")}
              style={{
                width:"100%", padding:"9px 14px",
                background:"linear-gradient(135deg,#fef2f2,#fff1f2)",
                border:"1.5px solid #fca5a5", borderRadius:12,
                color:"#b91c1c", cursor:"pointer", fontSize:13, fontWeight:700,
                display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                transition:"background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background="linear-gradient(135deg,#fee2e2,#ffe4e6)"}
              onMouseLeave={e => e.currentTarget.style.background="linear-gradient(135deg,#fef2f2,#fff1f2)"}
            >
              <ShieldAlert size={15}/>{t.emergency}
            </button>
          </div>

          {/* ── Input ── */}
          <div style={{
            padding:"10px 14px 12px", background:"#fff", flexShrink:0,
            display:"flex", gap:9, alignItems:"center",
          }}>
            <input id="chatbot-input"
              placeholder={t.placeholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==="Enter" && !e.shiftKey && send()}
              disabled={isTyping}
              style={{
                flex:1, padding:"10px 16px",
                border:"1.5px solid #ddd6fe", borderRadius:24,
                fontSize:14, color:"#1e1b4b", background:"#f5f3ff",
                outline:"none", transition:"border-color 0.2s",
              }}
              onFocus={e => e.currentTarget.style.borderColor="#7c3aed"}
              onBlur={e => e.currentTarget.style.borderColor="#ddd6fe"}
            />
            <button id="chatbot-send-btn" onClick={() => send()}
              disabled={isTyping || !input.trim()} aria-label="Send"
              style={{
                width:42, height:42, borderRadius:"50%", border:"none", flexShrink:0,
                background: input.trim() ? "linear-gradient(135deg,#7c3aed,#db2777)" : "#ede9fe",
                color: input.trim() ? "#fff" : "#a78bfa",
                cursor: input.trim() ? "pointer" : "not-allowed",
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow: input.trim() ? "0 3px 10px rgba(124,58,237,0.4)" : "none",
                transition:"all 0.2s",
              }}
            >
              {isTyping ? <Loader2 size={17} style={{animation:"spin 1s linear infinite"}}/> : <Send size={17}/>}
            </button>
          </div>

          <div style={{textAlign:"center", padding:"2px 0 8px", fontSize:11, color:"#c4b5fd", background:"#fff"}}>
            Powered by Google Gemini ✨
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        #chatbot-window *::-webkit-scrollbar{width:4px}
        #chatbot-window *::-webkit-scrollbar-thumb{background:#ddd6fe;border-radius:4px}
        #chatbot-window *::-webkit-scrollbar-track{background:transparent}
      `}</style>
    </>
  );
}