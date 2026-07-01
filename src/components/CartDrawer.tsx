import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem, Product } from '../types';
import { products } from '../data';
import { locales } from '../locales';
import { formatPrice } from '../utils/price';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onAddToCart: (product: Product) => void;
  language: 'en' | 'fr';
  currency?: 'MAD' | 'EUR';
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onAddToCart,
  language,
  currency = 'MAD',
}: CartDrawerProps) {
  const t = locales[language].cart;
  const thome = locales[language].home;
  const tcheckout = locales[language].checkout;
  // Simple calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 75;
  const shippingCharge = isFreeShipping ? 0 : 9.5;
  const total = subtotal + shippingCharge;

  // Addon recommendation: filter items not currently in the cart

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal z-[150]"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-warm-white shadow-2xl z-[160] flex flex-col h-full"
            id="cart-drawer"
          >
            {/* Header */}
            <div className="p-6 border-b border-cream-300/30 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-sage-800" />
                <h2 className="font-serif text-xl font-bold text-charcoal">{t.title}</h2>
                <span className="font-sans text-xs bg-sage-800/10 text-sage-800 font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-muted-gray hover:text-sage-800 p-1"
                aria-label="Close cart drawer"
                id="close-cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-4 bg-sage-50 border-b border-cream-200">
              <p className="font-sans text-xs text-sage-800 leading-relaxed">
                {isFreeShipping ? (
                  <span className="font-semibold">{language === 'en' ? 'Congratulations! Your order qualifies for Free Botanical Shipping.' : 'Félicitations ! Votre commande bénéficie de la livraison offerte.'}</span>
                ) : (
                  <span>
                    {language === 'en' ? 'Add' : 'Ajoutez'} <span className="font-bold">{formatPrice(75 - subtotal, currency, language)}</span> {language === 'en' ? 'more to unlock free shipping.' : 'pour bénéficier de la livraison gratuite.'}
                  </span>
                )}
              </p>
              <div className="w-full bg-cream-300/50 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-sage-600 h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / 75) * 100)}%` }}
                />
              </div>
            </div>

            {/* Scrollable Cart Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 space-y-4 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-sage-800 mb-2">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal">{t.empty}</h3>
                  <p className="font-sans text-xs text-muted-gray max-w-xs mx-auto leading-relaxed">
                    {language === 'en' ? 'Begin your restorative ritual by adding some of our organic cold-pressed Moroccan formulations.' : 'Commencez votre rituel réparateur en ajoutant certaines de nos formulations marocaines bio pressées à froid.'}
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-sage-800 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full hover:scale-105 transition-transform"
                  >
                    {t.explore}
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart List */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-4 p-4 rounded-2xl bg-white border border-cream-300/25 shadow-sm relative group"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif text-base text-charcoal truncate">
                              {language === 'en' ? item.product.name : (item.product.nameFr || item.product.name)}
                            </h4>
                            <p className="font-sans text-[11px] text-muted-gray truncate italic">
                              {language === 'en' ? item.product.subtitle : (item.product.subtitleFr || item.product.subtitle)}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-cream-200 bg-cream-100 rounded-full p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="w-6 h-6 flex items-center justify-center text-muted-gray hover:text-charcoal"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="font-sans text-xs font-bold text-charcoal w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-muted-gray hover:text-charcoal"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>

                            <span className="font-serif text-base text-sage-800 font-semibold">
                              {formatPrice(item.product.price * item.quantity, currency, language)}
                            </span>
                          </div>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="absolute top-2 right-2 p-1 bg-transparent hover:bg-cream-100 text-muted-gray hover:text-red-400 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>


                </>
              )}
            </div>

            {/* Bottom Panel Order Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-cream-300/30 space-y-4">
                <div className="space-y-2 font-sans text-xs">
                  <div className="flex justify-between text-muted-gray">
                    <span>{t.subtotal}</span>
                    <span className="font-serif text-sm font-semibold text-charcoal">
                      {formatPrice(subtotal, currency, language)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-gray">
                    <span>{language === 'en' ? 'Carbon-Neutral Shipping' : 'Livraison neutre en carbone'}</span>
                    <span className="font-serif text-sm font-semibold text-charcoal">
                      {isFreeShipping ? tcheckout.free : formatPrice(shippingCharge, currency, language)}
                    </span>
                  </div>
                  <div className="flex justify-between text-charcoal pt-2 border-t border-cream-200">
                    <span className="font-bold">{tcheckout.total}</span>
                    <span className="font-serif text-lg font-bold text-sage-800">
                      {formatPrice(total, currency, language)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all duration-300 hover:scale-[1.01] shadow-xl shadow-sage-800/10 flex items-center justify-center gap-2 mt-4"
                  id="checkout-button"
                >
                  {t.checkout} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
