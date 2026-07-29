import React, { useState, useCallback, useRef } from "react";
import { useVoiceRecognition } from "../lib/useVoiceRecognition";

const LABELS: Record<string, Record<string, string>> = {
  en: {
    title: "Voice Recognition",
    subtitle: "Tap the mic and speak clearly",
    startBtn: "Tap to Start",
    stopBtn: "Tap to Stop",
    reset: "Clear",
    copy: "Copy",
    copied: "Copied!",
    placeholder: "Your speech will appear here...",
    listening: "Listening...",
    connecting: "Connecting...",
    ready: "Ready",
    unsupported: "Not supported in this browser",
  },
  hi: {
    title: "वॉयस रिकग्निशन",
    subtitle: "माइक्रोफ़ोन टैप करें और बोलें",
    startBtn: "शुरू करें",
    stopBtn: "रोकें",
    reset: "साफ करें",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया!",
    placeholder: "आपकी आवाज़ यहाँ दिखेगी...",
    listening: "सुन रहा है...",
    connecting: "कनेक्ट हो रहा है...",
    ready: "तैयार",
    unsupported: "इस ब्राउज़र में समर्थित नहीं",
  },
  mr: {
    title: "व्हॉइस रिकग्निशन",
    subtitle: "मायक्रोफोन टॅप करा आणि बोला",
    startBtn: "सुरू करा",
    stopBtn: "थांबवा",
    reset: "साफ करा",
    copy: "कॉपी करा",
    copied: "कॉपी झाले!",
    placeholder: "तुमचे बोलणे येथे दिसेल...",
    listening: "ऐकत आहे...",
    connecting: "कनेक्ट होत आहे...",
    ready: "तयार",
    unsupported: "या ब्राउझरमध्ये समर्थित नाही",
  },
};

const LANG_TO_BCP47: Record<string, string> = {
  en: "en-US", hi: "hi-IN", mr: "mr-IN",
  ta: "ta-IN", te: "te-IN", bn: "bn-IN", gu: "gu-IN", kn: "kn-IN",
};

function MicSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: 28, height: 28 }} aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

interface VoiceRecognitionPanelProps {
  language?: string;
  codeword?: string;
  onCodewordDetected?: () => void;
  className?: string;
}

