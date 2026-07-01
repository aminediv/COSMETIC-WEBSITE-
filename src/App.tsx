import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhyChooseUs from './components/WhyChooseUs';
import Notification from './components/Notification';
import CartDrawer from './components/CartDrawer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import CheckoutView from './components/CheckoutView';
import ContactView from './components/ContactView';
import AccountView from './components/AccountView';
import Helmet from './components/Helmet';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTopButton from './components/BackToTopButton';
import { Product, CartItem } from './types';
import { products } from './data';
import { locales } from './locales';
import { formatPrice } from './utils/price';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [currentView, setCurrentView] = React.useState<string>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/products/')) return 'product';
    if (['/shop', '/checkout', '/contact', '/account'].includes(path)) {
      return path.substring(1);
    }
    return 'home';
  });

  const [language, setLanguage] = React.useState<'en' | 'fr'>(() => {
    const saved = localStorage.getItem('botanique_language');
    return (saved === 'en' || saved === 'fr') ? saved : 'en';
  });

  React.useEffect(() => {
    localStorage.setItem('botanique_language', language);
  }, [language]);

  const [currency, setCurrency] = React.useState<'MAD' | 'EUR'>(() => {
    const saved = localStorage.getItem('botanique_currency');
    return (saved === 'MAD' || saved === 'EUR') ? saved : 'MAD';
  });

  React.useEffect(() => {
    localStorage.setItem('botanique_currency', currency);
  }, [currency]);

  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedProduct, setSelectedProduct] = React.useState<Product>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/products/')) {
      const slug = path.split('/products/')[1];
      const p = products.find(prod => prod.id === slug);
      if (p) return p;
    }
    return products[0];
  });

  const isPopStateRef = React.useRef(false);

  React.useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
      const path = window.location.pathname;
      if (path.startsWith('/products/')) {
        const slug = path.split('/products/')[1];
        const p = products.find(prod => prod.id === slug);
        if (p) setSelectedProduct(p);
        setCurrentView('product');
      } else if (['/shop', '/checkout', '/contact', '/account'].includes(path)) {
        setCurrentView(path.substring(1));
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      return;
    }
    
    let newPath = '/';
    if (currentView === 'product' && selectedProduct) {
      newPath = `/products/${selectedProduct.id}`;
    } else if (currentView !== 'home') {
      newPath = `/${currentView}`;
    }
    
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  }, [currentView, selectedProduct]);

  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>(['argan-oil']); // default favorited argan oil
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'favorite' | 'info' } | null>(null);
  const [currentUser, setCurrentUser] = React.useState<any>(() => {
    const saved = localStorage.getItem('current_botanical_user');
    return saved ? JSON.parse(saved) : null;
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const profileData = userDocSnap.data();
            setCurrentUser(profileData);
            localStorage.setItem('current_botanical_user', JSON.stringify(profileData));
          }
        } catch (err) {
          console.error('Error fetching auth user profile:', err);
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem('current_botanical_user');
      }
    });
    return () => unsubscribe();
  }, []);

  const t = locales[language];

  const showToast = (message: string, type: 'success' | 'favorite' | 'info') => {
    setToast({ message, type });
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(t.toast.addedToCart.replace('{quantity}', quantity.toString()).replace('{name}', language === 'en' ? product.name : (product.nameFr || product.name)), 'success');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast(t.toast.removedFromCart, 'info');
  };

  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const isFav = prev.includes(product.id);
      const prodName = language === 'en' ? product.name : (product.nameFr || product.name);
      if (isFav) {
        showToast(t.toast.removedFavorite.replace('{name}', prodName), 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(t.toast.addedFavorite.replace('{name}', prodName), 'favorite');
        return [...prev, product.id];
      }
    });
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            language={language}
            currency={currency}
          />
        );
      case 'shop':
        return (
          <ShopView
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            language={language}
            currency={currency}
          />
        );
      case 'product':
        return (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            setCurrentView={setCurrentView}
            onSelectProduct={handleSelectProduct}
            language={language}
            currency={currency}
          />
        );
      case 'checkout':
        return (
          <CheckoutView
            cartItems={cart}
            onClearCart={handleClearCart}
            onUpdateQuantity={handleUpdateQuantity}
            setCurrentView={setCurrentView}
            showToast={showToast}
            currentUser={currentUser}
            language={language}
            currency={currency}
          />
        );
      case 'contact':
        return <ContactView showToast={showToast} language={language} />;
      case 'account':
        return (
          <AccountView
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
            showToast={showToast}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            language={language}
            currency={currency}
          />
        );
      default:
        return (
          <HomeView
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            language={language}
            currency={currency}
          />
        );
    }
  };

  const getMetadata = () => {
    switch (currentView) {
      case 'home':
        return language === 'en' ? {
          title: "L'Essence Botanique | Moroccan Slow Beauty & Skincare",
          description: "Experience the luxury of ancient Moroccan skincare. Pure, single-origin argan oils, flower waters, and volcanic clays sourced directly from female-led cooperatives in the Atlas region.",
          ogTitle: "L'Essence Botanique | Moroccan Slow Beauty & Skincare",
          ogDescription: "Experience the luxury of ancient Moroccan skincare. Sourced directly from female-led cooperatives in the Atlas region.",
          ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn1pcAXDbZFCcvn1aMTwkLNG00trPdeilMum9RVDL-T0g7PoqyK6e-pgTm254EDgCCsLI8wlhKJ6Pb8-16YdC5_y_epvkTU9-VO5C__DvckJrnZyIB6Rd9QctTQi1ynOn8qPlhONH2HLSOYJ1ofdpqKN8RIULF-04qniY4WfozDNi9ZnKXn0FjLP50HPxFfKGseZUQbbB2OG-A6sFEhWCtnRfil-Qt0QDbaP3gko8ni6cxB4HPQJtP-nvxr5hp6dHB7zlvE5OonQw",
          ogType: "website"
        } : {
          title: "L'Essence Botanique | Beauté Lente & Soins Marocains",
          description: "Vivez le luxe des soins de la peau marocains ancestraux. Huiles d'argan pures, eaux florales et argiles volcaniques sourcées directement des coopératives dirigées par des femmes dans la région de l'Atlas.",
          ogTitle: "L'Essence Botanique | Beauté Lente & Soins Marocains",
          ogDescription: "Vivez le luxe des soins de la peau marocains ancestraux. Sourcés directement des coopératives de l'Atlas.",
          ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn1pcAXDbZFCcvn1aMTwkLNG00trPdeilMum9RVDL-T0g7PoqyK6e-pgTm254EDgCCsLI8wlhKJ6Pb8-16YdC5_y_epvkTU9-VO5C__DvckJrnZyIB6Rd9QctTQi1ynOn8qPlhONH2HLSOYJ1ofdpqKN8RIULF-04qniY4WfozDNi9ZnKXn0FjLP50HPxFfKGseZUQbbB2OG-A6sFEhWCtnRfil-Qt0QDbaP3gko8ni6cxB4HPQJtP-nvxr5hp6dHB7zlvE5OonQw",
          ogType: "website"
        };
      case 'shop':
        let shopTitle = language === 'en' ? "Shop All Formulations | L'Essence Botanique" : "Acheter Toutes Les Formulations | L'Essence Botanique";
        if (selectedCategory === 'facial-oils') {
          shopTitle = language === 'en' ? "Facial Care Elixirs | L'Essence Botanique" : "Élixirs de Soin du Visage | L'Essence Botanique";
        } else if (selectedCategory === 'clays-masks') {
          shopTitle = language === 'en' ? "Rhassoul Clays & Mineral Masks | L'Essence Botanique" : "Argiles Rhassoul & Masques Minéraux | L'Essence Botanique";
        } else if (selectedCategory === 'body-ritual') {
          shopTitle = language === 'en' ? "Hammam Body Rituals | L'Essence Botanique" : "Rituels de Corps Hammam | L'Essence Botanique";
        }
        return language === 'en' ? {
          title: shopTitle,
          description: "Explore our premium organic, cold-pressed, single-origin Moroccan formulations. Handcrafted in conscious micro-batches for dynamic skin restoration.",
          ogTitle: shopTitle,
          ogDescription: "Explore our premium organic, cold-pressed, single-origin Moroccan formulations handcrafted in conscious micro-batches.",
          ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn1pcAXDbZFCcvn1aMTwkLNG00trPdeilMum9RVDL-T0g7PoqyK6e-pgTm254EDgCCsLI8wlhKJ6Pb8-16YdC5_y_epvkTU9-VO5C__DvckJrnZyIB6Rd9QctTQi1ynOn8qPlhONH2HLSOYJ1ofdpqKN8RIULF-04qniY4WfozDNi9ZnKXn0FjLP50HPxFfKGseZUQbbB2OG-A6sFEhWCtnRfil-Qt0QDbaP3gko8ni6cxB4HPQJtP-nvxr5hp6dHB7zlvE5OonQw",
          ogType: "website"
        } : {
          title: shopTitle,
          description: "Explorez nos formulations marocaines premium, biologiques, pressées à froid. Fabriquées artisanalement en micro-lots conscients pour une restauration dynamique de la peau.",
          ogTitle: shopTitle,
          ogDescription: "Explorez nos formulations marocaines premium, biologiques, pressées à froid, fabriquées artisanalement en micro-lots conscients.",
          ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn1pcAXDbZFCcvn1aMTwkLNG00trPdeilMum9RVDL-T0g7PoqyK6e-pgTm254EDgCCsLI8wlhKJ6Pb8-16YdC5_y_epvkTU9-VO5C__DvckJrnZyIB6Rd9QctTQi1ynOn8qPlhONH2HLSOYJ1ofdpqKN8RIULF-04qniY4WfozDNi9ZnKXn0FjLP50HPxFfKGseZUQbbB2OG-A6sFEhWCtnRfil-Qt0QDbaP3gko8ni6cxB4HPQJtP-nvxr5hp6dHB7zlvE5OonQw",
          ogType: "website"
        };
      case 'product':
        if (!selectedProduct) return {};
        return language === 'en' ? {
          title: `${selectedProduct.name} - ${selectedProduct.subtitle} | L'Essence Botanique`,
          description: `${selectedProduct.description} High-integrity formulation with ${selectedProduct.ingredients.slice(0, 100)}...`,
          ogTitle: `${selectedProduct.name} | ${selectedProduct.subtitle}`,
          ogDescription: selectedProduct.description,
          ogImage: selectedProduct.image,
          ogType: "product"
        } : {
          title: `${selectedProduct.nameFr || selectedProduct.name} - ${selectedProduct.subtitleFr || selectedProduct.subtitle} | L'Essence Botanique`,
          description: `${selectedProduct.descriptionFr || selectedProduct.description} Formulation à haute intégrité avec ${(selectedProduct.ingredientsFr || selectedProduct.ingredients).slice(0, 100)}...`,
          ogTitle: `${selectedProduct.nameFr || selectedProduct.name} | ${selectedProduct.subtitleFr || selectedProduct.subtitle}`,
          ogDescription: selectedProduct.descriptionFr || selectedProduct.description,
          ogImage: selectedProduct.image,
          ogType: "product"
        };
      case 'checkout':
        return language === 'en' ? {
          title: "Secure Checkout | L'Essence Botanique",
          description: "Complete your conscious skincare purchase securely. Direct sourcing ensuring fair trade and living wages for rural Moroccan female agricultural cooperatives.",
          ogTitle: "Secure Checkout | L'Essence Botanique",
          ogDescription: "Complete your conscious skincare purchase securely with ethical sourcing.",
          ogType: "website"
        } : {
          title: "Paiement Sécurisé | L'Essence Botanique",
          description: "Terminez votre achat de soins de la peau conscients en toute sécurité. Un sourçage direct garantissant un commerce équitable.",
          ogTitle: "Paiement Sécurisé | L'Essence Botanique",
          ogDescription: "Terminez votre achat de soins de la peau conscients en toute sécurité avec un sourçage éthique.",
          ogType: "website"
        };
      case 'contact':
        return language === 'en' ? {
          title: "Connect With Our Apothecary Atelier | L'Essence Botanique",
          description: "Reach out for personalized skin consultations, wholesale stockist inquiries, or cooperative sourcing details.",
          ogTitle: "Connect With Our Apothecary Atelier",
          ogDescription: "Reach out for personalized skin consultations, wholesale stockist inquiries, or cooperative sourcing details.",
          ogType: "website"
        } : {
          title: "Contactez Notre Atelier Apothicaire | L'Essence Botanique",
          description: "Contactez-nous pour des consultations de peau personnalisées, des demandes pour revendeurs, ou des détails sur le sourçage.",
          ogTitle: "Contactez Notre Atelier Apothicaire",
          ogDescription: "Contactez-nous pour des consultations de peau personnalisées, des demandes pour revendeurs, ou des détails sur le sourçage.",
          ogType: "website"
        };
      case 'faq':
        return language === 'en' ? {
          title: "Apothecary Knowledge & FAQs | L'Essence Botanique",
          description: "Find answers to frequently asked questions about organic shelf lives, shipping processes, and cooperative support.",
          ogTitle: "Apothecary Knowledge & FAQs | L'Essence Botanique",
          ogDescription: "Find answers to frequently asked questions about organic shelf lives, shipping processes, and cooperative support.",
          ogType: "website"
        } : {
          title: "Savoirs Apothicaires & FAQ | L'Essence Botanique",
          description: "Trouvez des réponses aux questions fréquentes sur la durée de conservation, les processus d'expédition et le soutien aux coopératives.",
          ogTitle: "Savoirs Apothicaires & FAQ | L'Essence Botanique",
          ogDescription: "Trouvez des réponses aux questions fréquentes sur la durée de conservation, les processus d'expédition et le soutien aux coopératives.",
          ogType: "website"
        };
      case 'account':
        return language === 'en' ? {
          title: "Your Saved Oasis & Rituals | L'Essence Botanique",
          description: "Manage your favorite Moroccan formulations, review order shipment timelines, and update your personal skin profile.",
          ogTitle: "Your Saved Oasis & Rituals",
          ogDescription: "Manage your favorite Moroccan formulations, review order shipment timelines, and update your personal skin profile.",
          ogType: "website"
        } : {
          title: "Votre Oasis Sauvegardée & Rituels | L'Essence Botanique",
          description: "Gérez vos formulations marocaines préférées, consultez les délais d'expédition et mettez à jour votre profil de peau.",
          ogTitle: "Votre Oasis Sauvegardée & Rituels",
          ogDescription: "Gérez vos formulations marocaines préférées, consultez les délais d'expédition et mettez à jour votre profil de peau.",
          ogType: "website"
        };
      default:
        return language === 'en' ? {
          title: "L'Essence Botanique | Moroccan Slow Beauty & Skincare",
          description: "Experience the luxury of ancient Moroccan skincare. Sourced directly from sustainable, female-led cooperatives in the Atlas region.",
          ogTitle: "L'Essence Botanique",
          ogDescription: "Experience the luxury of ancient Moroccan skincare. Sourced directly from sustainable, female-led cooperatives in the Atlas region.",
          ogType: "website"
        } : {
          title: "L'Essence Botanique | Beauté Lente & Soins Marocains",
          description: "Vivez le luxe des soins de la peau marocains ancestraux. Sourcés directement des coopératives durables dirigées par des femmes dans l'Atlas.",
          ogTitle: "L'Essence Botanique",
          ogDescription: "Vivez le luxe des soins de la peau marocains ancestraux. Sourcés directement des coopératives durables dirigées par des femmes dans l'Atlas.",
          ogType: "website"
        };
    }
  };

  const { title, description, ogTitle, ogDescription, ogImage, ogType } = getMetadata();

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      {/* Helmet SEO metadata */}
      <Helmet
        title={title}
        description={description}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        ogImage={ogImage}
        ogType={ogType}
      />
      {/* Top Banner alert */}
      <div className="fixed top-0 left-0 w-full h-[36px] bg-sage-800 text-warm-white font-sans text-[8.5px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase px-4 text-center font-bold z-50 flex items-center justify-center">
        {language === 'en' 
          ? `Free Carbon-Neutral Shipping On Conscious Orders Over ${formatPrice(75, currency, language)}`
          : `Livraison neutre en carbone offerte dès ${formatPrice(75, currency, language)} d'achat`}
      </div>

      {/* Persistent Navigation Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Main View Area with transition effects */}
      <main className="flex-grow pt-[116px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Why Choose Us Section */}
      <WhyChooseUs language={language} />

      {/* Persistent Luxury Footer */}
      <Footer
        setCurrentView={setCurrentView}
        setSelectedCategory={setSelectedCategory}
        showToast={showToast}
        language={language}
      />

      {/* Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutClick}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        language={language}
        currency={currency}
      />

      {/* Interactive Micro-toasts alerts notifications */}
      <AnimatePresence>
        {toast && (
          <Notification
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
