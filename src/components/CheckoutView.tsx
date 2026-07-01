import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Check, ArrowLeft, ShieldCheck, Sparkles, Mail, Inbox, X, ExternalLink, Gift, Truck, Plus, Minus, AlertTriangle } from 'lucide-react';
import { CartItem } from '../types';
import { locales } from '../locales';
import { formatPrice } from '../utils/price';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFormValidation } from '../hooks/useFormValidation';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  setCurrentView: (view: string) => void;
  showToast: (msg: string, type: 'success' | 'favorite' | 'info') => void;
  currentUser: any;
  language: 'en' | 'fr';
  currency?: 'MAD' | 'EUR';
}

export default function CheckoutView({
  cartItems,
  onClearCart,
  onUpdateQuantity,
  setCurrentView,
  showToast,
  currentUser,
  language,
  currency = 'MAD',
}: CheckoutViewProps) {
  const t = locales[language].checkout;
  const tproduct = locales[language].product;
  const [step, setStep] = React.useState<1 | 2>(1); // 1: Details/Payment, 2: Success

  const initialFormValues = React.useMemo(() => ({
    fullName: currentUser ? `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() : '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
  }), [currentUser]);

  const {
    values: formData,
    touched,
    errors,
    isValid: isFormValid,
    handleChange: handleInputChange,
    handleBlur,
    markAllAsTouched,
  } = useFormValidation({
    initialValues: initialFormValues,
    cartItems,
    language,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Subtotal calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCharge = subtotal >= 75 ? 0 : 9.5;
  const total = subtotal + shippingCharge;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      markAllAsTouched();
      showToast(
        language === 'en' 
          ? 'Please correct the errors in the form.' 
          : 'Veuillez corriger les erreurs dans le formulaire.', 
        'info'
      );
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create order document in Firestore
      await addDoc(collection(db, 'orders'), {
        userId: currentUser ? (currentUser.id || currentUser.email) : 'guest',
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        items: cartItems.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          qty: item.quantity,
          price: item.product.price,
          image: item.product.image,
        })),
        total: total,
        currency: currency,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });

      setIsSubmitting(false);
      setStep(2);
      onClearCart();
      showToast(
        language === 'en'
          ? 'Order received! Preparing your organic skin ritual.'
          : 'Commande reçue ! Préparation de votre rituel de soin biologique.',
        'success'
      );
    } catch (err) {
      console.error('Error placing order in Firestore:', err);
      setIsSubmitting(false);
      showToast(
        language === 'en'
          ? 'An error occurred while placing your order. Please try again.'
          : 'Une erreur est survenue lors de l\'enregistrement de votre commande. Veuillez réessayer.',
        'info'
      );
    }
  };

  const handleBackToCart = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 2) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto text-center relative">
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
              {language === 'en' ? 'Order Confirmed' : 'Commande Confirmée'}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium">
              {t.successTitle}
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-gray max-w-md mx-auto leading-relaxed">
              {language === 'en' 
                ? `Thank you, ${formData.fullName}! Your order has been placed. We will call you shortly at ${formData.phone} to confirm delivery.`
                : `Merci, ${formData.fullName} ! Votre commande a été enregistrée. Nous vous appellerons bientôt au ${formData.phone} pour confirmer la livraison.`}
            </p>
          </div>

          {/* Receipt detail box */}
          <div className="bg-cream-100 rounded-2xl p-6 text-left space-y-3 border border-cream-200">
            <h3 className="font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal border-b border-cream-300/40 pb-2">
              {language === 'en' ? 'Shipment Details' : 'Détails de l\'expédition'}
            </h3>
            <div className="font-sans text-xs text-muted-gray space-y-1.5">
              <p>
                <strong className="text-charcoal font-medium">{language === 'en' ? 'Recipient' : 'Destinataire'}:</strong> {formData.fullName}
              </p>
              <p>
                <strong className="text-charcoal font-medium">{language === 'en' ? 'Destination' : 'Destination'}:</strong> {formData.address},{' '}
                {formData.city}
              </p>
              <p>
                <strong className="text-charcoal font-medium">{language === 'en' ? 'Contact' : 'Contact'}:</strong> {formData.phone}
              </p>
              <p>
                <strong className="text-charcoal font-medium">{language === 'en' ? 'Payment Method' : 'Méthode de paiement'}:</strong> {language === 'en' ? 'Cash on Delivery (COD)' : 'Paiement à la livraison'}
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
              {language === 'en' ? 'Return to Oasis Home' : 'Retour à l\'Accueil'}
            </button>
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 border border-sage-800 text-sage-800 hover:bg-sage-800/5 font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-full transition-all"
            >
              {language === 'en' ? 'Continue Shopping' : 'Continuer vos achats'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-8">
        <button
          onClick={handleBackToCart}
          className="group flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> {tproduct.back}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 gap-12 items-start">
        {/* Mobile-Friendly Simplified Form & Summary */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-8 border border-cream-200">
          
          <div className="text-center space-y-2 mb-4">
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-medium">
              {language === 'en' ? 'Complete Your Order' : 'Finaliser Votre Commande'}
            </h2>
            <p className="font-sans text-xs text-muted-gray">
              {language === 'en' ? 'Cash on Delivery (COD) - Pay when you receive your order.' : 'Paiement à la livraison - Payez lorsque vous recevez votre commande.'}
            </p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Order Summary & Quantity */}
            <div className="bg-cream-50/50 rounded-2xl p-4 md:p-6 border border-cream-300/40 mb-8">
              <h3 className="font-sans text-[10px] font-bold tracking-widest uppercase text-charcoal mb-4">
                {t.orderSummary}
              </h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-cream-100 rounded-xl overflow-hidden shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-serif text-sm text-charcoal truncate">{language === 'en' ? item.product.name : (item.product.nameFr || item.product.name)}</h4>
                      <p className="font-sans text-[10px] text-sage-800 font-semibold uppercase tracking-wider">
                        {formatPrice(item.product.price * item.quantity, currency, language)}
                      </p>
                    </div>
                    <div className="flex items-center border border-cream-300 bg-white rounded-full p-1 shadow-sm shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center text-muted-gray hover:text-charcoal transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans text-xs font-bold text-charcoal w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-gray hover:text-charcoal transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-charcoal font-sans text-sm mt-6 pt-4 border-t border-cream-300/40">
                <span className="font-bold">{t.total}</span>
                <span className="font-serif text-2xl font-bold text-sage-800">{formatPrice(total, currency, language)}</span>
              </div>
            </div>

            {/* Simplified Fields */}
            <div className="space-y-4">
              {errors.quantity && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-sans border border-red-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errors.quantity}</span>
                </div>
              )}

              <div>
                <label className="block font-sans text-[11px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  {language === 'en' ? 'Full Name' : 'Nom Complet'} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('fullName')}
                  placeholder={language === 'en' ? "Full Name" : "Nom Complet"}
                  className={`w-full bg-cream-50/50 border rounded-xl px-5 py-4 font-sans text-base focus:outline-none focus:bg-white focus:ring-1 transition-colors ${
                    touched.fullName && errors.fullName
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10'
                      : 'border-cream-300 focus:border-sage-600 focus:ring-sage-600'
                  }`}
                />
                {touched.fullName && errors.fullName && (
                  <span className="text-red-500 text-xs pl-1 mt-1 block font-sans">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div>
                <label className="block font-sans text-[11px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  {language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('phone')}
                  placeholder="06 XX XX XX XX"
                  className={`w-full bg-cream-50/50 border rounded-xl px-5 py-4 font-sans text-base focus:outline-none focus:bg-white focus:ring-1 transition-colors ${
                    touched.phone && errors.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10'
                      : 'border-cream-300 focus:border-sage-600 focus:ring-sage-600'
                  }`}
                />
                {touched.phone && errors.phone && (
                  <span className="text-red-500 text-xs pl-1 mt-1 block font-sans">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div>
                <label className="block font-sans text-[11px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  {t.city} *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('city')}
                  placeholder="Marrakech, Casablanca..."
                  className={`w-full bg-cream-50/50 border rounded-xl px-5 py-4 font-sans text-base focus:outline-none focus:bg-white focus:ring-1 transition-colors ${
                    touched.city && errors.city
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10'
                      : 'border-cream-300 focus:border-sage-600 focus:ring-sage-600'
                  }`}
                />
                {touched.city && errors.city && (
                  <span className="text-red-500 text-xs pl-1 mt-1 block font-sans">
                    {errors.city}
                  </span>
                )}
              </div>

              <div>
                <label className="block font-sans text-[11px] font-bold tracking-widest uppercase text-charcoal mb-2">
                  {language === 'en' ? 'Full Address' : 'Adresse Complète'} *
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('address')}
                  placeholder={language === 'en' ? "Street name, neighborhood, house number..." : "Nom de rue, quartier, numéro..."}
                  className={`w-full bg-cream-50/50 border rounded-xl px-5 py-4 font-sans text-base focus:outline-none focus:bg-white focus:ring-1 transition-colors resize-none ${
                    touched.address && errors.address
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/10'
                      : 'border-cream-300 focus:border-sage-600 focus:ring-sage-600'
                  }`}
                />
                {touched.address && errors.address && (
                  <span className="text-red-500 text-xs pl-1 mt-1 block font-sans">
                    {errors.address}
                  </span>
                )}
              </div>
            </div>

            {/* Final Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full font-sans text-sm font-semibold tracking-widest uppercase py-5 rounded-xl transition-all flex items-center justify-center gap-2 mt-8 shadow-lg ${
                isFormValid && !isSubmitting
                  ? 'bg-sage-800 hover:bg-sage-600 text-warm-white hover:scale-[1.01] shadow-sage-800/20 active:scale-[0.99] cursor-pointer'
                  : 'bg-cream-300 text-muted-gray cursor-not-allowed opacity-75'
              }`}
            >
              {isSubmitting ? (
                <span>{t.processing}</span>
              ) : (
                <span>{language === 'en' ? 'Order Now (Cash on Delivery)' : 'Commander (Paiement à la livraison)'}</span>
              )}
            </button>
            
            <div className="flex items-center gap-2 justify-center text-muted-gray mt-4 font-sans text-[10px] uppercase tracking-widest font-semibold">
              <ShieldCheck className="w-4 h-4 text-sage-600" />
              {language === 'en' ? 'Safe & Fast Delivery' : 'Livraison Rapide et Sécurisée'}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
