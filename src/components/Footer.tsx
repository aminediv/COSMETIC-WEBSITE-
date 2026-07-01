import React from 'react';
import { locales } from '../locales';

interface FooterProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
  showToast: (msg: string, type: 'success' | 'favorite' | 'info') => void;
  language: 'en' | 'fr';
}

export default function Footer({ setCurrentView, setSelectedCategory, showToast, language }: FooterProps) {
  const t = locales[language].home;
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast(language === 'en' ? 'Please enter a valid email address.' : 'Veuillez entrer une adresse email valide.', 'info');
      return;
    }

    showToast(t.subscribeSuccess, 'info');
    setIsSubscribed(true);
    setEmail('');
  };

  const navigateToCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToView = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-20 bg-cream-100 border-t border-cream-300/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Copyright */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-sage-800 mb-4">L'Essence Botanique</h2>
            <p className="font-sans text-xs md:text-sm text-muted-gray leading-relaxed max-w-xs">
              {t.footerDesc}
            </p>
          </div>
          <p className="font-sans text-[11px] text-muted-gray/80 mt-8 md:mt-16 leading-relaxed">
            {t.rights}
            <br />
            {locales[language].general.moroccanHeritage}
          </p>
        </div>

        {/* Navigation: Shop */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-charcoal mb-2">{t.explore}</h3>
          <button
            onClick={() => navigateToCategory('all')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            {locales[language].shop.all}
          </button>
          <button
            onClick={() => navigateToCategory('facial-oils')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            {t.facialCare}
          </button>
          <button
            onClick={() => navigateToCategory('body-ritual')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            {t.bodyRituals}
          </button>
          <button
            onClick={() => navigateToCategory('all')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            {t.shopSets}
          </button>
        </div>

        {/* Navigation: Information */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-charcoal mb-2">
            {t.customerCare}
          </h3>
          <button
            onClick={() => navigateToView('contact')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            {t.contact}
          </button>
        </div>

        {/* Column 3: Newsletter SignUp */}
        <div>
          <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-charcoal mb-4">
            {t.newsletter}
          </h3>
          {isSubscribed ? (
            <p className="font-sans text-sm text-sage-800 bg-sage-50 border border-sage-200 p-4 rounded-xl">
              {t.subscribeSuccess}
            </p>
          ) : (
            <>
              <p className="font-sans text-xs md:text-sm text-muted-gray leading-relaxed mb-6">
                {t.newsletterDesc}
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="bg-white border border-cream-300 rounded-full px-5 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-md shadow-sage-800/10"
                >
                  {t.subscribe}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
