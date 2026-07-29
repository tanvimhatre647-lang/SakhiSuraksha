import React, { useState, useMemo } from 'react';
import { Card } from './ui/card.js';
import { Button } from './ui/button.js';
import { Input } from './ui/input.js';
import { Textarea } from './ui/textarea.js';
import { ArrowLeft, MessageSquare, Phone, MapPin, Send, Info, ShieldCheck } from 'lucide-react';

interface SMSHelperProps {
  language: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Emergency SMS Helper",
    subtitle: "Prepare emergency messages for offline situations",
    recipientNumber: "Emergency Contact Number",
    recipientPlaceholder: "Enter phone number (+91...)",
    messageTitle: "Emergency Message",
    messagePlaceholder: "Type your emergency message here...",
    locationTitle: "Include Location",
    locationPlaceholder: "Current location or address",
    quickMessages: "Quick Message Templates",
    templates: [
      "Emergency! Need immediate help. Please contact police.",
      "In danger. Please send help to my location.",
      "Urgent assistance required. Please call emergency services.",
      "Help needed immediately. Please contact authorities."
    ],
    instructions: "How to use:",
    steps: [
      "Fill in your emergency contact number",
      "Choose a template or write your message",
      "Add your location if needed",
      "Review your message",
      "When emergency occurs, send SMS directly"
    ],
    sendNow: "Send Emergency Alert",
    note: "Note: This will immediately send emergency alert to authorities",
    connecting: "Connecting to 100/Police...",
    connectingSubtitle: "Emergency services are being contacted",
    helpOnWay: "Help is on the way!",
    helpOnWaySubtitle: "Emergency services have been notified and are responding",
    stayCalm: "Stay calm and safe. Help will arrive soon.",
    messageFormat: "Emergency Alert:\n{message}\n\nLocation: {location}\n\nSent via Sakhi Suraksha Emergency System"
  },
  hi: {
    title: "आपातकालीन एसएमएस सहायक",
    subtitle: "ऑफलाइन स्थितियों के लिए आपातकालीन संदेश तैयार करें",
    recipientNumber: "आपातकालीन संपर्क नंबर",
    recipientPlaceholder: "फोन नंबर दर्ज करें (+91...)",
    messageTitle: "आपातकालीन संदेश",
    messagePlaceholder: "यहाँ अपना आपातकालीन संदेश लिखें...",
    locationTitle: "स्थान शामिल करें",
    locationPlaceholder: "वर्तमान स्थान या पता",
    quickMessages: "त्वरित संदेश टेम्प्लेट",
    templates: [
      "आपातकाल! तत्काल सहायता चाहिए। कृपया पुलिस से संपर्क करें।",
      "खतरे में हूँ। कृपया मेरे स्थान पर मदद भेजें।",
      "तत्काल सहायता आवश्यक। कृपया आपातकालीन सेवाओं को कॉल करें।",
      "तुरंत मदद चाहिए। कृपया अधिकारियों से संपर्क करें।"
    ],
    instructions: "उपयोग कैसे करें:",
    steps: [
      "अपना आपातकालीन संपर्क नंबर भरें",
      "एक टेम्प्लेट चुनें या अपना संदेश लिखें",
      "यदि आवश्यक हो तो अपना स्थान जोड़ें",
      "अपना संदेश समीक्षा करें",
      "आपातकाल के समय, सीधे एसएमएस भेजें"
    ],
    sendNow: "आपातकालीन अलर्ट भेजें",
    note: "नोट: यह तुरंत अधिकारियों को आपातकालीन अलर्ट भेजेगा",
    connecting: "100/पुलिस से कनेक्ट हो रहा है...",
    connectingSubtitle: "आपातकालीन सेवाओं से संपर्क किया जा रहा है",
    helpOnWay: "मदद आ रही है!",
    helpOnWaySubtitle: "आपातकालीन सेवाओं को सूचित कर दिया गया है और वे जवाब दे रहे हैं",
    stayCalm: "शांत और सुरक्षित रहें। मदद जल्द आएगी।",
    messageFormat: "आपातकालीन अलर्ट:\n{message}\n\nस्थान: {location}\n\nसखी सुरक्षा आपातकालीन सिस्टम के माध्यम से भेजा गया"
  },
  ta: {
    title: "அவசர SMS உதவியாளர்",
    subtitle: "ஆஃப்லைன் சூழ்நிலைகளுக்கு அவசர செய்திகளை தயார் செய்யுங்கள்",
    recipientNumber: "அவசர தொடர்பு எண்",
    recipientPlaceholder: "தொலைபேசி எண்ணை உள்ளிடவும் (+91...)",
    messageTitle: "அவசர செய்தி",
    messagePlaceholder: "உங்கள் அவசர செய்தியை இங்கே தட்டச்சு செய்யுங்கள்...",
    locationTitle: "இடத்தை சேர்க்கவும்",
    locationPlaceholder: "தற்போதைய இடம் அல்லது முகவரி",
    quickMessages: "விரைவு செய்தி வார்ப்புருக்கள்",
    templates: [
      "அவசரம்! உடனடி உதவி தேவை। தயவுசெய்து காவல்துறையை தொடர்பு கொள்ளுங்கள்.",
      "ஆபத்தில் உள்ளேன். தயவுசெய்து என் இடத்திற்கு உதவி அனுப்புங்கள்.",
      "அவசர உதவி தேவை. தயவுசெய்து அவசர சேவைகளை அழைக்கவும்.",
      "உடனடி உதவி தேவை. தயவுசெய்து அதிகாரிகளை தொடர்பு கொள்ளுங்கள்."
    ],
    instructions: "எப்படி பயன்படுத்துவது:",
    steps: [
      "உங்கள் அவசர தொடர்பு எண்ணை நிரப்பவும்",
      "ஒரு வார்ப்புருவை தேர்ந்தெடுக்கவும் அல்லது உங்கள் செய்தியை எழுதவும்",
      "தேவைப்பட்டால் உங்கள் இடத்தை சேர்க்கவும்",
      "உங்கள் செய்தியை மதிப்பாய்வு செய்யுங்கள்",
      "அவசரம் ஏற்படும்போது, நேரடியாக SMS அனுப்பவும்"
    ],
    copyMessage: "முழு செய்��ியை நகலெடுக்கவும்",
    sendNow: "இப்போதே அனுப்பவும் (இணைக்கப்பட்டிருந்தால்)",
    note: "குறிப்பு: இணையம் கிடைக்காதபோது கைமுறையாக அனுப்புவதற்கு உங்கள் செய்தியை தயார் செய்கிறது",
    copied: "செய்தி கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது!",
    connecting: "100/காவல்துறையுடன் இணைக்கிறது...",
    connectingSubtitle: "அவசர சேவைகளை தொடர்பு கொள்ளப்படுகிறது",
    helpOnWay: "உதவி வழியில் உள்ளது!",
    helpOnWaySubtitle: "அவசர சேவைகளுக்கு அறிவிக்கப்பட்டு அவர்கள் பதிலளிக்கிறார்கள்",
    stayCalm: "அமைதியாகவும் பாதுகாப்பாகவும் இருங்கள். உதவி விரைவில் வரும்.",
    messageFormat: "அவசர எச்சரிக்கை:\n{message}\n\nஇடம்: {location}\n\nசகி சுரக்ஷா அவசர அமைப்பு மூலம் அனுப்பப்பட்டது"
  },
  bn: {
    title: "জরুরি SMS সহায়ক",
    subtitle: "অফলাইন পরিস্থিতির জন্য জরুরি বার্তা প্রস্তুত করুন",
    recipientNumber: "জরুরি যোগাযোগের নম্বর",
    recipientPlaceholder: "ফোন নম্বর লিখুন (+91...)",
    messageTitle: "জরুরি বার্তা",
    messagePlaceholder: "এখানে আপনার জরুরি বার্তা লিখুন...",
    locationTitle: "অবস্থান অন্তর্ভুক্ত করুন",
    locationPlaceholder: "বর্তমান অবস্থান বা ঠিকানা",
    quickMessages: "দ্রুত বার্তা টেমপ্লেট",
    templates: [
      "জরুরি! তাৎক্ষণিক সাহায্য দরকার। অনুগ্রহ করে পুলিশের সাথে যোগাযোগ করুন।",
      "বিপদে আছি। অনুগ্রহ করে আমার অবস্থানে সাহায্য পাঠান।",
      "জরুরি সহায়তা প্রয়োজন। অনুগ্রহ করে জরুরি সেবায় কল করুন।",
      "তাৎক্ষণিক সাহায্য দরকার। অনুগ্রহ করে কর্তৃপক্ষের সাথে যোগাযোগ করুন।"
    ],
    instructions: "কীভাবে ব্যবহার করবেন:",
    steps: [
      "আপনার জরুরি যোগাযোগের নম্বর পূরণ করুন",
      "একটি টেমপ্লেট নির্বাচন করুন বা আপনার বার্তা লিখুন",
      "প্রয়োজনে আপনার অবস্থান যোগ করুন",
      "আপনার বার্তা পর্যালোচনা করুন",
      "জরুরি অবস্থায়, সরাসরি SMS পাঠান"
    ],
    sendNow: "জরুরি সতর্কতা পাঠান",
    note: "নোট: এটি তৎক্ষণাৎ কর্তৃপক্ষের কাছে জরুরি সতর্কতা পাঠাবে",
    connecting: "১০০/পুলিশের সাথে সংযোগ করা হচ্ছে...",
    connectingSubtitle: "জরুরি সেবার সাথে যোগাযোগ করা হচ্ছে",
    helpOnWay: "সাহায্য পথে আসছে!",
    helpOnWaySubtitle: "জরুরি সেবাকে জানানো হয়েছে এবং তারা সাড়া দিচ্ছে",
    stayCalm: "শান্ত ও নিরাপদ থাকুন। সাহায্য শীঘ্রই আসবে।",
    messageFormat: "জরুরি সতর্কতা:\n{message}\n\nঅবস্থান: {location}\n\nসখী সুরক্ষা জরুরি সিস্টেমের মাধ্যমে পাঠানো"
  },
  mr: {
    title: "आपत्कालीन SMS सहाय्यक",
    subtitle: "ऑफलाइन परिस्थितींसाठी आपत्कालीन संदेश तयार करा",
    recipientNumber: "आपत्कालीन संपर्क क्रमांक",
    recipientPlaceholder: "फोन नंबर टाका (+91...)",
    messageTitle: "आपत्कालीन संदेश",
    messagePlaceholder: "तुमचा आपत्कालीन संदेश येथे टाइप करा...",
    locationTitle: "स्थान समाविष्ट करा",
    locationPlaceholder: "सध्याचे स्थान किंवा पत्ता",
    quickMessages: "त्वरित संदेश टेम्प्लेट",
    templates: [
      "आपत्काल! तात्काळ मदत हवी. कृपया पोलिसांशी संपर्क साधा.",
      "धोक्यात आहे. कृपया माझ्या ठिकाणी मदत पाठवा.",
      "तातडीची मदत आवश्यक. कृपया आपत्कालीन सेवांना कॉल करा.",
      "तात्काळ मदत हवी. कृपया अधिकाऱ्यांशी संपर्क साधा."
    ],
    instructions: "कसे वापरावे:",
    steps: [
      "तुमचा आपत्कालीन संपर्क क्रमांक भरा",
      "टेम्प्लेट निवडा किंवा तुमचा संदेश लिहा",
      "आवश्यक असल्यास तुमचे स्थान जोडा",
      "तुमचा संदेश पुनरावलोकन करा",
      "आपत्काल झाल्यावर, थेट SMS पाठवा"
    ],
    sendNow: "आपत्कालीन इशारा पाठवा",
    note: "नोंद: हे तात्काळ अधिकाऱ्यांना आपत्कालीन इशारा पाठवेल",
    connecting: "१००/पोलिसांशी जोडणी करत आहे...",
    connectingSubtitle: "आपत्कालीन सेवांशी संपर्क साधला जात आहे",
    helpOnWay: "मदत येत आहे!",
    helpOnWaySubtitle: "आपत्कालीन सेवांना सूचित केले आहे आणि ते प्रतिसाद देत आहेत",
    stayCalm: "शांत आणि सुरक्षित राहा. मदत लवकरच येईल.",
    messageFormat: "आपत्कालीन इशारा:\n{message}\n\nस्थान: {location}\n\nसखी सुरक्षा आपत्कालीन सिस्टमद्वारे पाठवले"
  },
  gu: {
    title: "કટોકટી SMS સહાયક",
    subtitle: "ઓફલાઇન પરિસ્થિતિઓ માટે કટોકટીના સંદેશા તૈયાર કરો",
    recipientNumber: "કટોકટી સંપર્ક નંબર",
    recipientPlaceholder: "ફોન નંબર દાખલ કરો (+91...)",
    messageTitle: "કટોકટીનો સંદેશો",
    messagePlaceholder: "અહીં તમારો કટોકટીનો સંદેશો ટાઇપ કરો...",
    locationTitle: "સ્થાન સામેલ કરો",
    locationPlaceholder: "વર્તમાન સ્થાન અથવા સરનામું",
    quickMessages: "ઝડપી સંદેશ ટેમ્પ્લેટ",
    templates: [
      "કટોકટી! તાત્કાલિક મદદ જોઈએ. કૃપા કરીને પોલીસનો સંપર્ક કરો.",
      "ખતરામાં છું. કૃપા કરીને મારા સ્થાને મદદ મોકલો.",
      "તાત્કાલિક સહાય જરૂરી. કૃપા કરીને કટોકટી સેવાઓને કૉલ કરો.",
      "તાત્કાલિક મદદ જોઈએ. કૃપા કરીને અધિકારીઓનો સંપર્ક કરો."
    ],
    instructions: "કેવી રીતે ઉપયોગ કરવો:",
    steps: [
      "તમારો કટોકટી સંપર્ક નંબર ભરો",
      "ટેમ્પ્લેટ પસંદ કરો અથવા તમારો સંદેશો લખો",
      "જરૂર હોય તો તમારું સ્થાન ઉમેરો",
      "સંપૂર્ણ સંદેશો કૉપિ કરો",
      "કટોકટી આવે ત્યારે, SMS દ્વારા પેસ્ટ કરીને મોકલો"
    ],
    copyMessage: "સંપૂર્ણ સંદેશો કૉપિ કરો",
    sendNow: "હવે મોકલો (જો કનેક્ટ થયેલ હોય)",
    note: "નોંધ: ઇન્ટરનેટ ઉપલબ્ધ ન હોય ત્યારે મેન્યુઅલ મોકલવા માટે તમારો સંદેશો તૈયાર ���રે છે",
    copied: "સંદેશો ક્લિપબોર્ડ પર કૉપિ થયો!",
    connecting: "100/પોલીસ સાથે જોડાઈ રહ્યા છીએ...",
    connectingSubtitle: "કટોકટી સેવાઓનો સંપર્ક કરવામાં આવી રહ્યો છે",
    helpOnWay: "મદદ આવી રહી છે!",
    helpOnWaySubtitle: "કટોકટી સેવાઓને જાણ કરવામાં આવી છે અને તેઓ પ્રતિસાદ આપી રહ્યા છે",
    stayCalm: "શાંત અને સુરક્ષિત રહો. મદદ જલ્દી આવશે.",
    messageFormat: "કટોકટી ચેતવણી:\n{message}\n\nસ્થાન: {location}\n\nસખી સુરક્ષા કટોકટી સિસ્ટમ દ્વારા મોકલાયેલ"
  }
};

