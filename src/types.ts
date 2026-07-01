export interface Product {
  id: string;
  name: string;
  nameFr?: string;
  subtitle: string;
  subtitleFr?: string;
  category: 'facial-oils' | 'cleansers' | 'serums' | 'clays-masks' | 'body-ritual';
  categoryLabel: string;
  categoryLabelFr?: string;
  skinType: 'dry' | 'oily-combination' | 'sensitive' | 'all';
  skinTypeLabel: string;
  skinTypeLabelFr?: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  descriptionFr?: string;
  ingredients: string;
  ingredientsFr?: string;
  benefits: string[];
  benefitsFr?: string[];
  howToUse: string;
  howToUseFr?: string;
  image: string;
  gallery: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FAQItem {
  id: string;
  question: string;
  questionFr?: string;
  answer: string;
  answerFr?: string;
  category: 'orders' | 'products' | 'shipping' | 'ritual';
}
