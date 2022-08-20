import { useRouter } from 'next/router';
import { Ref, useEffect, useRef } from 'react';

type UseScrollToValue = [triggerFn: () => void, ref: Ref<HTMLElement | null>];

export const useScrollTo = (): UseScrollToValue => {
  const scrollRef = useRef<HTMLElement>(null);
  const trigger = () => {
    if (!scrollRef.current) {
      return;
    }
    const box = scrollRef.current?.getBoundingClientRect();
    const elY = Math.round(box?.y ?? 0);
    const scrollY = window?.scrollY ?? 0;

    if (elY < 1) {
      return;
    }
    console.log(elY, scrollY);

    window?.scrollTo({
      top: elY + scrollY,
      behavior: 'smooth',
    });
  };

  return [trigger, scrollRef];
};

export const useScrollToWhenPath = (path: string) => {
  const { asPath } = useRouter();
  const [scrollToServices, ref] = useScrollTo();

  useEffect(() => {
    if (asPath === path) {
      scrollToServices();
    }
  }, [path, asPath, scrollToServices]);

  return ref;
};
