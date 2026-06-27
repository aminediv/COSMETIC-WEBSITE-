import React from 'react';
import { Menu, X, Heart, ShoppingBag, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
}

export default function Header({
  currentView,
  setCurrentView,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  favoritesCount,
  onOpenCart,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const navLinks = [
    { label: 'Collections', view: 'shop', category: 'all' },
    { label: 'Facial Care', view: 'shop', category: 'facial-oils' },
    { label: 'Body Rituals', view: 'shop', category: 'body-ritual' },
    { label: 'Our Story', view: 'about', category: '' },
    { label: 'Stockists', view: 'contact', category: '' },
  ];

  const handleNavClick = (view: string, category?: string) => {
    if (view === 'shop' && category) {
      setSelectedCategory(category);
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-20 relative">
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
              {/* Account Profile link */}
              <button
                onClick={() => handleNavClick('account')}
                className={`text-sage-800 hover:text-sage-600 transition-transform hover:scale-110 p-1 relative ${
                  currentView === 'account' ? 'text-sage-600' : ''
                }`}
                aria-label="Personal space"
              >
                <User className="w-[19px] h-[19px]" />
              </button>

              {/* Favorites Wishlist */}
              <button
                onClick={() => handleNavClick('account')}
                className="text-sage-800 hover:text-sage-600 transition-transform hover:scale-110 p-1 relative"
                aria-label="Wishlist"
              >
                <Heart className="w-[19px] h-[19px]" />
                {favoritesCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-red-400 text-white font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-warm-white"
                  >
                    {favoritesCount}
                  </motion.span>
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
                    className="absolute -top-1.5 -right-1.5 bg-sage-600 text-warm-white font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-warm-white"
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
              className="fixed inset-y-0 left-0 w-80 bg-warm-white shadow-2xl z-[70] md:hidden flex flex-col h-full"
              id="mobile-drawer"
            >
              <div className="p-6 border-b border-cream-300/30 flex justify-between items-center">
                <div>
                  <h2 className="font-serif text-lg font-bold text-sage-800">L'Essence Botanique</h2>
                  <p className="font-sans text-[10px] tracking-wider uppercase text-muted-gray mt-0.5">
                    Organic Moroccan Beauty
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
                  Home Rituals
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
                  onClick={() => handleNavClick('faq')}
                  className="w-full text-left font-sans text-sm font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors py-2 block"
                >
                  Botanical FAQ
                </button>
                <button
                  onClick={() => handleNavClick('account')}
                  className="w-full text-left font-sans text-sm font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors py-2 block"
                >
                  My Profile
                </button>
              </nav>

              {/* Bottom login section */}
              <div className="p-6 border-t border-cream-300/30 bg-cream-100">
                <button
                  onClick={() => handleNavClick('account')}
                  className="w-full bg-sage-800 text-warm-white text-xs font-semibold tracking-widest uppercase py-3.5 rounded-full hover:bg-sage-600 transition-colors duration-300 shadow-md shadow-sage-800/10"
                >
                  Sign In / Register
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
