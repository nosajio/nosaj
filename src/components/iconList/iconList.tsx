import clsx from 'clsx';
import { ReactNode } from 'react';
import s from './iconList.module.css';

type Bools<K extends string> = {
  [keys in K]?: boolean;
};

type ArrowListProps = Bools<
  'compact' | 'smallText' | 'center' | 'circleIcon'
> & {
  children: ReactNode[] | ReactNode;
  icon?: 'arrow' | 'check' | 'chevron';
  className?: string;
};

export const IconList = ({
  circleIcon,
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
        circleIcon && s.circle_icons
      )}
    >
      {Array.isArray(children)
        ? children.map(renderChild)
        : renderChild(children)}
    </ul>
  );
};
