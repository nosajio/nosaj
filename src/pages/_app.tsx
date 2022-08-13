import type { AppProps } from 'next/app';
import 'normalize.css';
import '../styles/fonts.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
