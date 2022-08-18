import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { Page } from '../../components';
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
    <Page callButton={false}>
      <Head>
        <title>
          🗓 15 minute call with Jason | 🚀 Shipping software for startups
        </title>
        <meta name="description" content="" />
      </Head>

      <div className="container">
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
      </div>
    </Page>
  );
};

export default CallPage;
