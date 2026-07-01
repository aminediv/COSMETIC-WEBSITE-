import React from 'react';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { locales } from '../locales';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: any;
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  currency: 'MAD' | 'EUR';
  setCurrency: (curr: 'MAD' | 'EUR') => void;
}

export default function Header({
  currentView,
  setCurrentView,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  onOpenCart,
  currentUser,
  language,
  setLanguage,
  currency,
  setCurrency,
}: HeaderProps) {
  const t = locales[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const navLinks = [
    { label: t.nav.collections, view: 'shop', category: 'all' },
    { label: t.nav.stockists, view: 'contact', category: '' },
  ];

  const handleNavClick = (view: string, category?: string) => {
    if (view === 'shop' && category) {
      setSelectedCategory(category);
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccountClick = () => {
      handleNavClick('account');
  };

  const isLinkActive = (link: { view: string; category?: string }) => {
    if (link.view === 'shop') {
      return currentView === 'shop' && selectedCategory === (link.category || 'all');
    }
    return currentView === link.view;
  };

  return (
    <>
      <header className="fixed top-[36px] left-0 w-full z-50 bg-warm-white/80 backdrop-blur-xl border-b border-cream-300/30 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center w-full px-4 md:px-8 lg:px-12 max-w-7xl mx-auto h-20 relative">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-sage-800 hover:text-sage-600 transition-colors p-1"
            aria-label="Open menu"
            id="open-drawer"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Left Navigation links for larger screens (Balanced asymmetric layout) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.slice(0, 3).map((link) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view, link.category)}
                  className={`font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:text-sage-800 hover:scale-105 relative py-1 ${
                    active ? 'text-sage-800' : 'text-muted-gray'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="activeHeaderNav"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-sage-800"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Centered Luxury Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="font-serif text-lg md:text-2xl font-bold tracking-tight text-sage-800 hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              L'Essence Botanique
            </button>
          </div>

          {/* Right Navigation links & Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <nav className="hidden md:flex items-center space-x-8 mr-4">
              {navLinks.slice(3).map((link) => {
                const active = isLinkActive(link);
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.view, link.category)}
                    className={`font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:text-sage-800 hover:scale-105 relative py-1 ${
                      active ? 'text-sage-800' : 'text-muted-gray'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="activeHeaderNav"
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-sage-800"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Language Switcher */}
              <div className="flex items-center space-x-1 font-sans text-[10px] font-bold tracking-widest uppercase">
                <button
                  onClick={() => setLanguage('en')}
                  className={`transition-colors hover:text-sage-600 ${language === 'en' ? 'text-sage-800' : 'text-muted-gray'}`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <span className="text-muted-gray/50">|</span>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`transition-colors hover:text-sage-600 ${language === 'fr' ? 'text-sage-800' : 'text-muted-gray'}`}
                  aria-label="Switch to French"
                >
                  FR
                </button>
              </div>

              {/* Currency Switcher */}
              <div className="flex items-center space-x-1 font-sans text-[10px] font-bold tracking-widest uppercase border-l border-cream-300/60 pl-3 md:pl-4">
                <button
                  onClick={() => setCurrency('MAD')}
                  className={`transition-colors hover:text-sage-600 ${currency === 'MAD' ? 'text-sage-800 font-extrabold' : 'text-muted-gray'}`}
                  aria-label="Switch to MAD"
                >
                  MAD
                </button>
                <span className="text-muted-gray/50">|</span>
                <button
                  onClick={() => setCurrency('EUR')}
                  className={`transition-colors hover:text-sage-600 ${currency === 'EUR' ? 'text-sage-800 font-extrabold' : 'text-muted-gray'}`}
                  aria-label="Switch to EUR"
                >
                  EUR
                </button>
              </div>

              {/* Account Profile link */}
              <button
                onClick={handleAccountClick}
                className={`text-sage-800 hover:text-sage-600 transition-transform hover:scale-110 p-1 relative ${
                  currentView === 'account' ? 'text-sage-600' : ''
                }`}
                aria-label={currentUser ? `Personal space (${currentUser.firstName})` : 'Personal space'}
              >
                <User className="w-[19px] h-[19px]" />
                {currentUser && (
                  <span className="absolute -top-0.5 -right-0.5 bg-sage-800 border border-warm-white w-2 h-2 rounded-full" />
                )}
              </button>

              {/* Shopping Bag */}
              <button
                onClick={onOpenCart}
                className="text-sage-800 hover:text-sage-600 transition-transform hover:scale-110 p-1 relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-[19px] h-[19px]" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-sage-800 text-warm-white font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-warm-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-charcoal z-[60] md:hidden"
            />

            {/* Side menu content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[85vw] max-w-[320px] bg-warm-white shadow-2xl z-[70] md:hidden flex flex-col h-full"
              id="mobile-drawer"
            >
              <div className="p-6 border-b border-cream-300/30 flex justify-between items-center">
                <div>
                  <h2 className="font-serif text-lg font-bold text-sage-800">L'Essence Botanique</h2>
                  <p className="font-sans text-[10px] tracking-wider uppercase text-muted-gray mt-0.5">
                    {t.general.organicMoroccanBeauty}
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-gray hover:text-sage-800 p-1"
                  aria-label="Close menu"
                  id="close-drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 py-8 px-6 space-y-5">
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full text-left font-serif text-xl font-medium text-charcoal hover:text-sage-800 transition-colors py-2 block"
                >
                  {t.general.homeRituals}
                </button>
                <div className="border-b border-cream-300/20 my-2" />
                
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.view, link.category)}
                    className="w-full text-left font-sans text-sm font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors py-2 block"
                  >
                    {link.label}
                  </button>
                ))}
                
                <div className="border-b border-cream-300/20 my-2" />
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleAccountClick();
                  }}
                  className="w-full text-left font-sans text-sm font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors py-2 block cursor-pointer"
                >
                  {currentUser ? `${t.nav.profile} (${currentUser.firstName})` : t.nav.profile}
                </button>
              </nav>

              {/* Mobile Currency & Language Toggle inside drawer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-cream-300/30 font-sans text-[11px] font-bold tracking-widest uppercase bg-cream-50/50">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-gray text-[9px] font-semibold">{language === 'en' ? 'LANG:' : 'LANGUE :'}</span>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`transition-colors hover:text-sage-600 ${language === 'en' ? 'text-sage-800 underline underline-offset-4' : 'text-muted-gray'}`}
                  >
                    EN
                  </button>
                  <span className="text-muted-gray/30">|</span>
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`transition-colors hover:text-sage-600 ${language === 'fr' ? 'text-sage-800 underline underline-offset-4' : 'text-muted-gray'}`}
                  >
                    FR
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-gray text-[9px] font-semibold">{language === 'en' ? 'CURRENCY:' : 'DEVISE :'}</span>
                  <button
                    onClick={() => setCurrency('MAD')}
                    className={`transition-colors hover:text-sage-600 ${currency === 'MAD' ? 'text-sage-800 underline underline-offset-4' : 'text-muted-gray'}`}
                  >
                    MAD
                  </button>
                  <span className="text-muted-gray/30">|</span>
                  <button
                    onClick={() => setCurrency('EUR')}
                    className={`transition-colors hover:text-sage-600 ${currency === 'EUR' ? 'text-sage-800 underline underline-offset-4' : 'text-muted-gray'}`}
                  >
                    EUR
                  </button>
                </div>
              </div>

              {/* Bottom login section */}
              <div className="p-6 border-t border-cream-300/30 bg-cream-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleAccountClick();
                  }}
                  className="w-full bg-sage-800 text-warm-white text-xs font-semibold tracking-widest uppercase py-3.5 rounded-full hover:bg-sage-600 transition-colors duration-300 shadow-md shadow-sage-800/10 cursor-pointer"
                >
                  {currentUser ? t.nav.enterSanctuary : t.nav.signIn}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
