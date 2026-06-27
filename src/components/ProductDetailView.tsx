import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, Heart, Check, Plus, Minus, ChevronDown, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleFavorite: (product: Product) => void;
  favorites: string[];
  setCurrentView: (view: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailView({
  product,
  onAddToCart,
  onToggleFavorite,
  favorites,
  setCurrentView,
  onSelectProduct,
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = React.useState<string>(product.image);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [activeTab, setActiveTab] = React.useState<'description' | 'ingredients' | 'benefits' | 'howTo'>('description');
  
  // Accordion state
  const [openAccordion, setOpenAccordion] = React.useState<string | null>('desc');

  // Sync active image when product changes
  React.useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
    setOpenAccordion('desc');
  }, [product]);

  // Complete Your Ritual recommendations (filter out current product and grab 3 similar ones)
  const recommendations = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

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
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <button
          onClick={handleBackToShop}
          className="group flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Collections
        </button>
      </div>

      {/* Main Product Panel */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
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
                Award Winning
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
                {product.categoryLabel}
              </span>
              <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-muted-gray bg-cream-100 px-3 py-1 rounded-full">
                For {product.skinTypeLabel} Need
              </span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal font-medium leading-tight mb-2">
              {product.name}
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-gray italic">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing & Reviews */}
          <div className="flex items-center justify-between pb-6 border-b border-cream-300/30">
            <span className="font-serif text-3xl md:text-4xl text-sage-800 font-semibold">
              ${product.price}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-gold-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-accent text-gold-accent" />
                ))}
              </div>
              <span className="font-sans text-xs font-semibold text-charcoal">
                {product.rating} <span className="text-muted-gray">({product.reviewsCount} reviews)</span>
              </span>
            </div>
          </div>

          {/* Description Snippet */}
          <p className="font-sans text-sm md:text-base text-muted-gray leading-relaxed">
            {product.description}
          </p>

          {/* Interactive Buy Section */}
          <div className="bg-cream-100 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between gap-6">
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal">
                Select Quantity
              </span>
              <div className="flex items-center border border-cream-300/50 bg-pure-white rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-gray hover:text-charcoal transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-sans text-sm font-bold text-charcoal w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted-gray hover:text-charcoal transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Core Add to Bag & Like Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-sage-800/10 flex items-center justify-center gap-2"
              >
                Add to Bag — ${(product.price * quantity).toFixed(2)}
              </button>
              <button
                onClick={() => onToggleFavorite(product)}
                className="w-14 h-14 rounded-full border border-cream-300 bg-pure-white flex items-center justify-center text-sage-800 hover:text-red-400 transition-colors shadow-sm"
                aria-label="Add to favorites"
              >
                <Heart
                  className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-400 text-red-400' : ''}`}
                />
              </button>
            </div>

            {/* Micro details */}
            <div className="grid grid-cols-2 gap-4 pt-2 text-center border-t border-cream-300/30 font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-gray">
              <div className="flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-sage-600" /> Free Shipping Over $75
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-sage-600" /> 100% Traceable Ingredients
              </div>
            </div>
          </div>

          {/* Accordion List for details */}
          <div className="space-y-4">
            {/* Description Tab */}
            <div className="border-b border-cream-300/30 pb-4">
              <button
                onClick={() => toggleAccordion('desc')}
                className="flex items-center justify-between w-full text-left font-sans text-xs font-bold tracking-widest uppercase text-charcoal py-2"
              >
                <span>Full Botanical Description</span>
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
                      {product.description}
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
                <span>Pure Ingredients List</span>
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
                    <p className="font-sans text-sm text-muted-gray leading-relaxed pt-3 italic bg-cream-100/50 p-4 rounded-2xl border border-cream-200">
                      {product.ingredients}
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
                <span>Proven Skin Benefits</span>
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
                      {product.benefits.map((benefit, i) => (
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
                <span>Sacred Routine Application</span>
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
                      {product.howToUse}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Complete Your Ritual Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 border-t border-cream-300/30">
        <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-medium text-center mb-12">
          Complete Your Botanical Ritual
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => handleRecommendClick(rec)}
              className="group cursor-pointer bg-pure-white rounded-3xl p-4 border border-cream-300/10 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="aspect-square rounded-2xl bg-cream-100 relative overflow-hidden mb-4">
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-lg text-charcoal group-hover:text-sage-800 transition-colors">
                {rec.name}
              </h3>
              <p className="font-sans text-xs text-muted-gray mt-1 leading-tight">{rec.subtitle}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-serif text-lg text-sage-800 font-semibold">${rec.price}</span>
                <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
