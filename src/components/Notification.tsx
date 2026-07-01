import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Heart, X, ShoppingBag } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'favorite' | 'info';
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  const onCloseRef = React.useRef(onClose);

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-charcoal text-warm-white shadow-2xl border border-white/10 max-w-sm md:max-w-md"
    >
      <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-white/10">
        {type === 'success' && <ShoppingBag className="w-5 h-5 text-gold-accent" />}
        {type === 'favorite' && <Heart className="w-5 h-5 text-red-400 fill-red-400" />}
        {type === 'info' && <Check className="w-5 h-5 text-sage-300" />}
      </div>
      <div className="flex-grow">
        <p className="font-sans text-sm font-medium tracking-wide leading-relaxed">
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-white/40 hover:text-white/80 transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
