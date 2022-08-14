import React, { ReactNode } from 'react';
import s from './arrowList.module.css';

type ArrowListProps = {
  children: ReactNode[];
};

export const ArrowList = ({ children }: ArrowListProps) => {
  return (
    <ul className={s.arrow_list}>
      {children.map((el, i) => (
        <li key={i} className={s.list_item}>{el}</li>
      ))}
    </ul>
  );
};
