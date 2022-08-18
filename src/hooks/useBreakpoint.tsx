import { useLayoutEffect, useRef, useState } from 'react';
import { breakpointListener } from '../utils';

const breakpoint = new Map([
  ['small', 428],
  ['medium', 744],
  ['large', 1080],
]);

/**
 * The simplest possible breakpoint watcher hook. just returns a boolean
 * representing the breakpoint match state
 */
export const useBreakpoint = (mq: string) => {
  const listener = useRef<ReturnType<typeof breakpointListener>>();
  const [match, setMatch] = useState(false);

  useLayoutEffect(() => {
    if (!listener.current) {
      listener.current = breakpointListener(mq);
    }
    setMatch(listener.current.matches);

    listener.current.e?.on('change', ({ matches }) => {
      setMatch(curr => (curr !== matches ? matches : curr));
    });
  }, [mq]);

  return match;
};

export const useSmall = () => {
  const isSmall = useBreakpoint(`(max-width: ${breakpoint.get('small')}px)`);
  return isSmall;
};

export const useMedium = () => {
  const isMedium = useBreakpoint(`(min-width: ${breakpoint.get('medium')}px)`);
  return isMedium;
};

export const useLarge = () => {
  const isMedium = useBreakpoint(`(min-width: ${breakpoint.get('large')}px)`);
  return isMedium;
};
