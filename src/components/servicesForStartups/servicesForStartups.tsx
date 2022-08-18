import clsx from 'clsx';
import { Button, IconList } from '..';
import s from './servicesForStartups.module.css';

export const ServicesForStartups = () => {
  return (
    <section className="container pt">
      <header className={s.section_head}>
        <h1>Services for startups</h1>
      </header>
      <div className="content">
        <article className={s.services_content}>
          <header className={s.text_opener}>
            <p>
              I partner with small and mid sized teams design and build valuable
              software.
            </p>
          </header>
          <div className={s.services_text}>
            <h2 className={clsx(s.text_heading, 'chaney chaney-small')}>
              Why hire me?
            </h2>
            <p>
              My lifetime obsession with creating great software has led to
              getting involved with many aspects of product design, engineering,
              customer development, marketing, and startup building.
            </p>
            <p>
              With enough repetition I&apos;ve learned how to ship products at
              different scales that meet specific goals, deliver returns, and
              please users.
            </p>
            <p>
              I offer an advantage to startups by coming in with a broad set of
              skills and experiences usually filled by multiple hires.
            </p>
          </div>
          <div className={s.services_visual}></div>
          <div className={s.services_list}>
            <IconList icon="check" circleIcon compact smallText>
              <>Product strategy.</>
              <>Product &amp; UI design.</>
              <>Engineering.</>
              <>Finding product market fit.</>
              <>Education.</>
            </IconList>
          </div>
          <footer className={s.services_footer}>
            <Button>Book a 15 min call</Button>
          </footer>
        </article>
      </div>
    </section>
  );
};
