import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Clock, Sparkles, User, Settings, ShieldCheck, MapPin, ChevronRight, Check } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';

interface AccountViewProps {
  favorites: string[];
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  setCurrentView: (view: string) => void;
}

export default function AccountView({
  favorites,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
  setCurrentView,
}: AccountViewProps) {
  const [activeTab, setActiveTab] = React.useState<'favorites' | 'history' | 'profile'>('favorites');

  // Grab the favorite products list
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleProductClick = (p: Product) => {
    onSelectProduct(p);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Past orders mockup
  const pastOrders = [
    {
      id: 'L-1042',
      date: 'June 12, 2026',
      total: 168.0,
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-800',
      items: [
        { name: "L'Or du Maroc Elixir", qty: 1, price: 120.0, image: products[0].image },
        { name: '100% Pure Argan Oil', qty: 1, price: 48.0, image: products[1].image },
      ],
      shippingTimeline: [
        { label: 'Sourced in Atlas Coops', date: 'June 12', completed: true },
        { label: 'Quality Tested & Milled', date: 'June 13', completed: true },
        { label: 'Packed & Dispatched', date: 'June 14', completed: true },
        { label: 'Hand Delivered in Linen', date: 'June 16', completed: true },
      ],
    },
    {
      id: 'L-1025',
      date: 'May 04, 2026',
      total: 32.0,
      status: 'Archived',
      statusColor: 'bg-cream-300 text-charcoal',
      items: [
        { name: 'Rhassoul Clay Mask', qty: 1, price: 32.0, image: products[3].image },
      ],
      shippingTimeline: [
        { label: 'Sourced in Atlas Coops', date: 'May 04', completed: true },
        { label: 'Quality Tested & Milled', date: 'May 05', completed: true },
        { label: 'Hand Delivered', date: 'May 08', completed: true },
      ],
    },
  ];

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* Profile Header Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="glass-panel rounded-3xl p-8 border border-cream-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4.5 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-full bg-sage-800 text-warm-white flex items-center justify-center font-serif text-2xl font-bold shadow-md shadow-sage-800/20">
              S
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="font-serif text-2xl md:text-3xl font-medium text-charcoal">Sarah Alami</h1>
                <Sparkles className="w-5 h-5 text-gold-accent" />
              </div>
              <p className="font-sans text-xs text-muted-gray mt-1">
                Member Since May 2024 — <strong className="text-sage-800">Skincare Enthusiast</strong>
              </p>
            </div>
          </div>

          {/* Skin Profiler stats */}
          <div className="grid grid-cols-2 gap-4 font-sans text-xs">
            <div className="bg-cream-100 px-4 py-3.5 rounded-2xl text-center border border-cream-200">
              <span className="text-muted-gray block mb-1">Skin Type Target</span>
              <strong className="text-sage-800 uppercase tracking-widest font-semibold text-[10px]">
                Dry / Sensitive
              </strong>
            </div>
            <div className="bg-cream-100 px-4 py-3.5 rounded-2xl text-center border border-cream-200">
              <span className="text-muted-gray block mb-1">Apothecary Tier</span>
              <strong className="text-sage-800 uppercase tracking-widest font-semibold text-[10px]">
                Atlas Rose Guild
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Panel grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* Navigation Tabs (Sidebar style on desktop) */}
        <div className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`w-full flex items-center justify-between p-4 rounded-xl text-left font-sans text-xs font-bold tracking-widest uppercase transition-all ${
              activeTab === 'favorites'
                ? 'bg-sage-800 text-warm-white shadow-md'
                : 'text-muted-gray hover:text-sage-800 hover:bg-cream-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4" /> My Saved Favorites
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{favorites.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center justify-between p-4 rounded-xl text-left font-sans text-xs font-bold tracking-widest uppercase transition-all ${
              activeTab === 'history'
                ? 'bg-sage-800 text-warm-white shadow-md'
                : 'text-muted-gray hover:text-sage-800 hover:bg-cream-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Routine Order History
            </span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center justify-between p-4 rounded-xl text-left font-sans text-xs font-bold tracking-widest uppercase transition-all ${
              activeTab === 'profile'
                ? 'bg-sage-800 text-warm-white shadow-md'
                : 'text-muted-gray hover:text-sage-800 hover:bg-cream-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> Personal Apothecary Profile
            </span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>
        </div>

        {/* Tab Contents Panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="font-serif text-2xl text-charcoal font-medium border-b border-cream-300/30 pb-4">
                  Saved Botanical Formulations
                </h2>

                {favoriteProducts.length === 0 ? (
                  <div className="text-center py-20 bg-pure-white rounded-3xl border border-cream-200/40 p-12">
                    <Heart className="w-12 h-12 text-sage-800/30 mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-charcoal mb-2">No Saved Favorites Yet</h3>
                    <p className="font-sans text-xs text-muted-gray max-w-xs mx-auto leading-relaxed mb-8">
                      Tap the heart icon on any argan elixirs or Rhassoul volcanic clays to store them in your personal oasis.
                    </p>
                    <button
                      onClick={() => setCurrentView('shop')}
                      className="bg-sage-800 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full"
                    >
                      Browse Apothecary
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {favoriteProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleProductClick(p)}
                        className="group cursor-pointer bg-pure-white rounded-2xl p-4 border border-cream-300/10 shadow-sm hover:shadow-md flex gap-4 relative"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex-grow min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-base text-charcoal group-hover:text-sage-800 transition-colors truncate">
                              {p.name}
                            </h3>
                            <p className="font-sans text-[11px] text-muted-gray truncate italic">
                              {p.subtitle}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-serif text-sm font-semibold text-sage-800">
                              ${p.price}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(p);
                              }}
                              className="bg-sage-800 text-warm-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full hover:bg-sage-600 transition-colors"
                            >
                              Add +
                            </button>
                          </div>
                        </div>

                        {/* Delete heart */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(p);
                          }}
                          className="absolute top-2 right-2 text-red-400 hover:text-muted-gray p-1 bg-red-50 hover:bg-cream-100 rounded-full transition-colors"
                          aria-label="Remove favorite"
                        >
                          <Heart className="w-3.5 h-3.5 fill-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <h2 className="font-serif text-2xl text-charcoal font-medium border-b border-cream-300/30 pb-4">
                  Past Apothecary Sourced Orders
                </h2>

                <div className="space-y-8">
                  {pastOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-pure-white rounded-3xl border border-cream-300/20 p-6 shadow-sm space-y-6"
                    >
                      {/* Order info bar */}
                      <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-cream-100 font-sans text-xs">
                        <div>
                          <span className="text-muted-gray">Order Code:</span>{' '}
                          <strong className="text-charcoal font-semibold">{order.id}</strong>
                        </div>
                        <div>
                          <span className="text-muted-gray">Dispatched Date:</span>{' '}
                          <strong className="text-charcoal font-semibold">{order.date}</strong>
                        </div>
                        <div>
                          <span className="text-muted-gray">Order Total:</span>{' '}
                          <strong className="text-sage-800 font-serif text-sm font-semibold">
                            ${order.total.toFixed(2)}
                          </strong>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Item list inside */}
                      <div className="space-y-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-cream-100 rounded-xl overflow-hidden shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow min-w-0 font-sans text-xs">
                              <h4 className="font-serif text-sm text-charcoal truncate">{item.name}</h4>
                              <p className="text-muted-gray">Qty: {item.qty} — ${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Packing and shipping tracking milestone timeline */}
                      <div className="bg-cream-100/40 p-4 rounded-2xl border border-cream-200">
                        <h4 className="font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-4 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-sage-800" /> Botanical Sourcing Timeline
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {order.shippingTimeline.map((step, idx) => (
                            <div key={idx} className="space-y-1.5 font-sans text-[11px] relative">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${step.completed ? 'bg-sage-800' : 'bg-cream-300'}`} />
                                <span className={`font-semibold ${step.completed ? 'text-sage-800' : 'text-muted-gray'}`}>
                                  {step.date}
                                </span>
                              </div>
                              <p className="text-muted-gray leading-tight pr-2">{step.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="font-serif text-2xl text-charcoal font-medium border-b border-cream-300/30 pb-4">
                  Botanical Sourcing Profile
                </h2>

                <div className="bg-pure-white rounded-3xl p-6 md:p-8 border border-cream-300/25 shadow-sm space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs">
                    <div>
                      <span className="text-muted-gray block mb-2 uppercase tracking-wider text-[10px]">First Name</span>
                      <p className="text-charcoal font-semibold text-sm bg-cream-100 px-4 py-3 rounded-xl border border-cream-200">Sarah</p>
                    </div>
                    <div>
                      <span className="text-muted-gray block mb-2 uppercase tracking-wider text-[10px]">Last Name</span>
                      <p className="text-charcoal font-semibold text-sm bg-cream-100 px-4 py-3 rounded-xl border border-cream-200">Alami</p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-muted-gray block mb-2 uppercase tracking-wider text-[10px]">Primary Shipping Oasis Address</span>
                      <p className="text-charcoal font-semibold text-sm bg-cream-100 px-4 py-3 rounded-xl border border-cream-200">
                        144 Rue de la Bahia, Medina, Marrakesh 40000, Morocco
                      </p>
                    </div>
                  </div>

                  {/* Security locks */}
                  <div className="flex items-center gap-2 p-4 bg-sage-50 rounded-2xl border border-sage-200/50 text-sage-950 font-sans text-xs">
                    <ShieldCheck className="w-5 h-5 text-sage-600 shrink-0" />
                    <div>
                      <span className="font-semibold block">Protected Botanical Guild Token</span>
                      <p className="text-muted-gray">Your credit card information and Moroccan sourcing data is secured with AES-256 local keys.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
