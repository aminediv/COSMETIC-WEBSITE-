import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Globe, Award } from 'lucide-react';

interface WhyChooseUsProps {
  language: 'en' | 'fr';
}

export default function WhyChooseUs({ language }: WhyChooseUsProps) {
  const content = {
    en: {
      features: [
        {
          icon: Leaf,
          title: 'Pure Ingredients',
          description: '100% natural, cold-pressed botanical extracts.',
        },
        {
          icon: Globe,
          title: 'Ethically Sourced',
          description: "Partnering fairly with women's cooperatives in Morocco.",
        },
        {
          icon: Award,
          title: 'Premium Quality',
          description: 'Hand-blended in small batches for highest potency.',
        },
      ],
    },
    fr: {
      features: [
        {
          icon: Leaf,
          title: 'Ingrédients Purs',
          description: 'Extraits botaniques 100% naturels pressés à froid.',
        },
        {
          icon: Globe,
          title: 'Origine Éthique',
          description: 'En partenariat équitable avec les coopératives de femmes au Maroc.',
        },
        {
          icon: Award,
          title: 'Qualité Premium',
          description: 'Mélangé à la main en petites quantités pour une efficacité optimale.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section id="why-choose-us-section" className="w-full py-6 md:py-4 bg-white border-t border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-cream-300">
          {t.features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 py-4 md:py-1 md:px-8 lg:px-12 flex-1"
              >
                <div className="flex-shrink-0">
                  <IconComponent className="w-8 h-8 text-sage-800" strokeWidth={1.25} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-sans text-sm font-semibold text-charcoal mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-gray leading-relaxed whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