export function SMSHelper({ language, onBack }: SMSHelperProps) {
  const [recipientNumber, setRecipientNumber] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');

  const [isConnecting, setIsConnecting] = useState(false);
  const [isHelpOnWay, setIsHelpOnWay] = useState(false);

  const t = useMemo(() => translations[language as keyof typeof translations] || translations.en, [language]);

  const handleTemplateSelect = (template: string) => {
    setMessage(template);
  };

  const formatCompleteMessage = useMemo(() => {
    return t.messageFormat
      .replace('{message}', message)
      .replace('{location}', location || 'Not specified');
  }, [t.messageFormat, message, location]);



  const handleSendNow = () => {
    if (!recipientNumber || !message) {
      return;
    }
    
    // Show connecting state
    setIsConnecting(true);
    
    // Simulate sending SMS without opening browser
    // In a real app, this would call your SMS API
    
    // After 3 seconds, show "help is on the way"
    setTimeout(() => {
      setIsConnecting(false);
      setIsHelpOnWay(true);
    }, 3000);
  };

  // Show help on way screen
  if (isHelpOnWay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">{t.helpOnWay}</h2>
            <p className="text-muted-foreground mb-4">{t.helpOnWaySubtitle}</p>
            <p className="text-primary font-medium">{t.stayCalm}</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Emergency services notified</span>
            </div>
          </div>

          <Button 
            onClick={() => {
              setIsHelpOnWay(false);
              setIsConnecting(false);
            }}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  // Show connecting screen when SMS is being sent
  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
              <Phone className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-2">{t.connecting}</h2>
            <p className="text-muted-foreground">{t.connectingSubtitle}</p>
          </div>
          
          <div className="flex justify-center items-center space-x-2 mb-8">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>

          <Button 
            variant="outline" 
            onClick={() => {
              setIsConnecting(false);
              setIsHelpOnWay(false);
            }}
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-primary">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Instructions Card */}
        <Card className="p-6 border-l-4 border-l-accent">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-accent mb-2">{t.instructions}</h3>
              <ol className="space-y-1">
                {t.steps.map((step, index) => (
                  <li key={index} className="text-muted-foreground flex gap-2">
                    <span className="font-medium text-accent">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message Composition */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-primary" />
                    {t.recipientNumber}
                  </label>
                  <Input
                    value={recipientNumber}
                    onChange={(e) => setRecipientNumber(e.target.value)}
                    placeholder={t.recipientPlaceholder}
                    type="tel"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    {t.messageTitle}
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {t.locationTitle}
                  </label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.locationPlaceholder}
                  />
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleSendNow} 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!recipientNumber || !message}
              >
                <Send className="w-4 h-4 mr-2" />
                {t.sendNow}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground text-sm">{t.note}</p>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-primary mb-4">{t.quickMessages}</h3>
              <div className="space-y-3">
                {t.templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handleTemplateSelect(template)}
                    className="w-full p-3 text-left bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                  >
                    <p className="text-sm">{template}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Message Preview */}
            {message && (
              <Card className="p-6">
                <h3 className="font-semibold text-primary mb-4">Message Preview</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-line">{formatCompleteMessage}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}