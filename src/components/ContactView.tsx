import React from 'react';
import { Mail, Phone, MapPin, Check, Send, Sparkles, BookOpen } from 'lucide-react';

interface ContactViewProps {
  showToast: (msg: string, type: 'success' | 'favorite' | 'info') => void;
}

export default function ContactView({ showToast }: ContactViewProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    consultation: false,
    subject: 'general',
    message: '',
  });

  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out your name, email, and message.', 'info');
      return;
    }

    setIsSent(true);
    setTimeout(() => {
      showToast('Botanical message sent! A skincare specialist will contact you.', 'info');
      setFormData({
        name: '',
        email: '',
        consultation: false,
        subject: 'general',
        message: '',
      });
      setIsSent(false);
    }, 1500);
  };

  const stockists = [
    { name: 'Riad Serene Boutique', address: '12 Derb Chorfa, Medina, Marrakesh, Morocco' },
    { name: 'The Organic Apothecary', address: '78 Westbourne Grove, Notting Hill, London, UK' },
    { name: 'Oasis Wellness', address: '450 Mercer St, SoHo, New York, NY, USA' },
  ];

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-sage-800 mb-2 block">
          Apothecary Communications
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-medium tracking-tight mb-4">
          Connect With L'Essence
        </h1>
        <p className="font-sans text-xs md:text-sm text-muted-gray max-w-xl mx-auto leading-relaxed">
          Reach out for personalized botanical routine guidance, wholesale opportunities, or to inquire about our partner cooperative cooperatives.
        </p>
        <div className="w-12 h-[1px] bg-sage-800/35 mx-auto mt-8" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Contact Form */}
        <div className="lg:col-span-7 bg-pure-white rounded-3xl p-6 md:p-10 border border-cream-300/15 shadow-md shadow-sage-800/[0.01]">
          <h2 className="font-serif text-2xl text-charcoal mb-8 font-medium">Send Botanical Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Yasmine Benjelloun"
                  className="w-full bg-warm-white/40 border border-cream-300 rounded-xl px-4 py-3.5 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="yasmine@oasis.com"
                  className="w-full bg-warm-white/40 border border-cream-300 rounded-xl px-4 py-3.5 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                />
              </div>
            </div>

            {/* Subject Selector */}
            <div>
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                Inquiry Topic
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-warm-white/40 border border-cream-300 rounded-xl px-4 py-3.5 font-sans text-xs font-semibold focus:outline-none focus:border-sage-600 transition-colors cursor-pointer"
              >
                <option value="general">General Skincare Inquiries</option>
                <option value="consultation">Personal Skincare Routine Consultation</option>
                <option value="wholesale">Wholesale & Stockist Application</option>
                <option value="press">Press & Collaborations</option>
              </select>
            </div>

            {/* Consultation toggle */}
            <label className="flex items-center gap-3 p-4 rounded-xl bg-sage-50 border border-sage-200/50 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.consultation}
                onChange={(e) => setFormData({ ...formData, consultation: e.target.checked })}
                className="w-4 h-4 rounded text-sage-800 accent-sage-800"
              />
              <div className="font-sans text-xs">
                <span className="font-semibold text-sage-950 block">Request Holistic Skincare Consultation</span>
                <span className="text-muted-gray">Our aesthetician will curate a custom routine of Moroccan elixirs.</span>
              </div>
            </label>

            {/* Message Body */}
            <div>
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                Your Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How may we guide your botanical routine journey?"
                className="w-full bg-warm-white/40 border border-cream-300 rounded-xl px-4 py-3.5 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSent}
              className="w-full bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all duration-300 hover:scale-[1.01] shadow-xl shadow-sage-800/10 flex items-center justify-center gap-2"
            >
              {isSent ? (
                <span>Casting message to reserves...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Dispatch Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Stockists / Store Locations & Maps placeholder */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          {/* General Details card */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-cream-200 space-y-6">
            <h3 className="font-serif text-xl text-charcoal font-medium">The Botanical Atelier</h3>
            
            <div className="space-y-4 font-sans text-xs leading-relaxed text-muted-gray">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-charcoal">Marrakesh Atelier & Head Office</h4>
                  <p>78 Derb El Hammam, Medina, Marrakesh 40000, Morocco</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-charcoal">Electronic Sourcing Letters</h4>
                  <p>atelier@lessencebotanique.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-charcoal">Voice Consultations</h4>
                  <p>+212 (0) 524 44 89 90 — Mon–Fri, 9:00 to 17:00 (GMT+1)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Boutique Stockists list */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-cream-200 space-y-6">
            <h3 className="font-serif text-xl text-charcoal font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sage-800" /> Exclusive Stockists
            </h3>
            <p className="font-sans text-xs text-muted-gray leading-relaxed">
              Find our physical apothecary jars and organic testers inside carefully selected luxury riads, boutiques, and wellness lounges worldwide.
            </p>
            <div className="space-y-4">
              {stockists.map((st, idx) => (
                <div key={idx} className="border-b border-cream-300/30 pb-3 last:border-b-0 last:pb-0 font-sans text-xs">
                  <h4 className="font-semibold text-charcoal mb-0.5">{st.name}</h4>
                  <p className="text-muted-gray leading-tight">{st.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calming Visual Map Vector Styled Card */}
          <div className="rounded-3xl border border-cream-300 overflow-hidden relative aspect-[4/3] bg-[#EAE8E4] shadow-sm flex items-center justify-center">
            {/* Map styling representation */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#1b1c1a_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-[40%] left-[30%] w-24 h-[1px] bg-sage-800 rotate-12" />
            <div className="absolute top-[45%] left-[25%] w-16 h-[1px] bg-sage-800 -rotate-45" />
            <div className="absolute top-[50%] left-[50%] w-4 h-4 rounded-full bg-sage-800/25 border border-sage-800 animate-ping" />
            <div className="absolute top-[50%] left-[50%] w-2.5 h-2.5 rounded-full bg-sage-800 shadow-md" />
            
            <span className="relative z-10 font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 bg-pure-white px-4 py-2 rounded-full border border-cream-300/50 shadow-sm">
              MEDINA DE MARRAKESH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
