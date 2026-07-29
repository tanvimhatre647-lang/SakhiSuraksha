import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { User, Mail, Lock, Phone, X, AlertCircle } from 'lucide-react';
import { API_BASE } from "../lib/api";

interface AuthFormsProps {
  language: string;
  isOpen: boolean;
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
  onSuccess?: () => void;
  isInitialRegistration?: boolean;
}

const translations = {
  en: {
    login: "Login",
    register: "Create Account",
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    codeWord: "Safety Code Word",
    codeWordHint: "This word will trigger emergency mode when spoken",
    loginButton: "Login",
    registerButton: "Create Account",
    switchToRegister: "Don't have an account? Register",
    switchToLogin: "Already have an account? Login",
    privacy: "Your data is encrypted and secure"
  },
  hi: {
    login: "लॉगिन",
    register: "खाता बनाएं",
    name: "पूरा नाम",
    email: "ईमेल",
    phone: "फोन नंबर",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    codeWord: "सुरक्षा कोड वर्ड",
    codeWordHint: "यह शब्द बोलने पर आपातकालीन मोड चालू हो जाएगा",
    loginButton: "लॉगिन करें",
    registerButton: "खाता बनाएं",
    switchToRegister: "खाता नहीं है? रजिस्टर करें",
    switchToLogin: "पहले से खाता है? लॉगिन करें",
    privacy: "आपका डेटा एन्क्रिप्टेड और सुरक्षित है"
  },
  ta: {
    login: "உள்நுழைவு",
    register: "கணக்கு உருவாக்கவும்",
    name: "முழு பெயர்",
    email: "மின்னஞ்சல்",
    phone: "தொலைபேசி எண்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    codeWord: "பாதுகாப்பு குறியீட்டு வார்த்தை",
    codeWordHint: "இந்த வார்த்தையை சொன்னால் அவசர முறை தொடங்கும்",
    loginButton: "உள்நுழைவு",
    registerButton: "கணக்கு உருவாக்கவும்",
    switchToRegister: "கணக்கு இல்லையா? பதிவு செய்யுங்கள்",
    switchToLogin: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைவு",
    privacy: "உங்கள் தரவு குறியாக்கம் செய்யப்பட்டு பாதுகாப்பானது"
  },
  bn: {
    login: "লগইন",
    register: "অ্যাকাউন্ট তৈরি করুন",
    name: "সম্পূর্ণ নাম",
    email: "ইমেইল",
    phone: "ফোন নম্বর",
    password: "পাসওয়ার্ড",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    codeWord: "নিরাপত্তা কোড শব্দ",
    codeWordHint: "এই শব্দটি বললে জরুরি মোড চালু হবে",
    loginButton: "লগইন",
    registerButton: "অ্যাকাউন্ট তৈরি করুন",
    switchToRegister: "অ্যাকাউন্ট নেই? নিবন্ধন করুন",
    switchToLogin: "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন",
    privacy: "আপনার ডেটা এনক্রিপ্ট করা এবং নিরাপদ"
  },
  mr: {
    login: "लॉगिन",
    register: "खाते तयार करा",
    name: "पूर्ण नाव",
    email: "ईमेल",
    phone: "फोन नंबर",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड पुष्टी करा",
    codeWord: "सुरक्षा कोड वर्ड",
    codeWordHint: "हा शब्द बोलल्यावर आपत्कालीन मोड सुरू होईल",
    loginButton: "लॉगिन करा",
    registerButton: "खाते तयार करा",
    switchToRegister: "खाते नाही? नोंदणी करा",
    switchToLogin: "आधीच खाते आहे? लॉगिन करा",
    privacy: "तुमचा डेटा एन्क्रिप्टेड आणि सुरक्षित आहे"
  },
  gu: {
    login: "લૉગિન",
    register: "ખાતું બનાવો",
    name: "પૂરું નામ",
    email: "ઇમેઇલ",
    phone: "ફોન નંબર",
    password: "પાસવર્ડ",
    confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",
    codeWord: "સુરક્ષા કોડ વર્ડ",
    codeWordHint: "આ શબ્દ બોલવાથી કટોકટી મોડ શરૂ થશે",
    loginButton: "લૉગિન",
    registerButton: "ખાતું બનાવો",
    switchToRegister: "ખાતું નથી? નોંધણી કરો",
    switchToLogin: "પહેલેથી ખાતું છે? લૉગિન",
    privacy: "તમારો ડેટા એન્ક્રિપ્ટેડ અને સુરક્ષિત છે"
  }
};

export function AuthForms({ language, isOpen, mode, onClose, onSwitchMode, onSuccess, isInitialRegistration = false }: AuthFormsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    codeWord: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const t = translations[language as keyof typeof translations] || translations.en;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match!');
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const body = mode === 'register' 
        ? {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            codeword: formData.codeWord
          }
        : {
            phone: formData.phone,
            password: formData.password
          };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Store auth session
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userPhone', data.user.phone);
      localStorage.setItem('userCodeword', data.user.codeword);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {isInitialRegistration ? (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Welcome to Sakhi Suraksha
              </h2>
              <p className="text-muted-foreground">
                Create your secure account to access emergency support and safety features
              </p>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">
                {mode === 'login' ? t.login : t.register}
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Email only for register */}
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Phone for both login and register */}
            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="phone"
                  className="pl-10"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codeWord">{t.codeWord}</Label>
                  <Input
                    id="codeWord"
                    className="border-accent"
                    placeholder={t.codeWordHint}
                    value={formData.codeWord}
                    onChange={(e) => setFormData({...formData, codeWord: e.target.value})}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">{t.codeWordHint}</p>
                </div>
              </>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? 'Processing...' : (mode === 'login' ? t.loginButton : t.registerButton)}
            </Button>

            {!isInitialRegistration && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  className="text-accent hover:underline text-sm"
                  onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                  disabled={loading}
                >
                  {mode === 'login' ? t.switchToRegister : t.switchToLogin}
                </button>
              </div>
            )}

            <div className="text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                {t.privacy}
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}