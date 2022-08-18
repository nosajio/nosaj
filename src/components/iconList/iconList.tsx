import clsx from 'clsx';
import { ReactNode } from 'react';
import s from './iconList.module.css';

type ArrowListProps = {
  children: ReactNode[] | ReactNode;
  icon?: 'arrow' | 'check' | 'chevron';
  className?: string;
  compact?: boolean;
  center?: boolean;
  smallText?: boolean;
};

export const IconList = ({
  center,
  smallText,
  compact,
  className,
  children,
  icon = 'arrow',
}: ArrowListProps) => {
  const renderChild = (el: ReactNode, i?: number) => (
    <li key={i} className={clsx(s.list_item, s[icon])}>
      {el}
    </li>
  );

  if (!children) {
    return null;
  }

  return (
    <ul
      className={clsx(
        className,
        s.icon_list,
        compact && s.compact_list,
        center && s.center_list,
        smallText && s.font_size_small,
      )}
    >
      {Array.isArray(children)
        ? children.map(renderChild)
        : renderChild(children)}
    </ul>
  );
};
