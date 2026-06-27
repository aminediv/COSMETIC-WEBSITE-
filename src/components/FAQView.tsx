import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Check, HelpCircle as HelpIcon, Sparkles } from 'lucide-react';
import { faqs } from '../data';

export default function FAQView() {
  const [activeCategory, setActiveCategory] = React.useState<'products' | 'shipping' | 'orders' | 'ritual'>('products');
  const [openFAQId, setOpenFAQId] = React.useState<string | null>('faq-1');

  const categories = [
    { id: 'products', label: 'Botanical Products' },
    { id: 'ritual', label: 'Hammam Routine' },
    { id: 'shipping', label: 'Eco-Shipping' },
    { id: 'orders', label: 'Orders & Receipts' },
  ];

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
        <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-sage-800 mb-2 block">
          Apothecary Knowledge
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-medium tracking-tight mb-4">
          Frequently Answered Secrets
        </h1>
        <p className="font-sans text-xs md:text-sm text-muted-gray max-w-xl mx-auto leading-relaxed">
          Unlock details on organic botanical shelf lives, the differences between elixirs, and how we pack and ship carbon-neutrally.
        </p>

        {/* Tab categories */}
        <div className="flex flex-wrap items-center gap-2 mt-8 justify-center border-b border-cream-300/30 pb-6">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(c.id as any);
                setOpenFAQId(null);
              }}
              className={`font-sans text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-full transition-all ${
                activeCategory === c.id
                  ? 'bg-sage-800 text-warm-white shadow-md shadow-sage-800/10'
                  : 'text-muted-gray hover:text-sage-800 bg-cream-100 hover:bg-cream-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordions Layout */}
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredFaqs.map((faq) => {
              const isOpen = openFAQId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-pure-white rounded-2xl border border-cream-300/20 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQId(isOpen ? null : faq.id)}
                    className="w-full flex justify-between items-center text-left p-6 font-serif text-lg text-charcoal hover:text-sage-800 transition-colors gap-4"
                  >
                    <span className="font-medium leading-snug flex items-center gap-2">
                      <HelpIcon className="w-5 h-5 text-sage-600 shrink-0" /> {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-gray transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-sage-800' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-cream-100 font-sans text-sm text-muted-gray leading-relaxed space-y-3">
                          <p>{faq.answer}</p>
                          <div className="flex items-center gap-1.5 text-sage-800 text-[10px] font-bold tracking-widest uppercase pt-2">
                            <Check className="w-4 h-4" /> Eco-Certified Answer
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Holistic Consulting Callout */}
        <div className="pt-8 text-center space-y-4">
          <p className="font-sans text-xs text-muted-gray">
            Still seeking a specific ingredient or dosage question?
          </p>
          <div className="inline-block bg-sage-50 border border-sage-200 p-4 rounded-3xl max-w-md mx-auto">
            <h4 className="font-serif text-base text-sage-950 font-semibold mb-1">
              Ask Our Holistic Advisor
            </h4>
            <p className="font-sans text-xs text-muted-gray mb-3 leading-normal">
              Get an organic skincare routine designed around your unique skin barrier and Atlas mint extracts.
            </p>
            <div className="flex justify-center gap-2">
              <span className="font-sans text-[10px] font-bold bg-sage-800 text-warm-white px-3 py-1.5 rounded-full">
                chat@lessence.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
