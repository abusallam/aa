import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SocialBotPage: React.FC = () => {
  return (
    <div className="product-container">
      <header className="product-header">
        <Link href="/">
          <Image 
            src="/assets/saas-consulting-images/WhatsApp_Image_2024-07-02_at_11.24.40_PM__3_-removebg-preview-1.png"
            alt="Logo"
            width={421}
            height={283}
          />
        </Link>
      </header>

      <main>
        <div className="elementor-widget-container">
          <Image
            src="/assets/saas-consulting-images/do-a-bot-which-automates-your-works-89a7.webp"
            alt="SocialAgent"
            width={300}
            height={300}
            className="product-image"
          />

          <h1 className="elementor-heading-title">SocialAgent</h1>
          
          <div className="product-price">
            <del>1.000,00 ر.س</del>
            <span>999,00 ر.س</span>
          </div>

          <div className="product-description">
            <h2>AI chatbots are trained on large amounts of data and use ML to intelligently generate a wide range of non-scripted, conversational responses to human text and voice input.</h2>
            <p>Virtual agents are AI bots that can be specifically trained to interact with customers in call centers or contact centers.</p>
          </div>

          <div className="related-products">
            <h2>Related products</h2>
            <div className="related-products-grid">
              <div className="related-product-card">
                <Image
                  src="/assets/saas-consulting-images/informational-bot-color-icon-robot-virtual-assistant-artificial-intelligence-web-robot-in-online-networks-access-to-data-machine-learning-software-application-isolated-illustration-vector.jpg"
                  alt="InformationalAgent"
                  width={300}
                  height={300}
                />
                <h3>InformationalAgent</h3>
                <div className="product-price">
                  <del>1.000,00 ر.س</del>
                  <span>999,00 ر.س</span>
                </div>
              </div>
              <div className="related-product-card">
                <Image
                  src="/assets/saas-consulting-images/64f037406f46384449154525_using-machine-learning-bot-in-educational-institutions-700x700.jpg"
                  alt="EducationalAgent"
                  width={300}
                  height={300}
                />
                <h3>EducationalAgent</h3>
                <div className="product-price">
                  <del>1.000,00 ر.س</del>
                  <span>999,00 ر.س</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="contact-section">
        <div className="contact-info">
          <div>
            <p>+966542331876</p>
            <p>ceo@consulting.sa</p>
          </div>
          <div>
            <p>consulting.sa</p>
            <p>المستشار. السعودية</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SocialBotPage;