export function VoiceRecognitionPanel({
  language = "en",
  codeword,
  onCodewordDetected,
  className = "",
}: VoiceRecognitionPanelProps) {
  const lang = language.slice(0, 2).toLowerCase();
  const labels = LABELS[lang] || LABELS["en"];
  const bcp47 = LANG_TO_BCP47[lang] || "en-US";

  const [copied, setCopied] = useState(false);

  // ── Stable "active" state: true after button press, false after explicit stop
  // This never flickers — it stays true even during browser's onend/restart cycle
  const [userWantsListening, setUserWantsListening] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isListening, transcript, interimTranscript, error, isSupported, start, stop, resetTranscript } =
    useVoiceRecognition({ lang: bcp47, continuous: true, interimResults: true, codeword, onCodewordDetected });

  // Visually "active" = user pressed start (stable, ignores brief onend/restart flicker)
  const visuallyActive = userWantsListening;

  const handleToggle = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (userWantsListening) {
      // Stop immediately
      setUserWantsListening(false);
      stop();
    } else {
      // Start — set visual state immediately for instant feedback
      setUserWantsListening(true);
      resetTranscript();
      start();
    }
  }, [userWantsListening, start, stop, resetTranscript]);

  // If there's a real error, sync visual state back
  const hadError = Boolean(error);
  if (hadError && userWantsListening) {
    setUserWantsListening(false);
  }

  const handleCopy = useCallback(() => {
    const text = (transcript + " " + interimTranscript).trim();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [transcript, interimTranscript]);

  const displayText = (transcript + " " + interimTranscript).trim();

  // Status label logic
  const statusLabel = !isSupported
    ? labels.unsupported
    : error
    ? error
    : visuallyActive
    ? (isListening ? labels.listening : labels.connecting)
    : labels.ready;

  const accentColor = visuallyActive ? "#db2777" : "#7c3aed";
  const accentBg = visuallyActive ? "#fdf2f8" : "#f5f3ff";
  const accentBorder = visuallyActive ? "#fbcfe8" : "#ddd6fe";

  return (
    <div
      id="voice-recognition-panel"
      className={className}
      style={{
        maxWidth: 480,
        margin: "0 auto",
        borderRadius: 24,
        background: "#fff",
        border: "1px solid rgba(124,58,237,0.15)",
        boxShadow: "0 8px 40px rgba(124,58,237,0.1)",
        padding: "2rem 1.75rem",
        fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <h3 style={{
          fontSize: "1.2rem", fontWeight: 800, margin: "0 0 0.3rem",
          background: "linear-gradient(135deg,#7c3aed,#db2777)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          🎙 {labels.title}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#9ca3af", margin: 0 }}>{labels.subtitle}</p>
      </div>

      {/* Mic button in fixed-size container — nothing shifts */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "1rem", marginBottom: "1.5rem",
      }}>
        <div style={{
          position: "relative",
          width: 120, height: 120,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Outer ring — CSS opacity transition only, no mount/unmount */}
          <span style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "rgba(219,39,119,0.1)",
            opacity: visuallyActive ? 1 : 0,
            // Only animate keyframes when active; otherwise just sit invisible
            animation: visuallyActive ? "vRing1 1.8s ease-out infinite" : "none",
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }} />
          {/* Inner ring */}
          <span style={{
            position: "absolute", inset: 8, borderRadius: "50%",
            background: "rgba(124,58,237,0.07)",
            opacity: visuallyActive ? 1 : 0,
            animation: visuallyActive ? "vRing2 1.8s ease-out infinite 0.5s" : "none",
            transition: "opacity 0.5s ease 0.1s",
            pointerEvents: "none",
          }} />

          {/* Mic button */}
          <button
            id="voice-recognition-toggle-btn"
            onClick={handleToggle}
            disabled={!isSupported}
            aria-label={visuallyActive ? labels.stopBtn : labels.startBtn}
            style={{
              width: 72, height: 72,
              borderRadius: "50%",
              border: "none",
              cursor: isSupported ? "pointer" : "not-allowed",
              position: "relative", zIndex: 1,
              color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: visuallyActive
                ? "linear-gradient(135deg,#db2777,#be185d)"
                : "linear-gradient(135deg,#7c3aed,#9333ea)",
              boxShadow: visuallyActive
                ? "0 0 0 6px rgba(219,39,119,0.15), 0 6px 24px rgba(219,39,119,0.35)"
                : "0 4px 20px rgba(124,58,237,0.4)",
              transform: visuallyActive ? "scale(1.07)" : "scale(1)",
              // All visual changes are CSS transitions — no jank
              transition: [
                "background 0.4s ease",
                "box-shadow 0.4s ease",
                "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              ].join(", "),
            }}
          >
            <MicSVG />
          </button>
        </div>

        {/* Status pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          background: accentBg,
          border: `1.5px solid ${accentBorder}`,
          borderRadius: 999,
          padding: "5px 16px",
          minWidth: 150,
          justifyContent: "center",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
            background: error ? "#f97316" : accentColor,
            transition: "background 0.4s ease",
            animation: visuallyActive ? "vDot 1.4s ease-in-out infinite" : "none",
          }} />
          <span style={{
            fontSize: 13, fontWeight: 600,
            color: error ? "#c2410c" : accentColor,
            transition: "color 0.4s ease",
            whiteSpace: "nowrap",
          }}>
            {statusLabel}
          </span>
        </div>

        {/* Label — fades colour only, no layout change */}
        <p style={{
          margin: 0, fontSize: 13, fontWeight: 500,
          color: visuallyActive ? "#be185d" : "#9ca3af",
          transition: "color 0.4s ease",
        }}>
          {visuallyActive ? labels.stopBtn : labels.startBtn}
        </p>
      </div>

      {/* Transcript box */}
      <div
        id="voice-transcript-display"
        aria-live="polite"
        style={{
          background: "#f8f5ff",
          border: `1.5px solid ${visuallyActive ? "#fbcfe8" : "#ddd6fe"}`,
          borderRadius: 14,
          padding: "0.875rem 1rem",
          minHeight: 90,
          maxHeight: 160,
          overflowY: "auto",
          marginBottom: "1rem",
          fontSize: 14,
          lineHeight: 1.65,
          color: displayText ? "#1e1b4b" : "#9ca3af",
          wordBreak: "break-word",
          transition: "border-color 0.4s ease",
        }}
      >
        {displayText || labels.placeholder}
        {visuallyActive && interimTranscript && (
          <span style={{ color: "#db2777", fontStyle: "italic", opacity: 0.8 }}>
            {" "}{interimTranscript}
          </span>
        )}
      </div>

      {/* Clear + Copy */}
      <div style={{ display: "flex", gap: 10 }}>
        <button id="voice-reset-btn" onClick={resetTranscript} disabled={!displayText}
          style={{
            flex: 1, padding: "9px 12px", borderRadius: 10,
            border: "1.5px solid #ddd6fe",
            background: displayText ? "#f5f3ff" : "#fafafa",
            color: displayText ? "#5b21b6" : "#d1d5db",
            cursor: displayText ? "pointer" : "not-allowed",
            fontSize: 13, fontWeight: 600, transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { if (displayText) e.currentTarget.style.background = "#ede9fe"; }}
          onMouseLeave={e => { e.currentTarget.style.background = displayText ? "#f5f3ff" : "#fafafa"; }}
        >
          ✕ {labels.reset}
        </button>
        <button id="voice-copy-btn" onClick={handleCopy} disabled={!displayText}
          style={{
            flex: 1, padding: "9px 12px", borderRadius: 10,
            border: `1.5px solid ${copied ? "#bbf7d0" : "#fbcfe8"}`,
            background: copied ? "#f0fdf4" : displayText ? "#fdf2f8" : "#fafafa",
            color: copied ? "#15803d" : displayText ? "#be185d" : "#d1d5db",
            cursor: displayText ? "pointer" : "not-allowed",
            fontSize: 13, fontWeight: 600, transition: "all 0.2s ease",
          }}
        >
          {copied ? `✓ ${labels.copied}` : `⎘ ${labels.copy}`}
        </button>
      </div>

      <style>{`
        @keyframes vRing1 {
          0%   { transform: scale(0.8); opacity: 0.55; }
          100% { transform: scale(1.95); opacity: 0; }
        }
        @keyframes vRing2 {
          0%   { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes vDot {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.35); }
        }
        #voice-recognition-toggle-btn:hover:not(:disabled) {
          filter: brightness(1.08);
        }
      `}</style>
    </div>
  );
}
