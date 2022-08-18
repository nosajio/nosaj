import clsx from 'clsx';
import { repeat } from '../../utils';
import s from './testimonials.module.css';
import StarSVG from './star.svg';

type Testimonial = {
  logoName: string;
  text: string;
  who: string;
  where: string;
};

const testimonials: Testimonial[] = [
  {
    logoName: 'pave',
    text: 'Working with Jason unlocked enormous potential for Pave',
    who: 'Matt Schulman',
    where: 'Founder & CEO, Pave',
  },
  {
    logoName: 'frontier',
    text: 'Jason is a one man startup machine',
    who: "Elliot O'Connor",
    where: 'Founder & CEO, Frontier',
  },
  {
    logoName: 'tradespace',
    text: "We couldn't have raised without Jason's tireless efforts.",
    who: 'Alec Sorensen',
    where: 'Founder & CEO, Tradespace',
  },
];

export const Testimonials = () => {
  return (
    <section className="container pt">
      <div className="content">
        <div className={s.testimonials_content}>
          <div className={clsx('pb', s.stars)}>
            {repeat(5).map((_, i) => (
              <StarSVG key={i} />
            ))}
          </div>
          <ul className={s.quotes}>
            {testimonials.map((t, i) => (
              <li className={s.quote_item} key={i}>
                <div className={clsx(s[t.logoName], s.logo)} />
                <blockquote>
                  <p>&quot;{t.text}&quot;</p>
                  <footer className={s.quote_footer}>
                    <div className={s.footer_who}>{t.who}</div>
                    <div className={s.footer_where}>{t.where}</div>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
