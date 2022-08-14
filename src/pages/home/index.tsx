import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IconList, Footer, Header } from '../../components';
import s from './home.module.css';

const Home: NextPage = () => {
  return (
    <main id="main">
      <Head>
        <title>Jason...</title>
        <meta name="description" content="" />
      </Head>

      <Header />

      <div className="content">
        <section className={clsx('mid', s.home_content)}>
          <div className={s.portrait_opener}>
            <h1 className={s.opener}>
              I’m Jason, I build tech products and help startups go from zero to one.
            </h1>
            <h2 className={s.opener_sub}>
              Now I work with founders to build winning products.
            </h2>
            <div className={s.portrait} />
          </div>
          <div className={s.logos}>
            <p className={s.logos_title}>
              I’ve built over 50 products for startups and established
              companies.
            </p>
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
                <Image
                  width={79}
                  height={24}
                  src="/logos/pave.svg"
                  alt="Pave"
                />
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
          <IconList>
            <Link href="/startups">
              <a>Services for startups</a>
            </Link>
            <Link href="/call">
              <a>Book a 15 minute call</a>
            </Link>
            <a
              target="_blank"
              href="https://nosaj.substack.com"
              rel="noreferrer"
            >
              Writing
            </a>
          </IconList>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
