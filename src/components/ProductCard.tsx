import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { locales } from '../locales';
import { formatPrice } from '../utils/price';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
  language: 'en' | 'fr';
  currency?: 'MAD' | 'EUR';
  layoutType?: 'grid' | 'bento-main' | 'bento-small' | 'bento-horizontal';
  hideAddToCartButton?: boolean;
}

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  language,
  currency = 'MAD',
  layoutType = 'grid',
  hideAddToCartButton = false,
}: ProductCardProps) {
  const t = locales[language].home;
  const tProduct = locales[language].product;

  const handleProductClick = () => {
    onSelectProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasAlternateImage = product.gallery && product.gallery.length > 1;
  const alternateImage = hasAlternateImage ? product.gallery[1] : product.image;

  // Premium transitions shared across components
  const imageTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1], // easeOutExpo
  };

  // 1. REGULAR GRID CARD (used in ShopView & Related Products)
  if (layoutType === 'grid') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -6 }}
        onClick={handleProductClick}
        className="group bg-white rounded-[1.25rem] border border-cream-300/20 shadow-sm shadow-sage-800/[0.02] overflow-hidden flex flex-col hover:shadow-xl hover:border-cream-300/40 transition-all duration-300 cursor-pointer"
      >
        {/* Media Block */}
        <div className="aspect-square bg-cream-100 relative overflow-hidden">
          {/* First Image: Default view */}
          <img
            className="absolute inset-0 w-full h-full object-cover transform scale-100 opacity-100 sm:group-hover:opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            alt={product.name}
            src={product.image}
          />
          {/* Second Image: Hover view (only on desktop/sm+) */}
          <img
            className="hidden sm:block absolute inset-0 w-full h-full object-cover transform scale-100 opacity-0 sm:group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            alt={`${product.name} alternate`}
            src={alternateImage}
          />

          {/* Badges */}
          {product.isBestSeller && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white font-sans text-[8px] sm:text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-md sm:rounded-full z-10">
              -20%
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="p-3 flex flex-col justify-between flex-grow">
          <h3 className="font-serif text-sm sm:text-base text-charcoal sm:group-hover:text-sage-800 transition-colors duration-300 line-clamp-2 leading-snug mb-1">
            {language === 'en' ? product.name : (product.nameFr || product.name)}
          </h3>
          
          <div className="flex flex-row items-center justify-between mt-auto pt-3 border-t border-cream-100/50 gap-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 min-w-0">
              <span className="font-serif text-[14px] sm:text-base md:text-lg text-sage-800 font-bold whitespace-nowrap leading-none">
                {formatPrice(product.price, currency, language)}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] text-muted-gray line-through decoration-red-500/50 whitespace-nowrap leading-none">
                {formatPrice(product.price * 1.25, currency, language)}
              </span>
            </div>
            {!hideAddToCartButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="bg-sage-800 text-warm-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-sage-600 sm:hover:scale-105 active:scale-95 active:bg-sage-900 transition-all duration-200 shadow-sm z-10 flex items-center justify-center whitespace-nowrap shrink-0 font-sans"
              >
                {t.add}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // 2. BENTO MAIN CARD (large card spanning 2 columns, 2 rows in desktop bento layout)
  if (layoutType === 'bento-main') {
    return (
      <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-white shadow-md shadow-sage-800/[0.02] border border-cream-300/10 overflow-hidden group flex flex-col hover:shadow-xl hover:border-cream-300/30 transition-all duration-500">
        <div
          className="flex-1 relative overflow-hidden bg-cream-100 cursor-pointer min-h-[320px]"
          onClick={handleProductClick}
        >
          {/* First Image: Default view */}
          <img
            className="absolute inset-0 w-full h-full object-cover transform scale-100 opacity-100 group-hover:scale-105 group-hover:opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            alt={product.name}
            src={product.image}
          />
          {/* Second Image: Hover view */}
          <img
            className="absolute inset-0 w-full h-full object-cover transform scale-100 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            alt={`${product.name} alternate`}
            src={alternateImage}
          />

          <div className="absolute top-4 left-4 bg-sage-800 text-warm-white font-sans text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full z-10 transition-transform duration-300 group-hover:scale-95">
            {t.awardWinning}
          </div>
        </div>

        <div className="p-8 flex justify-between items-start border-t border-cream-200">
          <div className="cursor-pointer" onClick={handleProductClick}>
            <h3 className="font-serif text-2xl text-charcoal mb-1 group-hover:text-sage-800 transition-colors duration-300">
              {language === 'en' ? product.name : (product.nameFr || product.name)}
            </h3>
            <p className="font-sans text-xs text-muted-gray">
              {language === 'en' ? product.subtitle : (product.subtitleFr || product.subtitle)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="font-serif text-2xl text-sage-800 font-medium transition-transform duration-300 group-hover:scale-105">
              {formatPrice(product.price, currency, language)}
            </span>
            {!hideAddToCartButton && (
              <button
                onClick={() => onAddToCart(product)}
                className="bg-sage-800 text-warm-white text-[10px] font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-sage-600 hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                {t.add}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. BENTO SMALL CARD (grid items in bento layout)
  if (layoutType === 'bento-small') {
    return (
      <div className="rounded-3xl bg-white shadow-md shadow-sage-800/[0.02] border border-cream-300/10 overflow-hidden group flex flex-col p-4 hover:shadow-lg hover:border-cream-300/30 transition-all duration-500">
        <div
          className="aspect-square rounded-2xl bg-cream-100 relative overflow-hidden mb-4 cursor-pointer"
          onClick={handleProductClick}
        >
          {/* First Image: Default view */}
          <img
            className="absolute inset-0 w-full h-full object-cover transform scale-100 opacity-100 group-hover:scale-105 group-hover:opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            alt={product.name}
            src={product.image}
          />
          {/* Second Image: Hover view */}
          <img
            className="absolute inset-0 w-full h-full object-cover transform scale-100 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            alt={`${product.name} alternate`}
            src={alternateImage}
          />
        </div>

        <div className="flex justify-between items-start flex-grow">
          <div className="cursor-pointer" onClick={handleProductClick}>
            <h4 className="font-serif text-lg text-charcoal leading-tight mb-1 group-hover:text-sage-800 transition-colors duration-300">
              {language === 'en' ? product.name : (product.nameFr || product.name)}
            </h4>
            <p className="font-sans text-[11px] text-muted-gray">
              {language === 'en' ? product.subtitle : (product.subtitleFr || product.subtitle)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
            <span className="font-serif text-lg text-sage-800 transition-transform duration-300 group-hover:scale-105">
              {formatPrice(product.price, currency, language)}
            </span>
            {!hideAddToCartButton && (
              <button
                onClick={() => onAddToCart(product)}
                className="bg-sage-800/10 text-sage-800 hover:bg-sage-800 hover:text-warm-white text-[10px] font-bold tracking-wider uppercase w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all"
                aria-label="Add to cart"
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. BENTO HORIZONTAL CARD (landscape item in bento layout)
  if (layoutType === 'bento-horizontal') {
    return (
      <div className="md:col-span-2 rounded-3xl bg-white shadow-md shadow-sage-800/[0.02] border border-cream-300/10 overflow-hidden group flex flex-col sm:flex-row items-center p-4 hover:shadow-lg hover:border-cream-300/30 transition-all duration-500">
        <div
          className="w-full sm:w-1/3 aspect-square rounded-2xl bg-cream-100 relative overflow-hidden mr-0 sm:mr-6 mb-4 sm:mb-0 cursor-pointer"
          onClick={handleProductClick}
        >
          {/* First Image: Default view */}
          <img
            className="absolute inset-0 w-full h-full object-cover transform scale-100 opacity-100 group-hover:scale-105 group-hover:opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            alt={product.name}
            src={product.image}
          />
          {/* Second Image: Hover view */}
          <img
            className="absolute inset-0 w-full h-full object-cover transform scale-100 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            alt={`${product.name} alternate`}
            src={alternateImage}
          />
        </div>

        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="inline-block self-start bg-cream-200 text-sage-800 font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2 z-10 transition-transform duration-300 group-hover:scale-95">
            {t.newRitual}
          </div>
          <h4
            className="font-serif text-xl text-charcoal mb-1 cursor-pointer hover:text-sage-800 transition-colors duration-300"
            onClick={handleProductClick}
          >
            {language === 'en' ? product.name : (product.nameFr || product.name)}
          </h4>
          <p className="font-sans text-xs text-muted-gray mb-4">
            {language === 'en' ? product.subtitle : (product.subtitleFr || product.subtitle)}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-serif text-lg text-sage-800 font-medium transition-transform duration-300 group-hover:scale-105">
              {formatPrice(product.price, currency, language)}
            </span>
            {!hideAddToCartButton && (
              <button
                onClick={() => onAddToCart(product)}
                className="bg-sage-800 text-warm-white text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full hover:bg-sage-600 hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                {t.addToRitual}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
