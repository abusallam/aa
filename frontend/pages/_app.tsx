import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';
import '../styles/globals.css';
import '../styles/elementor.css';
import '../styles/product.css';
import '../styles/home.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isHomePage = router.pathname === '/' || router.pathname === '/saas-consulting';
  const pageClass = isHomePage ? 'home-page' : 'product-page';

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className={`site-wrapper ${pageClass}`}>
      {loading && <Loading />}
      <Component {...pageProps} />
    </div>
  );
}
