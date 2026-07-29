import React, { useState, useEffect } from "react";
import { Phone, LogOut, ArrowLeft, Plus, Trash2, Heart, ShieldAlert, BadgeInfo, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { API_BASE } from "../lib/api";

interface Contact {
  _id: string;
  name: string;
  phone: string;
  relation: string;
}

interface UserDashboardProps {
  language: string;
  onBack: () => void;
  onLogout: () => void;
}

const translations: Record<string, any> = {
  en: {
    title: "Safety Dashboard",
    back: "Back to Home",
    hello: "Welcome back",
    phone: "Mobile Number",
    codeword: "SOS Codeword",
    safetyContacts: "Trusted Emergency Contacts",
    noContacts: "You haven't added any emergency contacts yet. Add contacts below to receive SOS alerts.",
    addContact: "Add New Contact",
    contactName: "Contact Name",
    contactPhone: "Phone Number",
    relation: "Relation (e.g., Sister, Mother, Friend)",
    adding: "Saving...",
    addBtn: "Save Contact",
    deleteBtn: "Delete",
    logout: "Log Out",
    alertSuccess: "Contact added successfully!",
    alertDeleted: "Contact removed.",
  },
  hi: {
    title: "सुरक्षा डैशबोर्ड",
    back: "होम पर वापस जाएं",
    hello: "आपका स्वागत है",
    phone: "मोबाइल नंबर",
    codeword: "SOS कोडवर्ड",
    safetyContacts: "भरोसेमंद आपातकालीन संपर्क",
    noContacts: "आपने अभी तक कोई आपातकालीन संपर्क नहीं जोड़ा है। SOS अलर्ट प्राप्त करने के लिए नीचे संपर्क जोड़ें।",
    addContact: "नया संपर्क जोड़ें",
    contactName: "संपर्क का नाम",
    contactPhone: "फ़ोन नंबर",
    relation: "संबंध (जैसे: बहन, माँ, दोस्त)",
    adding: "सहेजा जा रहा है...",
    addBtn: "संपर्क सहेजें",
    deleteBtn: "हटाएं",
    logout: "लॉग आउट",
    alertSuccess: "संपर्क सफलतापूर्वक जोड़ा गया!",
    alertDeleted: "संपर्क हटा दिया गया।",
  },
  mr: {
    title: "सुरक्षा डॅशबोर्ड",
    back: "होमवर परत जा",
    hello: "स्वागत आहे",
    phone: "मोबाईल नंबर",
    codeword: "SOS कोडवर्ड",
    safetyContacts: "विश्वासू आपत्कालीन संपर्क",
    noContacts: "तुम्ही अद्याप कोणतेही आपत्कालीन संपर्क जोडलेले नाहीत. SOS अलर्ट मिळवण्यासाठी खाली संपर्क जोडा.",
    addContact: "नवीन संपर्क जोडा",
    contactName: "संपर्काचे नाव",
    contactPhone: "फोन नंबर",
    relation: "नाते (उदा. बहीण, आई, मित्र)",
    adding: "जतन करत आहे...",
    addBtn: "संपर्क जतन करा",
    deleteBtn: "हटवा",
    logout: "लॉग आउट",
    alertSuccess: "संपर्क यशस्वीरित्या जोडला गेला!",
    alertDeleted: "संपर्क काढून टाकला.",
  },
  ta: {
    title: "பாதுகாப்பு டாஷ்போர்டு",
    back: "முகப்புக்குத் திரும்பு",
    hello: "வரவேற்கிறோம்",
    phone: "கைபேசி எண்",
    codeword: "SOS கடவுச்சொல்",
    safetyContacts: "நம்பகமான அவசரகால தொடர்புகள்",
    noContacts: "அவசரகால தொடர்புகள் ஏதும் சேர்க்கப்படவில்லை. SOS விழிப்பூட்டல்களைப் பெற கீழே தொடர்புகளைச் சேர்க்கவும்.",
    addContact: "புதிய தொடர்பைச் சேர்",
    contactName: "தொடர்பு பெயர்",
    contactPhone: "தொலைபேசி எண்",
    relation: "உறவுமுறை (உதாரணமாக: தங்கை, தாய், தோழி)",
    adding: "சேமிக்கிறது...",
    addBtn: "தொடர்பைச் சேமி",
    deleteBtn: "நீக்கு",
    logout: "வெளியேறு",
    alertSuccess: "தொடர்பு வெற்றிகரமாக சேர்க்கப்பட்டது!",
    alertDeleted: "தொடர்பு நீக்கப்பட்டது.",
  },
  bn: {
    title: "সুরক্ষা ড্যাশবোর্ড",
    back: "হোমে ফিরে যান",
    hello: "স্বাগতম",
    phone: "মোবাইল নম্বর",
    codeword: "SOS কোডশব্দ",
    safetyContacts: "বিশ্বস্ত জরুরি যোগাযোগ",
    noContacts: "আপনি এখনও কোনো জরুরি যোগাযোগ যোগ করেননি। SOS অ্যালার্ট পেতে নিচে যোগাযোগ যোগ করুন।",
    addContact: "নতুন যোগাযোগ যোগ করুন",
    contactName: "যোগাযোগের নাম",
    contactPhone: "ফোন নম্বর",
    relation: "সম্পর্ক (যেমন: বোন, মা, বন্ধু)",
    adding: "সংরক্ষণ করা হচ্ছে...",
    addBtn: "যোগাযোগ সংরক্ষণ করুন",
    deleteBtn: "মুছুন",
    logout: "লগ আউট",
    alertSuccess: "যোগাযোগ সফলভাবে যোগ করা হয়েছে!",
    alertDeleted: "যোগাযোগ সরানো হয়েছে।",
  },
};

export function UserDashboard({ language, onBack, onLogout }: UserDashboardProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relation: "" });
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [adding, setAdding] = useState(false);

  const langKey = (language || "en").slice(0, 2).toLowerCase();
  const t = translations[langKey] || translations.en;
  
  const userName = localStorage.getItem("userName") || "User";
  const userPhone = localStorage.getItem("userPhone") || "";
  const userCodeword = localStorage.getItem("userCodeword") || "";

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load contacts");
      const data = await res.json();
      setContacts(data);
      localStorage.setItem("userContacts", JSON.stringify(data.map((c: Contact) => ({ number: c.phone, name: c.name }))));
    } catch (err: any) {
      showNotification("error", err.message || "Error fetching contacts");
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.phone.trim()) return;

    setAdding(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newContact),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save contact");
      }

      setNewContact({ name: "", phone: "", relation: "" });
      showNotification("success", t.alertSuccess);
      await fetchContacts();
    } catch (err: any) {
      showNotification("error", err.message || "Error saving contact");
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to remove contact");
      }

      showNotification("success", t.alertDeleted);
      await fetchContacts();
    } catch (err: any) {
      showNotification("error", err.message || "Error deleting contact");
    }
  };

  const relationText = t.relation || "";
  const relationShort = relationText.split(' ')[0] || "Relation";

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans antialiased text-foreground">
      
      {/* ── Navbar (Matching main Navbar styles) ── */}
      <div className="bg-white border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.back}</span>
          </button>
          
          <h1 className="text-xl font-bold text-primary">
            {t.title}
          </h1>

          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-1" />
            {t.logout}
          </Button>
        </div>
      </div>

      {/* ── Main Layout Grid ── */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* Floating Notification Alerts */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300 ${
            notification.type === "success" 
              ? "bg-green-50 border border-green-200 text-green-800" 
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}>
            {notification.type === "success" ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> : <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />}
            <span className="text-sm font-semibold">{notification.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Column: Profile Card (4 cols) ── */}
          <div className="md:col-span-4 space-y-6">
            <Card className="p-6 border border-border shadow-sm bg-white rounded-xl">
              
              {/* Profile Details */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground">{t.hello}</span>
                <h2 className="text-2xl font-bold text-primary leading-tight">
                  {userName}
                </h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Safety System Active
                </div>
              </div>

              <div className="w-full border-t border-border my-6" />

              {/* Stats Block */}
              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-border">
                  <div className="p-2 bg-primary/10 text-primary rounded-md">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{t.phone}</div>
                    <div className="text-sm font-semibold text-foreground mt-0.5">{userPhone}</div>
                  </div>
                </div>

                {/* Codeword */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-border">
                  <div className="p-2 bg-accent/10 text-accent rounded-md">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{t.codeword}</div>
                    <div className="text-sm font-bold text-accent uppercase tracking-widest mt-0.5">
                      {userCodeword || "Not Set"}
                    </div>
                  </div>
                </div>

              </div>
            </Card>
          </div>

          {/* ── Right Column: Contacts Management (8 cols) ── */}
          <div className="md:col-span-8 space-y-6">
            
            {/* Contacts Card */}
            <Card className="p-6 border border-border shadow-sm bg-white rounded-xl">
              <h2 className="text-xl font-bold text-primary mb-5 flex items-center gap-2 border-b border-border pb-3">
                <Heart className="w-5 h-5 text-accent fill-accent" />
                {t.safetyContacts}
              </h2>

              {loadingContacts ? (
                <div className="text-center py-10 text-muted-foreground font-medium">Loading trusted contacts...</div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-slate-50 text-muted-foreground px-4">
                  <BadgeInfo className="w-8 h-8 mx-auto text-muted-foreground/60 mb-3" />
                  <p className="text-sm leading-relaxed max-w-sm mx-auto">{t.noContacts}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="flex items-center justify-between p-4 bg-slate-50 border border-border rounded-xl hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base shrink-0">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-foreground flex items-center gap-2 flex-wrap">
                            {contact.name}
                            {contact.relation && (
                              <span className="px-2.5 py-0.5 bg-accent/10 text-[10px] text-accent rounded-full font-semibold">
                                {contact.relation}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Phone className="w-3.5 h-3.5" />
                            {contact.phone}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => window.open(`tel:${contact.phone}`)}
                          className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                          title="Call Contact"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="p-2 text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
                          title={t.deleteBtn}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Add Contact Card */}
            <Card className="p-6 border border-border shadow-sm bg-white rounded-xl">
              <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2 border-b border-border pb-3">
                <Plus className="w-5 h-5 text-primary" />
                {t.addContact}
              </h3>

              <form onSubmit={handleAddContact} className="space-y-4">
                
                {/* Contact Name input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.contactName}</label>
                  <input
                    type="text"
                    placeholder="Enter name (e.g. Priya Sharma)"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    required
                    disabled={adding}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-foreground placeholder-muted-foreground font-medium text-sm transition-all"
                  />
                </div>

                {/* Grid for phone and relation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.contactPhone}</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      required
                      disabled={adding}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-foreground placeholder-muted-foreground font-medium text-sm transition-all"
                    />
                  </div>

                  {/* Relation input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{relationShort}</label>
                    <input
                      type="text"
                      placeholder="e.g. Mother, Sister"
                      value={newContact.relation}
                      onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                      disabled={adding}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-foreground placeholder-muted-foreground font-medium text-sm transition-all"
                    />
                  </div>

                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={adding}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {adding ? t.adding : t.addBtn}
                  </Button>
                </div>

              </form>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}
