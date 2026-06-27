import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Globe, Award, ShieldAlert, Check } from 'lucide-react';

export default function AboutView() {
  const values = [
    {
      icon: <Globe className="w-6 h-6 text-sage-800" />,
      title: 'Moroccan Heritage Sourcing',
      desc: 'All cold-pressed argan oil, clays, and distilled flower waters are sourced directly from sustainable female-led agricultural cooperatives in the Atlas region of Morocco.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sage-800" />,
      title: '100% Organic Botanical Purity',
      desc: 'We never dilute our products with water, fillers, parabens, synthetic fragrances, or stabilizers. Every bottle is single-origin or simple organic botanical blends.',
    },
    {
      icon: <Heart className="w-6 h-6 text-sage-800" />,
      title: 'Ethical Trade Alignment',
      desc: 'By cutting out middlemen, we ensure that rural Moroccan female artisans receive fair living wages, enabling direct investments into rural education and healthcare.',
    },
  ];

  const milestones = [
    { year: '2018', title: 'The Sourcing Journey', desc: 'Our founders travel deep into southwestern Morocco, establishing direct relationships with small-scale argan cooperatives.' },
    { year: '2020', title: 'Apothecary Launch', desc: 'L’Essence Botanique begins introducing single-origin, pristine Atlas Rose water and Rhassoul volcanic lava clays.' },
    { year: '2023', title: 'Eco-Pact Certification', desc: 'We transition to fully biodegradable glass vessels, linen wrapping, and soy-ink branding, achieving 100% plastic-free operations.' },
    { year: '2026', title: 'Supporting Over 800 Women', desc: 'Our supply chain directly secures full-time employment and health coverage for over 800 female agricultural workers.' },
  ];

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* 1. Large Storytelling Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-sans text-xs font-semibold tracking-widest uppercase text-sage-800 bg-sage-800/10 px-3.5 py-1.5 rounded-full inline-block">
              Our Sacred Philosophy
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight font-medium">
              The Art of Moroccan Slow Beauty.
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-gray leading-relaxed">
              At L’Essence Botanique, we do not believe in the rush of synthetics or artificial complex overlays. We believe in high-integrity, slow, deliberate skincare rooted in twelve centuries of Moroccan hammam wisdom.
            </p>
            <p className="font-sans text-sm md:text-base text-muted-gray leading-relaxed">
              We work in harmony with the natural cycles of the Atlas Range. Every seed of our prickly pear is hand-selected; every drop of our argan oil is cold-pressed between stones. We craft in small, conscious batches to preserve absolute biological potency.
            </p>
          </div>
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4umCrCR1xs38i8Z0gR1QZzgmxwL-URQjMs2DuGRZqBUTKjvzQ5ZTj-5MHrk7jwXKCqlSB79oVlVlO55T9v37ihofgIQq_GxCdyftOIP-QtyXeZRtTjVZlQYL9WRnKQw3THiSU-aqpFxvC1ziAedVDHs0H0AasGaiT0iCbGeGcvhKjn2d7AKF6TB6OY0b6j3G-LmF8NcYVyY6IZjawQNciMWv88uTURT4KCGKIyl-MaVBFnUVqGRB32aF2NwCdw-ZMQ185tGuSHbo"
              className="w-full h-full object-cover"
              alt="Organic Argan cooperative harvesting seeds"
            />
          </div>
        </div>
      </section>

      {/* 2. Core Sourcing Values Bento Block */}
      <section className="py-20 bg-cream-100/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-serif text-3xl text-charcoal font-medium tracking-tight">Our Core Pledges</h2>
            <p className="font-sans text-xs md:text-sm text-muted-gray mt-2 leading-relaxed">
              We hold ourselves to a standard of absolute transparency and regenerative trade.
            </p>
            <div className="w-12 h-[1px] bg-sage-800 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-pure-white rounded-3xl p-8 border border-cream-300/10 shadow-sm space-y-5"
              >
                <div className="w-12 h-12 rounded-full bg-sage-50 flex items-center justify-center">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl text-charcoal font-medium">{v.title}</h3>
                <p className="font-sans text-sm text-muted-gray leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sourcing Heritage Map/Text block */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-last lg:order-first relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArVs2gvB_F9W-Vjpk_qeZXdTcJeJRMHEmSk5XwKf651nqsSSWlpbKzTAF8WwfpUIcsyauDxn8xx5uVF8WwI7EcrcYJ8kjr431IeLnfjGCNnvG7c7--Phf70QzSDbkX_u0dxXtFqXLlUYy3dYQuH46_NIrs-94hwK4n7hID6Fun7tMTDwCHq63r_3iNv-pKfgpj78tlk4CBsv-t8fsY-ptf1Bqn7hRa8LUe6FB78-K_eDYERUuFnFMWhzZvGCb3CZwsXNYH1UiCo5A"
              className="w-full h-full object-cover"
              alt="The Atlas Range Mountains Morocco"
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <span className="font-sans text-xs font-semibold tracking-widest uppercase text-sage-800">
              Moroccan Sourcing Map
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight font-medium">
              From Sacred Terroirs to Your Dressing Table.
            </h2>
            <div className="space-y-4 font-sans text-sm text-muted-gray leading-relaxed">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-charcoal font-medium">Valley of the Roses:</strong> Damascus Rose petals are hand-harvested by local farming guilds at dawn during May, steam-distilled instantly with cold mountain springs to yield our Rose Water Mist.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-charcoal font-medium">Argan biosphere of Essaouira:</strong> Argan kernels are hand-cracked using river stones and cold-pressed to maintain vitamin concentration, supplying our Pure Argan Oil.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-charcoal font-medium">Atlas Volcanic Mountains:</strong> High-mineral Rhassoul clays are extracted from pristine ancient subterranean lakebeds, naturally dried in the Atlas sun, and milled into micro-fine clay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Elegant Milestone Timeline */}
      <section className="py-20 bg-cream-100/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-charcoal font-medium tracking-tight">The Heritage Timeline</h2>
            <div className="w-12 h-[1px] bg-sage-800 mx-auto mt-4" />
          </div>

          <div className="relative border-l border-sage-800/20 pl-6 md:pl-10 space-y-12 ml-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Bullet */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-[11px] h-[11px] rounded-full bg-sage-800 border-2 border-warm-white group-hover:scale-125 transition-transform" />
                
                <span className="font-serif text-xl font-bold text-sage-800 block mb-1">
                  {m.year}
                </span>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                  {m.title}
                </h3>
                <p className="font-sans text-sm text-muted-gray leading-relaxed max-w-2xl">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
