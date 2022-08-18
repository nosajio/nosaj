import Emittery from 'emittery';

export const breakpointListener = (mq: string) => {
  if (typeof window === 'undefined' || !('matchMedia' in window)) {
    return { matches: false, e: undefined };
  }

  const e = new Emittery<{ change: { matches: boolean } }>();
  const media = window?.matchMedia(mq);

  media.addEventListener('change', me => {
    const { matches } = me;
    e.emit('change', { matches });
  });

  // Trigger a change event immediately so that the state can be passed to any
  // and all subscribers
  e.emit('change', { matches: media.matches });

  return { e, matches: media.matches };
};
