import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IconList } from '../iconList';
import s from './footer.module.css';

type FooterLink = {
  href: string;
  label: string;
  blank?: boolean;
};

const footerLinks: FooterLink[] = [
  {
    href: '/startups',
    label: 'Services for startups',
  },

  {
    href: '/call',
    label: 'Book a call',
  },
  {
    href: 'https://nosaj.substack.com',
    label: 'Newsletter',
  },
  {
    href: 'https://twitter.com/nosajio',
    label: 'Twitter',
    blank: true,
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={clsx(s.nosaj_footer, 'container')}>
      <div className={clsx('content', s.footer_content)}>
        <IconList className={s.footer_links} icon="chevron" compact>
          {footerLinks.map((l, i) => (
            <Link key={i} href={l.href}>
              <a target={l.blank ? '_blank' : undefined}>{l.label}</a>
            </Link>
          ))}
        </IconList>
        <div className={s.footer_copy}>
          <div className={s.loopyloop} />
          <div className={s.copyright}>&copy; {year}</div>
        </div>
      </div>
    </footer>
  );
};
