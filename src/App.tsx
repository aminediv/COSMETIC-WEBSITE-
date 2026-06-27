import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import CartDrawer from './components/CartDrawer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import CheckoutView from './components/CheckoutView';
import BlogView from './components/BlogView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import FAQView from './components/FAQView';
import AccountView from './components/AccountView';
import Helmet from './components/Helmet';
import { Product, CartItem, Article } from './types';
import { products } from './data';

export default function App() {
  const [currentView, setCurrentView] = React.useState<string>('home');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedProduct, setSelectedProduct] = React.useState<Product>(products[0]);
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>(['argan-oil']); // default favorited argan oil
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'favorite' | 'info' } | null>(null);

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
    showToast(`Added ${quantity}x ${product.name} to your botanical bag.`, 'success');
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
    showToast('Removed formulation from your botanical bag.', 'info');
  };

  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const isFav = prev.includes(product.id);
      if (isFav) {
        showToast(`Removed "${product.name}" from saved favorites.`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Stored "${product.name}" in saved favorites.`, 'favorite');
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

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        );
      case 'shop':
        return (
          <ShopView
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
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
            onSelectProduct={setSelectedProduct}
          />
        );
      case 'checkout':
        return (
          <CheckoutView
            cartItems={cart}
            onClearCart={handleClearCart}
            setCurrentView={setCurrentView}
            showToast={showToast}
          />
        );
      case 'blog':
        return (
          <BlogView
            showToast={showToast}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
          />
        );
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView showToast={showToast} />;
      case 'faq':
        return <FAQView />;
      case 'account':
        return (
          <AccountView
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={setSelectedProduct}
            setCurrentView={setCurrentView}
          />
        );
      default:
        return (
          <HomeView
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        );
    }
  };

  const getMetadata = () => {
    switch (currentView) {
      case 'home':
        return {
          title: "L'Essence Botanique | Moroccan Slow Beauty & Skincare",
          description: "Experience the luxury of ancient Moroccan skincare. Pure, single-origin argan oils, flower waters, and volcanic clays sourced directly from female-led cooperatives in the Atlas region.",
          ogTitle: "L'Essence Botanique | Moroccan Slow Beauty & Skincare",
          ogDescription: "Experience the luxury of ancient Moroccan skincare. Sourced directly from female-led cooperatives in the Atlas region.",
          ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn1pcAXDbZFCcvn1aMTwkLNG00trPdeilMum9RVDL-T0g7PoqyK6e-pgTm254EDgCCsLI8wlhKJ6Pb8-16YdC5_y_epvkTU9-VO5C__DvckJrnZyIB6Rd9QctTQi1ynOn8qPlhONH2HLSOYJ1ofdpqKN8RIULF-04qniY4WfozDNi9ZnKXn0FjLP50HPxFfKGseZUQbbB2OG-A6sFEhWCtnRfil-Qt0QDbaP3gko8ni6cxB4HPQJtP-nvxr5hp6dHB7zlvE5OonQw",
          ogType: "website"
        };
      case 'shop':
        let shopTitle = "Shop All Formulations | L'Essence Botanique";
        if (selectedCategory === 'facial-oils') {
          shopTitle = "Facial Care Elixirs | L'Essence Botanique";
        } else if (selectedCategory === 'clays-masks') {
          shopTitle = "Rhassoul Clays & Mineral Masks | L'Essence Botanique";
        } else if (selectedCategory === 'body-ritual') {
          shopTitle = "Hammam Body Rituals | L'Essence Botanique";
        }
        return {
          title: shopTitle,
          description: "Explore our premium organic, cold-pressed, single-origin Moroccan formulations. Handcrafted in conscious micro-batches for dynamic skin restoration.",
          ogTitle: shopTitle,
          ogDescription: "Explore our premium organic, cold-pressed, single-origin Moroccan formulations handcrafted in conscious micro-batches.",
          ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn1pcAXDbZFCcvn1aMTwkLNG00trPdeilMum9RVDL-T0g7PoqyK6e-pgTm254EDgCCsLI8wlhKJ6Pb8-16YdC5_y_epvkTU9-VO5C__DvckJrnZyIB6Rd9QctTQi1ynOn8qPlhONH2HLSOYJ1ofdpqKN8RIULF-04qniY4WfozDNi9ZnKXn0FjLP50HPxFfKGseZUQbbB2OG-A6sFEhWCtnRfil-Qt0QDbaP3gko8ni6cxB4HPQJtP-nvxr5hp6dHB7zlvE5OonQw",
          ogType: "website"
        };
      case 'product':
        return {
          title: `${selectedProduct.name} - ${selectedProduct.subtitle} | L'Essence Botanique`,
          description: `${selectedProduct.description} High-integrity formulation with ${selectedProduct.ingredients.slice(0, 100)}...`,
          ogTitle: `${selectedProduct.name} | ${selectedProduct.subtitle}`,
          ogDescription: selectedProduct.description,
          ogImage: selectedProduct.image,
          ogType: "product"
        };
      case 'checkout':
        return {
          title: "Secure Checkout | L'Essence Botanique",
          description: "Complete your conscious skincare purchase securely. Direct sourcing ensuring fair trade and living wages for rural Moroccan female agricultural cooperatives.",
          ogTitle: "Secure Checkout | L'Essence Botanique",
          ogDescription: "Complete your conscious skincare purchase securely with ethical sourcing.",
          ogType: "website"
        };
      case 'blog':
        if (selectedArticle) {
          return {
            title: `${selectedArticle.title} | L'Essence Botanique Journal`,
            description: selectedArticle.excerpt,
            ogTitle: selectedArticle.title,
            ogDescription: selectedArticle.excerpt,
            ogImage: selectedArticle.image,
            ogType: "article"
          };
        }
        return {
          title: "The Botanical Journal - Sourcing & Rituals | L'Essence Botanique",
          description: "Read our educational guides on ancient Moroccan slow beauty, organic skincare sciences, and Atlas cooperative sourcing stories.",
          ogTitle: "The Botanical Journal | L'Essence Botanique",
          ogDescription: "Read our educational guides on ancient Moroccan slow beauty, organic skincare sciences, and cooperative stories.",
          ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuArVs2gvB_F9W-Vjpk_qeZXdTcJeJRMHEmSk5XwKf651nqsSSWlpbKzTAF8WwfpUIcsyauDxn8xx5uVF8WwI7EcrcYJ8kjr431IeLnfjGCNnvG7c7--Phf70QzSDbkX_u0dxXtFqXLlUYy3dYQuH46_NIrs-94hwK4n7hID6Fun7tMTDwCHq63r_3iNv-pKfgpj78tlk4CBsv-t8fsY-ptf1Bqn7hRa8LUe6FB78-K_eDYERUuFnFMWhzZvGCb3CZwsXNYH1UiCo5A",
          ogType: "website"
        };
      case 'about':
        return {
          title: "Our Sacred Story & Heritage Pledges | L'Essence Botanique",
          description: "Learn about our direct fair-trade partnerships with female-led cooperatives, sustainable glass bottling, and slow beauty philosophy.",
          ogTitle: "Our Sacred Story & Heritage Pledges | L'Essence Botanique",
          ogDescription: "Learn about our direct fair-trade partnerships with female-led cooperatives and sustainable glass bottling.",
          ogType: "website"
        };
      case 'contact':
        return {
          title: "Connect With Our Apothecary Atelier | L'Essence Botanique",
          description: "Reach out for personalized skin consultations, wholesale stockist inquiries, or cooperative sourcing details.",
          ogTitle: "Connect With Our Apothecary Atelier",
          ogDescription: "Reach out for personalized skin consultations, wholesale stockist inquiries, or cooperative sourcing details.",
          ogType: "website"
        };
      case 'faq':
        return {
          title: "Apothecary Knowledge & FAQs | L'Essence Botanique",
          description: "Find answers to frequently asked questions about organic shelf lives, shipping processes, and cooperative support.",
          ogTitle: "Apothecary Knowledge & FAQs | L'Essence Botanique",
          ogDescription: "Find answers to frequently asked questions about organic shelf lives, shipping processes, and cooperative support.",
          ogType: "website"
        };
      case 'account':
        return {
          title: "Your Saved Oasis & Rituals | L'Essence Botanique",
          description: "Manage your favorite Moroccan formulations, review order shipment timelines, and update your personal skin profile.",
          ogTitle: "Your Saved Oasis & Rituals",
          ogDescription: "Manage your favorite Moroccan formulations, review order shipment timelines, and update your personal skin profile.",
          ogType: "website"
        };
      default:
        return {
          title: "L'Essence Botanique | Moroccan Slow Beauty & Skincare",
          description: "Experience the luxury of ancient Moroccan skincare. Sourced directly from sustainable, female-led cooperatives in the Atlas region.",
          ogTitle: "L'Essence Botanique",
          ogDescription: "Experience the luxury of ancient Moroccan skincare. Sourced directly from sustainable, female-led cooperatives in the Atlas region.",
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
      <div className="fixed top-0 left-0 w-full h-[36px] bg-sage-800 text-warm-white font-sans text-[10px] tracking-widest uppercase px-6 text-center font-bold z-50 flex items-center justify-center">
        Free Carbon-Neutral Shipping On Conscious Orders Over $75 USD
      </div>

      {/* Persistent Navigation Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main View Area with transition effects */}
      <main className="flex-grow">
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

      {/* Persistent Luxury Footer */}
      <Footer
        setCurrentView={setCurrentView}
        setSelectedCategory={setSelectedCategory}
        showToast={showToast}
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
