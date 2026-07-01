import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, Check, Plus, Minus, ChevronDown, Sparkles, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';
import TornPaperDivider from './TornPaperDivider';
import { locales } from '../locales';
import ProductCard from './ProductCard';
import BlurTitle from './BlurTitle';
import { formatPrice } from '../utils/price';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleFavorite?: (product: Product) => void;
  favorites?: string[];
  setCurrentView: (view: string) => void;
  onSelectProduct: (product: Product) => void;
  language: 'en' | 'fr';
  currency: 'MAD' | 'EUR';
}

export default function ProductDetailView({
  product,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
  setCurrentView,
  onSelectProduct,
  language,
  currency,
}: ProductDetailViewProps) {
  const t = locales[language].product;
  const thome = locales[language].home;
  const [activeImage, setActiveImage] = React.useState<string>(product.image);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [activeTab, setActiveTab] = React.useState<'description' | 'ingredients' | 'benefits' | 'howTo'>('description');
  
  // Accordion state
  const [openAccordion, setOpenAccordion] = React.useState<string | null>('desc');
  const [orderSuccess, setOrderSuccess] = React.useState(false);

  // Quick Order Form State
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [city, setCity] = React.useState('');
  const [fullAddress, setFullAddress] = React.useState('');
  const [touched, setTouched] = React.useState({
    fullName: false,
    phoneNumber: false,
    city: false,
    fullAddress: false,
  });

  // Sync active image when product changes
  React.useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
    setOpenAccordion('desc');
    setOrderSuccess(false);
    setFullName('');
    setPhoneNumber('');
    setCity('');
    setFullAddress('');
    setTouched({
      fullName: false,
      phoneNumber: false,
      city: false,
      fullAddress: false,
    });
  }, [product]);

  // Complete Your Ritual recommendations (filter out current product and grab 2 similar ones for cleaner mobile view)
  const recommendations = products
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  const handleRecommendClick = (p: Product) => {
    onSelectProduct(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* Back to Shop Nav */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-8">
        <button
          onClick={handleBackToShop}
          className="group flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> {t.back}
        </button>
      </div>

      {/* Main Product Panel */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-24">
        {/* Left Side: Large Gallery with Thumbnails */}
        <div className="flex flex-col gap-6">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-cream-100 relative shadow-sm border border-cream-300/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
                alt={product.name}
                src={activeImage}
              />
            </AnimatePresence>

            {/* Badges */}
            {product.isBestSeller && (
              <div className="absolute top-6 left-6 bg-sage-800 text-warm-white font-sans text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-sm">
                {language === 'en' ? 'Award Winning' : 'Primé'}
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-4">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 aspect-square rounded-2xl overflow-hidden border-2 bg-cream-100 transition-all ${
                    activeImage === img ? 'border-sage-800 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery index ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Sticky Purchase Panel */}
        <div className="space-y-8 lg:sticky lg:top-28">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 bg-sage-800/10 px-3 py-1 rounded-full">
                {language === 'en' ? product.categoryLabel : (product.categoryLabelFr || product.categoryLabel)}
              </span>
              <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-muted-gray bg-cream-100 px-3 py-1 rounded-full">
                {language === 'en' ? 'For' : 'Pour'} {language === 'en' ? product.skinTypeLabel : (product.skinTypeLabelFr || product.skinTypeLabel)} {language === 'en' ? 'Need' : ''}
              </span>
            </div>
            
            <BlurTitle
              text={language === 'en' ? product.name : (product.nameFr || product.name)}
              as="h1"
              align="left"
              delay={0.05}
              duration={1.0}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal font-medium leading-tight mb-2"
            />
            <p className="font-sans text-sm md:text-base text-muted-gray italic">
              {language === 'en' ? product.subtitle : (product.subtitleFr || product.subtitle)}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 pb-6 border-b border-cream-300/30">
            <span className="font-serif text-3xl md:text-4xl text-sage-800 font-bold">
              {formatPrice(product.price, currency, language)}
            </span>
            <span className="font-sans text-base md:text-lg text-muted-gray line-through decoration-red-500/50 sm:mb-1">
              {formatPrice(product.price * 1.25, currency, language)}
            </span>
            <div className="bg-red-500 text-white font-sans text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded sm:mb-2 w-fit">
              -20%
            </div>
          </div>

          {/* Interactive Buy Section (Direct Checkout) */}
          <div className="bg-cream-100 rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 mt-2">
            {/* Quick Order Form */}
            {!orderSuccess ? (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-serif text-lg sm:text-xl text-sage-800 text-center mb-2 sm:mb-4">
                  {language === 'en' ? 'Fast Checkout (Cash on Delivery)' : 'Commande Rapide (Paiement à la livraison)'}
                </h3>
                
                {(() => {
                  const isFullNameValid = fullName.trim().length >= 3;
                  const isCityValid = city.trim().length >= 2;
                  const isAddressValid = fullAddress.trim().length >= 10;
                  const isPhoneValid = /^[+0-9\s-]{9,15}$/.test(phoneNumber.trim());
                  const isFormValid = isFullNameValid && isCityValid && isAddressValid && isPhoneValid;

                  return (
                    <>
                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, fullName: true }))}
                            placeholder={language === 'en' ? 'Full Name *' : 'Nom Complet *'}
                            className={`w-full bg-white border rounded-xl px-4 py-3.5 font-sans text-base focus:outline-none focus:ring-1 transition-colors ${
                              touched.fullName && !isFullNameValid
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10'
                                : 'border-cream-300 focus:border-sage-800 focus:ring-sage-800'
                            }`}
                          />
                          {touched.fullName && !isFullNameValid && (
                            <span className="text-red-500 text-xs pl-1 mt-1 block font-sans">
                              {language === 'en' ? 'Please enter your full name (at least 3 characters).' : 'Veuillez saisir votre nom complet (au moins 3 caractères).'}
                            </span>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, phoneNumber: true }))}
                            placeholder={language === 'en' ? 'Phone Number *' : 'Numéro de Téléphone *'}
                            className={`w-full bg-white border rounded-xl px-4 py-3.5 font-sans text-base focus:outline-none focus:ring-1 transition-colors ${
                              touched.phoneNumber && !isPhoneValid
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10'
                                : 'border-cream-300 focus:border-sage-800 focus:ring-sage-800'
                            }`}
                          />
                          {touched.phoneNumber && !isPhoneValid && (
                            <span className="text-red-500 text-xs pl-1 mt-1 block font-sans">
                              {language === 'en' ? 'Please enter a valid phone number (at least 9 digits).' : 'Veuillez saisir un numéro de téléphone valide (au moins 9 chiffres).'}
                            </span>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, city: true }))}
                            placeholder={language === 'en' ? 'City *' : 'Ville *'}
                            className={`w-full bg-white border rounded-xl px-4 py-3.5 font-sans text-base focus:outline-none focus:ring-1 transition-colors ${
                              touched.city && !isCityValid
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10'
                                : 'border-cream-300 focus:border-sage-800 focus:ring-sage-800'
                            }`}
                          />
                          {touched.city && !isCityValid && (
                            <span className="text-red-500 text-xs pl-1 mt-1 block font-sans">
                              {language === 'en' ? 'Please enter your city.' : 'Veuillez saisir votre ville.'}
                            </span>
                          )}
                        </div>

                        <div>
                          <textarea
                            value={fullAddress}
                            onChange={(e) => setFullAddress(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, fullAddress: true }))}
                            placeholder={language === 'en' ? 'Full Delivery Address *' : 'Adresse de Livraison Complète *'}
                            rows={2}
                            className={`w-full bg-white border rounded-xl px-4 py-3.5 font-sans text-base focus:outline-none focus:ring-1 transition-colors resize-none ${
                              touched.fullAddress && !isAddressValid
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10'
                                : 'border-cream-300 focus:border-sage-800 focus:ring-sage-800'
                            }`}
                          ></textarea>
                          {touched.fullAddress && !isAddressValid && (
                            <span className="text-red-500 text-xs pl-1 mt-1 block font-sans">
                              {language === 'en' ? 'Please enter your full address (at least 10 characters).' : 'Veuillez saisir votre adresse complète (au moins 10 caractères).'}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (isFormValid) {
                            setOrderSuccess(true);
                          }
                        }}
                        disabled={!isFormValid}
                        className={`w-full font-sans text-sm font-semibold tracking-widest uppercase py-5 rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 mt-4 ${
                          isFormValid
                            ? 'bg-sage-800 hover:bg-sage-600 text-warm-white shadow-sage-800/20 active:scale-[0.98]'
                            : 'bg-cream-300 text-muted-gray cursor-not-allowed opacity-75'
                        }`}
                      >
                        {language === 'en' ? 'Order Now' : 'Commander Maintenant'} — {formatPrice(product.price * quantity, currency, language)}
                      </button>

                      {!isFormValid && (
                        <p className="text-center font-sans text-[11px] text-amber-700 bg-amber-50 rounded-lg p-2.5 mt-2">
                          {language === 'en' 
                            ? 'Please fill in all required delivery information before placing your order.' 
                            : 'Veuillez remplir toutes les informations de livraison requises pour valider votre commande.'}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/60 rounded-2xl p-8 text-center space-y-4 border border-sage-800/10"
              >
                <div className="w-16 h-16 bg-sage-800/10 text-sage-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-sage-800">
                  {language === 'en' ? 'Order Confirmed' : 'Commande Confirmée'}
                </h3>
                <p className="font-sans text-sm text-muted-gray leading-relaxed">
                  {language === 'en'
                    ? 'Thank you for your order. We will process it immediately and you will pay on delivery.'
                    : 'Merci pour votre commande. Nous allons la traiter immédiatement et vous paierez à la livraison.'}
                </p>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-block mt-4 text-sage-800 font-sans text-xs font-bold tracking-widest uppercase hover:text-charcoal transition-colors border-b border-sage-800/30 pb-1"
                >
                  {language === 'en' ? 'Continue Shopping' : 'Continuer les achats'}
                </button>
              </motion.div>
            )}

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-cream-300/60"></div>
              <span className="flex-shrink mx-3 sm:mx-4 font-sans text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-muted-gray">
                {language === 'en' ? 'Or Add to Cart' : 'Ou Ajouter au Panier'}
              </span>
              <div className="flex-grow border-t border-cream-300/60"></div>
            </div>

            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <div className="flex-shrink-0 flex items-center border border-cream-300/50 bg-white rounded-xl sm:rounded-full p-0.5 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-muted-gray hover:text-charcoal transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-sans text-sm font-bold text-charcoal w-8 sm:w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-muted-gray hover:text-charcoal transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-[13px] sm:text-sm font-semibold tracking-wider uppercase py-3.5 sm:py-4 px-4 sm:px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-sage-800/10 hover:scale-[1.01] active:scale-[0.99] min-w-0"
              >
                <span className="truncate whitespace-nowrap">{language === 'en' ? 'Add to cart' : 'Ajouter au panier'}</span>
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </button>
            </div>

            {/* Micro details */}
            <div className="grid grid-cols-2 gap-4 pt-4 mt-2 text-center border-t border-cream-300/30 font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-gray">
              <div className="flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-sage-600" /> {language === 'en' ? `Free Shipping Over ${formatPrice(75, currency, language)}` : `Livraison Offerte dès ${formatPrice(75, currency, language)}`}
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-sage-600" /> {language === 'en' ? 'Cash on Delivery' : 'Paiement à la livraison'}
              </div>
            </div>
          </div>

          {/* Description Snippet */}
          <p className="font-sans text-sm md:text-base text-muted-gray leading-relaxed">
            {language === 'en' ? product.description : (product.descriptionFr || product.description)}
          </p>

          {/* Accordion List for details */}
          <div className="space-y-4">
            {/* Description Tab */}
            <div className="border-b border-cream-300/30 pb-4">
              <button
                onClick={() => toggleAccordion('desc')}
                className="flex items-center justify-between w-full text-left font-sans text-xs font-bold tracking-widest uppercase text-charcoal py-2"
              >
                <span>{language === 'en' ? 'Full Botanical Description' : 'Description Botanique Complète'}</span>
                <ChevronDown className={`w-4 h-4 text-muted-gray transition-transform duration-300 ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'desc' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-sm text-muted-gray leading-relaxed pt-3">
                      {language === 'en' ? product.description : (product.descriptionFr || product.description)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ingredients Tab */}
            <div className="border-b border-cream-300/30 pb-4">
              <button
                onClick={() => toggleAccordion('ing')}
                className="flex items-center justify-between w-full text-left font-sans text-xs font-bold tracking-widest uppercase text-charcoal py-2"
              >
                <span>{language === 'en' ? 'Pure Ingredients List' : 'Liste des Ingrédients Purs'}</span>
                <ChevronDown className={`w-4 h-4 text-muted-gray transition-transform duration-300 ${openAccordion === 'ing' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'ing' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-sm text-muted-gray leading-relaxed pt-3 italic bg-cream-100 p-4 rounded-2xl border border-cream-200">
                      {language === 'en' ? product.ingredients : (product.ingredientsFr || product.ingredients)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Benefits Tab */}
            <div className="border-b border-cream-300/30 pb-4">
              <button
                onClick={() => toggleAccordion('ben')}
                className="flex items-center justify-between w-full text-left font-sans text-xs font-bold tracking-widest uppercase text-charcoal py-2"
              >
                <span>{language === 'en' ? 'Proven Skin Benefits' : 'Bénéfices Prouvés pour la Peau'}</span>
                <ChevronDown className={`w-4 h-4 text-muted-gray transition-transform duration-300 ${openAccordion === 'ben' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'ben' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 pt-3 font-sans text-sm text-muted-gray leading-relaxed">
                      {(language === 'en' ? product.benefits : (product.benefitsFr || product.benefits)).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* How to use Tab */}
            <div className="border-b border-cream-300/30 pb-4">
              <button
                onClick={() => toggleAccordion('how')}
                className="flex items-center justify-between w-full text-left font-sans text-xs font-bold tracking-widest uppercase text-charcoal py-2"
              >
                <span>{language === 'en' ? 'Sacred Routine Application' : 'Application du Rituel Sacré'}</span>
                <ChevronDown className={`w-4 h-4 text-muted-gray transition-transform duration-300 ${openAccordion === 'how' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'how' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-sm text-muted-gray leading-relaxed pt-3">
                      {language === 'en' ? product.howToUse : (product.howToUseFr || product.howToUse)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Complete Your Ritual Section */}
      <TornPaperDivider fillColor="cream-100" bgColor="warm-white" position="top" botanicalVariant="rose" />

      <section className="w-full bg-cream-100 py-16 lg:py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-warm-white rounded-full blur-[100px] opacity-35 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-medium text-center mb-12">
            {language === 'en' ? 'Complete Your Botanical Ritual' : 'Complétez votre rituel botanique'}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-8 max-w-4xl mx-auto">
            {recommendations.map((rec) => (
              <ProductCard
                key={rec.id}
                product={rec}
                onSelectProduct={onSelectProduct}
                onAddToCart={(p) => onAddToCart(p, 1)}
                language={language}
                currency={currency}
                layoutType="grid"
              />
            ))}
          </div>
        </div>
      </section>

      <TornPaperDivider fillColor="warm-white" bgColor="cream-100" position="top" botanicalVariant="fern" />
    </div>
  );
}
