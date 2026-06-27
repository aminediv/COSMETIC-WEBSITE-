import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Heart, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { products, articles } from '../data';

interface HomeViewProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  favorites: string[];
}

export default function HomeView({
  setCurrentView,
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  favorites,
}: HomeViewProps) {
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    onSelectProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select products specifically for home categories
  const mainFeatureProduct = products.find(p => p.id === 'argan-oil') || products[1];
  const smallItem1 = products.find(p => p.id === 'rhassoul-clay') || products[3];
  const smallItem2 = products.find(p => p.id === 'rose-water-mist') || products[4];
  const horizontalItem = products.find(p => p.id === 'cleansing-bar') || products[5];

  return (
    <div className="w-full">
      {/* 1. Large Elegant Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Slow Parallax/Zoom */}
        <motion.div 
          initial={{ scale: 1.05, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img 
            className="w-full h-full object-cover select-none" 
            alt="Luxurious Sun-Drenched Botanical Setting" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBkD_Y4Kxxd2pJTGOMMao6Cn1Y3fyIuTzYmaiRYomwYwTVvr9Ag2D2D0HwerPusJir2eynOcddDMkF5Bf4ul1NPUjKHZljK_0xHbzM_OyS48nfBvSEXr1iZoevp3FMUzDHen8xYoirwGE9KglyOS-duIo2nBfXsmkdfGt0Ega6ahNO1s2kdYa9xQ5EQlonJk7A-tm34-t3pOdbUUh857ydmrXCKXaJLTaTbKGLyVJf6WMnOPgRll_uVLW6Zo3Vtu-egojO3a61Gu8"
          />
        </motion.div>
        
        {/* Fine Glass/Soft Ambient Shadow Overlay */}
        <div className="absolute inset-0 bg-surface/35 backdrop-blur-[1px] z-10" />

        {/* Content Container */}
        <div className="relative z-20 text-center max-w-3xl px-6 mx-auto mt-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans text-xs font-semibold tracking-widest uppercase text-sage-800 mb-4 block"
          >
            Organic Moroccan Beauty
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-[1.1] tracking-tight"
          >
            Pure Botanical Heritage <br className="hidden md:inline" />for Modern Skin.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-sans text-sm md:text-base lg:text-lg text-muted-gray mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the restorative power of nature with our cold-pressed oils and nutrient-rich clays, ethically sourced from the heart of Morocco.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => handleCategoryClick('all')}
              className="w-full sm:w-auto bg-sage-800 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl shadow-sage-800/10"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto border border-sage-800 text-sage-800 font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-sage-800/5 transition-colors duration-300 glass-panel"
            >
              Discover Our Story
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Categories / Curated Rituals Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium tracking-tight">
            Curated Rituals
          </h2>
          <div className="w-12 h-[1px] bg-sage-800 mx-auto mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category 1: Facial Care */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg shadow-sage-800/5 cursor-pointer"
            onClick={() => handleCategoryClick('facial-oils')}
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Facial Care Category" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4umCrCR1xs38i8Z0gR1QZzgmxwL-URQjMs2DuGRZqBUTKjvzQ5ZTj-5MHrk7jwXKCqlSB79oVlVlO55T9v37ihofgIQq_GxCdyftOIP-QtyXeZRtTjVZlQYL9WRnKQw3THiSU-aqpFxvC1ziAedVDHs0H0AasGaiT0iCbGeGcvhKjn2d7AKF6TB6OY0b6j3G-LmF8NcYVyY6IZjawQNciMWv88uTURT4KCGKIyl-MaVBFnUVqGRB32aF2NwCdw-ZMQ185tGuSHbo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-serif text-2xl text-warm-white mb-2">Facial Care</h3>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase text-warm-white/75 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5">
                Explore Collection <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </div>
          </motion.div>

          {/* Category 2: Body Rituals */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg shadow-sage-800/5 cursor-pointer md:mt-12"
            onClick={() => handleCategoryClick('body-ritual')}
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Body Rituals Category" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArVs2gvB_F9W-Vjpk_qeZXdTcJeJRMHEmSk5XwKf651nqsSSWlpbKzTAF8WwfpUIcsyauDxn8xx5uVF8WwI7EcrcYJ8kjr431IeLnfjGCNnvG7c7--Phf70QzSDbkX_u0dxXtFqXLlUYy3dYQuH46_NIrs-94hwK4n7hID6Fun7tMTDwCHq63r_3iNv-pKfgpj78tlk4CBsv-t8fsY-ptf1Bqn7hRa8LUe6FB78-K_eDYERUuFnFMWhzZvGCb3CZwsXNYH1UiCo5A"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-serif text-2xl text-warm-white mb-2">Body Rituals</h3>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase text-warm-white/75 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5">
                Explore Collection <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </div>
          </motion.div>

          {/* Category 3: Pure Ingredients */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg shadow-sage-800/5 cursor-pointer"
            onClick={() => handleCategoryClick('all')}
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Pure Ingredients" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGipBE7CKrlHeB9NiGPLw7e0eYZBBMj1zGFKQXoc-5MBzg_jglP8MXNTqcQhcnhZrlbQeTsefUuCunT91G8N4yuvF6rElb57I5lVTi2GPrCpYzrAafontN248UHzXR2R6MONSEKoo2TRynZESH9MZPTy5phFBzaUzy9tzbP5nll4dFzophrbp6FSptnpEcD88uXAVLFp0wZhCE2j0bdt1-s2U2Fbg36j7xEHypRzd4A5bxFVLV2EF8zm_i9Z0nNYwn1SC6eN879xs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-serif text-2xl text-warm-white mb-2">Pure Ingredients</h3>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase text-warm-white/75 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5">
                Read Sourcing Story <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Best Sellers Bento Grid Section */}
      <section className="py-24 px-6 md:px-12 bg-cream-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium">Best Sellers</h2>
              <p className="font-sans text-xs md:text-sm text-muted-gray mt-2">
                Loved by our conscious beauty community.
              </p>
            </div>
            <button 
              onClick={() => handleCategoryClick('all')}
              className="hidden md:flex items-center gap-1 text-sage-800 font-sans text-xs font-semibold tracking-widest uppercase hover:underline"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Main Feature Product Card (Spans 2 columns, 2 rows in desktop bento layout) */}
            {mainFeatureProduct && (
              <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-pure-white shadow-md shadow-sage-800/[0.02] border border-cream-300/10 overflow-hidden group flex flex-col hover:shadow-xl transition-all duration-500">
                <div 
                  className="flex-1 relative overflow-hidden bg-cream-100 cursor-pointer min-h-[320px]"
                  onClick={() => handleProductClick(mainFeatureProduct)}
                >
                  <img 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={mainFeatureProduct.name} 
                    src={mainFeatureProduct.image}
                  />
                  <div className="absolute top-4 left-4 bg-sage-800 text-warm-white font-sans text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
                    Award Winning
                  </div>
                  
                  {/* Heart Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(mainFeatureProduct);
                    }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pure-white/80 backdrop-blur-md flex items-center justify-center text-sage-800 hover:text-red-400 transition-colors shadow-sm"
                    aria-label="Add to favorites"
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(mainFeatureProduct.id) ? 'fill-red-400 text-red-400' : ''}`} 
                    />
                  </button>
                </div>
                
                <div className="p-8 flex justify-between items-start border-t border-cream-200">
                  <div className="cursor-pointer" onClick={() => handleProductClick(mainFeatureProduct)}>
                    <h3 className="font-serif text-2xl text-charcoal mb-1">{mainFeatureProduct.name}</h3>
                    <p className="font-sans text-xs text-muted-gray">{mainFeatureProduct.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-serif text-2xl text-sage-800">${mainFeatureProduct.price}</span>
                    <button
                      onClick={() => onAddToCart(mainFeatureProduct)}
                      className="bg-sage-800 text-warm-white text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full hover:bg-sage-600 transition-colors shadow-sm"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Small Item 1: Rhassoul Clay Mask */}
            {smallItem1 && (
              <div className="rounded-3xl bg-pure-white shadow-md shadow-sage-800/[0.02] border border-cream-300/10 overflow-hidden group flex flex-col p-4 hover:shadow-lg transition-all duration-300">
                <div 
                  className="aspect-square rounded-2xl bg-cream-100 relative overflow-hidden mb-4 cursor-pointer"
                  onClick={() => handleProductClick(smallItem1)}
                >
                  <img 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={smallItem1.name} 
                    src={smallItem1.image}
                  />
                  
                  {/* Heart Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(smallItem1);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pure-white/80 backdrop-blur-md flex items-center justify-center text-sage-800 hover:text-red-400 transition-colors shadow-sm"
                    aria-label="Add to favorites"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 ${favorites.includes(smallItem1.id) ? 'fill-red-400 text-red-400' : ''}`} 
                    />
                  </button>
                </div>
                <div className="flex justify-between items-start flex-grow">
                  <div className="cursor-pointer" onClick={() => handleProductClick(smallItem1)}>
                    <h4 className="font-serif text-lg text-charcoal leading-tight mb-1">{smallItem1.name}</h4>
                    <p className="font-sans text-[11px] text-muted-gray">{smallItem1.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="font-serif text-lg text-sage-800">${smallItem1.price}</span>
                    <button
                      onClick={() => onAddToCart(smallItem1)}
                      className="bg-sage-800/10 text-sage-800 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-full hover:bg-sage-800 hover:text-warm-white transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Small Item 2: Rose Water Mist */}
            {smallItem2 && (
              <div className="rounded-3xl bg-pure-white shadow-md shadow-sage-800/[0.02] border border-cream-300/10 overflow-hidden group flex flex-col p-4 hover:shadow-lg transition-all duration-300">
                <div 
                  className="aspect-square rounded-2xl bg-cream-100 relative overflow-hidden mb-4 cursor-pointer"
                  onClick={() => handleProductClick(smallItem2)}
                >
                  <img 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={smallItem2.name} 
                    src={smallItem2.image}
                  />
                  
                  {/* Heart Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(smallItem2);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pure-white/80 backdrop-blur-md flex items-center justify-center text-sage-800 hover:text-red-400 transition-colors shadow-sm"
                    aria-label="Add to favorites"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 ${favorites.includes(smallItem2.id) ? 'fill-red-400 text-red-400' : ''}`} 
                    />
                  </button>
                </div>
                <div className="flex justify-between items-start flex-grow">
                  <div className="cursor-pointer" onClick={() => handleProductClick(smallItem2)}>
                    <h4 className="font-serif text-lg text-charcoal leading-tight mb-1">{smallItem2.name}</h4>
                    <p className="font-sans text-[11px] text-muted-gray">{smallItem2.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="font-serif text-lg text-sage-800">${smallItem2.price}</span>
                    <button
                      onClick={() => onAddToCart(smallItem2)}
                      className="bg-sage-800/10 text-sage-800 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-full hover:bg-sage-800 hover:text-warm-white transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Landscape Cleansing Bar Item (Spans 2 columns on desktop) */}
            {horizontalItem && (
              <div className="md:col-span-2 rounded-3xl bg-pure-white shadow-md shadow-sage-800/[0.02] border border-cream-300/10 overflow-hidden group flex flex-col sm:flex-row items-center p-4 hover:shadow-lg transition-all duration-300">
                <div 
                  className="w-full sm:w-1/3 aspect-square rounded-2xl bg-cream-100 relative overflow-hidden mr-0 sm:mr-6 mb-4 sm:mb-0 cursor-pointer"
                  onClick={() => handleProductClick(horizontalItem)}
                >
                  <img 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={horizontalItem.name} 
                    src={horizontalItem.image}
                  />
                  
                  {/* Heart Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(horizontalItem);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pure-white/80 backdrop-blur-md flex items-center justify-center text-sage-800 hover:text-red-400 transition-colors shadow-sm"
                    aria-label="Add to favorites"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 ${favorites.includes(horizontalItem.id) ? 'fill-red-400 text-red-400' : ''}`} 
                    />
                  </button>
                </div>
                <div className="flex-1 w-full flex flex-col justify-center">
                  <div className="inline-block self-start bg-cream-200 text-sage-800 font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2">
                    New Ritual
                  </div>
                  <h4 
                    className="font-serif text-xl text-charcoal mb-1 cursor-pointer hover:text-sage-800 transition-colors"
                    onClick={() => handleProductClick(horizontalItem)}
                  >
                    {horizontalItem.name}
                  </h4>
                  <p className="font-sans text-xs text-muted-gray mb-4">{horizontalItem.subtitle}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-serif text-lg text-sage-800 font-medium">${horizontalItem.price}</span>
                    <button
                      onClick={() => onAddToCart(horizontalItem)}
                      className="bg-sage-800 text-warm-white text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full hover:bg-sage-600 transition-colors shadow-sm"
                    >
                      Add to Ritual
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Natural Solutions Promotional Banner Section */}
      <section className="relative py-32 px-6 md:px-12 bg-sage-800 text-warm-white overflow-hidden flex items-center justify-center">
        {/* Abstract Symmetrical Line/Gradient/Organic Vector Feel */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warm-white rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-sage-200 rounded-full blur-[80px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <span className="font-sans text-xs font-semibold tracking-widest uppercase text-sage-200 mb-4 block">
            Ethical Sourcing & Ecology
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-6 leading-[1.15] tracking-tight">
            Nourished by the Atlas Mountains, <br />
            Rooted in Hammam Wisdom.
          </h2>
          <p className="font-sans text-sm md:text-base text-sage-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every bottle supports female cooperatives in southwestern Morocco. We believe in high-contrast integrity, absolute purity, and packaging that decomposes to feed the soil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-warm-white text-sage-800 font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-cream-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Explore Sourcing Story
            </button>
            <button
              onClick={() => handleCategoryClick('all')}
              className="w-full sm:w-auto border border-warm-white/30 hover:border-warm-white text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white/5 transition-all duration-300"
            >
              Shop Botanical Sets
            </button>
          </div>
        </div>
      </section>

      {/* 5. Blog / Botanical Journal Preview Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium">Botanical Journal</h2>
            <p className="font-sans text-xs md:text-sm text-muted-gray mt-2">
              Holistic wisdom, raw ingredients, and rituals of Morocco.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-sage-800 font-sans text-xs font-semibold tracking-widest uppercase hover:underline"
          >
            Read Journal <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <div 
              key={article.id} 
              className="group cursor-pointer flex flex-col"
              onClick={() => {
                // Navigate to blog and scroll to that article
                setCurrentView('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-cream-100 mb-6 shadow-sm">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={article.title} 
                  src={article.image}
                />
                <div className="absolute top-4 left-4 bg-pure-white/90 backdrop-blur-md text-sage-800 font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                  {article.category}
                </div>
              </div>
              <span className="font-sans text-[10px] tracking-widest uppercase text-muted-gray mb-2">
                {article.date} — {article.readTime}
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3 group-hover:text-sage-800 transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-muted-gray leading-relaxed mb-4 flex-grow line-clamp-2">
                {article.excerpt}
              </p>
              <span className="font-sans text-xs font-semibold tracking-wider text-sage-800 flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
