import { ReactNode } from 'react';
import { Footer, Header, TronBar } from '..';
import s from './page.module.css';

type PageProps = {
  header?: boolean;
  footer?: boolean;
  children?: ReactNode;
};

export const Page = ({ children, header = true, footer = true }: PageProps) => {
  return (
    <main id={s.main}>
      <TronBar />
      {header && <Header />}
      <div className={s.page}>{children}</div>
      {footer && <Footer />}
    </main>
  );
};
