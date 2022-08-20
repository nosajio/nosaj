import type { NextPage } from 'next';
import Head from 'next/head';
import {
  HomeHero,
  HomeLogos,
  Page,
  ServicesForStartups,
  Testimonials,
} from '../../components';
import { useScrollToWhenPath } from '../../hooks';

const Home: NextPage = () => {
  const startupsRef = useScrollToWhenPath('/#startups');

  return (
    <Page pagename="home">
      <Head>
        <title>🚀 Shipping software for startups</title>
        <meta name="description" content="" />
      </Head>

      <HomeHero />
      <HomeLogos />
      <ServicesForStartups ref={startupsRef} />
      <Testimonials />
    </Page>
  );
};

export default Home;
