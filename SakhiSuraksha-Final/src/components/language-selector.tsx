import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  isOpen: boolean;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];

export function LanguageSelector({ onLanguageSelect, isOpen }: LanguageSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-white">
        <div className="text-center mb-6">
          <Globe className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h2 className="text-2xl mb-2 text-primary">Select Your Language</h2>
          <p className="text-muted-foreground">Choose your preferred language to continue</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="outline"
              className="h-16 flex flex-col gap-1 border-2 hover:border-accent hover:bg-secondary/10"
              onClick={() => onLanguageSelect(lang.code)}
            >
              <span className="font-medium">{lang.name}</span>
              <span className="text-sm text-muted-foreground">{lang.nativeName}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}