/**
 * useVoiceRecognition.ts
 * ─────────────────────
 * A reusable React hook that wraps the browser Web Speech API.
 *
 * Features:
 *  - start() / stop() control
 *  - Live interim + final transcript
 *  - Codeword detection with onCodewordDetected callback
 *  - Sends final transcript to backend /api/voice for logging
 *  - Supports language, continuous, and interimResults options
 */

import { useState, useRef, useCallback, useEffect } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export interface VoiceRecognitionOptions {
  /** BCP-47 language tag, e.g. "en-US", "hi-IN". Defaults to "en-US". */
  lang?: string;
  /** Keep listening after each phrase. Defaults to true. */
  continuous?: boolean;
  /** Return interim (in-progress) results. Defaults to true. */
  interimResults?: boolean;
  /** Codeword to watch for (lowercased comparison). */
  codeword?: string;
  /** Called when the codeword is detected in a transcript. */
  onCodewordDetected?: () => void;
  /** Called on every final transcript segment. */
  onTranscript?: (text: string) => void;
  /** Backend URL to POST transcripts to. */
  apiUrl?: string;
}

export interface VoiceRecognitionState {
  /** Whether recognition is currently active. */
  isListening: boolean;
  /** Accumulated transcript from the current session. */
  transcript: string;
  /** Interim (not-yet-finalised) text being recognised right now. */
  interimTranscript: string;
  /** Last error message, if any. */
  error: string | null;
  /** Whether the browser supports the Web Speech API. */
  isSupported: boolean;
}

export interface VoiceRecognitionControls {
  /** Start listening. */
  start: () => void;
  /** Stop listening. */
  stop: () => void;
  /** Clear the accumulated transcript. */
  resetTranscript: () => void;
}

export type UseVoiceRecognitionReturn = VoiceRecognitionState &
  VoiceRecognitionControls;

// ── Helper: post transcript to backend ───────────────────────────────────────

async function logTranscriptToBackend(
  text: string,
  lang: string,
  apiUrl: string
) {
  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId") || null,
        transcript: text,
        language: lang,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    // Non-blocking – log silently
    console.warn("[VoiceRecognition] Failed to log transcript:", err);
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useVoiceRecognition(
  options: VoiceRecognitionOptions = {}
): UseVoiceRecognitionReturn {
  const {
    lang = "en-US",
    continuous = true,
    interimResults = true,
    codeword,
    onCodewordDetected,
    onTranscript,
    apiUrl = "http://localhost:5000/api/voice",
  } = options;

  // ── Check browser support ──────────────────────────────────────────────────
  const SpeechRecognitionAPI =
    typeof window !== "undefined"
      ? (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition
      : null;

  const isSupported = Boolean(SpeechRecognitionAPI);

  // ── State ──────────────────────────────────────────────────────────────────
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const recognitionRef = useRef<any>(null);
  const shouldRestartRef = useRef(false);

  // Stable ref for the effective codeword (reads localStorage at runtime)
  const codewordRef = useRef(codeword);
  useEffect(() => {
    codewordRef.current = codeword || localStorage.getItem("userCodeword") || "help";
  }, [codeword]);

  const onCodewordDetectedRef = useRef(onCodewordDetected);
  useEffect(() => {
    onCodewordDetectedRef.current = onCodewordDetected;
  }, [onCodewordDetected]);

  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  // ── Build recognition instance ─────────────────────────────────────────────
  const buildRecognition = useCallback(() => {
    if (!isSupported) return null;

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
      // Auto-restart if still wanted (handles browser auto-stopping)
      if (shouldRestartRef.current) {
        recognition.start();
      }
    };

    recognition.onerror = (event: any) => {
      const msg =
        event.error === "not-allowed"
          ? "Microphone permission denied. Please allow microphone access."
          : event.error === "no-speech"
          ? "No speech detected. Please try again."
          : `Speech recognition error: ${event.error}`;
      setError(msg);
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimText = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0]?.transcript ?? "";
        if (result.isFinal) {
          finalText += text;
        } else {
          interimText += text;
        }
      }

      if (finalText) {
        setTranscript((prev) => prev + " " + finalText);
        onTranscriptRef.current?.(finalText.trim());
        // Log to backend
        logTranscriptToBackend(finalText.trim(), lang, apiUrl);

        // Codeword check
        const kw = (
          codewordRef.current ||
          localStorage.getItem("userCodeword") ||
          "help"
        ).toLowerCase();
        if (finalText.toLowerCase().includes(kw)) {
          onCodewordDetectedRef.current?.();
        }
      }

      if (interimText) {
        setInterimTranscript(interimText);

        // Also check codeword in interim text for faster response
        const kw = (
          codewordRef.current ||
          localStorage.getItem("userCodeword") ||
          "help"
        ).toLowerCase();
        if (interimText.toLowerCase().includes(kw)) {
          onCodewordDetectedRef.current?.();
        }
      }
    };

    return recognition;
  }, [lang, continuous, interimResults, isSupported, apiUrl]);

  // ── Controls ───────────────────────────────────────────────────────────────
  const start = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    const recognition = buildRecognition();
    if (!recognition) return;
    recognitionRef.current = recognition;
    shouldRestartRef.current = true;
    try {
      recognition.start();
    } catch {
      // Already started — ignore
    }
  }, [isSupported, buildRecognition]);

  const stop = useCallback(() => {
    shouldRestartRef.current = false;
    recognitionRef.current?.stop();
    setIsListening(false);
    setInterimTranscript("");
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  // ── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      shouldRestartRef.current = false;
      recognitionRef.current?.stop();
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    start,
    stop,
    resetTranscript,
  };
}
