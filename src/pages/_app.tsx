import type { AppProps } from 'next/app';
import Script from 'next/script';

import 'normalize.css';
import '../styles/vars.css';
import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/layout.css';

function Nosajio({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-122370645-1"
        strategy="afterInteractive"
      />
      <Script strategy="afterInteractive" id="ga">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-122370645-1');
          `}
      </Script>

      <Component {...pageProps} />;
    </>
  );
}

export default Nosajio;
