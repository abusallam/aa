import React from 'react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getProduct, getRelatedProducts } from '../../data/products';
import { useRouter } from 'next/router';

const LegalBotPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const product = getProduct(slug as string || 'legalbot'); // Default to legalbot if slug is not available
  
  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="product-container">
          <h1 className="elementor-heading-title text-center">Product Not Found</h1>
          <p className="text-center">The product you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <Layout 
      title={product.name + " - SaaS Consulting"}
      description={product.shortDescription}
      keywords={product.keywords}
      image={product.image}
      url={`https://saas.consulting.sa/products/${product.slug}`}
    >
      <div className="product-container">
        <main>
          <div className="elementor-widget-container">
            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={700}
              className="product-image"
            />

            <h1 className="elementor-heading-title">{product.name}</h1>
            
            <div className="product-price text-center">
              <del>{product.originalPrice} ر.س</del>
              <span>{product.price} ر.س</span>
            </div>

            <div className="product-description">
              <h2>AI chatbots are trained on large amounts of data and use ML to intelligently generate a wide range of non-scripted, conversational responses to human text and voice input.</h2>
              <p>{product.description}</p>
              <h3>Key Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {relatedProducts.length > 0 && (
              <div className="related-products">
                <h2>Related products</h2>
                <div className="related-products-grid">
                  {relatedProducts.map((relatedProduct) => (
                    <Link href={`/products/${relatedProduct.slug}`} key={relatedProduct.id} className="related-product-card">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                      />
                      <h3>{relatedProduct.name}</h3>
                      <div className="product-price">
                        <del>{relatedProduct.originalPrice} ر.س</del>
                        <span>{relatedProduct.price} ر.س</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default LegalBotPage;
