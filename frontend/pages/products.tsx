import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

const ProductsPage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'LegalAgent',
      image: '/assets/saas-consulting-images/chatbot-juridique-1200x800-1-700x700.webp',
      price: '999,00',
      originalPrice: '1.000,00',
      link: '/products/legalbot'
    },
    {
      id: 2,
      name: 'MedicalAgent',
      image: '/assets/saas-consulting-images/HealthcareChatbotTrainingData-300x300.webp',
      price: '999,00',
      originalPrice: '1.000,00',
      link: '/products/medicalbot'
    },
    {
      id: 3,
      name: 'TechnicalAgent',
      image: '/assets/saas-consulting-images/netacea-header-e1720904743204-300x300.jpg',
      price: '999,00',
      originalPrice: '1.000,00',
      link: '/products/technicalbot'
    },
    {
      id: 4,
      name: 'SocialAgent',
      image: '/assets/saas-consulting-images/do-a-bot-which-automates-your-works-89a7.webp',
      price: '999,00',
      originalPrice: '1.000,00',
      link: '/products/socialbot'
    },
    {
      id: 5,
      name: 'EducationalAgent',
      image: '/assets/saas-consulting-images/64f037406f46384449154525_using-machine-learning-bot-in-educational-institutions-700x700.jpg',
      price: '999,00',
      originalPrice: '1.000,00',
      link: '/products/educationalbot'
    },
    {
      id: 6,
      name: 'InformationalAgent',
      image: '/assets/saas-consulting-images/informational-bot-color-icon-robot-virtual-assistant-artificial-intelligence-web-robot-in-online-networks-access-to-data-machine-learning-software-application-isolated-illustration-vector.jpg',
      price: '999,00',
      originalPrice: '1.000,00',
      link: '/products/informationalbot'
    }
  ];

  return (
    <Layout>
      <div className="product-container">
        <main>
          <h1 className="elementor-heading-title">Our AI Agents</h1>
          <div className="products">
            {products.map((product) => (
              <Link href={product.link} key={product.id} className="product">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="product-image"
                />
                <h2>{product.name}</h2>
                <div className="product-price">
                  <del>{product.originalPrice} ر.س</del>
                  <span>{product.price} ر.س</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ProductsPage;
