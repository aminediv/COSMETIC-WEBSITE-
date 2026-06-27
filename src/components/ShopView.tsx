import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Heart, ShoppingBag, Grid, List, Check, X, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';

interface ShopViewProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  favorites: string[];
}

export default function ShopView({
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  favorites,
}: ShopViewProps) {
  const [selectedSkinType, setSelectedSkinType] = React.useState<string>('all');
  const [maxPrice, setMaxPrice] = React.useState<number>(150);
  const [sortBy, setSortBy] = React.useState<string>('recommended');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState<boolean>(false);

  // Hardcode category labels
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'facial-oils', label: 'Facial Care' },
    { id: 'clays-masks', label: 'Clays & Masks' },
    { id: 'body-ritual', label: 'Body Rituals' },
  ];

  const skinTypes = [
    { id: 'all', label: 'All Skin Types' },
    { id: 'dry', label: 'Dry Skin' },
    { id: 'oily-combination', label: 'Oily / Combination' },
    { id: 'sensitive', label: 'Sensitive Skin' },
  ];

  // Filters logic
  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
    const skinTypeMatch = selectedSkinType === 'all' || p.skinType === selectedSkinType;
    const priceMatch = p.price <= maxPrice;
    return categoryMatch && skinTypeMatch && priceMatch;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default or 'recommended': best sellers first, then alphabetical
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSkinType('all');
    setMaxPrice(150);
    setSortBy('recommended');
  };

  const handleProductClick = (product: Product) => {
    onSelectProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* 1. Header Hero Panel */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-sage-800 mb-3 block">
          L'Essence Apothecary
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-medium tracking-tight mb-4">
          Botanical Collections
        </h1>
        <p className="font-sans text-xs md:text-sm text-muted-gray max-w-xl mx-auto leading-relaxed">
          Nourishing formulas hand-crafted from cold-pressed argan nuts, steam-distilled blossoms, and ancient mountain minerals.
        </p>
        <div className="w-12 h-[1px] bg-sage-800/35 mx-auto mt-8" />
      </div>

      {/* 2. Main Shop Grid with Sidebar Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left Sidebar Filters - Hidden on Mobile */}
        <div className="hidden lg:block lg:col-span-1 space-y-10">
          {/* Categories Filter */}
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal mb-5 pb-2 border-b border-cream-300/30">
              Categories
            </h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center justify-between w-full text-left font-sans text-sm transition-colors ${
                    selectedCategory === cat.id
                      ? 'text-sage-800 font-semibold'
                      : 'text-muted-gray hover:text-sage-600'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && (
                    <motion.span layoutId="activeCatCheck" className="w-1.5 h-1.5 rounded-full bg-sage-800" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type Filter */}
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal mb-5 pb-2 border-b border-cream-300/30">
              Skin Need
            </h3>
            <div className="space-y-3">
              {skinTypes.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedSkinType(st.id)}
                  className={`flex items-center justify-between w-full text-left font-sans text-sm transition-colors ${
                    selectedSkinType === st.id
                      ? 'text-sage-800 font-semibold'
                      : 'text-muted-gray hover:text-sage-600'
                  }`}
                >
                  <span>{st.label}</span>
                  {selectedSkinType === st.id && (
                    <motion.span layoutId="activeSkinCheck" className="w-1.5 h-1.5 rounded-full bg-sage-800" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal mb-5 pb-2 border-b border-cream-300/30">
              Maximum Price
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-sage-800 h-1 bg-cream-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between font-sans text-xs text-muted-gray font-medium">
                <span>$20</span>
                <span className="text-sage-800 font-bold font-serif text-sm">${maxPrice}</span>
                <span>$150</span>
              </div>
            </div>
          </div>

          {/* Clear Button */}
          {(selectedCategory !== 'all' || selectedSkinType !== 'all' || maxPrice < 150) && (
            <button
              onClick={clearFilters}
              className="w-full border border-sage-800/20 text-sage-800 hover:bg-sage-800/5 font-sans text-xs font-semibold tracking-widest uppercase py-3 rounded-full transition-all"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Right Active Grid Side */}
        <div className="lg:col-span-3">
          {/* Controls Bar: Mobile toggle, Sorting, Active Chips */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-cream-300/30 mb-8 font-sans text-xs font-medium text-muted-gray">
            {/* Left side: Mobile filters toggle or count */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-cream-100 px-4 py-2.5 rounded-full text-charcoal hover:bg-cream-200 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <span className="font-sans text-xs tracking-wide text-muted-gray">
                Showing {sortedProducts.length} luxurious formulas
              </span>
            </div>

            {/* Right side: Sorting */}
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-muted-gray" />
              <span className="text-muted-gray hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream-100 hover:bg-cream-200 text-charcoal font-sans text-xs font-semibold rounded-full px-4 py-2.5 focus:outline-none transition-colors cursor-pointer border-none"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters Chips */}
          {(selectedCategory !== 'all' || selectedSkinType !== 'all' || maxPrice < 150) && (
            <div className="flex flex-wrap gap-2 mb-8 items-center">
              <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-charcoal mr-2">
                Active filters:
              </span>
              {selectedCategory !== 'all' && (
                <div className="flex items-center gap-1.5 bg-sage-800/10 text-sage-800 px-3 py-1.5 rounded-full text-[11px]">
                  <span>{categories.find((c) => c.id === selectedCategory)?.label}</span>
                  <button onClick={() => setSelectedCategory('all')} className="hover:opacity-80">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {selectedSkinType !== 'all' && (
                <div className="flex items-center gap-1.5 bg-sage-800/10 text-sage-800 px-3 py-1.5 rounded-full text-[11px]">
                  <span>{skinTypes.find((s) => s.id === selectedSkinType)?.label}</span>
                  <button onClick={() => setSelectedSkinType('all')} className="hover:opacity-80">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {maxPrice < 150 && (
                <div className="flex items-center gap-1.5 bg-sage-800/10 text-sage-800 px-3 py-1.5 rounded-full text-[11px]">
                  <span>Under ${maxPrice}</span>
                  <button onClick={() => setMaxPrice(150)} className="hover:opacity-80">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <button
                onClick={clearFilters}
                className="font-sans text-[11px] text-sage-800 underline font-semibold tracking-wider hover:opacity-80"
              >
                Reset
              </button>
            </div>
          )}

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center glass-panel rounded-3xl p-12 max-w-md mx-auto"
            >
              <h3 className="font-serif text-2xl text-charcoal mb-3">No Formulations Found</h3>
              <p className="font-sans text-sm text-muted-gray mb-8">
                We couldn't find any products matching your specific botanical filters. Try widening your price range or exploring other skin needs.
              </p>
              <button
                onClick={clearFilters}
                className="bg-sage-800 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    className="group bg-pure-white rounded-3xl border border-cream-300/10 shadow-md shadow-sage-800/[0.01] overflow-hidden flex flex-col p-4 hover:shadow-xl transition-all duration-400"
                  >
                    {/* Media Block */}
                    <div
                      className="aspect-square rounded-2xl bg-cream-100 relative overflow-hidden mb-5 cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <img
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={product.name}
                        src={product.image}
                      />
                      {product.isBestSeller && (
                        <div className="absolute top-3 left-3 bg-sage-800 text-warm-white font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                          Best Seller
                        </div>
                      )}
                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-gold-accent text-charcoal font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                          New
                        </div>
                      )}

                      {/* Heart Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(product);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pure-white/85 backdrop-blur-md flex items-center justify-center text-sage-800 hover:text-red-400 transition-colors shadow-sm z-10"
                        aria-label="Add to favorites"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.includes(product.id) ? 'fill-red-400 text-red-400' : ''
                          }`}
                        />
                      </button>

                      {/* Hover Slide-up Quick Add Panel */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-charcoal/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          className="w-full bg-pure-white/95 backdrop-blur-md hover:bg-sage-800 hover:text-warm-white text-charcoal font-sans text-[10px] font-bold tracking-widest uppercase py-3 rounded-full transition-all shadow-md flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Quick Ritual Add
                        </button>
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="cursor-pointer" onClick={() => handleProductClick(product)}>
                        <h3 className="font-serif text-xl text-charcoal group-hover:text-sage-800 transition-colors">
                          {product.name}
                        </h3>
                        <p className="font-sans text-xs text-muted-gray mt-1">{product.subtitle}</p>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-cream-100">
                        <span className="font-serif text-xl text-sage-800 font-medium">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => handleProductClick(product)}
                          className="font-sans text-[10px] font-semibold tracking-widest uppercase text-sage-800 hover:text-sage-600 transition-colors"
                        >
                          Details →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* 3. Mobile Filters Slide-over Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-charcoal z-[100] lg:hidden"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-80 bg-warm-white shadow-2xl z-[110] lg:hidden flex flex-col h-full p-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-cream-300/30">
                <h2 className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal">
                  Filter Formulas
                </h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-muted-gray hover:text-sage-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Filters */}
              <div className="flex-1 overflow-y-auto py-6 space-y-8 custom-scrollbar">
                {/* Categories */}
                <div>
                  <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal mb-4">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left py-2 font-sans text-sm ${
                          selectedCategory === cat.id ? 'text-sage-800 font-bold' : 'text-muted-gray'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skin Need */}
                <div>
                  <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal mb-4">
                    Skin Need
                  </h3>
                  <div className="space-y-2">
                    {skinTypes.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setSelectedSkinType(st.id)}
                        className={`w-full text-left py-2 font-sans text-sm ${
                          selectedSkinType === st.id ? 'text-sage-800 font-bold' : 'text-muted-gray'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal mb-4">
                    Max Price
                  </h3>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-sage-800 mb-2 h-1 bg-cream-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-gray">
                    <span>$20</span>
                    <span className="font-serif text-sm font-bold text-sage-800">${maxPrice}</span>
                    <span>$150</span>
                  </div>
                </div>
              </div>

              {/* Bottom Apply Bar */}
              <div className="pt-4 border-t border-cream-300/30">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-sage-800 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase py-3.5 rounded-full"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
