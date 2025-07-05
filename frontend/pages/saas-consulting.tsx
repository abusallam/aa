import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="elementor">
        <section className="elementor-section elementor-top-section">
          <div className="elementor-container">
            <div className="elementor-row">
              <div className="elementor-column">
                <div className="elementor-widget-container">
                  <Image
                    src="/assets/saas-consulting-images/1690356613981.gif"
                    alt="AI Animation"
                    width={1024}
                    height={576}
                    className="elementor-animation"
                  />
                </div>
                
                <div className="elementor-widget-container">
                  <h1 className="elementor-heading-title">AI Agents</h1>
                  <div className="elementor-text-editor">
                    <p>Our expertise, website content, and data from internal documents are combined to create powerful chatbots.</p>
                  </div>
                </div>

                <div className="elementor-widget-container">
                  <Link href="/products" className="elementor-button">
                    Go to Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section" id="AboutUs">
          <div className="elementor-container">
            <div className="elementor-row">
              <div className="elementor-column">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title">About Us</h2>
                  <div className="elementor-text-editor">
                    <p>AI consulting companies help businesses implement artificial intelligence to optimize operations, increase efficiency, and drive innovation.</p>
                    <p>We provide expertise in developing AI strategies, integrating AI technologies with your systems, customizing AI solutions to meet specific business needs, and ensuring successful deployment and maintenance of AI tools.</p>
                  </div>
                </div>
              </div>
              <div className="elementor-column">
                <div className="elementor-widget-container">
                  <Image
                    src="/assets/saas-consulting-images/b82a3e16da303b5a64a8e4c28c2c2c15.png"
                    alt="AI Consulting"
                    width={582}
                    height={550}
                    className="elementor-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section">
          <div className="elementor-container">
            <div className="elementor-row">
              <div className="elementor-column">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title">Our AI Consulting Services</h2>
                  <div className="elementor-text-editor">
                    <p>Transform data into actionable business insights with our AI solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
