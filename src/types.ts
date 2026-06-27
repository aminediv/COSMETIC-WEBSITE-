export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'facial-oils' | 'cleansers' | 'serums' | 'clays-masks' | 'body-ritual';
  categoryLabel: string;
  skinType: 'dry' | 'oily-combination' | 'sensitive' | 'all';
  skinTypeLabel: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string;
  benefits: string[];
  howToUse: string;
  image: string;
  gallery: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Article {
  id: string;
  title: string;
  category: 'Rituals' | 'Ingredients' | 'Sustainability' | 'Story';
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'orders' | 'products' | 'shipping' | 'ritual';
}
