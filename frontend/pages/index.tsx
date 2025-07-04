import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Chatbot from '../components/Chatbot';
import { getPageBySlug, Page } from '../lib/agentClient';

const HomePage: React.FC = () => {
  const [pageContent, setPageContent] = useState<Page | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        setLoading(true);
        const homePage = await getPageBySlug('home'); // Fetch page with slug 'home'
        setPageContent(homePage);
      } catch (err) {
        setError('Failed to load home page content. Please create a page with slug "home" via the Admin Panel or agent.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <main className="container mx-auto px-4 py-8">
        {loading && <p className="text-center text-gray-700">Loading content...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {pageContent && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{pageContent.title}</h1>
            <div 
              className="prose max-w-none" 
              dangerouslySetInnerHTML={{ __html: pageContent.content }} 
            />
          </div>
        )}
      </main>
      <Chatbot />
    </div>
  );
};

export default HomePage;
