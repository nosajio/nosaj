import type { AppProps } from 'next/app';
import 'normalize.css';
import '../styles/fonts.css';
import '../styles/layout.css';
import '../styles/globals.css';

function Nosajio({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Nosajio;
