import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';
import TornPaperDivider from './TornPaperDivider';
import { locales } from '../locales';
import ProductCard from './ProductCard';
import BlurTitle from './BlurTitle';

import heroImage1 from '../assets/images/botanical_skincare_hero_1_1782858915412.jpg';
import heroImage2 from '../assets/images/botanical_skincare_hero_2_1782858929461.jpg';
import heroImage3 from '../assets/images/botanical_skincare_hero_3_1782858944184.jpg';

interface HomeViewProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  favorites?: string[];
  language: 'en' | 'fr';
  currency?: 'MAD' | 'EUR';
}

export default function HomeView({
  setCurrentView,
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
  language,
  currency = 'MAD',
}: HomeViewProps) {
  const t = locales[language].home;
  
  const heroImages = [
    heroImage1,
    heroImage2,
    heroImage3
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, heroImages.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

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

  // Best Sellers
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. Large Elegant Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div 
            key={currentImageIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
          >
            <img 
              className="w-full h-full object-cover select-none pointer-events-none" 
              alt="Luxurious Sun-Drenched Botanical Setting" 
              src={heroImages[currentImageIndex]}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all shadow-lg hover:scale-105 active:scale-95 border border-white/20"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all shadow-lg hover:scale-105 active:scale-95 border border-white/20"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Categories / Curated Rituals Section */}
      <section className="w-full bg-warm-white py-16 lg:py-24 px-4 md:px-8 lg:px-12 pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
          <BlurTitle
            text={t.curatedRituals}
            as="h2"
            delay={0.1}
            duration={1.0}
            className="font-serif text-3xl md:text-4xl text-charcoal font-medium tracking-tight"
          />
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
            <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/25 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 p-6 rounded-2xl glass-panel text-charcoal shadow-lg transition-all duration-300">
              <h3 className="font-serif text-xl font-medium text-charcoal mb-1">{t.facialCare}</h3>
              <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 flex items-center gap-1.5">
                {t.exploreCollection} <ArrowRight className="w-3 h-3 text-sage-800" />
              </p>
            </div>
          </motion.div>

          {/* Category 2: Body Rituals */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg shadow-sage-800/5 cursor-pointer"
            onClick={() => handleCategoryClick('body-ritual')}
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Body Rituals Category" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArVs2gvB_F9W-Vjpk_qeZXdTcJeJRMHEmSk5XwKf651nqsSSWlpbKzTAF8WwfpUIcsyauDxn8xx5uVF8WwI7EcrcYJ8kjr431IeLnfjGCNnvG7c7--Phf70QzSDbkX_u0dxXtFqXLlUYy3dYQuH46_NIrs-94hwK4n7hID6Fun7tMTDwCHq63r_3iNv-pKfgpj78tlk4CBsv-t8fsY-ptf1Bqn7hRa8LUe6FB78-K_eDYERUuFnFMWhzZvGCb3CZwsXNYH1UiCo5A"
            />
            <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/25 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 p-6 rounded-2xl glass-panel text-charcoal shadow-lg transition-all duration-300">
              <h3 className="font-serif text-xl font-medium text-charcoal mb-1">{t.bodyRituals}</h3>
              <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 flex items-center gap-1.5">
                {t.exploreCollection} <ArrowRight className="w-3 h-3 text-sage-800" />
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
            <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/25 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 p-6 rounded-2xl glass-panel text-charcoal shadow-lg transition-all duration-300">
              <h3 className="font-serif text-xl font-medium text-charcoal mb-1">{t.pureIngredients}</h3>
              <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 flex items-center gap-1.5">
                {t.readSourcingStory} <ArrowRight className="w-3 h-3 text-sage-800" />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <TornPaperDivider fillColor="cream-100" bgColor="warm-white" position="top" botanicalVariant="argan" />

    {/* 3. Best Sellers Bento Grid Section */}
    <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-12 bg-cream-100">
      <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <BlurTitle
                text={t.bestSellers}
                as="h2"
                align="left"
                delay={0.1}
                duration={1.0}
                className="font-serif text-3xl md:text-4xl text-charcoal font-medium"
              />
              <p className="font-sans text-xs md:text-sm text-muted-gray mt-2">
                {t.bestSellersDesc}
              </p>
            </div>
            <button 
              onClick={() => handleCategoryClick('all')}
              className="hidden md:flex items-center gap-1 text-sage-800 font-sans text-xs font-semibold tracking-widest uppercase hover:underline"
            >
              {t.viewAll} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                language={language}
                currency={currency}
                hideAddToCartButton={true}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
