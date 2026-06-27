import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, User, Calendar, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';
import { Article } from '../types';
import { articles } from '../data';

interface BlogViewProps {
  showToast: (msg: string, type: 'success' | 'favorite' | 'info') => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
}

export default function BlogView({ showToast, selectedArticle, setSelectedArticle }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  const categories = ['All', 'Rituals', 'Ingredients', 'Story'];

  const filteredArticles = articles.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  const handleShare = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    showToast(`Shared guide "${title}" successfully to Clipboard.`, 'info');
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedArticle) {
    return (
      <div className="pt-28 pb-24 bg-warm-white">
        {/* Detail article header */}
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={handleBackToGrid}
            className="group flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-muted-gray hover:text-sage-800 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Journal
          </button>

          {/* Article Info */}
          <div className="space-y-6 mb-12">
            <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 bg-sage-800/10 px-3 py-1 rounded-full">
              {selectedArticle.category} Journal
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-medium leading-[1.2]">
              {selectedArticle.title}
            </h1>

            {/* Author meta bar */}
            <div className="flex flex-wrap items-center gap-6 font-sans text-xs text-muted-gray pt-2 border-y border-cream-300/30 py-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sage-800/20 text-sage-800 font-bold flex items-center justify-center text-[10px]">
                  {selectedArticle.author[0]}
                </div>
                <span>
                  By <strong className="text-charcoal font-medium">{selectedArticle.author}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {selectedArticle.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {selectedArticle.readTime}
              </div>
              <button
                onClick={(e) => handleShare(e, selectedArticle.title)}
                className="flex items-center gap-1.5 ml-auto hover:text-sage-800 transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share Guide
              </button>
            </div>
          </div>
        </div>

        {/* Large Image Banner */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-cream-100 shadow-md">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Body Text */}
        <article className="max-w-3xl mx-auto px-6">
          <div className="space-y-8 font-serif text-lg text-charcoal leading-relaxed tracking-wide">
            {selectedArticle.content.map((para, i) => (
              <p key={i} className="first-letter:text-4xl first-letter:font-bold first-letter:text-sage-800 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                {para}
              </p>
            ))}
          </div>

          {/* Organic Footer Note */}
          <div className="mt-16 p-8 rounded-3xl bg-cream-100/60 border border-cream-200 flex flex-col sm:flex-row items-center gap-6 justify-between text-center sm:text-left">
            <div className="space-y-1">
              <h3 className="font-serif text-xl text-charcoal font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-sage-800" /> Wisdom of the Soil
              </h3>
              <p className="font-sans text-xs text-muted-gray">
                Nourishing the connection between ancient desert rituals and modern conscious lifestyles.
              </p>
            </div>
            <button
              onClick={handleBackToGrid}
              className="bg-sage-800 text-warm-white font-sans text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-sage-600 transition-colors"
            >
              Explore Other Guides
            </button>
          </div>
        </article>
      </div>
    );
  }

  // Articles Grid Layout (Editorial Magazine Style)
  const featured = articles[0];
  const recents = articles.slice(1);

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      {/* Blog Intro */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center md:text-left">
        <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-sage-800 mb-2 block">
          L'Essence Botanical Library
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-medium tracking-tight">
          The Botanical Journal
        </h1>
        <p className="font-sans text-xs md:text-sm text-muted-gray mt-2 max-w-lg leading-relaxed">
          Stories of heritage sourcing, mineral sciences, and holistic Moroccan morning rituals.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2 mt-8 justify-center md:justify-start border-b border-cream-300/30 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-sage-800 text-warm-white shadow-md shadow-sage-800/10'
                  : 'text-muted-gray hover:text-sage-800 bg-cream-100 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* 1. Large Featured Post (When "All" category is active) */}
        {selectedCategory === 'All' && featured && (
          <div
            onClick={() => handleArticleClick(featured)}
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-pure-white rounded-3xl p-6 border border-cream-300/20 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Image banner */}
            <div className="lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden bg-cream-100 relative">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute top-4 left-4 bg-pure-white/90 backdrop-blur-sm text-sage-800 font-sans text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                Featured Guide
              </div>
            </div>

            {/* Meta Text */}
            <div className="lg:col-span-5 space-y-5 p-2 lg:p-6">
              <div className="flex items-center gap-4 font-sans text-[10px] tracking-widest uppercase text-muted-gray">
                <span>{featured.date}</span>
                <span>—</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal leading-tight group-hover:text-sage-800 transition-colors font-medium">
                {featured.title}
              </h2>
              <p className="font-sans text-sm text-muted-gray leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-cream-100">
                <span className="font-sans text-xs font-bold tracking-widest uppercase text-sage-800 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Deep Sourcing Story <ArrowRight className="w-4 h-4" />
                </span>
                <button
                  onClick={(e) => handleShare(e, featured.title)}
                  className="text-muted-gray hover:text-sage-800 p-2 rounded-full hover:bg-cream-100 transition-colors"
                  aria-label="Share story"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filteredArticles
            .filter((a) => selectedCategory !== 'All' || a.id !== featured?.id)
            .map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="group cursor-pointer flex flex-col bg-pure-white rounded-3xl p-5 border border-cream-300/20 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-cream-100 mb-6 shadow-sm">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-pure-white/90 backdrop-blur-md text-sage-800 font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-3 font-sans text-[10px] tracking-widest uppercase text-muted-gray mb-3">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-sage-800 transition-colors leading-snug font-medium flex-grow">
                  {article.title}
                </h3>
                
                <p className="font-sans text-xs text-muted-gray leading-relaxed mb-6 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-cream-100/60 mt-auto">
                  <span className="font-sans text-xs font-semibold tracking-wider text-sage-800 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read Guide <BookOpen className="w-3.5 h-3.5" />
                  </span>
                  <button
                    onClick={(e) => handleShare(e, article.title)}
                    className="text-muted-gray hover:text-sage-800 p-1.5 rounded-full hover:bg-cream-100 transition-colors"
                    aria-label="Share story"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
