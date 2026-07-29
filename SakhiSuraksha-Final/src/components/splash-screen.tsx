import React, { useEffect, useCallback } from 'react';
import { Shield, Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Auto-transition after 2.5 seconds
    const timer = setTimeout(handleComplete, 2500);
    return () => clearTimeout(timer);
  }, [handleComplete]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg,  #cf8c8cff,  #a05f6bff, #672a2dff)',
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo Container */}
        <div className="mb-8 opacity-0" style={{ animation: 'scale-in 0.6s ease-out forwards' }}>
          <div className="relative">
            {/* Logo Background */}
            <div className="relative bg-white rounded-full p-8 shadow-2xl">
              <Shield className="w-16 h-16 text-red-500" />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-2 opacity-0" style={{ animation: 'fade-in-up 0.6s ease-out 0.3s forwards' }}>
          <h1 className="text-white text-4xl sm:text-5xl tracking-tight">
            Sakhi Suraksha
          </h1>
          <div className="h-1 w-24 bg-white/50 rounded-full mx-auto" />
        </div>

        {/* Tagline */}
        <p
          className="text-white/90 text-xl sm:text-2xl mt-4 opacity-0"
          style={{ animation: 'fade-in-up 0.6s ease-out 0.6s forwards' }}
        >
          Your True Sakhi
        </p>

        {/* Subtitle */}
        <p
          className="text-white/70 mt-2 max-w-sm opacity-0"
          style={{ animation: 'fade-in-up 0.6s ease-out 0.9s forwards' }}
        >
          A trusted companion for your safety and support
        </p>

        {/* Loading Indicator */}
        <div className="mt-12 opacity-0" style={{ animation: 'fade-in-up 0.6s ease-out 1.2s forwards' }}>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleComplete}
          className="mt-8 text-white/60 hover:text-white text-sm transition-colors opacity-0"
          style={{ animation: 'fade-in-up 0.6s ease-out 1.5s forwards' }}
        >
          Tap to continue
        </button>
      </div>
    </div>
  );
}



