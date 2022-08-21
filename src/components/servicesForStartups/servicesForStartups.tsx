import clsx from 'clsx';
import { forwardRef } from 'react';
import { Button, IconList } from '..';
import { useBreakpoint } from '../../hooks';
import { repeat } from '../../utils';
import s from './servicesForStartups.module.css';
import StarSVG from './star.svg';

const services = [
  'Product strategy.',
  'Finding product market fit.',
  'Product & UI design.',
  'Engineering.',
];

export const ServicesForStartups = forwardRef<HTMLElement | null>((_, ref) => {
  const isLtMedium = useBreakpoint('(max-width: 744px)');
  return (
    <section className="container pt" ref={ref}>
      <header className={s.section_head}>
        <h1>Services for startups</h1>
      </header>
      <div className="content">
        <article className={s.services_content}>
          <ServicesTestimonials />
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
              Through repetition I&apos;ve learned how to ship products at
              different scales, that{' '}
              <strong>
                meet specific goals, deliver returns, and please users
              </strong>
              .
            </p>
            <p>
              I offer a unique advantage to startups by coming in with a broad
              set of skills and experiences often found by hiring multiple
              people.
            </p>
            <p>
              <a
                href="https://nosaj.substack.com/p/software-that-makes-money"
                target="_blank"
                rel="noreferrer"
              >
                Read: How I make products that make money.
              </a>
            </p>
          </div>
          <div className={s.services_visual}></div>
          <div className={s.services_list}>
            <IconList circleIcon compact icon="check" smallText={isLtMedium}>
              {services}
            </IconList>
          </div>
          <footer className={s.services_footer}>
            <Button href="/call">Book a 15 min call</Button>
          </footer>
        </article>
      </div>
    </section>
  );
});

ServicesForStartups.displayName = 'ServicesForStartups';

type Testimonial = {
  logoName: string;
  text: string;
  who: string;
  where: string;
};

const testimonials: Testimonial[] = [
  {
    logoName: 'frontier',
    text: 'Jason is a one man startup machine with a record of shipping a huge range of products.',
    who: "Elliot O'Connor",
    where: 'Founder & CEO, Frontier',
  },
  {
    logoName: 'pave',
    text: 'Working with Jason unlocked enormous potential for Pave.',
    who: 'Matt Schulman',
    where: 'Founder & CEO, Pave',
  },
  {
    logoName: 'tradespace',
    text: 'Jason was critical to ensuring we got to market quickly with a robust product.',
    who: 'Alec Sorensen',
    where: 'Founder & CEO, Tradespace',
  },
];

const ServicesTestimonials = () => {
  const stars = (
    <div className={clsx(s.stars)}>
      {repeat(5).map((_, i) => (
        <StarSVG key={i} />
      ))}
    </div>
  );
  return (
    <ul className={s.quotes}>
      {testimonials.map((t, i) => [
        <li className={s.quote_stars} key={`star-${i}`}>
          {stars}
        </li>,
        <li className={s.quote_item} key={i}>
          <div className={clsx(s[t.logoName], s.logo)} />
          <blockquote>
            <p>&quot;{t.text}&quot;</p>
            <footer className={s.quote_footer}>
              <div className={s.footer_who}>{t.who}</div>
              <div className={s.footer_where}>{t.where}</div>
            </footer>
          </blockquote>
        </li>,
      ])}
    </ul>
  );
};
