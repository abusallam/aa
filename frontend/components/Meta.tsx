import React from 'react';
import Head from 'next/head';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const Meta: React.FC<MetaProps> = ({
  title = "SaaS Consulting - AI Agents and Solutions",
  description = "Our expertise, website content, and data from internal documents are combined to create powerful chatbots.",
  keywords = "AI, Chatbots, Artificial Intelligence, SaaS, Consulting, AI Agents",
  image = "/assets/saas-consulting-images/WhatsApp_Image_2024-07-02_at_11.24.40_PM__3_-removebg-preview-1.png",
  url = "https://saas.consulting.sa"
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional meta tags */}
      <meta name="theme-color" content="#6EC1E4" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="SaaS Consulting" />
      
      {/* Preconnect to improve performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
    </Head>
  );
};

export default Meta;
