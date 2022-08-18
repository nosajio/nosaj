import clsx from 'clsx';
import s from './homeLogos.module.css';

const logos = ['frontier', 'pave', 'bbc', 'firstminute'];

export const HomeLogos = () => {
  return (
    <div className="container pt">
      <div className="content">
        <section className={s.home_logos}>
          <h2 className={s.logos_title}>50+ products built for startups and established companies.</h2>
          <ul className={s.logos_list}>
            {logos.map((l, i) => (
              <li
                key={i}
                className={clsx(s.logos_list_item, s[`${l}-logo`])}
              ></li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
