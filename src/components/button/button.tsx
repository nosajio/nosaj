import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import s from './button.module.css';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
};

export const Button = ({ href, onClick, children }: ButtonProps) => {
  const mainEl = <a className={clsx('noop', s.button_container)}>{children}</a>;
  return href ? <Link href={href}>{mainEl}</Link> : mainEl;
};
