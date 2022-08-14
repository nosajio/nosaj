import clsx from 'clsx';
import Link from 'next/link';
import s from './header.module.css';

type HeaderProps = {
  showCallButton?: boolean;
};

type Link = {
  path: string;
  label: string;
};

const links: Link[] = [
  {
    path: '/',
    label: 'Home',
  },
];

export const Header = ({ showCallButton = true }: HeaderProps) => {
  return (
    <div className="content">
      <header className={clsx('mid', s.nosaj_header)}>
        <Link href="/">
          <a className={clsx('noop', s.nosaj_logo)}>nosaj.io</a>
        </Link>
        {showCallButton && (
          <Link href="/call">
            <a className={clsx('noop', s.call_btn)}>Book a 15 min call</a>
          </Link>
        )}
      </header>
    </div>
  );
};
