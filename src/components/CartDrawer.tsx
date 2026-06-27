import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem, Product } from '../types';
import { products } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onAddToCart: (product: Product) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onAddToCart,
}: CartDrawerProps) {
  // Simple calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 75;
  const shippingCharge = isFreeShipping ? 0 : 9.5;
  const total = subtotal + shippingCharge;

  // Addon recommendation: filter items not currently in the cart
  const addonProduct = products.find((p) => !cartItems.some((item) => item.product.id === p.id)) || products[4];

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
            <div className="p-6 border-b border-cream-300/30 flex justify-between items-center bg-pure-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-sage-800" />
                <h2 className="font-serif text-xl font-bold text-charcoal">Your Botanical Bag</h2>
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
                  <span className="font-semibold">Congratulations! Your order qualifies for Free Botanical Shipping.</span>
                ) : (
                  <span>
                    Add <span className="font-bold">${(75 - subtotal).toFixed(2)}</span> more to unlock free shipping.
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
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-sage-800 mb-2">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal">Your Bag is Empty</h3>
                  <p className="font-sans text-xs text-muted-gray max-w-xs mx-auto leading-relaxed">
                    Begin your restorative ritual by adding some of our organic cold-pressed Moroccan formulations.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-sage-800 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full hover:scale-105 transition-transform"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart List */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        layout
                        key={item.product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-4 p-4 rounded-2xl bg-pure-white border border-cream-300/25 shadow-sm relative group"
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
                              {item.product.name}
                            </h4>
                            <p className="font-sans text-[11px] text-muted-gray truncate italic">
                              {item.product.subtitle}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-cream-200 bg-cream-100/50 rounded-full p-0.5">
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
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="absolute top-2 right-2 text-white/0 group-hover:text-red-400 p-1 bg-white/0 hover:bg-red-50 hover:rounded-full transition-all duration-300 focus:text-red-400 group-hover:opacity-100"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 text-muted-gray hover:text-red-500" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Complete Your Ritual Cross Sell addon */}
                  {addonProduct && (
                    <div className="mt-8 p-4 rounded-2xl bg-cream-100/50 border border-cream-300/20">
                      <h4 className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 mb-3 flex items-center gap-1">
                        Complete Your Ritual
                      </h4>
                      <div className="flex items-center gap-3">
                        <img
                          src={addonProduct.image}
                          alt={addonProduct.name}
                          className="w-12 h-12 rounded-lg object-cover bg-cream-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-sm text-charcoal truncate">
                            {addonProduct.name}
                          </h5>
                          <p className="font-sans text-[11px] text-sage-800 font-bold">
                            ${addonProduct.price}
                          </p>
                        </div>
                        <button
                          onClick={() => onAddToCart(addonProduct)}
                          className="bg-sage-800 text-warm-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full hover:bg-sage-600 transition-colors shrink-0"
                        >
                          Add +
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom Panel Order Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-pure-white border-t border-cream-300/30 space-y-4">
                <div className="space-y-2 font-sans text-xs">
                  <div className="flex justify-between text-muted-gray">
                    <span>Ritual Subtotal</span>
                    <span className="font-serif text-sm font-semibold text-charcoal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-gray">
                    <span>Carbon-Neutral Shipping</span>
                    <span className="font-serif text-sm font-semibold text-charcoal">
                      {isFreeShipping ? 'Free' : `$${shippingCharge.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-charcoal pt-2 border-t border-cream-200">
                    <span className="font-bold">Estimated Order Total</span>
                    <span className="font-serif text-lg font-bold text-sage-800">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all duration-300 hover:scale-[1.01] shadow-xl shadow-sage-800/10 flex items-center justify-center gap-2 mt-4"
                  id="checkout-button"
                >
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
