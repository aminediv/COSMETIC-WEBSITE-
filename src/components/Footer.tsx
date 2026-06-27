import React from 'react';

interface FooterProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
  showToast: (msg: string, type: 'success' | 'favorite' | 'info') => void;
}

export default function Footer({ setCurrentView, setSelectedCategory, showToast }: FooterProps) {
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Warm welcome to our ritual! Exclusive botanical secrets sent.', 'info');
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Copyright */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-sage-800 mb-4">L'Essence Botanique</h2>
            <p className="font-sans text-xs md:text-sm text-muted-gray leading-relaxed max-w-xs">
              Elevating skincare through the ancient wisdom of Moroccan botanicals. Pure, organic, and ethically sourced.
            </p>
          </div>
          <p className="font-sans text-[11px] text-muted-gray/80 mt-8 md:mt-16 leading-relaxed">
            © 2026 L'Essence Botanique.
            <br />
            Moroccan Heritage, Modern Luxury.
          </p>
        </div>

        {/* Navigation: Shop */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-charcoal mb-2">Shop</h3>
          <button
            onClick={() => navigateToCategory('all')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            All Products
          </button>
          <button
            onClick={() => navigateToCategory('facial-oils')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            Facial Care
          </button>
          <button
            onClick={() => navigateToCategory('body-ritual')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            Body Rituals
          </button>
          <button
            onClick={() => navigateToCategory('all')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            Gifts & Sets
          </button>
        </div>

        {/* Navigation: Information */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-charcoal mb-2">
            Information
          </h3>
          <button
            onClick={() => navigateToView('faq')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            Shipping & Returns
          </button>
          <button
            onClick={() => navigateToView('faq')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => navigateToView('about')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            Sustainability
          </button>
          <button
            onClick={() => navigateToView('contact')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            Wholesale / Stockists
          </button>
          <button
            onClick={() => navigateToView('about')}
            className="text-left font-sans text-sm text-muted-gray hover:text-sage-800 transition-colors"
          >
            Press Room
          </button>
        </div>

        {/* Column 3: Newsletter SignUp */}
        <div>
          <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-charcoal mb-4">
            Join Our Ritual
          </h3>
          <p className="font-sans text-xs md:text-sm text-muted-gray leading-relaxed mb-6">
            Subscribe to receive holistic skincare guides, exclusive product reveals, and Atlas garden stories.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-pure-white border border-cream-300 rounded-full px-5 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors w-full"
              required
            />
            <button
              type="submit"
              className="bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-md shadow-sage-800/10"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
