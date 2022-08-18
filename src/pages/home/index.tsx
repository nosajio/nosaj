import type { NextPage } from 'next';
import Head from 'next/head';
import {
  HomeHero,
  HomeLogos,
  Page,
  ServicesForStartups,
  Testimonials
} from '../../components';

const Home: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>🚀 Shipping software for startups</title>
        <meta name="description" content="" />
      </Head>

      <HomeHero />
      <HomeLogos />
      <ServicesForStartups />
      <Testimonials />
    </Page>
  );
};

export default Home;
