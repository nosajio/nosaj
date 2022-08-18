import Link from 'next/link';
import { Button, IconList } from '..';
import s from './homeHero.module.css';

// type HomeHeroProps = {

// }

export const HomeHero = () => {
  return (
    <section className="container">
      <div className="content">
        <div className={s.hero_content}>
          <div className={s.portrait} />
          <div className={s.messages}>
            <h1 className={s.opener}>
              Hi, I&apos;m Jason.
              <br />I create software.
            </h1>
            <h2 className={s.sub_opener}>
              I help high velocity startups bring winning products to market.
            </h2>
          </div>
          <div className={s.action_a}>
            <Button href="/call">Book a 15 min call</Button>
          </div>
          <div className={s.action_b}>
            <IconList icon="arrow" center smallText compact>
              <Link href="/#startups">
                <a>Services for startups</a>
              </Link>
              <a
                href="https://nosaj.substack.com"
                target="_blank"
                rel="noreferrer"
              >
                Newsletter
              </a>
            </IconList>
          </div>
        </div>
      </div>
    </section>
  );
};
