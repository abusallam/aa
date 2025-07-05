import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Meta from './Meta';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children,
  title,
  description,
  keywords,
  image,
  url
}) => {
  return (
    <>
      <Meta 
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        url={url}
      />
      
      <div className="site-wrapper">
        <header className="product-header">
          <Link href="/">
            <Image 
              src="/assets/saas-consulting-images/WhatsApp_Image_2024-07-02_at_11.24.40_PM__3_-removebg-preview-1.png"
              alt="SaaS Consulting Logo"
              width={421}
              height={283}
              priority
            />
          </Link>
          <nav className="main-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/products" className="nav-link">Products</Link>
            <Link href="/#AboutUs" className="nav-link">About Us</Link>
            <Link href="/#ContactUs" className="nav-link">Contact</Link>
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer className="contact-section" id="ContactUs">
          <div className="contact-info">
            <div>
              <p>
                <Image 
                  src="/assets/saas-consulting-images/f184b5009acce352e904bd97a45c4150.svg"
                  alt="Phone"
                  width={20}
                  height={20}
                  className="inline-icon"
                /> +966542331876
              </p>
              <p>
                <Image 
                  src="/assets/saas-consulting-images/463188e1eaa4a4a25e027d994bd8b5e0.svg"
                  alt="Email"
                  width={20}
                  height={20}
                  className="inline-icon"
                /> ceo@consulting.sa
              </p>
            </div>
            <div>
              <p>consulting.sa</p>
              <p>المستشار. السعودية</p>
            </div>
          </div>
          <div className="copyright">
            <p>Copyright © {new Date().getFullYear()} consulting.sa. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
