import '../styles/globals.css';
import '../styles/animations.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Component key={router.asPath} {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;

