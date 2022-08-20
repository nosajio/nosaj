import clsx from 'clsx';
import { memo } from 'react';
import s from './tronBar.module.css';

type TronBarProps = {
  showoff?: boolean;
};

// The <TronBar /> is like a progress indicator with a personality. It sits at the
// very top of the page and spans the full width of the window, so it can make
// use of 100% of the x axis to do its thing.
export const TronBar = memo(({ showoff }: TronBarProps) => (
  <div
    className={clsx({ [s.anim_show]: showoff, [s.anim_init]: !showoff }, s.bar)}
  >
    <div className={s.bar_color} />
  </div>
));

TronBar.displayName = 'TronBar';
