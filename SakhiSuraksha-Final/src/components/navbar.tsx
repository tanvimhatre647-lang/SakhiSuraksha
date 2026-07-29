import React from 'react';
import { Shield, Menu, X, AlertTriangle, User, UserPlus, Globe, Phone, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface NavbarProps {
  language: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onPanicMode: () => void;
  onChangeLanguage: () => void;
  onEmergencyContacts?: () => void;
  onDashboard: () => void;
  onLogout: () => void;
}

const translations = {
  en: {
    brand: "Sakhi Suraksha",
    login: "Login",
    register: "Register",
    panic: "Panic Mode",
    menu: "Menu",
    close: "Close",
    emergency: "Emergency: 100",
    help: "Get Help",
    about: "About",
    features: "Features",
    download: "Download",
    contacts: "Emergency Contacts",
    dashboard: "Dashboard",
    logout: "Logout"
  },
  hi: {
    brand: "सखी सुरक्षा",
    login: "लॉगिन",
    register: "रजिस्टर करें",
    panic: "पैनिक मोड",
    menu: "मेन्यू",
    close: "बंद करें",
    emergency: "आपातकाल: 100",
    help: "मदद पाएं",
    about: "हमारे बारे में",
    features: "विशेषताएं",
    download: "डाउनलोड करें",
    contacts: "आपातकालीन संपर्क",
    dashboard: "डैशबोर्ड",
    logout: "लॉग आउट"
  },
  ta: {
    brand: "சகி சுரக்ஷா",
    login: "உள்நுழைவு",
    register: "பதிவு செய்யுங்கள்",
    panic: "பீதி பயம் முறை",
    menu: "மெனு",
    close: "மூடு",
    emergency: "அவசரம்: 100",
    help: "உதவி பெறுங்கள்",
    about: "எங்களைப் பற்றி",
    features: "அம்சங்கள்",
    download: "பதிவிறக்கம்",
    contacts: "அவசரகால தொடர்புகள்",
    dashboard: "டாஷ்போர்டு",
    logout: "வெளியேறு"
  },
  bn: {
    brand: "সখী সুরক্ষা",
    login: "লগইন",
    register: "নিবন্ধন করুন",
    panic: "প্যানিক মোড",
    menu: "মেনু",
    close: "বন্ধ করুন",
    emergency: "জরুরি: ১০০",
    help: "সাহায্য নিন",
    about: "আমাদের সম্পর্কে",
    features: "বৈশিষ্ট্য",
    download: "ডাউনলোড",
    contacts: "জরুরি যোগাযোগ",
    dashboard: "ড্যাশবোর্ড",
    logout: "লগ আউট"
  },
  mr: {
    brand: "सखी सुरक्षा",
    login: "लॉगिन",
    register: "नोंदणी करा",
    panic: "पॅनिक मोड",
    menu: "मेनू",
    close: "बंद करा",
    emergency: "आपत्कालीन: १००",
    help: "मदत घ्या",
    about: "आमच्याबद्दल",
    features: "वैशिष्ट्ये",
    download: "डाउनलोड करा",
    contacts: "आपत्कालीन संपर्क",
    dashboard: "डॅशबोर्ड",
    logout: "लॉग आउट"
  },
  gu: {
    brand: "સખી સુરક્ષા",
    login: "લૉગિન",
    register: "નોંધણી કરો",
    panic: "પેનિક મોડ",
    menu: "મેનુ",
    close: "બંધ કરો",
    emergency: "કટોકटी: ૧૦૦",
    help: "મદદ મેળવો",
    about: "અમારા વિશે",
    features: "સુવિધાઓ",
    download: "ડાઉનલોડ કરો",
    contacts: "કટોકટી સંપર્કો",
    dashboard: "ડેશબોર્ડ",
    logout: "લોગ આઉટ"
  }
};

export function Navbar({ language, isLoggedIn, onLogin, onRegister, onPanicMode, onChangeLanguage, onEmergencyContacts, onDashboard, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language as keyof typeof translations] || translations.en;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleEmergencyContacts = () => {
    if (onEmergencyContacts) {
      onEmergencyContacts();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('root')}>
            <div className="bg-primary p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">{t.brand}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {onEmergencyContacts && (
              <button 
                onClick={handleEmergencyContacts}
                className="text-destructive hover:text-destructive/80 transition-colors flex items-center gap-1 font-semibold"
              >
                <Phone className="w-4 h-4" />
                {t.contacts}
              </button>
            )}
            <button 
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {t.features}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {t.about}
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {t.download}
            </button>
          </div>



          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onChangeLanguage}
              className="text-muted-foreground hover:text-primary"
            >
              <Globe className="w-4 h-4" />
            </Button>
            
            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDashboard}
                  className="border-purple-600 text-purple-700 hover:bg-purple-50"
                >
                  <LayoutDashboard className="w-4 h-4 mr-1" />
                  {t.dashboard}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {t.logout}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogin}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <User className="w-4 h-4 mr-1" />
                  {t.login}
                </Button>
                
                <Button
                  size="sm"
                  onClick={onRegister}
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  {t.register}
                </Button>
              </>
            )}
            
            <Button
              size="sm"
              onClick={onPanicMode}
              className="bg-destructive hover:bg-destructive/90 text-white animate-pulse"
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              {t.panic}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-4">


            {/* Navigation Links */}
            <div className="space-y-2">
              {onEmergencyContacts && (
                <button 
                  onClick={handleEmergencyContacts}
                  className="flex items-center gap-2 w-full text-left py-2 text-destructive hover:text-destructive/80 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t.contacts}
                </button>
              )}
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                {t.features}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                {t.about}
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                {t.download}
              </button>
            </div>

            {/* Action Buttons - Mobile */}
            <div className="space-y-2 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={onChangeLanguage}
                className="w-full justify-start text-muted-foreground hover:text-primary"
              >
                <Globe className="w-4 h-4 mr-2" />
                Change Language
              </Button>
              
              {isLoggedIn ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start border-purple-600 text-purple-700"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    {t.dashboard}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-rose-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t.logout}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start border-primary text-primary"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t.login}
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => {
                      onRegister();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start bg-accent text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {t.register}
                  </Button>
                </>
              )}
              
              <Button
                size="sm"
                onClick={() => {
                  onPanicMode();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start bg-destructive text-white animate-pulse"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                {t.panic}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}