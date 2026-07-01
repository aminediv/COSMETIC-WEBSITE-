import React from 'react';
import { Mail, Phone, MapPin, Check, Send, Sparkles } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactViewProps {
  showToast: (msg: string, type: 'success' | 'favorite' | 'info') => void;
  language: 'en' | 'fr';
}

export default function ContactView({ showToast, language }: ContactViewProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    consultation: false,
    subject: 'general',
    message: '',
  });

  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast(
        language === 'en' ? 'Please fill out your name, email, and message.' : 'Veuillez remplir votre nom, votre e-mail et votre message.', 
        'info'
      );
      return;
    }

    setIsSent(true);
    try {
      // Save to Firestore
      await addDoc(collection(db, 'contact_messages'), {
        name: formData.name,
        email: formData.email,
        consultation: formData.consultation,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      showToast(
        language === 'en' ? 'Botanical message sent! A skincare specialist will contact you.' : 'Message botanique envoyé ! Un spécialiste des soins de la peau vous contactera.', 
        'info'
      );
      setFormData({
        name: '',
        email: '',
        consultation: false,
        subject: 'general',
        message: '',
      });
    } catch (err) {
      console.error('Error saving contact message:', err);
      showToast(
        language === 'en' ? 'An error occurred while sending your message. Please try again.' : 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.',
        'info'
      );
    } finally {
      setIsSent(false);
    }
  };

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-16 text-center">
        <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-sage-800 mb-2 block">
          {language === 'en' ? 'Apothecary Communications' : 'Communications Apothicaires'}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-medium tracking-tight mb-4">
          {language === 'en' ? (
            "Connect With L'Essence"
          ) : (
            <>Connectez<span className="font-sans">-</span>vous avec L'Essence</>
          )}
        </h1>
        <p className="font-sans text-xs md:text-sm text-muted-gray max-w-xl mx-auto leading-relaxed">
          {language === 'en' 
            ? 'Reach out for personalized botanical routine guidance, wholesale opportunities, or to inquire about our partner cooperative cooperatives.'
            : 'Contactez-nous pour des conseils personnalisés sur votre routine botanique, des opportunités de vente en gros ou pour vous renseigner sur nos coopératives partenaires.'}
        </p>
        <div className="w-12 h-[1px] bg-sage-800/35 mx-auto mt-8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Side: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-cream-300/15 shadow-md shadow-sage-800/[0.01]">
          <h2 className="font-serif text-2xl text-charcoal mb-8 font-medium">
            {language === 'en' ? 'Send Botanical Message' : 'Envoyer un Message Botanique'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  {language === 'en' ? 'Full Name *' : 'Nom Complet *'}
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
                  {language === 'en' ? 'Email Address *' : 'Adresse Email *'}
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
                {language === 'en' ? 'Inquiry Topic' : 'Sujet de la Demande'}
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-warm-white/40 border border-cream-300 rounded-xl px-4 py-3.5 font-sans text-xs font-semibold focus:outline-none focus:border-sage-600 transition-colors cursor-pointer"
              >
                <option value="general">{language === 'en' ? 'General Skincare Inquiries' : 'Questions Générales sur les Soins de la Peau'}</option>
                <option value="consultation">{language === 'en' ? 'Personal Skincare Routine Consultation' : 'Consultation de Routine de Soins Personnalisée'}</option>
                <option value="wholesale">{language === 'en' ? 'Wholesale & Stockist Application' : 'Demande de Vente en Gros et Point de Vente'}</option>
                <option value="press">{language === 'en' ? 'Press & Collaborations' : 'Presse & Collaborations'}</option>
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
                <span className="font-semibold text-sage-950 block">
                  {language === 'en' ? 'Request Holistic Skincare Consultation' : 'Demander une Consultation de Soins Holistique'}
                </span>
                <span className="text-muted-gray">
                  {language === 'en' ? 'Our aesthetician will curate a custom routine of Moroccan elixirs.' : 'Notre esthéticienne créera une routine personnalisée d\'élixirs marocains.'}
                </span>
              </div>
            </label>

            {/* Message Body */}
            <div>
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                {language === 'en' ? 'Your Message *' : 'Votre Message *'}
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={language === 'en' ? "How may we guide your botanical routine journey?" : "Comment pouvons-nous guider votre routine botanique ?"}
                className="w-full bg-warm-white/40 border border-cream-300 rounded-xl px-4 py-3.5 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSent}
              className="w-full bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all duration-300 hover:scale-[1.01] shadow-xl shadow-sage-800/10 flex items-center justify-center gap-2"
            >
              {isSent ? (
                <span>{language === 'en' ? 'Casting message to reserves...' : 'Envoi du message en cours...'}</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> {language === 'en' ? 'Dispatch Message' : 'Envoyer le Message'}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Stockists / Store Locations & Maps placeholder */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          {/* General Details card */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-cream-200 space-y-6">
            <h3 className="font-serif text-xl text-charcoal font-medium">
              {language === 'en' ? 'The Botanical Atelier' : 'L\'Atelier Botanique'}
            </h3>
            
            <div className="space-y-4 font-sans text-xs leading-relaxed text-muted-gray">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-charcoal">
                    {language === 'en' ? 'Marrakesh Atelier & Head Office' : 'Atelier et Siège à Marrakech'}
                  </h4>
                  <p>78 Derb El Hammam, Medina, Marrakesh 40000, Morocco</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-charcoal">
                    {language === 'en' ? 'Electronic Sourcing Letters' : 'Lettres de Sourçage Électroniques'}
                  </h4>
                  <p>atelier@lessencebotanique.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-charcoal">
                    {language === 'en' ? 'Voice Consultations' : 'Consultations Vocales'}
                  </h4>
                  <p>+212 (0) 524 44 89 90 — Mon–Fri, 9:00 to 17:00 (GMT+1)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calming Visual Map Vector Styled Card */}
          <div className="rounded-3xl border border-cream-300 overflow-hidden relative aspect-[4/3] bg-cream-200 shadow-sm flex items-center justify-center">
            {/* Map styling representation */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#1b1c1a_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-[40%] left-[30%] w-24 h-[1px] bg-sage-800 rotate-12" />
            <div className="absolute top-[45%] left-[25%] w-16 h-[1px] bg-sage-800 -rotate-45" />
            <div className="absolute top-[50%] left-[50%] w-4 h-4 rounded-full bg-sage-800/25 border border-sage-800 animate-ping" />
            <div className="absolute top-[50%] left-[50%] w-2.5 h-2.5 rounded-full bg-sage-800 shadow-md" />
            
            <span className="relative z-10 font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 bg-white px-4 py-2 rounded-full border border-cream-300/50 shadow-sm">
              MEDINA DE MARRAKESH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
