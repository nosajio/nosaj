import s from './home.module.css';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Footer } from '../../components';

const Home: NextPage = () => {
  return (
    <main id="main">
      <Head>
        <title>Jason...</title>
        <meta name="description" content="" />
      </Head>

      <section className="home-content">
        <h1 className={s.opener}>
          I’m Jason, a self-taught designer & engineer. I help startups build
          winning products.
        </h1>
        <div className={s.logos}>
          <h2 className="logos-title">
            I’ve built 50+ products for startups and established companies.
          </h2>
          <ul className={s.logo_images}>
            <li className="logo frontier">
              <Image
                width={143}
                height={33}
                src="/logos/frontier.svg"
                alt="Frontier"
              />
            </li>
            <li className="logo bbc">
              <Image width={103} height={30} src="/logos/bbc.svg" alt="BBC" />
            </li>
            <li className="logo pave">
              <Image width={79} height={24} src="/logos/pave.svg" alt="Pave" />
            </li>
            <li className="logo firstminute">
              <Image
                width={124}
                height={26}
                src="/logos/firstminute.svg"
                alt="Firstminute Capital"
              />
            </li>
          </ul>
        </div>
        <ul className="actions arrows">
          <li className="action">
            <a href="/startups.html">Services for startups</a>
          </li>
          <li className="action">
            <a href="/call.html">Book a 15 minute call</a>
          </li>
          <li className="action">
            <a href="https://nosaj.substack.com">Writing</a>
          </li>
        </ul>
        <div className={s.portrait} />
      </section>
      <Footer />
    </main>
  );
};

export default Home;
