import { ReactNode } from 'react';
import { Footer, Header, TronBar } from '..';
import s from './page.module.css';

type PageProps = {
  callButton?: boolean;
  header?: boolean;
  footer?: boolean;
  children?: ReactNode;
};

export const Page = ({
  children,
  callButton = true,
  header = true,
  footer = true,
}: PageProps) => {
  return (
    <main id={s.main}>
      <TronBar />
      {header && <Header showCallButton={callButton} />}
      <div className={s.page}>{children}</div>
      {footer && <Footer />}
    </main>
  );
};
