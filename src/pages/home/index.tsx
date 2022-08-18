import type { NextPage } from 'next';
import Head from 'next/head';
import {
  HomeHero,
  HomeLogos,
  Page,
  ServicesForStartups,
} from '../../components';

const Home: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>Jason...</title>
        <meta name="description" content="" />
      </Head>

      <HomeHero />
      <HomeLogos />
      <ServicesForStartups />
    </Page>
  );
};

export default Home;
