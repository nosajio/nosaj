import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useLayoutEffect } from 'react';
import { Footer, Header } from '../../components';
import s from './call.module.css';

const CallPage: NextPage = () => {
  useEffect(() => {
    const calendlyEmbed =
      'https://assets.calendly.com/assets/external/widget.js';
    const scriptTag = document.createElement('script');
    scriptTag.src = calendlyEmbed;
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <main id="main">
      <Head>
        <title>Book a call</title>
        <meta name="description" content="" />
      </Head>

      <Header showCallButton={false} />

      <div className="content">
        <section className={clsx('mid')}>
          <div className={s.booking_frame}>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/nosaj/chat?hide_gdpr_banner=1"
              style={{ minWidth: 320, height: '90vh' }}
            />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default CallPage;
