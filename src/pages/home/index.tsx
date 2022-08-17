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

      </div>

      <Footer />
    </main>
  );
};

export default Home;
