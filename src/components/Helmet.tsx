import React from 'react';
import { Helmet as AsyncHelmet } from 'react-helmet-async';

interface HelmetProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

export default function Helmet({ title, description, ogTitle, ogDescription, ogImage, ogType }: HelmetProps) {
  return (
    <AsyncHelmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph Meta Tags for Social Sharing */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content={ogType || 'website'} />
    </AsyncHelmet>
  );
}
