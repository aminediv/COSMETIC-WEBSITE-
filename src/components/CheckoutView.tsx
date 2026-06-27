import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CreditCard, Check, ArrowLeft, ShieldCheck, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  setCurrentView: (view: string) => void;
  showToast: (msg: string, type: 'success' | 'favorite' | 'info') => void;
}

export default function CheckoutView({
  cartItems,
  onClearCart,
  setCurrentView,
  showToast,
}: CheckoutViewProps) {
  const [step, setStep] = React.useState<1 | 2>(1); // 1: Details/Payment, 2: Success
  const [formData, setFormData] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Subtotal calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCharge = subtotal >= 75 ? 0 : 9.5;
  const total = subtotal + shippingCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.address || !formData.cardNumber) {
      showToast('Please complete all botanical shipping & payment details.', 'info');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate luxury packing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
      onClearCart();
      showToast('Order received! Preparing your organic skin ritual.', 'success');
    }, 2500);
  };

  const handleBackToCart = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 2) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 border border-sage-200"
        >
          <div className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-sage-800 mx-auto">
            <Check className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 bg-sage-800/10 px-3.5 py-1.5 rounded-full inline-block">
              Order Confirmed
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium">
              Your Ritual is Preparing
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-gray max-w-md mx-auto leading-relaxed">
              Breathe. Take a moment of calm. Your hand-selected Moroccan formulations are being packed in recyclable linen wraps and will ship shortly.
            </p>
          </div>

          {/* Receipt detail box */}
          <div className="bg-cream-100/60 rounded-2xl p-6 text-left space-y-3 border border-cream-200">
            <h3 className="font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal border-b border-cream-300/40 pb-2">
              Shipment Details
            </h3>
            <div className="font-sans text-xs text-muted-gray space-y-1.5">
              <p>
                <strong className="text-charcoal font-medium">Recipient:</strong> {formData.firstName}{' '}
                {formData.lastName}
              </p>
              <p>
                <strong className="text-charcoal font-medium">Destination:</strong> {formData.address},{' '}
                {formData.city}, {formData.zip}
              </p>
              <p>
                <strong className="text-charcoal font-medium">Contact:</strong> {formData.email}
              </p>
              <p>
                <strong className="text-charcoal font-medium">Delivery:</strong> Standard Botanical (3–5 Business Days)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all"
            >
              Return to Oasis Home
            </button>
            <button
              onClick={() => {
                setCurrentView('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 border border-sage-800 text-sage-800 hover:bg-sage-800/5 font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all"
            >
              Read Holistic Guides
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <button
          onClick={handleBackToCart}
          className="group flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Continue Shopping
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Modern One-Column Form Inputs */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          {/* Section 1: Contact Information */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 border border-cream-200">
            <h2 className="font-serif text-xl md:text-2xl text-charcoal font-medium flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sage-800" /> Botanical Sourcing & Destination
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@luxurymail.com"
                  className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Amine"
                    className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="El Idrissi"
                    className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="124 Rue de Bab Doukkala"
                  className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Marrakesh"
                    className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="40000"
                    className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Secure Payment */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 border border-cream-200">
            <h2 className="font-serif text-xl md:text-2xl text-charcoal font-medium flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-sage-800" /> Secure Payment Gateway
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardName"
                  required
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="Amine El Idrissi"
                  className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  Credit Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  maxLength={19}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="4000 1234 5678 9010"
                  className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="cardExpiry"
                    required
                    maxLength={5}
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="06/29"
                    className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-2">
                    CVV *
                  </label>
                  <input
                    type="password"
                    name="cardCvv"
                    required
                    maxLength={3}
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    placeholder="***"
                    className="w-full bg-pure-white border border-cream-300 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secure lock note */}
          <div className="flex items-center gap-2 text-muted-gray justify-center font-sans text-[11px] font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-sage-600" /> 256-Bit SSL Botanical Encrypted Connection
          </div>
        </form>

        {/* Right Side: Order Summary Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-cream-200 space-y-6 shadow-sm">
            <h3 className="font-serif text-2xl text-charcoal font-medium">Order Ritual Summary</h3>
            
            {/* Cart Row Items */}
            <div className="max-h-[250px] overflow-y-auto space-y-4 pr-2 custom-scrollbar border-b border-cream-300/30 pb-6">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-cream-100 rounded-xl overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-serif text-sm text-charcoal truncate">{item.product.name}</h4>
                    <p className="font-sans text-[10px] text-muted-gray uppercase tracking-wider">
                      Qty: {item.quantity} — ${item.product.price} ea
                    </p>
                  </div>
                  <span className="font-serif text-sm font-semibold text-sage-800">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 font-sans text-xs border-b border-cream-300/30 pb-6">
              <div className="flex justify-between text-muted-gray">
                <span>Botanical Subtotal</span>
                <span className="font-serif text-sm font-semibold text-charcoal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-gray">
                <span>Carbon-Neutral Shipping</span>
                <span className="font-serif text-sm font-semibold text-charcoal">
                  {shippingCharge === 0 ? 'Free' : `$${shippingCharge.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-muted-gray">
                <span>Value Added Tax (Est.)</span>
                <span className="font-serif text-sm font-semibold text-charcoal">Included</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-charcoal font-sans text-sm">
              <span className="font-bold">Total Sourced Cost</span>
              <span className="font-serif text-2xl font-bold text-sage-800">${total.toFixed(2)}</span>
            </div>

            {/* Final Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting || cartItems.length === 0}
              className={`w-full bg-sage-800 hover:bg-sage-600 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all flex items-center justify-center gap-2 mt-4 ${
                isSubmitting ? 'opacity-80 cursor-not-allowed shimmer' : ''
              }`}
            >
              {isSubmitting ? (
                <span>Aligning Botanical Reserves...</span>
              ) : (
                <span>Complete Order Securely</span>
              )}
            </button>

            {/* Small note */}
            <p className="text-[10px] font-medium tracking-wide leading-relaxed text-muted-gray text-center font-sans">
              * By completing purchase, you agree to our 30-day organic freshness satisfaction guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
