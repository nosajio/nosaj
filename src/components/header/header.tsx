import clsx from 'clsx';
import Link from 'next/link';
import s from './header.module.css';
import Logo from './nosaj-logo.svg';

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
  console.log(Logo);
  return (
    <div className="content">
      <header className={clsx('mid', s.nosaj_header)}>
        <Link href="/">
          <a className={clsx('noop', s.nosaj_logo)}>
            <Logo />
          </a>
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
